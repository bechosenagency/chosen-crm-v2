export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'nurturing' | 'hot' | 'cold' | 'lost';
export type LeadSource = 'website' | 'referral' | 'social' | 'email' | 'phone' | 'event' | 'partner';
export type LoanType = 'purchase' | 'refinance' | 'cash-out' | 'heloc' | 'reverse' | 'commercial';
export type ApplicationStage = 'lead' | 'pre-qual' | 'application' | 'processing' | 'underwriting' | 'approved' | 'funded';
export type CallOutcome = 'connected' | 'voicemail' | 'no-answer' | 'busy' | 'wrong-number' | 'do-not-call';

export interface LoanOfficer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  loanType: LoanType;
  creditScore?: number;
  leadScore: number;
  assignedTo?: LoanOfficer;
  lastContacted?: Date;
  nextFollowUp?: Date;
  applicationStage: ApplicationStage;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  notes?: string;
}

export interface DialerLead extends Lead {
  callNotes?: string;
  callOutcome?: CallOutcome;
  callDuration?: number;
}

export const leadStatuses: { value: LeadStatus; label: string; color: string }[] = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-800' },
  { value: 'contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'qualified', label: 'Qualified', color: 'bg-green-100 text-green-800' },
  { value: 'nurturing', label: 'Nurturing', color: 'bg-purple-100 text-purple-800' },
  { value: 'hot', label: 'Hot', color: 'bg-red-100 text-red-800' },
  { value: 'cold', label: 'Cold', color: 'bg-gray-100 text-gray-800' },
  { value: 'lost', label: 'Lost', color: 'bg-gray-100 text-gray-600' },
];

export const leadSources: { value: LeadSource; label: string }[] = [
  { value: 'website', label: 'Website' },
  { value: 'referral', label: 'Referral' },
  { value: 'social', label: 'Social Media' },
  { value: 'email', label: 'Email Campaign' },
  { value: 'phone', label: 'Phone Call' },
  { value: 'event', label: 'Event' },
  { value: 'partner', label: 'Partner' },
];

export const loanTypes: { value: LoanType; label: string }[] = [
  { value: 'purchase', label: 'Purchase' },
  { value: 'refinance', label: 'Refinance' },
  { value: 'cash-out', label: 'Cash-Out Refi' },
  { value: 'heloc', label: 'HELOC' },
  { value: 'reverse', label: 'Reverse' },
  { value: 'commercial', label: 'Commercial' },
];

export const applicationStages: { value: ApplicationStage; label: string }[] = [
  { value: 'lead', label: 'Lead' },
  { value: 'pre-qual', label: 'Pre-Qualification' },
  { value: 'application', label: 'Application' },
  { value: 'processing', label: 'Processing' },
  { value: 'underwriting', label: 'Underwriting' },
  { value: 'approved', label: 'Approved' },
  { value: 'funded', label: 'Funded' },
];

const firstNames = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

const mockLoanOfficers: LoanOfficer[] = [
  { id: '1', name: 'Sarah Chen', email: 'sarah.chen@chosencrm.com' },
  { id: '2', name: 'Michael Roberts', email: 'michael.roberts@chosencrm.com' },
  { id: '3', name: 'Jessica Taylor', email: 'jessica.taylor@chosencrm.com' },
  { id: '4', name: 'David Kim', email: 'david.kim@chosencrm.com' },
];

export function generateMockLeads(count: number = 50): Lead[] {
  const leads: Lead[] = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const createdDays = Math.floor(Math.random() * 90);
    const lastContactedDays = Math.floor(Math.random() * createdDays);
    const nextFollowUpDays = Math.floor(Math.random() * 14) - 7;
    
    leads.push({
      id: `lead-${i + 1}`,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      status: leadStatuses[Math.floor(Math.random() * leadStatuses.length)].value,
      source: leadSources[Math.floor(Math.random() * leadSources.length)].value,
      loanType: loanTypes[Math.floor(Math.random() * loanTypes.length)].value,
      creditScore: Math.random() > 0.2 ? Math.floor(Math.random() * 250) + 600 : undefined,
      leadScore: Math.floor(Math.random() * 100),
      assignedTo: Math.random() > 0.3 ? mockLoanOfficers[Math.floor(Math.random() * mockLoanOfficers.length)] : undefined,
      lastContacted: lastContactedDays > 0 ? new Date(Date.now() - lastContactedDays * 24 * 60 * 60 * 1000) : undefined,
      nextFollowUp: nextFollowUpDays !== 0 ? new Date(Date.now() + nextFollowUpDays * 24 * 60 * 60 * 1000) : undefined,
      applicationStage: applicationStages[Math.floor(Math.random() * applicationStages.length)].value,
      createdAt: new Date(Date.now() - createdDays * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000),
      tags: Math.random() > 0.5 ? ['high-value', 'urgent', 'vip'].slice(0, Math.floor(Math.random() * 3) + 1) : undefined,
    });
  }
  
  return leads;
}

export function calculateLeadScore(lead: Partial<Lead>): number {
  let score = 50;
  
  if (lead.creditScore && lead.creditScore >= 740) score += 20;
  else if (lead.creditScore && lead.creditScore >= 680) score += 10;
  
  if (lead.status === 'hot') score += 30;
  else if (lead.status === 'qualified') score += 20;
  else if (lead.status === 'contacted') score += 10;
  
  if (lead.source === 'referral') score += 15;
  else if (lead.source === 'website') score += 10;
  
  if (lead.loanType === 'purchase') score += 10;
  else if (lead.loanType === 'refinance') score += 5;
  
  return Math.min(100, Math.max(0, score));
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}