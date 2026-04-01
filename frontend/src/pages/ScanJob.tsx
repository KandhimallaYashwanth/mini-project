import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { predictJob, type PredictApiResponse } from '@/lib/api';
import PredictionResultCard from '@/components/PredictionResultCard';

export default function ScanJob() {
  const [loading, setLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [salaryOffered, setSalaryOffered] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [applyLink, setApplyLink] = useState('');
  const [result, setResult] = useState<PredictApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    setError(null);
    setLoading(true);

    try {
      const text = [
        `Job Title: ${jobTitle}`,
        `Company Name: ${companyName}`,
        `Salary Offered: ${salaryOffered}`,
        `Job Description: ${jobDescription}`,
        `Contact Email: ${contactEmail}`,
        applyLink ? `Apply Link: ${applyLink}` : '',
      ]
        .filter(Boolean)
        .join('\n');

      const prediction = await predictJob(text);
      setResult(prediction);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze job posting.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Scan Job Posting</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Enter job details to analyze for scam indicators.</p>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-card p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Job Title <span className="text-danger">*</span></label>
              <input
                required
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
                placeholder="e.g. Software Engineer"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Company Name <span className="text-danger">*</span></label>
              <input
                required
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="e.g. Acme Corporation"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Salary Offered <span className="text-danger">*</span></label>
            <input
              required
              value={salaryOffered}
              onChange={e => setSalaryOffered(e.target.value)}
              placeholder="e.g. $5,000/month or $500/week"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Job Description <span className="text-danger">*</span></label>
            <textarea
              required
              rows={5}
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Contact Email <span className="text-danger">*</span></label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                placeholder="recruiter@company.com"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Apply Link <span className="text-muted-foreground font-normal">(optional)</span></label>
              <input
                type="url"
                value={applyLink}
                onChange={e => setApplyLink(e.target.value)}
                placeholder="https://company.com/apply"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-hero text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Analyze Job
              </>
            )}
          </button>
        </form>
      </div>

      {loading && (
        <div className="mt-4 bg-primary-light rounded-2xl p-4 flex items-center gap-3 animate-fade-in">
          <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center flex-shrink-0 animate-pulse-ring">
            <Search className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-primary">AI is analyzing the job posting...</p>
            <p className="text-xs text-muted-foreground">Checking against 50+ scam indicators</p>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-2xl border border-danger/20 bg-danger-light p-4 animate-fade-in">
          <p className="text-sm font-semibold text-danger">Prediction failed</p>
          <p className="text-sm text-muted-foreground mt-1">{error}</p>
        </div>
      )}

      {result && !loading && <PredictionResultCard result={result} />}
    </div>
  );
}
