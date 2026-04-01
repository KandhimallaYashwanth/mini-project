import { useEffect, useMemo, useState } from 'react';
import { BarChart2, Search, Shield, Upload, TrendingUp, AlertTriangle, Loader2, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatCard } from '@/components/StatCard';
import { getHistory, type HistoryApiItem } from '@/lib/api';

function toPercent(confidence: number): number {
  return confidence <= 1 ? confidence * 100 : confidence;
}

function formatPercent(confidence: number): string {
  return `${toPercent(confidence).toFixed(2)}%`;
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function shortenText(text: string, maxLength = 60): string {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength)}...`;
}

function getPredictionBadge(prediction: number) {
  if (prediction === 1) {
    return {
      label: 'Fake Job',
      className: 'bg-danger-light text-danger',
      Icon: AlertTriangle,
    };
  }

  if (prediction === 0) {
    return {
      label: 'Real Job',
      className: 'bg-success-light text-success',
      Icon: CheckCircle2,
    };
  }

  return {
    label: 'Uncertain',
    className: 'bg-yellow-100 text-yellow-700',
    Icon: HelpCircle,
  };
}

export default function Dashboard() {
  const [items, setItems] = useState<HistoryApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadHistory = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getHistory();
        if (isMounted) {
          setItems(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load dashboard data.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadHistory();

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = useMemo(() => {
    const totalScans = items.length;
    const fakeJobsDetected = items.filter((item) => item.prediction === 1).length;
    const safeJobs = items.filter((item) => item.prediction === 0).length;
    const avgRiskScore =
      totalScans === 0
        ? 0
        : items.reduce((acc, item) => acc + toPercent(item.confidence), 0) / totalScans;

    return {
      totalScans,
      fakeJobsDetected,
      safeJobs,
      avgRiskScore,
    };
  }, [items]);

  const recentScans = useMemo(() => {
    return [...items]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 8);
  }, [items]);

  return (
    <div className="p-4 md:p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Live safety overview based on your MongoDB prediction history.</p>
      </div>

      {error ? (
        <div className="rounded-xl border border-danger/20 bg-danger-light p-4">
          <p className="text-sm font-semibold text-danger">Could not fetch dashboard data</p>
          <p className="text-sm text-muted-foreground mt-1">{error}</p>
        </div>
      ) : null}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Scans"
          value={loading ? '...' : stats.totalScans.toLocaleString()}
          icon={<Search className="w-5 h-5 text-primary" />}
          trend={loading ? 'Loading history' : 'From prediction history'}
          trendUp={!loading}
        />
        <StatCard
          title="Fake Jobs Detected"
          value={loading ? '...' : stats.fakeJobsDetected}
          icon={<AlertTriangle className="w-5 h-5 text-danger" />}
          colorClass="text-danger"
          trend={loading ? 'Loading history' : 'prediction = 1'}
          trendUp={false}
        />
        <StatCard
          title="Real Jobs"
          value={loading ? '...' : stats.safeJobs}
          icon={<Shield className="w-5 h-5 text-success" />}
          colorClass="text-success"
          trend={loading ? 'Loading history' : 'prediction = 0'}
          trendUp
        />
        <StatCard
          title="Avg Confidence"
          value={loading ? '...' : `${stats.avgRiskScore.toFixed(2)}%`}
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
          {loading ? (
            <div className="p-8 flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading dashboard data...
            </div>
          ) : recentScans.length === 0 ? (
            <div className="p-8 text-sm text-muted-foreground">No scans available yet. Start by analyzing a job posting.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-4 py-3 text-muted-foreground font-medium">Text</th>
                    <th className="text-left px-4 py-3 text-muted-foreground font-medium">Result</th>
                    <th className="text-right px-4 py-3 text-muted-foreground font-medium">Confidence</th>
                    <th className="text-right px-4 py-3 text-muted-foreground font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentScans.map((scan, index) => {
                    const badge = getPredictionBadge(scan.prediction);
                    return (
                      <tr key={`${scan.timestamp}-${index}`} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium max-w-lg">
                          <p className="truncate" title={scan.text}>{shortenText(scan.text)}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${badge.className}`}>
                            <badge.Icon className="h-3.5 w-3.5" />
                            {badge.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-semibold">{formatPercent(scan.confidence)}</td>
                        <td className="px-4 py-3 text-right text-muted-foreground">{formatDate(scan.timestamp)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
