import { FileText, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { mockOfferLetterAnalysis } from '@/utils/mockData';
import { cn } from '@/lib/utils';

function ScoreBar({ score, label }: { score: number; label: string }) {
  const color = score >= 70 ? 'bg-danger' : score >= 40 ? 'bg-warning' : 'bg-success';
  const textColor = score >= 70 ? 'text-danger' : score >= 40 ? 'text-warning' : 'text-success';
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className={cn('text-xs font-bold', textColor)}>{score}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div className={cn('h-2 rounded-full transition-all duration-700', color)} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

export function OfferLetterAnalysisSection() {
  const a = mockOfferLetterAnalysis;
  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-5 mb-5">
      <h2 className="font-bold text-base mb-1 flex items-center gap-2">
        <FileText className="w-4 h-4 text-primary" />
        Offer Letter Analysis
      </h2>
      <p className="text-xs text-muted-foreground mb-4">AI document authenticity analysis</p>
      <div className="space-y-4">
        <ScoreBar score={a.formattingAnomalyScore} label="Formatting Anomaly Score" />
        <ScoreBar score={a.grammarIrregularityScore} label="Grammar Irregularity Score" />
        <ScoreBar score={100 - a.logoMatchConfidence} label="Logo Mismatch Risk" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className={cn('rounded-xl border p-3 flex items-center gap-2', a.paymentClauseDetected ? 'bg-danger-light border-danger/20' : 'bg-success-light border-success/20')}>
          {a.paymentClauseDetected ? <AlertTriangle className="w-4 h-4 text-danger flex-shrink-0" /> : <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />}
          <div>
            <p className="text-xs font-semibold">Payment Clause</p>
            <p className={cn('text-xs', a.paymentClauseDetected ? 'text-danger' : 'text-success')}>
              {a.paymentClauseDetected ? 'Detected' : 'Not Found'}
            </p>
          </div>
        </div>
        <div className="rounded-xl border bg-danger-light border-danger/20 p-3 flex items-center gap-2">
          <XCircle className="w-4 h-4 text-danger flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold">Signature</p>
            <p className="text-xs text-danger">{a.signatureAuthenticity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
