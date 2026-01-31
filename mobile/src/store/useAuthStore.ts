import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  setUser: (user: User) => void;
  setHasCompletedOnboarding: (completed: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  hasCompletedOnboarding: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  setHasCompletedOnboarding: (completed) => set({ hasCompletedOnboarding: completed }),
  logout: () => set({ user: null, isAuthenticated: false, hasCompletedOnboarding: false }),
}));
