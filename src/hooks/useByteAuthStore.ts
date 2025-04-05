import { create } from 'zustand';

interface ByteAuthState {
  sid: string;
  isAuthenticated: boolean;
  user: any | null;
  setSid: (sid: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: any) => void;
  reset: () => void;
}

export const useByteAuthStore = create<ByteAuthState>((set) => ({
  sid: '',
  isAuthenticated: false,
  user: null,
  setSid: (sid) => set({ sid }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setUser: (user) => set({ user }),
  reset: () => set({ sid: '', isAuthenticated: false, user: null }),
}));