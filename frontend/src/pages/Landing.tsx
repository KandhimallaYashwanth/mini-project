import heroIllustration from '@/assets/hero-illustration.png';
import { Link } from 'react-router-dom';
import { Shield, Brain, BarChart2, CheckCircle, AlertTriangle, Search, ArrowRight, Github, Twitter } from 'lucide-react';

const features = [
  { icon: Brain, title: 'AI-Powered Detection', desc: 'Advanced machine learning models analyze job postings for over 50 scam indicators in real-time.' },
  { icon: Shield, title: 'Risk Score', desc: 'Get a clear 0-100 risk score with detailed breakdown of every suspicious element found.' },
  { icon: CheckCircle, title: 'Logo Verification', desc: 'Cross-reference company logos and branding to detect imposters using verified business databases.' },
  { icon: BarChart2, title: 'Trend Analytics', desc: 'Stay informed with live data on emerging scam patterns and high-risk industries near you.' },
];

const steps = [
  { step: '01', title: 'Paste Job Details', desc: 'Copy and paste the job posting URL or manually enter the job title, company, salary, and description.' },
  { step: '02', title: 'AI Analyzes Instantly', desc: 'Our AI engine scans the posting against thousands of known scam patterns and red flag indicators.' },
  { step: '03', title: 'Get Your Safety Report', desc: 'Receive a detailed safety report with risk score, red flags identified, and personalized recommendations.' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-base">CareerShield AI</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5">
              Sign In
            </Link>
            <Link to="/signup" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:opacity-90 transition-opacity">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary-light text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              AI-Powered Protection
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Detect Fake Jobs{' '}
              <span className="text-gradient">Before They</span>{' '}
              Scam You
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              JobGuard AI analyzes job postings in seconds using advanced AI to detect scams, verify companies, and protect your career and personal information.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/scan"
                className="inline-flex items-center justify-center gap-2 gradient-hero text-white font-semibold px-6 py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg"
              >
                <Search className="w-4 h-4" />
                Check Job Now
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 bg-card border border-border text-foreground font-semibold px-6 py-3.5 rounded-xl hover:bg-muted transition-colors"
              >
                Create Free Account
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-8 pt-8 border-t border-border">
              {[['1.2K+', 'Scams Detected'], ['98%', 'Accuracy Rate'], ['Free', 'To Start']].map(([val, label]) => (
                <div key={label}>
                  <p className="text-xl font-bold text-foreground">{val}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block animate-fade-in">
            <img src={heroIllustration} alt="AI job scam detection illustration" className="w-full rounded-3xl shadow-card-hover" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">Everything You Need to Stay Safe</h2>
            <p className="text-muted-foreground max-w-md mx-auto">Comprehensive protection powered by the latest AI technology.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-card-hover transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-3">How It Works</h2>
          <p className="text-muted-foreground">Three simple steps to protect yourself from job scams.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map(({ step, title, desc }) => (
            <div key={step} className="relative text-center">
              <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-5 shadow-lg">
                <span className="text-white font-bold text-lg">{step}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mx-4 sm:mx-6 lg:mx-auto max-w-6xl mb-20">
        <div className="gradient-hero rounded-3xl p-10 text-center text-white">
          <AlertTriangle className="w-10 h-10 mx-auto mb-4 opacity-90" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Don't Become the Next Victim</h2>
          <p className="opacity-90 mb-6 max-w-md mx-auto">Join thousands of job seekers who use JobGuard AI to safely navigate the job market.</p>
          <Link to="/signup" className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
            Start For Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md gradient-hero flex items-center justify-center">
              <Shield className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold">JobGuard AI</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2024 JobGuard AI. Protecting careers worldwide.</p>
          <div className="flex items-center gap-3">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Github className="w-4 h-4" /></a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Twitter className="w-4 h-4" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
