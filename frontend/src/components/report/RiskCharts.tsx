import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import { mockRiskBreakdown, mockRedFlagSeverity, mockSuspiciousKeywords } from '@/utils/mockData';

const SEVERITY_COLORS = ['hsl(0 84% 60%)', 'hsl(38 92% 50%)', 'hsl(217 91% 50%)', 'hsl(142 71% 45%)'];

function weightToColor(w: number) {
  if (w >= 85) return 'bg-danger text-danger-foreground';
  if (w >= 65) return 'bg-warning text-warning-foreground';
  return 'bg-primary/70 text-primary-foreground';
}

export function RiskCharts() {
  return (
    <div className="space-y-5 mb-5">
      <h2 className="font-bold text-base">Risk Breakdown Visualizations</h2>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Donut chart */}
        <div className="bg-card rounded-2xl border border-border shadow-card p-5">
          <h3 className="font-semibold text-sm mb-1">Risk Distribution</h3>
          <p className="text-xs text-muted-foreground mb-4">By threat category</p>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={mockRiskBreakdown} cx="50%" cy="50%" innerRadius={48} outerRadius={72} dataKey="value" strokeWidth={2} stroke="hsl(var(--card))">
                  {mockRiskBreakdown.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {mockRiskBreakdown.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: d.fill }} />
                <span className="text-muted-foreground">{d.name}</span>
                <span className="font-semibold">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar chart */}
        <div className="bg-card rounded-2xl border border-border shadow-card p-5">
          <h3 className="font-semibold text-sm mb-1">Red Flag Severity</h3>
          <p className="text-xs text-muted-foreground mb-4">AI-assigned severity scores (0–100)</p>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockRedFlagSeverity} layout="vertical" margin={{ left: 0, right: 8 }}>
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: 'hsl(215 16% 47%)' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: 'hsl(215 16% 47%)' }} axisLine={false} tickLine={false} width={110} />
                <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="severity" radius={[0, 6, 6, 0]}>
                  {mockRedFlagSeverity.map((entry, i) => (
                    <Cell key={i} fill={entry.severity >= 80 ? 'hsl(0 84% 60%)' : entry.severity >= 60 ? 'hsl(38 92% 50%)' : 'hsl(217 91% 50%)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Keyword heatmap */}
      <div className="bg-card rounded-2xl border border-border shadow-card p-5">
        <h3 className="font-semibold text-sm mb-1">Suspicious Keyword Heatmap</h3>
        <p className="text-xs text-muted-foreground mb-4">Words flagged in job description · color intensity = risk weight</p>
        <div className="flex flex-wrap gap-2">
          {mockSuspiciousKeywords.map(({ word, weight }) => (
            <span key={word} className={`text-xs font-semibold px-3 py-1.5 rounded-full ${weightToColor(weight)}`}>
              {word}
              <span className="ml-1.5 opacity-70 text-[10px]">{weight}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
