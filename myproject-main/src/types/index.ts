export type User = {
  uid: string;
  name: string;
  email: string;
  role: 'admin' | 'supervisor' | 'viewer';
  avatarUrl: string;
};

export type Certificate = {
  dept: string;
  validFrom: string;
  validTo: string;
  status: 'valid' | 'expiring_soon' | 'expired';
};

export type JobCard = {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'closed';
};

export type Branding = {
  contractId: string;
  exposureHoursRequired: number;
  exposureAchieved: number;
};

export type Trainset = {
  id: string;
  fleetNumber: string;
  status: 'service' | 'standby' | 'IBL';
  mileage: number;
  certificates: Certificate[];
  jobCards: JobCard[];
  branding: Branding | null;
  cleaningReady: boolean;
  bayPosition: string | null;
  lastUpdated: string;
  rank: number;
  score: number;
  reasons: {
    fitnessScore: number;
    brandingScore: number;
    mileageBalancing: number;
    otherFactors: string[];
  };
};

export type InductionDecision = {
  trainsetId: string;
  assigned: 'service' | 'standby' | 'IBL';
  score: number;
  reasons: object;
};

export type AuditEvent = {
  action: string;
  user: string;
  timestamp: string;
  details: string;
};

export type InductionRun = {
  runId: string;
  date: string;
  createdAt: string;
  createdBy: string;
  objectiveWeights: {
    availability: number;
    branding: number;
    cost: number;
  };
  decisions: InductionDecision[];
  auditTrail: AuditEvent[];
};
