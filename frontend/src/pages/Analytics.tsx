import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { mockTrendData, mockRiskDistribution, mockKeywordData, mockHighRiskIndustries } from '@/utils/mockData';
import { TrendingUp } from 'lucide-react';

const PIE_COLORS = ['hsl(142,71%,45%)', 'hsl(38,92%,50%)', 'hsl(0,84%,60%)'];

export default function Analytics() {
  return (
    <div className="p-4 md:p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Trends and insights from scam detection data.</p>
      </div>

      {/* Line Chart */}
      <div className="bg-card rounded-2xl border border-border shadow-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h2 className="font-semibold">Scam Detection Trend (2024)</h2>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={mockTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid hsl(214,32%,91%)' }} />
            <Legend />
            <Line type="monotone" dataKey="scams" stroke="hsl(0,84%,60%)" strokeWidth={2.5} dot={{ r: 4 }} name="Scams Detected" />
            <Line type="monotone" dataKey="safe" stroke="hsl(142,71%,45%)" strokeWidth={2.5} dot={{ r: 4 }} name="Safe Jobs" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Pie Chart */}
        <div className="bg-card rounded-2xl border border-border shadow-card p-5">
          <h2 className="font-semibold mb-4">Risk Distribution</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={mockRiskDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {mockRiskDistribution.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid hsl(214,32%,91%)' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-card rounded-2xl border border-border shadow-card p-5">
          <h2 className="font-semibold mb-4">Common Scam Keywords</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockKeywordData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={95} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid hsl(214,32%,91%)' }} />
              <Bar dataKey="value" fill="hsl(217,91%,50%)" radius={[0, 4, 4, 0]} name="Occurrences" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* High-risk Industries Table */}
      <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-semibold">High-Risk Industries</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b border-border">
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Industry</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Risk Rate</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden sm:table-cell">Total Scams</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockHighRiskIndustries.map(row => (
                <tr key={row.industry} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{row.industry}</td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-danger">{row.riskRate}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{row.totalScams}</td>
                  <td className="px-4 py-3">
                    <span className={
                      row.trend === 'up' ? 'text-danger text-xs font-medium' :
                      row.trend === 'down' ? 'text-success text-xs font-medium' :
                      'text-muted-foreground text-xs font-medium'
                    }>
                      {row.trend === 'up' ? '↑ Rising' : row.trend === 'down' ? '↓ Falling' : '→ Stable'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
