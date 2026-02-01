import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg noise-overlay">
            {/* Animated particles */}
            <div className="particles"></div>

            {/* Animated gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
                <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
            }}></div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
                <div className="animate-fade-in">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white text-sm font-medium mb-8 animate-pulse-glow">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                        </span>
                        Internet Cepat & Stabil 24/7
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80 mb-6 leading-tight tracking-tight drop-shadow-sm">
                        Internet Rumah
                        <br />
                        <span className="relative">
                            <span className="bg-gradient-to-r from-[#4ade80] via-[#22c55e] to-[#34d399] bg-clip-text text-transparent drop-shadow-md">Tanpa Batas</span>
                            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                                <path d="M2 10C50 2 150 2 198 10" stroke="url(#underline-gradient)" strokeWidth="4" strokeLinecap="round" />
                                <defs>
                                    <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
                                        <stop stopColor="#4ade80" />
                                        <stop offset="1" stopColor="#34d399" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Nikmati koneksi internet super cepat dengan harga terjangkau.
                        <br className="hidden md:block" />
                        Streaming, gaming, dan bekerja dari rumah tanpa hambatan.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Link
                            href="/#paket"
                            className="group relative px-8 py-4 bg-gradient-to-r from-primary to-secondary text-black font-bold rounded-full overflow-hidden transition-all hover:shadow-2xl hover:shadow-primary/30"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Lihat Paket
                                <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </Link>
                        <Link
                            href="/daftar"
                            className="group relative px-8 py-4 rounded-full font-bold text-white overflow-hidden border-2 border-white/30 hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/20"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            <span className="relative flex items-center gap-2">
                                Langganan Sekarang
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-xl mx-auto">
                        <div className="group p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all cursor-default">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">30<span className="text-primary">+</span></div>
                            <div className="text-white/50 text-xs md:text-sm">Pelanggan</div>
                        </div>
                        <div className="group p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all cursor-default">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">99<span className="text-secondary">.9%</span></div>
                            <div className="text-white/50 text-xs md:text-sm">Uptime</div>
                        </div>
                        <div className="group p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all cursor-default">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">24<span className="text-primary">/7</span></div>
                            <div className="text-white/50 text-xs md:text-sm">Support</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <div className="flex flex-col items-center gap-2 text-white/40">
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
                        <div className="w-1 h-3 bg-white/40 rounded-full animate-bounce"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
