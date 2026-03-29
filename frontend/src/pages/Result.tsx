import { useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle, AlertCircle, ArrowLeft, Shield } from 'lucide-react';
import { RiskBadge } from '@/components/RiskBadge';
import { mockScanResult } from '@/utils/mockData';
import { cn } from '@/lib/utils';

const riskColor = {
  SAFE: 'text-success',
  SUSPICIOUS: 'text-warning',
  HIGH_RISK: 'text-danger',
};

const progressColor = {
  SAFE: 'bg-success',
  SUSPICIOUS: 'bg-warning',
  HIGH_RISK: 'bg-danger',
};

export default function Result() {
  const navigate = useNavigate();
  const result = mockScanResult;

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Header Card */}
      <div className={cn(
        'rounded-2xl p-6 mb-5 border',
        result.riskLevel === 'SAFE' ? 'bg-success-light border-success/20' :
        result.riskLevel === 'SUSPICIOUS' ? 'bg-warning-light border-warning/20' :
        'bg-danger-light border-danger/20'
      )}>
        <div className="flex items-start gap-4">
          <div className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
            result.riskLevel === 'SAFE' ? 'bg-success' : result.riskLevel === 'SUSPICIOUS' ? 'bg-warning' : 'bg-danger'
          )}>
            {result.riskLevel === 'SAFE' ? <CheckCircle className="w-6 h-6 text-white" /> :
             result.riskLevel === 'SUSPICIOUS' ? <AlertCircle className="w-6 h-6 text-white" /> :
             <AlertTriangle className="w-6 h-6 text-white" />}
          </div>
          <div className="flex-1 min-w-0">
            <RiskBadge level={result.riskLevel} className="mb-2" />
            <h1 className="font-bold text-lg">{result.jobTitle}</h1>
            <p className="text-sm text-muted-foreground">{result.company}</p>
          </div>
        </div>
      </div>

      {/* Risk Score */}
      <div className="bg-card rounded-2xl border border-border shadow-card p-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Risk Score</h2>
          <span className={cn('text-2xl font-bold', riskColor[result.riskLevel])}>{result.riskScore}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div
            className={cn('h-3 rounded-full transition-all duration-700', progressColor[result.riskLevel])}
            style={{ width: `${result.riskScore}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>0 - Safe</span>
          <span>50 - Medium</span>
          <span>100 - High Risk</span>
        </div>
      </div>

      {/* Red Flags */}
      {result.redFlags.length > 0 && (
        <div className="bg-card rounded-2xl border border-border shadow-card p-5 mb-5">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-danger" />
            Detected Red Flags ({result.redFlags.length})
          </h2>
          <ul className="space-y-2">
            {result.redFlags.map((flag, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="w-5 h-5 rounded-full bg-danger-light flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-danger">{i + 1}</span>
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendation */}
      <div className="bg-card rounded-2xl border border-border shadow-card p-5 mb-5">
        <h2 className="font-semibold mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          Recommendation
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{result.recommendation}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button onClick={() => navigate('/scan')} className="flex-1 gradient-hero text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity text-sm">
          Scan Another Job
        </button>
        <button onClick={() => navigate('/dashboard')} className="flex-1 bg-card border border-border text-foreground font-semibold py-3 rounded-xl hover:bg-muted transition-colors text-sm">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
