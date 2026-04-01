from pathlib import Path
from datetime import datetime, timezone
import os
import re
from typing import Literal, Optional

import torch
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from pymongo import MongoClient
from pymongo.collection import Collection
from transformers import AutoModelForSequenceClassification, AutoTokenizer

# ==============================
# CONFIGURATION
# ==============================

MODEL_DIR = Path(__file__).resolve().parent / "model"
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
CONFIDENCE_THRESHOLD = float(os.getenv("CONFIDENCE_THRESHOLD", "0.6"))
MIN_WORD_COUNT = int(os.getenv("MIN_WORD_COUNT", "6"))

MONGODB_URI = os.getenv(
    "MONGODB_URI",
    "mongodb+srv://kandhimallayashwanth7_db_user:yashwanth@cluster0.84rgmmx.mongodb.net/?appName=Cluster0"
)
MONGODB_DB_NAME = os.getenv("MONGODB_DB_NAME", "careershield_ai")
MONGODB_COLLECTION_NAME = os.getenv("MONGODB_COLLECTION_NAME", "predictions")

LOW_QUALITY_TOKENS = {
    "abc",
    "test",
    "asdf",
    "qwerty",
    "wq",
    "xyz",
    "dummy",
    "hello",
}

ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8081",
    "http://127.0.0.1:8081",
]
ALLOWED_ORIGIN_REGEX = r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$"

try:
    tokenizer = AutoTokenizer.from_pretrained(str(MODEL_DIR), local_files_only=True)
    model = AutoModelForSequenceClassification.from_pretrained(str(MODEL_DIR), local_files_only=True)
    model.to(DEVICE)
    model.eval()
    print("Model loaded successfully")
except Exception as exc:
    raise RuntimeError(f"Failed to load model: {exc}") from exc

try:
    mongo_client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
    mongo_client.admin.command("ping")

    db = mongo_client[MONGODB_DB_NAME]
    prediction_collection: Collection = db[MONGODB_COLLECTION_NAME]

    print("Connected to MongoDB")
except Exception as exc:
    prediction_collection: Optional[Collection] = None
    print(f"MongoDB connection failed: {exc}")

class PredictRequest(BaseModel):
    text: str = Field(..., min_length=1)


class PredictResponse(BaseModel):
    prediction: Literal[-2, -1, 0, 1]
    confidence: float
    message: str


class HistoryRecord(BaseModel):
    text: str
    prediction: Literal[-2, -1, 0, 1]
    confidence: float
    timestamp: datetime
    message: str

app = FastAPI(title="CareerShield AI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_origin_regex=ALLOWED_ORIGIN_REGEX,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def is_valid_text(text: str) -> tuple[bool, str]:
    normalized = re.sub(r"\s+", " ", text).strip()
    words = re.findall(r"[A-Za-z]{2,}", normalized)

    if len(words) < MIN_WORD_COUNT:
        return False, f"Invalid input: please provide at least {MIN_WORD_COUNT} meaningful words."

    alpha_chars = sum(1 for ch in normalized if ch.isalpha())
    if alpha_chars < 25:
        return False, "Invalid input: text is too short or not descriptive enough."

    lowered_words = [word.lower() for word in words]
    unique_words = set(lowered_words)
    if len(unique_words) <= 2:
        return False, "Invalid input: repeated or low-information text detected."

    low_quality_hits = sum(1 for word in lowered_words if word in LOW_QUALITY_TOKENS or len(set(word)) == 1)
    if low_quality_hits >= max(2, len(lowered_words) // 2):
        return False, "Invalid input: low-quality or meaningless text detected."

    return True, "Valid"

@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict", response_model=PredictResponse)
def predict(payload: PredictRequest):
    text = payload.text.strip()

    if not text:
        return PredictResponse(prediction=-1, confidence=0.0, message="Invalid input: text cannot be empty.")

    is_valid, validation_message = is_valid_text(text)
    if not is_valid:
        invalid_response = PredictResponse(
            prediction=-1,
            confidence=0.0,
            message=validation_message,
        )

        if prediction_collection is not None:
            prediction_collection.insert_one(
                {
                    "text": text,
                    "prediction": invalid_response.prediction,
                    "confidence": invalid_response.confidence,
                    "message": invalid_response.message,
                    "timestamp": datetime.now(timezone.utc),
                }
            )

        return invalid_response

    encoded = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=512,
    )
    encoded = {key: value.to(DEVICE) for key, value in encoded.items()}

    with torch.no_grad():
        logits = model(**encoded).logits
        probs = torch.softmax(logits, dim=-1)
        confidence, prediction = torch.max(probs, dim=1)

    model_prediction = int(prediction.item())
    confidence_value = float(confidence.item())

    if confidence_value < CONFIDENCE_THRESHOLD:
        prediction_value = -2
        message = "Uncertain prediction: confidence is below threshold."
    elif model_prediction == 1:
        prediction_value = 1
        message = "Fake job detected."
    else:
        prediction_value = 0
        message = "Real job detected."

    if prediction_collection is not None:
        prediction_collection.insert_one(
            {
                "text": text,
                "prediction": prediction_value,
                "confidence": confidence_value,
                "message": message,
                "timestamp": datetime.now(timezone.utc),
            }
        )

    return PredictResponse(prediction=prediction_value, confidence=confidence_value, message=message)


@app.get("/history", response_model=list[HistoryRecord])
def history():
    if prediction_collection is None:
        raise HTTPException(status_code=503, detail="Database unavailable.")

    records = prediction_collection.find(
        {},
        {"_id": 0, "text": 1, "prediction": 1, "confidence": 1, "timestamp": 1, "message": 1},
    ).sort("timestamp", -1)

    return [
        HistoryRecord(
            text=record.get("text", ""),
            prediction=record.get("prediction", -1),
            confidence=record.get("confidence", 0.0),
            timestamp=record.get("timestamp", datetime.now(timezone.utc)),
            message=record.get("message", ""),
        )
        for record in records
    ]