import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle, AlertCircle, Download, Share2, Copy } from 'lucide-react';
import { ScanResult } from '@/types';
import { RiskBadge } from '@/components/RiskBadge';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { toast } from '@/hooks/use-toast';

interface ReportHeaderProps {
  result: ScanResult;
}

const riskGauge = {
  SAFE: { color: 'hsl(142 71% 45%)', label: 'Low Threat' },
  SUSPICIOUS: { color: 'hsl(38 92% 50%)', label: 'Moderate Threat' },
  HIGH_RISK: { color: 'hsl(0 84% 60%)', label: 'High Threat' },
};

export function ReportHeader({ result }: ReportHeaderProps) {
  const gauge = riskGauge[result.riskLevel];
  const gaugeData = [
    { value: result.riskScore, fill: gauge.color },
    { value: 100 - result.riskScore, fill: 'hsl(210 40% 93%)' },
  ];

  const summaryText =
    result.riskLevel === 'HIGH_RISK'
      ? 'This job posting shows high scam probability due to multiple red flag indicators.'
      : result.riskLevel === 'SUSPICIOUS'
      ? 'This posting shows moderate risk signals. Verify company details before proceeding.'
      : 'No significant scam indicators detected. This posting appears legitimate.';

  const handleCopy = () => {
    const summary = `CareerShield AI Report\n${result.jobTitle} @ ${result.company}\nRisk Level: ${result.riskLevel}\nRisk Score: ${result.riskScore}/100\n${summaryText}`;
    navigator.clipboard.writeText(summary);
    toast({ title: 'Risk summary copied to clipboard' });
  };

  return (
    <div className={cn(
      'rounded-2xl p-6 mb-5 border',
      result.riskLevel === 'SAFE' ? 'bg-success-light border-success/20' :
      result.riskLevel === 'SUSPICIOUS' ? 'bg-warning-light border-warning/20' :
      'bg-danger-light border-danger/20'
    )}>
      <div className="flex flex-col sm:flex-row gap-5">
        {/* Circular gauge */}
        <div className="flex-shrink-0 flex flex-col items-center gap-1">
          <div className="relative w-28 h-28">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={gaugeData} cx="50%" cy="50%" innerRadius={38} outerRadius={52} startAngle={90} endAngle={-270} dataKey="value" strokeWidth={0}>
                  {gaugeData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold" style={{ color: gauge.color }}>{result.riskScore}</span>
              <span className="text-[10px] text-muted-foreground font-medium">/100</span>
            </div>
          </div>
          <span className="text-xs font-semibold" style={{ color: gauge.color }}>{gauge.label}</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <RiskBadge level={result.riskLevel} className="mb-2" />
          <h1 className="font-bold text-xl leading-tight">{result.jobTitle}</h1>
          <p className="text-sm text-muted-foreground mb-3">{result.company}</p>
          <p className="text-sm leading-relaxed text-foreground/80 bg-background/60 rounded-xl px-3 py-2.5 border border-border/50">
            {summaryText}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-border/40">
        <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs font-medium bg-background/70 border border-border px-3 py-1.5 rounded-lg hover:bg-background transition-colors">
          <Copy className="w-3.5 h-3.5" /> Copy Summary
        </button>
        <button className="flex items-center gap-1.5 text-xs font-medium bg-background/70 border border-border px-3 py-1.5 rounded-lg hover:bg-background transition-colors">
          <Download className="w-3.5 h-3.5" /> Download Report
        </button>
        <button className="flex items-center gap-1.5 text-xs font-medium bg-background/70 border border-border px-3 py-1.5 rounded-lg hover:bg-background transition-colors">
          <Share2 className="w-3.5 h-3.5" /> Share
        </button>
      </div>
    </div>
  );
}
