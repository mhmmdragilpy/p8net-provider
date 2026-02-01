import { Metadata } from 'next';
import RegistrationForm from '@/components/RegistrationForm';

export const metadata: Metadata = {
    title: 'Daftar Langganan - P8 NET',
    description: 'Daftar layanan internet rumah P8 NET sekarang. Proses cepat, biaya instalasi Rp250.000, dan tanpa kontrak.',
};

export default function DaftarPage() {
    return (
        <div className="min-h-screen pt-20 pb-16 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background-secondary"></div>
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl"></div>

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Left Side - Info */}
                    <div className="lg:sticky lg:top-24">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 text-warning text-sm font-medium mb-4">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Biaya Instalasi: Rp250.000
                        </div>

                        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 leading-tight">
                            Daftar <span className="text-gradient">Langganan</span> P8 NET
                        </h1>

                        <p className="text-base md:text-lg text-foreground-muted mb-6">
                            Isi formulir dan tim kami akan menghubungi Anda untuk proses instalasi.
                        </p>

                        {/* Benefits */}
                        <div className="space-y-3">
                            {[
                                { icon: '⚡', title: 'Instalasi Cepat', desc: 'Proses instalasi 1x24 jam' },
                                { icon: '💰', title: 'Harga Transparan', desc: 'Instalasi Rp250.000 + bulanan' },
                                { icon: '🔒', title: 'Tanpa Kontrak', desc: 'Bebas berhenti kapan saja' },
                                { icon: '📞', title: 'Support 24/7', desc: 'Tim support siap membantu' },
                            ].map((benefit, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-card border border-card-border hover:border-primary/30 transition-colors">
                                    <div className="text-xl">{benefit.icon}</div>
                                    <div>
                                        <h3 className="font-semibold text-foreground text-sm">{benefit.title}</h3>
                                        <p className="text-xs text-foreground-muted">{benefit.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="bg-card border border-card-border rounded-2xl p-5 md:p-6 shadow-xl">
                        <RegistrationForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
