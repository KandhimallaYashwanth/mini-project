import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, CircleSlash, Clock3, HelpCircle, Loader2 } from 'lucide-react';
import { getHistory, type HistoryApiItem, type PredictionCode } from '@/lib/api';

function formatConfidence(confidence: number): string {
  const value = confidence <= 1 ? confidence * 100 : confidence;
  return `${value.toFixed(2)}%`;
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function shortenText(text: string, maxLength = 90): string {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength)}...`;
}

function ResultBadge({ prediction }: { prediction: PredictionCode }) {
  const variant = {
    1: {
      text: 'Fake Job',
      className: 'bg-danger-light text-danger',
      Icon: AlertTriangle,
    },
    0: {
      text: 'Real Job',
      className: 'bg-success-light text-success',
      Icon: CheckCircle2,
    },
    [-2]: {
      text: 'Uncertain',
      className: 'bg-yellow-100 text-yellow-700',
      Icon: HelpCircle,
    },
    [-1]: {
      text: 'Invalid Input',
      className: 'bg-slate-200 text-slate-700',
      Icon: CircleSlash,
    },
  } as const;

  const selected = variant[prediction];

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${selected.className}`}>
      <selected.Icon className="h-3.5 w-3.5" />
      {selected.text}
    </span>
  );
}

export default function History() {
  const [items, setItems] = useState<HistoryApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadHistory = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getHistory();
        if (isMounted) {
          setItems(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load prediction history.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadHistory();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="p-4 md:p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Prediction History</h1>
        <p className="text-muted-foreground text-sm mt-0.5">All previous AI scam detection results from MongoDB.</p>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between gap-2">
          <h2 className="font-semibold">Past Predictions</h2>
          <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
            <Clock3 className="h-3.5 w-3.5" />
            Latest first
          </span>
        </div>

        {loading ? (
          <div className="p-8 flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading history...
          </div>
        ) : error ? (
          <div className="m-4 rounded-xl border border-danger/20 bg-danger-light p-4">
            <p className="text-sm font-semibold text-danger">Could not fetch history</p>
            <p className="text-sm text-muted-foreground mt-1">{error}</p>
          </div>
        ) : items.length === 0 ? (
          <div className="p-8 text-sm text-muted-foreground">No predictions yet. Analyze a job to create your first record.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Text</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Result</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Confidence</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((item, index) => (
                  <tr key={`${item.timestamp}-${index}`} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 max-w-md">
                      <p className="truncate" title={item.text}>
                        {shortenText(item.text)}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <ResultBadge prediction={item.prediction} />
                    </td>
                    <td className="px-4 py-3 font-medium">{formatConfidence(item.confidence)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{formatDate(item.timestamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
