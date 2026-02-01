'use client';

import { useState } from 'react';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'Berapa lama proses instalasi?',
            answer: 'Proses instalasi umumnya membutuhkan waktu 1x24 jam setelah survei lokasi dilakukan. Tim teknisi kami akan menghubungi Anda untuk menjadwalkan waktu instalasi yang sesuai.',
        },
        {
            question: 'Apakah ada biaya instalasi?',
            answer: 'Ya, biaya instalasi adalah Rp250.000 (sekali bayar). Biaya ini sudah termasuk pemasangan perangkat dan aktivasi layanan. Setelah itu, setiap tanggal 5 Anda hanya perlu membayar biaya bulanan sesuai paket yang dipilih.',
        },
        {
            question: 'Bagaimana cara pembayaran?',
            answer: 'Pembayaran dapat dilakukan melalui transfer bank, e-wallet (GoPay, OVO, Dana), atau pembayaran tunai langsung ke teknisi saat instalasi.',
        },
        {
            question: 'Apakah ada kontrak jangka panjang?',
            answer: 'Tidak ada kontrak jangka panjang. Anda bebas berhenti berlangganan kapan saja tanpa biaya penalti.',
        },
        {
            question: 'Bagaimana jika terjadi gangguan koneksi?',
            answer: 'Tim support kami tersedia 24/7. Anda dapat menghubungi kami melalui WhatsApp dan teknisi akan segera menangani masalah Anda.',
        },
        {
            question: 'Apakah kuota internet unlimited?',
            answer: 'Ya! Semua paket P8 NET menawarkan kuota unlimited tanpa FUP (Fair Usage Policy). Nikmati internet sepuasnya tanpa khawatir kehabisan kuota.',
        },
    ];

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2"></div>
            <div className="absolute top-1/2 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl translate-x-1/2"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        FAQ
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
                        Pertanyaan yang <span className="text-gradient">Sering Diajukan</span>
                    </h2>
                    <p className="text-lg text-foreground-muted">
                        Temukan jawaban untuk pertanyaan umum tentang layanan P8 NET
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === index
                                ? 'bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20'
                                : 'bg-card border-card-border hover:border-primary/30'
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="flex items-center justify-between w-full p-6 text-left"
                            >
                                <span className={`font-semibold pr-4 transition-colors ${openIndex === index ? 'text-primary' : 'text-foreground group-hover:text-primary'
                                    }`}>
                                    {faq.question}
                                </span>
                                <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${openIndex === index
                                    ? 'bg-gradient-to-r from-primary to-secondary rotate-180'
                                    : 'bg-background-secondary group-hover:bg-primary/10'
                                    }`}>
                                    <svg
                                        className={`w-5 h-5 transition-colors ${openIndex === index ? 'text-black' : 'text-foreground-muted group-hover:text-primary'
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40' : 'max-h-0'
                                }`}>
                                <p className="px-6 pb-6 text-foreground-muted leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                        <div className="text-center sm:text-left">
                            <p className="font-semibold text-foreground mb-1">Masih punya pertanyaan lain?</p>
                            <p className="text-sm text-foreground-muted">Tim kami siap membantu Anda 24/7</p>
                        </div>
                        <a
                            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_ADMIN}?text=Halo, saya ingin bertanya tentang layanan P8 NET`}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-green-500/30 transition-all hover:scale-105"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Chat WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
