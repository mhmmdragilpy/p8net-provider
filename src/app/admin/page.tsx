'use client';

import { useState } from 'react';
import { formatPrice } from '@/lib/utils';

interface Package {
    id: string;
    name: string;
    speed_mbps: number;
    price: number;
    features: string[];
    created_at: string;
}

interface Lead {
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

// Static packages for display
const staticPackages: Record<string, Package> = {
    '1': { id: '1', name: 'Hemat', speed_mbps: 10, price: 150000, features: [], created_at: '' },
    '2': { id: '2', name: 'Keluarga', speed_mbps: 15, price: 200000, features: [], created_at: '' },
    '3': { id: '3', name: 'Pro', speed_mbps: 20, price: 250000, features: [], created_at: '' },
};

// Sample leads for demonstration (since there's no database)
const sampleLeads: Lead[] = [];

type StatusType = 'all' | 'new_lead' | 'surveying' | 'installed';

const statusConfig = {
    new_lead: { label: 'Lead Baru', color: 'bg-blue-500/20 text-blue-400' },
    surveying: { label: 'Survei', color: 'bg-yellow-500/20 text-yellow-400' },
    installed: { label: 'Terpasang', color: 'bg-primary/20 text-primary' },
};

export default function AdminDashboard() {
    const [leads] = useState<Lead[]>(sampleLeads);
    const [packages] = useState<Record<string, Package>>(staticPackages);
    const [filterStatus, setFilterStatus] = useState<StatusType>('all');
    const [filterPackage, setFilterPackage] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter leads
    const filteredLeads = leads.filter((lead) => {
        const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
        const matchesPackage = filterPackage === 'all' || lead.package_id === filterPackage;
        const matchesSearch =
            !searchQuery ||
            lead.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.whatsapp.includes(searchQuery);

        return matchesStatus && matchesPackage && matchesSearch;
    });

    // Stats
    const stats = {
        total: leads.length,
        newLead: leads.filter((l) => l.status === 'new_lead').length,
        surveying: leads.filter((l) => l.status === 'surveying').length,
        installed: leads.filter((l) => l.status === 'installed').length,
    };

    // Revenue calculation
    const totalRevenue = leads
        .filter((l) => l.status === 'installed')
        .reduce((sum, lead) => sum + (packages[lead.package_id]?.price || 0), 0);

    return (
        <div className="space-y-6">
            {/* Page Title */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">Dashboard Admin</h1>
                <p className="text-foreground-muted">Kelola data pelanggan P8 NET</p>
            </div>

            {/* Info Banner */}
            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-black">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-black/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-1">Database Tidak Terhubung</h3>
                        <p className="text-black/80 text-sm">
                            Saat ini form pendaftaran langsung terhubung ke WhatsApp. Data pelanggan akan tersimpan di riwayat chat WhatsApp admin.
                            Untuk tracking pelanggan, Anda bisa mencatat manual atau menggunakan sistem CRM terpisah.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card border border-card-border rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-foreground">{stats.total}</div>
                            <div className="text-xs text-foreground-muted">Total Pelanggan</div>
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-card-border rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-blue-500/20 flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-foreground">{stats.newLead}</div>
                            <div className="text-xs text-foreground-muted">Lead Baru</div>
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-card-border rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-foreground">{stats.surveying}</div>
                            <div className="text-xs text-foreground-muted">Proses Survei</div>
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-card-border rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-foreground">{stats.installed}</div>
                            <div className="text-xs text-foreground-muted">Terpasang</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Empty State */}
            <div className="bg-card border border-card-border rounded-2xl p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Belum Ada Data Pelanggan</h3>
                <p className="text-foreground-muted mb-6 max-w-md mx-auto">
                    Data pelanggan akan masuk melalui WhatsApp. Anda bisa mencatat manual atau menggunakan sistem CRM untuk tracking.
                </p>
                <a
                    href="https://wa.me/6285117088518"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-semibold rounded-full hover:opacity-90 transition-opacity"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Buka WhatsApp Admin
                </a>
            </div>

            {/* Footer Info */}
            <div className="text-center text-sm text-foreground-muted">
                Dashboard ini ditampilkan sebagai placeholder. Data pelanggan tersimpan di WhatsApp.
            </div>
        </div>
    );
}
