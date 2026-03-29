import { cn } from '@/lib/utils';
import { RiskLevel } from '@/types';

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
}

const riskConfig = {
  SAFE: { label: 'SAFE', className: 'bg-success-light text-success border-success/20' },
  SUSPICIOUS: { label: 'SUSPICIOUS', className: 'bg-warning-light text-warning border-warning/20' },
  HIGH_RISK: { label: 'HIGH RISK', className: 'bg-danger-light text-danger border-danger/20' },
};

export function RiskBadge({ level, className }: RiskBadgeProps) {
  const config = riskConfig[level];
  return (
    <span className={cn('inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border tracking-wide uppercase', config.className, className)}>
      {config.label}
    </span>
  );
}
