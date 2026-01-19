import { create } from 'zustand';
import { User, UserRole, AuthState } from '@/types';

interface AuthStore extends AuthState {
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  switchUserRole: (role: UserRole) => void;
}

// Mock de usuários para teste
const mockUsers: Record<UserRole, User> = {
  client: {
    id: '1',
    name: 'João Cliente',
    email: 'cliente@example.com',
    role: 'client',
    createdAt: new Date().toISOString(),
  },
  company: {
    id: '2',
    name: 'Empresa XYZ',
    email: 'empresa@example.com',
    role: 'company',
    createdAt: new Date().toISOString(),
  },
  admin: {
    id: '3',
    name: 'Admin Sistema',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  select: {
    id: '4',
    name: 'Cliente Select Premium',
    email: 'select@example.com',
    role: 'select',
    createdAt: new Date().toISOString(),
  },
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string, role?: UserRole) => {
    set({ isLoading: true });
    
    // Simula delay de API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Se role foi especificado, usa ele; senão tenta detectar pelo email
    let userRole: UserRole = role || 'client';
    
    if (!role) {
      if (email.includes('admin')) userRole = 'admin';
      else if (email.includes('empresa') || email.includes('company')) userRole = 'company';
      else if (email.includes('select')) userRole = 'select';
      else userRole = 'client';
    }

    const user = mockUsers[userRole];

    set({
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  switchUserRole: (role: UserRole) => {
    const user = mockUsers[role];
    set({ user });
  },
}));
