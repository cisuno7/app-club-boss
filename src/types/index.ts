// Tipos globais para o aplicativo Boss Connection Platform

export type UserRole = 'client' | 'company' | 'admin' | 'select';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface Ad {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  description: string;
  imageUrl: string;
  bannerUrl?: string;
  couponCode?: string;
  discount?: number;
  status: 'active' | 'expired' | 'pending';
  views: number;
  clicks: number;
  couponsRedeemed: number;
  createdAt: string;
  expiresAt?: string;
}

export interface Coupon {
  id: string;
  adId: string;
  userId: string;
  code: string;
  discount: number;
  status: 'active' | 'used' | 'expired';
  redeemedAt?: string;
  expiresAt: string;
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  email: string;
  logo?: string;
  description?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
