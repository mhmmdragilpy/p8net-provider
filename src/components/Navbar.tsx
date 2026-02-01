'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Beranda' },
        { href: '/#paket', label: 'Paket' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass shadow-lg' : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden group-hover:scale-105 transition-transform">
                            <Image
                                src="/logo.jpeg"
                                alt="P8 NET Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className={`text-xl font-extrabold tracking-wider transition-colors font-[family-name:var(--font-orbitron)] ${isScrolled ? 'text-gradient' : 'text-white'}`}>
                                P8 NET
                            </span>
                            <span className={`text-[10px] transition-colors ${isScrolled ? 'text-foreground-muted' : 'text-white/70'}`}>
                                Internet Provider
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative font-medium transition-colors hover:text-primary group ${isScrolled ? 'text-foreground-muted' : 'text-white/80 hover:text-white'
                                    }`}
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        ))}
                        <Link
                            href="/daftar"
                            className="relative px-6 py-2.5 rounded-full font-semibold text-black overflow-hidden group"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"></span>
                            <span className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            <span className="relative flex items-center gap-2">
                                Langganan Sekarang
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'hover:bg-background-secondary' : 'hover:bg-white/10'
                            }`}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className={`w-6 h-6 transition-colors ${isScrolled ? 'text-foreground' : 'text-white'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'
                    }`}>
                    <div className={`flex flex-col gap-2 pt-4 border-t ${isScrolled ? 'border-card-border' : 'border-white/10'
                        }`}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${isScrolled
                                    ? 'text-foreground-muted hover:text-primary hover:bg-primary/5'
                                    : 'text-white/80 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/daftar"
                            onClick={() => setIsMenuOpen(false)}
                            className="mx-2 mt-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-black font-semibold text-center"
                        >
                            Langganan Sekarang
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
