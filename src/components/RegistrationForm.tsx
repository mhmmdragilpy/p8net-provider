'use client';

import { useState, FormEvent } from 'react';
import { supabase, Package, isSupabaseConfigured } from '@/lib/supabase';
import { useAppStore } from '@/stores/useAppStore';
import { validateWhatsAppNumber, createWhatsAppLink, formatPrice } from '@/lib/utils';

// Static packages data
const packages: Package[] = [
    {
        id: '1',
        name: 'Hemat',
        speed_mbps: 10,
        price: 150000,
        features: ['Kecepatan hingga 10 Mbps', 'Unlimited Quota', 'Support 24/7', 'Cocok untuk 1-5 Device'],
        created_at: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Keluarga',
        speed_mbps: 15,
        price: 200000,
        features: ['Kecepatan hingga 15 Mbps', 'Unlimited Quota', 'Support 24/7', 'Cocok untuk 5-10 Device'],
        created_at: new Date().toISOString(),
    },
    {
        id: '3',
        name: 'Pro',
        speed_mbps: 25,
        price: 250000,
        features: ['Kecepatan hingga 25 Mbps', 'Unlimited Quota', 'Support 24/7', 'Cocok untuk 10+ Device', 'Priority Support'],
        created_at: new Date().toISOString(),
    },
];

interface FormData {
    fullName: string;
    whatsapp: string;
    address: string;
    packageId: string;
}

interface FormErrors {
    fullName?: string;
    whatsapp?: string;
    address?: string;
    packageId?: string;
}

export default function RegistrationForm() {
    const selectedPackage = useAppStore((state) => state.selectedPackage);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        whatsapp: '',
        address: '',
        packageId: selectedPackage?.id || '',
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Nama lengkap wajib diisi';
        } else if (formData.fullName.trim().length < 3) {
            newErrors.fullName = 'Nama minimal 3 karakter';
        }

        if (!formData.whatsapp.trim()) {
            newErrors.whatsapp = 'Nomor WhatsApp wajib diisi';
        } else if (!validateWhatsAppNumber(formData.whatsapp)) {
            newErrors.whatsapp = 'Format nomor WhatsApp tidak valid (contoh: 08123456789)';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Alamat lengkap wajib diisi';
        } else if (formData.address.trim().length < 10) {
            newErrors.address = 'Alamat minimal 10 karakter';
        }

        if (!formData.packageId) {
            newErrors.packageId = 'Pilih paket terlebih dahulu';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Submit to Supabase if configured
            if (isSupabaseConfigured()) {
                await supabase.from('leads').insert({
                    full_name: formData.fullName.trim(),
                    whatsapp: formData.whatsapp.trim(),
                    address: formData.address.trim(),
                    package_id: formData.packageId,
                    status: 'new_lead',
                });
            }

            setIsSuccess(true);

            // Get selected package info
            const pkg = packages.find((p) => p.id === formData.packageId);
            const packageName = pkg ? pkg.name : 'Internet';
            const packageSpeed = pkg ? pkg.speed_mbps : 0;
            const packagePrice = pkg ? formatPrice(pkg.price) : 'Rp0';

            // Create WhatsApp message
            const message = `*PENDAFTARAN INTERNET P8 NET*

*Data Pelanggan Baru:*
- Nama: ${formData.fullName}
- WhatsApp: ${formData.whatsapp}
- Alamat: ${formData.address}

*Paket yang Dipilih:*
- Paket: ${packageName}
- Kecepatan: ${packageSpeed} Mbps
- Harga: ${packagePrice}/bulan

Mohon diproses untuk survei lokasi dan instalasi.

Terima kasih!
_Dikirim via P8 NET Website_`;

            // Redirect to WhatsApp
            const whatsappLink = createWhatsAppLink(
                process.env.NEXT_PUBLIC_WHATSAPP_ADMIN || '085117088518',
                message
            );

            window.open(whatsappLink, '_blank');
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    if (isSuccess) {
        return (
            <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Pendaftaran Berhasil!</h3>
                <p className="text-foreground-muted mb-6">
                    Tim kami akan segera menghubungi Anda melalui WhatsApp.
                </p>
                <button
                    onClick={() => {
                        setIsSuccess(false);
                        setFormData({ fullName: '', whatsapp: '', address: '', packageId: '' });
                    }}
                    className="px-6 py-3 bg-primary text-black font-semibold rounded-full hover:opacity-90 transition-opacity"
                >
                    Daftar Lagi
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nama Lengkap */}
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                    Nama Lengkap <span className="text-error">*</span>
                </label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap Anda"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-error' : 'border-card-border'
                        } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                />
                {errors.fullName && (
                    <p className="mt-1 text-sm text-error">{errors.fullName}</p>
                )}
            </div>

            {/* Nomor WhatsApp */}
            <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-foreground mb-2">
                    Nomor WhatsApp <span className="text-error">*</span>
                </label>
                <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="08123456789"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.whatsapp ? 'border-error' : 'border-card-border'
                        } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                />
                {errors.whatsapp && (
                    <p className="mt-1 text-sm text-error">{errors.whatsapp}</p>
                )}
            </div>

            {/* Alamat Lengkap */}
            <div>
                <label htmlFor="address" className="block text-sm font-medium text-foreground mb-2">
                    Alamat Lengkap <span className="text-error">*</span>
                </label>
                <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Masukkan alamat lengkap termasuk RT/RW, Kelurahan, Kecamatan"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.address ? 'border-error' : 'border-card-border'
                        } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none`}
                />
                {errors.address && (
                    <p className="mt-1 text-sm text-error">{errors.address}</p>
                )}
            </div>

            {/* Pilih Paket */}
            <div>
                <label htmlFor="packageId" className="block text-sm font-medium text-foreground mb-2">
                    Pilih Paket <span className="text-error">*</span>
                </label>
                <div className="grid gap-2">
                    {packages.map((pkg) => (
                        <label
                            key={pkg.id}
                            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${formData.packageId === pkg.id
                                ? 'border-primary bg-primary/5'
                                : 'border-card-border hover:border-primary/50'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="packageId"
                                    value={pkg.id}
                                    checked={formData.packageId === pkg.id}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-primary focus:ring-primary"
                                />
                                <div>
                                    <div className="font-semibold text-foreground text-sm">Paket {pkg.name}</div>
                                    <div className="text-xs text-foreground-muted">{pkg.speed_mbps} Mbps</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-primary text-sm">{formatPrice(pkg.price)}</div>
                                <div className="text-xs text-foreground-muted">/bulan</div>
                            </div>
                        </label>
                    ))}
                </div>
                {errors.packageId && (
                    <p className="mt-1 text-sm text-error">{errors.packageId}</p>
                )}
            </div>

            {/* Installation Note */}
            <div className="p-3 rounded-xl bg-warning/10 border border-warning/30">
                <p className="text-sm text-warning">
                    <strong>Catatan:</strong> Biaya instalasi Rp250.000 (sekali bayar)
                </p>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 rounded-xl font-bold text-black transition-all ${isSubmitting
                    ? 'bg-primary/50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary to-secondary hover:opacity-90'
                    }`}
            >
                {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Mengirim...
                    </span>
                ) : (
                    'Langganan Sekarang'
                )}
            </button>

            {/* Privacy Note */}
            <p className="text-center text-xs text-foreground-muted">
                Dengan mendaftar, Anda menyetujui{' '}
                <span className="text-primary">Syarat & Ketentuan</span>{' '}
                serta{' '}
                <span className="text-primary">Kebijakan Privasi</span>{' '}
                kami.
            </p>
        </form>
    );
}
