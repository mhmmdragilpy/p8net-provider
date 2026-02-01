import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const orbitron = Orbitron({
    variable: "--font-orbitron",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "P8 NET - Internet Rumah Cepat & Stabil",
    description: "Penyedia layanan internet rumah terpercaya dengan koneksi cepat dan stabil. Paket mulai dari Rp150.000/bulan dengan kecepatan hingga 25 Mbps.",
    keywords: ["internet rumah", "wifi rumah", "provider internet", "P8 NET", "internet cepat", "internet murah"],
    authors: [{ name: "P8 NET" }],
    openGraph: {
        title: "P8 NET - Internet Rumah Cepat & Stabil",
        description: "Penyedia layanan internet rumah terpercaya dengan koneksi cepat dan stabil.",
        type: "website",
        locale: "id_ID",
        siteName: "P8 NET",
    },
    twitter: {
        card: "summary_large_image",
        title: "P8 NET - Internet Rumah Cepat & Stabil",
        description: "Penyedia layanan internet rumah terpercaya dengan koneksi cepat dan stabil.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id" className="scroll-smooth">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
