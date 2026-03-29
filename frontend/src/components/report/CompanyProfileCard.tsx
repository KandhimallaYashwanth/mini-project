import { Globe, Linkedin, Building2, MapPin, ShieldCheck, ShieldX, Clock } from 'lucide-react';
import { mockCompanyProfile } from '@/utils/mockData';
import { cn } from '@/lib/utils';

function TrustMeter({ score }: { score: number }) {
  const color = score >= 70 ? 'bg-success' : score >= 40 ? 'bg-warning' : 'bg-danger';
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-muted-foreground">Company Authenticity Meter</span>
        <span className={cn('text-xs font-bold', score >= 70 ? 'text-success' : score >= 40 ? 'text-warning' : 'text-danger')}>{score}/100</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
        <div className={cn('h-2.5 rounded-full transition-all duration-700', color)} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

export function CompanyProfileCard() {
  const c = mockCompanyProfile;
  const rows = [
    { icon: Globe, label: 'Website', value: c.website },
    { icon: Clock, label: 'Domain Age', value: c.domainAge, highlight: true },
    { icon: Linkedin, label: 'LinkedIn Presence', value: c.linkedInPresence ? 'Found' : 'Not Found', negative: !c.linkedInPresence },
    { icon: Building2, label: 'Registered Business', value: c.registeredBusiness ? 'Verified' : 'Not Verified', negative: !c.registeredBusiness },
    { icon: ShieldCheck, label: 'Logo Verification', value: c.logoVerified ? 'Matched' : 'No Match', negative: !c.logoVerified },
    { icon: MapPin, label: 'Location', value: c.location },
  ];

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-5 mb-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="font-bold text-base">{c.name}</h2>
          <p className="text-xs text-muted-foreground">{c.industry}</p>
        </div>
        <div className="flex items-center gap-1.5 bg-danger/10 border border-danger/20 text-danger text-xs font-semibold px-2.5 py-1 rounded-full">
          <ShieldX className="w-3 h-3" /> Unverified
        </div>
      </div>

      <TrustMeter score={c.trustScore} />

      <div className="mt-4 space-y-2.5">
        {rows.map(({ icon: Icon, label, value, negative, highlight }) => (
          <div key={label} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </div>
            <span className={cn('font-medium text-xs',
              negative ? 'text-danger' :
              highlight ? 'text-warning' :
              'text-foreground'
            )}>{value}</span>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-muted-foreground mt-4 pt-3 border-t border-border">
        ⚠ Company data simulated for demo purposes.
      </p>
    </div>
  );
}
