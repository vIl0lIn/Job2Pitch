export interface JobInput {
  jobDescription: string;
  companyUrl?: string;
  notes?: string;
}

export interface CompanyProfile {
  name: string;
  industry: string;
  roleTitle: string;
  businessModel: string;
  targetAudience: string;
  valueProposition: string;
  productDescription: string;
  responsibilities: string[];
  requirements: string[];
}

export interface UXAudit {
  strengths: string[];
  opportunities: string[];
  heuristicFindings: string[];
  competitorInsights: string;
}

export interface UserSentiment {
  positives: string[];
  complaints: string[];
  requests: string[];
}

export interface Opportunity {
  id: string;
  title: string;
  evidence: string[];
  businessImpact: 'Low' | 'Medium' | 'High';
  confidenceScore: number;
  estimatedEffort: 'Low' | 'Medium' | 'High';
  whyItMatters: string;
}

export interface PitchSlide {
  slideNumber: number;
  title: string;
  content: string;
  bullets?: string[];
  hypothesis?: string;
  metrics?: string[];
}

export interface PitchDeck {
  slides: PitchSlide[];
  companyName: string;
  roleTitle: string;
  designerName: string;
}

export interface ResearchResult {
  company: CompanyProfile;
  audit: UXAudit;
  sentiment: UserSentiment;
  opportunities: Opportunity[];
}
