from pathlib import Path

import torch
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from transformers import AutoModelForSequenceClassification, AutoTokenizer

MODEL_DIR = Path(__file__).resolve().parent / "model"
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

try:
    tokenizer = AutoTokenizer.from_pretrained(str(MODEL_DIR), local_files_only=True)
    model = AutoModelForSequenceClassification.from_pretrained(str(MODEL_DIR), local_files_only=True)
    model.to(DEVICE)
    model.eval()
except Exception as exc:  # pragma: no cover
    raise RuntimeError(f"Failed to load model from {MODEL_DIR}: {exc}") from exc


class PredictRequest(BaseModel):
    text: str = Field(..., min_length=1, description="Raw job description text")


class PredictResponse(BaseModel):
    prediction: int
    confidence: float


app = FastAPI(title="CareerShield AI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/predict", response_model=PredictResponse)
def predict(payload: PredictRequest) -> PredictResponse:
    text = payload.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Text cannot be empty.")

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
        probabilities = torch.softmax(logits, dim=-1)
        confidence, prediction = torch.max(probabilities, dim=1)

    return PredictResponse(
        prediction=int(prediction.item()),
        confidence=float(confidence.item()),
    )
