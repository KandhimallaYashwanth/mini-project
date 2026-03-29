import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

const recommendations = [
  {
    level: 'red' as const,
    icon: AlertTriangle,
    title: 'Urgent Actions',
    items: ['Do NOT send any payment or fees upfront', 'Avoid sharing personal documents (ID, passport, bank info)', 'Do not click any links or attachments from this contact'],
  },
  {
    level: 'yellow' as const,
    icon: AlertCircle,
    title: 'Caution Advised',
    items: ['Verify the company domain via WHOIS lookup', 'Check LinkedIn for official company page', 'Search for the recruiter name + scam reports'],
  },
  {
    level: 'green' as const,
    icon: CheckCircle,
    title: 'Safe Practices',
    items: ['Cross-check the official company website', 'Report suspicious postings to job platforms', 'Use CareerShield AI for all future applications'],
  },
];

const styles = {
  red: {
    wrap: 'bg-danger-light border-danger/20',
    icon: 'bg-danger text-danger-foreground',
    title: 'text-danger',
    dot: 'bg-danger',
  },
  yellow: {
    wrap: 'bg-warning-light border-warning/20',
    icon: 'bg-warning text-warning-foreground',
    title: 'text-warning',
    dot: 'bg-warning',
  },
  green: {
    wrap: 'bg-success-light border-success/20',
    icon: 'bg-success text-success-foreground',
    title: 'text-success',
    dot: 'bg-success',
  },
};

export function RecommendationSection() {
  return (
    <div className="mb-5">
      <h2 className="font-bold text-base mb-3">Personalized Safety Recommendations</h2>
      <div className="space-y-3">
        {recommendations.map(({ level, icon: Icon, title, items }) => {
          const s = styles[level];
          return (
            <div key={level} className={`rounded-2xl border p-5 ${s.wrap}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${s.icon}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className={`font-semibold text-sm ${s.title}`}>{title}</h3>
              </div>
              <ul className="space-y-1.5">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${s.dot}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
