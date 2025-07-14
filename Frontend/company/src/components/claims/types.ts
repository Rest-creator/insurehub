
export interface TimelineItem {
    date: string;
    event: string;
    complete: boolean;
  }
  
  export interface Claim {
    id: string;
    title: string;
    date: string;
    status: string;
    statusColor: string;
    statusBg: string;
    amount: string;
    policy: string;
    policyNumber: string;
    description: string;
    documents: number;
    messages: number;
    progress: number;
    nextStep: string;
    timeline: TimelineItem[];
  }
  
  export interface ActivityItem {
    id: string;
    message: string;
    time: string;
  }
  
  export interface NewClaimFormData {
    title: string;
    policyType: string;
    amount: string;
    description: string;
  }