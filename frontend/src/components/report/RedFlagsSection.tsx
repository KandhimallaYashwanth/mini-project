import { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { mockRedFlagDetails } from '@/utils/mockData';
import { cn } from '@/lib/utils';

export function RedFlagsSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-5 mb-5">
      <h2 className="font-bold text-base mb-1 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-danger" />
        Why This Was Flagged
      </h2>
      <p className="text-xs text-muted-foreground mb-4">Expandable AI explanation for each red flag</p>
      <div className="space-y-2">
        {mockRedFlagDetails.map((item, i) => (
          <div key={i} className={cn('rounded-xl border transition-all', open === i ? 'border-danger/30 bg-danger-light' : 'border-border bg-background')}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-start gap-3 p-4 text-left"
            >
              <span className={cn(
                'flex-shrink-0 text-xs font-bold w-7 h-7 rounded-lg flex items-center justify-center mt-0.5',
                item.riskWeight >= 85 ? 'bg-danger text-danger-foreground' :
                item.riskWeight >= 65 ? 'bg-warning text-warning-foreground' :
                'bg-primary text-primary-foreground'
              )}>
                {item.riskWeight}
              </span>
              <span className="flex-1 text-sm font-medium leading-snug">{item.flag}</span>
              {open === i ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
            </button>
            {open === i && (
              <div className="px-4 pb-4 space-y-2">
                <p className="text-sm text-foreground/80">{item.explanation}</p>
                <div className="bg-background/70 rounded-lg p-3 border border-border/50">
                  <p className="text-xs text-muted-foreground font-medium mb-1">AI Reasoning</p>
                  <p className="text-xs text-foreground/70">{item.reasoning}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
