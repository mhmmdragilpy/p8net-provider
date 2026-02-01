'use client';

import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { Package } from '@/lib/supabase';
import { useAppStore } from '@/stores/useAppStore';

interface PricingCardProps {
    package_: Package;
    isPopular?: boolean;
    delay?: number;
}

export function PricingCard({ package_, isPopular = false, delay = 0 }: PricingCardProps) {
    const setSelectedPackage = useAppStore((state) => state.setSelectedPackage);

    const handleSelect = () => {
        setSelectedPackage(package_);
    };

    return (
        <div
            className={`relative rounded-3xl p-6 md:p-8 ${isPopular
                ? 'bg-gradient-to-br from-primary via-primary-dark to-secondary text-black shadow-2xl shadow-primary/20'
                : 'bg-card border border-card-border hover:border-primary/30 hover:shadow-xl transition-all'
                }`}
            style={{ animationDelay: `${delay}ms` }}
        >
            {/* Popular Badge */}
            {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-black text-primary text-xs font-bold rounded-full shadow-lg whitespace-nowrap">
                    ⭐ Paling Populer
                </div>
            )}

            {/* Package Icon */}
            <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${isPopular ? 'bg-black/20' : 'bg-gradient-to-br from-primary to-secondary'
                    }`}
            >
                <svg
                    className={`w-7 h-7 ${isPopular ? 'text-black' : 'text-black'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                    />
                </svg>
            </div>

            {/* Package Name */}
            <h3
                className={`text-xl md:text-2xl font-bold mb-2 ${isPopular ? 'text-black' : 'text-foreground'
                    }`}
            >
                Paket {package_.name}
            </h3>

            {/* Speed */}
            <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 ${isPopular ? 'bg-black/20 text-black' : 'bg-secondary/10 text-secondary'
                    }`}
            >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {package_.speed_mbps} Mbps
            </div>

            {/* Price */}
            <div className="mb-5">
                <span
                    className={`text-3xl md:text-4xl font-extrabold ${isPopular ? 'text-black' : 'text-foreground'
                        }`}
                >
                    {formatPrice(package_.price)}
                </span>
                <span
                    className={`text-sm ${isPopular ? 'text-black/70' : 'text-foreground-muted'}`}
                >
                    /bulan
                </span>
            </div>

            {/* Features */}
            <ul className="space-y-2.5 mb-6">
                {package_.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${isPopular ? 'bg-black/20' : 'bg-success/10'
                            }`}>
                            <svg
                                className={`w-2.5 h-2.5 ${isPopular ? 'text-black' : 'text-success'}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className={`text-sm leading-tight ${isPopular ? 'text-black/90' : 'text-foreground-muted'}`}>
                            {feature}
                        </span>
                    </li>
                ))}
            </ul>

            {/* CTA Button */}
            <Link
                href="/daftar"
                onClick={handleSelect}
                className={`block w-full py-3.5 rounded-xl font-bold text-center transition-all ${isPopular
                    ? 'bg-black text-primary hover:bg-black/90'
                    : 'bg-gradient-to-r from-primary to-secondary text-black hover:opacity-90'
                    }`}
            >
                Langganan Sekarang
            </Link>
        </div>
    );
}

// Static packages data
const staticPackages: Package[] = [
    {
        id: '1',
        name: 'Hemat',
        speed_mbps: 10,
        price: 150000,
        features: [
            'Kecepatan hingga 10 Mbps',
            'Unlimited Quota',
            'Support 24/7',
            'Cocok untuk 1-5 Device',
        ],
        created_at: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Keluarga',
        speed_mbps: 15,
        price: 200000,
        is_popular: true,
        features: [
            'Kecepatan hingga 15 Mbps',
            'Unlimited Quota',
            'Support 24/7',
            'Cocok untuk 5-10 Device',
        ],
        created_at: new Date().toISOString(),
    },
    {
        id: '3',
        name: 'Pro',
        speed_mbps: 20,
        price: 250000,
        features: [
            'Kecepatan hingga 20 Mbps',
            'Unlimited Quota',
            'Support 24/7',
            'Cocok untuk 10+ Device',
            'Priority Support',
        ],
        created_at: new Date().toISOString(),
    },
];

export default function PricingSection() {
    return (
        <section id="paket" className="py-20 md:py-24 bg-background-secondary relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Harga Terjangkau
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
                        Pilih Paket <span className="text-gradient">Terbaik</span>
                    </h2>
                    <p className="text-base md:text-lg text-foreground-muted max-w-xl mx-auto">
                        Paket internet sesuai kebutuhan dan budget Anda
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-6 items-stretch">
                    {staticPackages.map((pkg, index) => (
                        <PricingCard
                            key={pkg.id}
                            package_={pkg}
                            isPopular={pkg.is_popular}
                            delay={index * 100}
                        />
                    ))}
                </div>

                {/* Additional Info */}
                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 text-warning text-sm font-medium mb-4">
                        💰 Biaya Instalasi: Rp250.000 (sekali bayar)
                    </div>
                    <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap text-sm">
                        {[
                            { icon: '🚫', text: 'Tanpa Kontrak' },
                            { icon: '⚡', text: 'Instalasi 1x24 Jam' },
                            { icon: '✅', text: 'Garansi Koneksi' },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-2 text-foreground-muted">
                                <span>{item.icon}</span>
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
