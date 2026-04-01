import { AlertTriangle, CheckCircle2, CircleSlash, HelpCircle } from 'lucide-react';
import type { PredictApiResponse } from '@/lib/api';

interface PredictionResultCardProps {
  result: PredictApiResponse;
}

export default function PredictionResultCard({ result }: PredictionResultCardProps) {
  const confidencePercent = (result.confidence <= 1 ? result.confidence * 100 : result.confidence).toFixed(2);

  const stateMap = {
    1: {
      label: 'Fake Job',
      container: 'border-danger/30 bg-danger-light',
      iconBg: 'bg-danger/15',
      textColor: 'text-danger',
      Icon: AlertTriangle,
    },
    0: {
      label: 'Real Job',
      container: 'border-success/30 bg-success-light',
      iconBg: 'bg-success/15',
      textColor: 'text-success',
      Icon: CheckCircle2,
    },
    [-2]: {
      label: 'Uncertain',
      container: 'border-yellow-300/60 bg-yellow-50',
      iconBg: 'bg-yellow-100',
      textColor: 'text-yellow-700',
      Icon: HelpCircle,
    },
    [-1]: {
      label: 'Invalid Input',
      container: 'border-slate-300 bg-slate-100',
      iconBg: 'bg-slate-200',
      textColor: 'text-slate-700',
      Icon: CircleSlash,
    },
  } as const;

  const state = stateMap[result.prediction];
  const showConfidence = result.prediction !== -1;

  return (
    <div className={`mt-4 rounded-2xl border p-5 animate-fade-in ${state.container}`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${state.iconBg}`}>
          <state.Icon className={`w-5 h-5 ${state.textColor}`} />
        </div>

        <div className="flex-1">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Detection Result</p>
          <h2 className={`text-xl font-bold ${state.textColor}`}>{state.label}</h2>
          <p className="text-sm text-muted-foreground mt-1">{result.message}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Confidence: {showConfidence ? `${confidencePercent}%` : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
}
