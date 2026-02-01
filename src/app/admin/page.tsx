'use client';

import { useState, useEffect } from 'react';
import { supabase, Lead, Package, isSupabaseConfigured } from '@/lib/supabase';
import { formatPrice } from '@/lib/utils';

// Static packages for display
const staticPackages: Record<string, Package> = {
    '1': { id: '1', name: 'Hemat', speed_mbps: 10, price: 150000, features: [], created_at: '' },
    '2': { id: '2', name: 'Keluarga', speed_mbps: 15, price: 200000, features: [], created_at: '' },
    '3': { id: '3', name: 'Pro', speed_mbps: 20, price: 250000, features: [], created_at: '' },
};

type StatusType = 'all' | 'new_lead' | 'surveying' | 'installed';

const statusConfig = {
    new_lead: { label: 'Lead Baru', color: 'bg-blue-500/20 text-blue-400' },
    surveying: { label: 'Survei', color: 'bg-yellow-500/20 text-yellow-400' },
    installed: { label: 'Terpasang', color: 'bg-primary/20 text-primary' },
};

export default function AdminDashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [packages, setPackages] = useState<Record<string, Package>>(staticPackages);
    const [filterStatus, setFilterStatus] = useState<StatusType>('all');
    const [filterPackage, setFilterPackage] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Fetch leads and packages from Supabase
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            if (!isSupabaseConfigured()) {
                console.log('Supabase not configured, using empty data');
                setIsLoading(false);
                return;
            }

            try {
                // Fetch packages
                const { data: pkgData } = await supabase
                    .from('packages')
                    .select('*');

                if (pkgData && pkgData.length > 0) {
                    const pkgMap: Record<string, Package> = {};
                    pkgData.forEach((pkg: Package) => {
                        pkgMap[pkg.id] = pkg;
                    });
                    setPackages(pkgMap);
                }

                // Fetch leads
                const { data: leadsData, error } = await supabase
                    .from('leads')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error('Error fetching leads:', error.message);
                } else if (leadsData) {
                    setLeads(leadsData as Lead[]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Update lead status
    const updateStatus = async (leadId: string, newStatus: Lead['status']) => {
        // Optimistic update
        setLeads((prev) =>
            prev.map((lead) =>
                lead.id === leadId ? { ...lead, status: newStatus } : lead
            )
        );

        if (isSupabaseConfigured()) {
            const { error } = await supabase
                .from('leads')
                .update({ status: newStatus })
                .eq('id', leadId);

            if (error) {
                console.error('Error updating status:', error.message);
            }
        }
    };

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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <div className="space-y-6">
            {/* Page Title */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">Dashboard Admin</h1>
                <p className="text-foreground-muted">Kelola data pelanggan P8 NET</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
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

                <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-5 text-black col-span-2 lg:col-span-1">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-black/20 flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-xl font-bold">{formatPrice(totalRevenue)}</div>
                            <div className="text-xs text-black/70">Pendapatan/Bulan</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-card border border-card-border rounded-2xl p-4">
                <div className="flex flex-col lg:flex-row gap-3">
                    <div className="flex-1 relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari nama, alamat, atau nomor..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-card-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as StatusType)}
                        className="px-4 py-2.5 rounded-xl border border-card-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        <option value="all">Semua Status</option>
                        <option value="new_lead">Lead Baru</option>
                        <option value="surveying">Proses Survei</option>
                        <option value="installed">Terpasang</option>
                    </select>

                    <select
                        value={filterPackage}
                        onChange={(e) => setFilterPackage(e.target.value)}
                        className="px-4 py-2.5 rounded-xl border border-card-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        <option value="all">Semua Paket</option>
                        <option value="1">Paket Hemat (150k)</option>
                        <option value="2">Paket Keluarga (200k)</option>
                        <option value="3">Paket Pro (250k)</option>
                    </select>
                </div>
            </div>

            {/* Leads Table */}
            <div className="bg-card border border-card-border rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-background-secondary border-b border-card-border">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-muted uppercase tracking-wider">Pelanggan</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-muted uppercase tracking-wider">Kontak</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-muted uppercase tracking-wider">Alamat</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-muted uppercase tracking-wider">Paket</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-muted uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-muted uppercase tracking-wider">Tanggal</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground-muted uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-card-border">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-8 text-center text-foreground-muted">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                            Memuat data...
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredLeads.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-8 text-center text-foreground-muted">
                                        {leads.length === 0 ? 'Belum ada data pelanggan' : 'Tidak ada data yang ditemukan'}
                                    </td>
                                </tr>
                            ) : (
                                filteredLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-background-secondary/50 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="font-medium text-foreground">{lead.full_name}</div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <a
                                                href={`https://wa.me/${lead.whatsapp.replace(/^0/, '62')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-primary hover:underline text-sm"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                </svg>
                                                {lead.whatsapp}
                                            </a>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="text-sm text-foreground-muted max-w-[200px] truncate" title={lead.address}>
                                                {lead.address}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="text-sm">
                                                <div className="font-medium text-foreground">
                                                    {packages[lead.package_id]?.name || 'Unknown'}
                                                </div>
                                                <div className="text-foreground-muted text-xs">
                                                    {packages[lead.package_id] ? formatPrice(packages[lead.package_id].price) : '-'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[lead.status].color
                                                    }`}
                                            >
                                                {statusConfig[lead.status].label}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="text-sm text-foreground-muted">
                                                {formatDate(lead.created_at)}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <select
                                                value={lead.status}
                                                onChange={(e) => updateStatus(lead.id, e.target.value as Lead['status'])}
                                                className="px-2 py-1 text-xs rounded-lg border border-card-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            >
                                                <option value="new_lead">Lead Baru</option>
                                                <option value="surveying">Survei</option>
                                                <option value="installed">Terpasang</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer Info */}
            <div className="text-center text-sm text-foreground-muted">
                Menampilkan {filteredLeads.length} dari {leads.length} pelanggan
            </div>
        </div>
    );
}
