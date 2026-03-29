export interface PredictApiResponse {
  prediction: 0 | 1;
  confidence: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export async function predictJobText(text: string): Promise<PredictApiResponse> {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const errorBody = (await response.json()) as { detail?: string };
      if (errorBody?.detail) {
        message = errorBody.detail;
      }
    } catch {
      // Keep default message if backend response isn't JSON.
    }

    throw new Error(message);
  }

  const data = (await response.json()) as PredictApiResponse;

  if ((data.prediction !== 0 && data.prediction !== 1) || typeof data.confidence !== "number") {
    throw new Error("Invalid response from prediction API.");
  }

  return data;
}