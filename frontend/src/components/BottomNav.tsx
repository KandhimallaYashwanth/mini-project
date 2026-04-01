import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Search, Upload, BarChart2, History } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Scan', icon: Search, to: '/scan' },
  { label: 'Upload', icon: Upload, to: '/offer-letter' },
  { label: 'Analytics', icon: BarChart2, to: '/analytics' },
  { label: 'History', icon: History, to: '/history' },
];

export function BottomNav() {
  const location = useLocation();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex">
        {navItems.map(({ label, icon: Icon, to }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                'flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors',
                active ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
