import { Bell, Shield, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function TopNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-card/80 backdrop-blur border-b border-border">
      <div className="flex items-center justify-between px-4 md:px-6 h-14">
        {/* Mobile logo */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="w-7 h-7 rounded-lg gradient-hero flex items-center justify-center">
            <Shield className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-sm">JobGuard AI</span>
        </div>

        <div className="hidden md:block" />

        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-xl hover:bg-muted transition-colors">
            <Bell className="w-4 h-4 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-danger rounded-full" />
          </button>

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-muted transition-colors"
            >
              <div className="w-7 h-7 rounded-full gradient-hero flex items-center justify-center text-white text-xs font-bold">
                JD
              </div>
              <span className="hidden sm:block text-sm font-medium">John Doe</span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            {open && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-card rounded-xl border border-border shadow-card-hover py-1 z-50">
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors">Profile</button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors">Settings</button>
                <hr className="my-1 border-border" />
                <Link to="/" className={cn("block px-4 py-2 text-sm text-danger hover:bg-muted transition-colors")}>Logout</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
