
export type UserRole = 'admin' | 'user' | 'provider';
export type UserStatus = 'active' | 'inactive' | 'pending';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export interface NewUser {
  name: string;
  email: string;
  role: UserRole;
  password: string;
}

export interface InsuranceClaim {
  id: string;
  userId: string;
  userName: string;
  claimType: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-review';
  amount: number;
  dateSubmitted: string;
  description: string;
}

export interface InsuranceApplication {
  id: string;
  userId: string;
  userName: string;
  applicationType: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-review';
  dateSubmitted: string;
  coverage: number;
}
