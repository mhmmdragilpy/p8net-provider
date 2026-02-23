import { create } from 'zustand';

interface Package {
    id: string;
    name: string;
    speed_mbps: number;
    price: number;
    features: string[];
    created_at: string;
}

interface AppState {
    // Selected package for registration
    selectedPackage: Package | null;
    setSelectedPackage: (pkg: Package | null) => void;

    // Loading states
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
    selectedPackage: null,
    setSelectedPackage: (pkg) => set({ selectedPackage: pkg }),

    isLoading: false,
    setLoading: (isLoading) => set({ isLoading }),
}));
