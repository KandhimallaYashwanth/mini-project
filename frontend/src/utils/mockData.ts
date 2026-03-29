import { DashboardStats, ScanResult, TrendDataPoint, ChartDataPoint } from '@/types';

export const mockDashboardStats: DashboardStats = {
  totalScans: 1248,
  fakeJobsDetected: 347,
  safeJobs: 901,
  avgRiskScore: 28,
};

export const mockRecentScans: ScanResult[] = [
  {
    id: '1',
    jobTitle: 'Senior React Developer',
    company: 'TechCorp Inc.',
    riskLevel: 'SAFE',
    riskScore: 12,
    redFlags: [],
    recommendation: 'This job posting appears legitimate. Proceed with confidence.',
    scannedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    jobTitle: 'Remote Data Entry Specialist',
    company: 'QuickCash Solutions',
    riskLevel: 'HIGH_RISK',
    riskScore: 89,
    redFlags: [
      'Unrealistic salary for role ($8,000/week)',
      'No company address or physical presence',
      'Requests personal banking information upfront',
      'Poor grammar and spelling throughout',
      'Gmail/Yahoo domain instead of company email',
    ],
    recommendation: 'DO NOT apply. Multiple high-risk indicators detected. This is likely a job scam.',
    scannedAt: '2024-01-14T15:45:00Z',
  },
  {
    id: '3',
    jobTitle: 'Marketing Manager',
    company: 'GrowthBrand Agency',
    riskLevel: 'SUSPICIOUS',
    riskScore: 54,
    redFlags: [
      'Vague job requirements',
      'Salary range unusually high for market',
      'No interview process mentioned',
    ],
    recommendation: 'Proceed with caution. Research the company thoroughly before providing any personal information.',
    scannedAt: '2024-01-13T09:00:00Z',
  },
];

export const mockScanResult: ScanResult = {
  id: 'demo-1',
  jobTitle: 'Work From Home Data Entry',
  company: 'FastMoney Corp',
  riskLevel: 'HIGH_RISK',
  riskScore: 87,
  redFlags: [
    'Salary too good to be true ($500/day for entry-level)',
    'No official company website found',
    'Requires upfront payment for training materials',
    'Contact via personal email (gmail.com)',
    'Generic job description with no specifics',
    'Urgent hiring pressure tactics',
  ],
  recommendation: 'High probability of fraud. This posting contains 6 major red flags associated with job scams. Do not share personal information or make any payments.',
  scannedAt: new Date().toISOString(),
};

export const mockTrendData: TrendDataPoint[] = [
  { date: 'Jul', scams: 45, safe: 120 },
  { date: 'Aug', scams: 62, safe: 145 },
  { date: 'Sep', scams: 78, safe: 160 },
  { date: 'Oct', scams: 91, safe: 180 },
  { date: 'Nov', scams: 105, safe: 195 },
  { date: 'Dec', scams: 87, safe: 210 },
  { date: 'Jan', scams: 113, safe: 230 },
];

export const mockRiskDistribution: ChartDataPoint[] = [
  { name: 'Safe', value: 72 },
  { name: 'Suspicious', value: 18 },
  { name: 'High Risk', value: 10 },
];

export const mockKeywordData: ChartDataPoint[] = [
  { name: 'Work from Home', value: 89 },
  { name: 'Urgent Hiring', value: 76 },
  { name: 'No Experience', value: 68 },
  { name: 'High Salary', value: 61 },
  { name: 'Upfront Payment', value: 54 },
  { name: 'Western Union', value: 47 },
];

export const mockHighRiskIndustries = [
  { industry: 'Data Entry', riskRate: '78%', totalScams: 142, trend: 'up' },
  { industry: 'Crypto/Finance', riskRate: '71%', totalScams: 98, trend: 'up' },
  { industry: 'Modeling/Acting', riskRate: '65%', totalScams: 76, trend: 'stable' },
  { industry: 'Customer Service', riskRate: '42%', totalScams: 54, trend: 'down' },
  { industry: 'IT/Tech Support', riskRate: '38%', totalScams: 49, trend: 'up' },
  { industry: 'Healthcare', riskRate: '22%', totalScams: 31, trend: 'stable' },
];
