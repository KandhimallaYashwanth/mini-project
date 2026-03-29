import { BarChart2, Search, Shield, Upload, TrendingUp, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatCard } from '@/components/StatCard';
import { RiskBadge } from '@/components/RiskBadge';
import { mockDashboardStats, mockRecentScans } from '@/utils/mockData';

export default function Dashboard() {
  return (
    <div className="p-4 md:p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Welcome back, John. Here's your safety overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Scans"
          value={mockDashboardStats.totalScans.toLocaleString()}
          icon={<Search className="w-5 h-5 text-primary" />}
          trend="12% this month"
          trendUp
        />
        <StatCard
          title="Fake Jobs Detected"
          value={mockDashboardStats.fakeJobsDetected}
          icon={<AlertTriangle className="w-5 h-5 text-danger" />}
          colorClass="text-danger"
          trend="8% this month"
          trendUp={false}
        />
        <StatCard
          title="Safe Jobs"
          value={mockDashboardStats.safeJobs}
          icon={<Shield className="w-5 h-5 text-success" />}
          colorClass="text-success"
          trend="15% this month"
          trendUp
        />
        <StatCard
          title="Avg Risk Score"
          value={`${mockDashboardStats.avgRiskScore}%`}
          icon={<TrendingUp className="w-5 h-5 text-warning" />}
          colorClass="text-warning"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base font-semibold mb-3">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link to="/scan" className="group bg-card rounded-2xl border border-border p-5 shadow-card hover:shadow-card-hover transition-all flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold">Scan Job Posting</p>
              <p className="text-sm text-muted-foreground">Analyze any job listing for scam signals</p>
            </div>
          </Link>
          <Link to="/offer-letter" className="group bg-card rounded-2xl border border-border p-5 shadow-card hover:shadow-card-hover transition-all flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-success flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold">Upload Offer Letter</p>
              <p className="text-sm text-muted-foreground">Check if your offer letter is genuine</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Scans */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold">Recent Scans</h2>
          <Link to="/analytics" className="text-xs text-primary hover:underline flex items-center gap-1"><BarChart2 className="w-3 h-3" /> View Analytics</Link>
        </div>
        <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Job Title</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden sm:table-cell">Company</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Risk</th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockRecentScans.map(scan => (
                  <tr key={scan.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium">{scan.jobTitle}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{scan.company}</td>
                    <td className="px-4 py-3"><RiskBadge level={scan.riskLevel} /></td>
                    <td className="px-4 py-3 text-right font-semibold">{scan.riskScore}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
