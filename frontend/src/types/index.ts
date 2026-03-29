export type RiskLevel = 'SAFE' | 'SUSPICIOUS' | 'HIGH_RISK';

export interface ScanResult {
  id: string;
  jobTitle: string;
  company: string;
  riskLevel: RiskLevel;
  riskScore: number;
  redFlags: string[];
  recommendation: string;
  scannedAt: string;
}

export interface DashboardStats {
  totalScans: number;
  fakeJobsDetected: number;
  safeJobs: number;
  avgRiskScore: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface TrendDataPoint {
  date: string;
  scams: number;
  safe: number;
}
