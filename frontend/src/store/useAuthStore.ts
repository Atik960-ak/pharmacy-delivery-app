import { create } from 'zustand';

export interface User {
  id: string;
  name?: string;
  email?: string;
  phone: string;
  role: 'customer' | 'driver' | 'pharmacy_owner';
}

interface AuthState {
  isAuthenticated: boolean; // Tells if the user has passed the OTP check
  user: User | null;
  login: (phone: string) => Promise<boolean>;
  verifyOtp: (phone: string, otp: string) => Promise<boolean>;
  updateProfile: (name: string, email: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  
  login: async (phone: string) => {
    console.log(`[MOCK] Sending OTP to ${phone}`);
    // Delay to simulate network request
    await new Promise((resolve) => setTimeout(resolve, 800));
    return true; // Successfully sent
  },
  
  verifyOtp: async (phone: string, otp: string) => {
    console.log(`[MOCK] Verifying OTP ${otp} for ${phone}`);
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Accept '123456' as the correct OTP for any number
    if (otp === '123456') {
      const mockUser: User = { id: 'user_' + Date.now(), phone, role: 'customer' };
      set({ isAuthenticated: true, user: mockUser });
      return true;
    }
    return false;
  },
  
  updateProfile: async (name: string, email: string) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    set((state) => ({
      user: state.user ? { ...state.user, name, email } : null,
    }));
    return true;
  },
  
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
}));
