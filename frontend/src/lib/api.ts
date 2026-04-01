export type PredictionCode = -2 | -1 | 0 | 1;

export interface PredictApiResponse {
  prediction: PredictionCode;
  confidence: number;
  message: string;
}

export interface HistoryApiItem {
  text: string;
  prediction: PredictionCode;
  confidence: number;
  timestamp: string;
  message: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

function isValidPrediction(data: unknown): data is PredictApiResponse {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const candidate = data as Record<string, unknown>;
  return (
    (candidate.prediction === -2 || candidate.prediction === -1 || candidate.prediction === 0 || candidate.prediction === 1) &&
    typeof candidate.confidence === 'number' &&
    typeof candidate.message === 'string'
  );
}

function isValidHistoryItem(data: unknown): data is HistoryApiItem {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const candidate = data as Record<string, unknown>;
  return (
    typeof candidate.text === 'string' &&
    (candidate.prediction === -2 || candidate.prediction === -1 || candidate.prediction === 0 || candidate.prediction === 1) &&
    typeof candidate.confidence === 'number' &&
    typeof candidate.timestamp === 'string' &&
    typeof candidate.message === 'string'
  );
}

async function readErrorMessage(response: Response): Promise<string> {
  let message = `Request failed with status ${response.status}`;

  try {
    const errorBody = (await response.json()) as { detail?: string };
    if (errorBody?.detail) {
      message = errorBody.detail;
    }
  } catch {
    // Keep fallback message if response body is not JSON.
  }

  return message;
}

export async function predictJob(text: string): Promise<PredictApiResponse> {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  const data: unknown = await response.json();

  if (!isValidPrediction(data)) {
    throw new Error("Invalid response from prediction API.");
  }

  return data;
}

export async function getHistory(): Promise<HistoryApiItem[]> {
  const response = await fetch(`${API_BASE_URL}/history`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data) || !data.every(isValidHistoryItem)) {
    throw new Error("Invalid response from history API.");
  }

  return data;
}