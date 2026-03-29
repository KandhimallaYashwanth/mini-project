import { Sidebar } from '@/components/Sidebar';
import { TopNav } from '@/components/TopNav';
import { BottomNav } from '@/components/BottomNav';
import { Outlet } from 'react-router-dom';

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto pb-20 md:pb-6">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
