import { AlertTriangle } from 'lucide-react';
import { mockSimilarScams } from '@/utils/mockData';

export function SimilarScamsSection() {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-5 mb-5">
      <h2 className="font-bold text-base mb-1 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-warning" />
        Similar Scam Patterns Identified
      </h2>
      <p className="text-xs text-muted-foreground mb-4">Matching templates from scam pattern database</p>
      <div className="space-y-3">
        {mockSimilarScams.map((scam, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl border border-border">
            <div className="w-9 h-9 rounded-xl bg-warning/10 border border-warning/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-warning">{scam.similarity}%</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-tight truncate">{scam.title}</p>
              <p className="text-xs text-muted-foreground">{scam.company}</p>
            </div>
            <span className="text-[11px] font-semibold bg-danger/10 text-danger border border-danger/20 px-2 py-0.5 rounded-full flex-shrink-0">
              {scam.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
