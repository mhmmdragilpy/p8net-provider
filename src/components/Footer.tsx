import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-foreground text-white overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black"></div>
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6 group">
                            <div className="relative w-14 h-14 rounded-xl overflow-hidden group-hover:scale-105 transition-transform">
                                <Image
                                    src="/logo.jpeg"
                                    alt="P8 NET Logo"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <span className="text-2xl font-extrabold text-white block tracking-wider font-[family-name:var(--font-orbitron)]">P8 NET</span>
                                <span className="text-xs text-white/50">Internet Provider</span>
                            </div>
                        </Link>
                        <p className="text-white/60 mb-6 leading-relaxed text-sm">
                            Penyedia layanan internet rumah terpercaya dengan koneksi cepat dan stabil untuk keluarga Indonesia.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: 'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 36.6 36.6 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z', label: 'Facebook', color: 'hover:bg-blue-600' },
                                { icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z', label: 'Instagram', color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500' },
                                { icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z', label: 'WhatsApp', color: 'hover:bg-green-500' },
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center transition-all ${social.color}`}
                                    aria-label={social.label}
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={social.icon} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-white mb-6 flex items-center gap-2">
                            <div className="w-1 h-5 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                            Menu
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { href: '/', label: 'Beranda' },
                                { href: '/#paket', label: 'Paket Internet' },
                                { href: '/daftar', label: 'Daftar' },
                            ].map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                                        <svg className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-white mb-6 flex items-center gap-2">
                            <div className="w-1 h-5 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                            Layanan
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { label: 'Paket Hemat 10 Mbps', price: 'Rp150.000' },
                                { label: 'Paket Keluarga 15 Mbps', price: 'Rp200.000' },
                                { label: 'Paket Pro 25 Mbps', price: 'Rp250.000' },
                            ].map((service, index) => (
                                <li key={index} className="text-white/60">
                                    <span className="block text-sm">{service.label}</span>
                                    <span className="text-primary text-xs font-medium">{service.price}/bln</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-white mb-6 flex items-center gap-2">
                            <div className="w-1 h-5 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                            Kontak
                        </h4>
                        <ul className="space-y-4">
                            {[
                                { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', text: '085117088518' },
                                { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', text: 'info@p8net.id' },
                                { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z', text: 'Tanjung Priok, Jakarta' },
                            ].map((contact, index) => (
                                <li key={index} className="flex items-start gap-3 text-white/60">
                                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={contact.icon} />
                                        </svg>
                                    </div>
                                    <span className="pt-1 text-sm">{contact.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-16 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-white/40 text-sm">
                            © {currentYear} P8 NET Internet. All rights reserved.
                        </p>
                        <div className="flex items-center gap-2 text-white/40 text-sm">
                            <span>Developed with 💚 by</span>
                            <span className="text-primary font-semibold">Mang Do-san</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
