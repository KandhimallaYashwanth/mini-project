import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  colorClass?: string;
  className?: string;
}

export function StatCard({ title, value, icon, trend, trendUp, colorClass = 'text-primary', className }: StatCardProps) {
  return (
    <div className={cn('bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-card-hover transition-shadow duration-200 animate-fade-in', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className={cn('text-3xl font-bold mt-1', colorClass)}>{value}</p>
          {trend && (
            <p className={cn('text-xs mt-2 font-medium', trendUp ? 'text-success' : 'text-danger')}>
              {trendUp ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
        <div className={cn('p-3 rounded-xl', colorClass === 'text-primary' ? 'bg-primary-light' : colorClass === 'text-danger' ? 'bg-danger-light' : colorClass === 'text-success' ? 'bg-success-light' : 'bg-warning-light')}>
          {icon}
        </div>
      </div>
    </div>
  );
}
