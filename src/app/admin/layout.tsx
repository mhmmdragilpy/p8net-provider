import Link from 'next/link';

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-background">
            {/* Admin Header */}
            <header className="bg-card border-b border-card-border sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/admin" className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                <span className="text-sm font-extrabold text-black">P8</span>
                            </div>
                            <div>
                                <span className="text-lg font-bold text-foreground font-[family-name:var(--font-orbitron)]">P8 NET</span>
                                <span className="text-xs text-foreground-muted block">Admin Panel</span>
                            </div>
                        </Link>
                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                className="text-sm text-foreground-muted hover:text-primary transition-colors"
                            >
                                ← Kembali ke Website
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
