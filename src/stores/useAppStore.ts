import { create } from 'zustand';
import { Package, Lead } from '@/lib/supabase';

interface AppState {
    // Selected package for registration
    selectedPackage: Package | null;
    setSelectedPackage: (pkg: Package | null) => void;

    // Leads for admin dashboard
    leads: Lead[];
    setLeads: (leads: Lead[]) => void;

    // Loading states
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
    selectedPackage: null,
    setSelectedPackage: (pkg) => set({ selectedPackage: pkg }),

    leads: [],
    setLeads: (leads) => set({ leads }),

    isLoading: false,
    setLoading: (isLoading) => set({ isLoading }),
}));
