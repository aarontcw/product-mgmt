import { create } from 'zustand';

type AuthState = {
  token: string | null;
  role: 'ADMIN' | 'USER' | null;
  setAuth: (token: string, role: 'ADMIN' | 'USER') => void;
  clearAuth: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  role: (localStorage.getItem('role') as 'ADMIN' | 'USER') || null,
  setAuth: (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    set({ token, role });
  },
  clearAuth: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    set({ token: null, role: null });
  },
}));