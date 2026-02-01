import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Package {
    id: string;
    name: string;
    speed_mbps: number;
    price: number;
    features: string[];
    is_popular?: boolean;
    created_at: string;
}

export interface Lead {
    id: string;
    full_name: string;
    whatsapp: string;
    address: string;
    latitude: number | null;
    longitude: number | null;
    package_id: string;
    status: 'new_lead' | 'surveying' | 'installed';
    created_at: string;
}

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
    return supabaseUrl && supabaseAnonKey && supabaseUrl !== '' && supabaseAnonKey !== '';
};
