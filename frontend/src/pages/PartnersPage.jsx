import { useLanguage } from '@/contexts/LanguageContext';

const PARTNERS = [
    { id: 1, name: 'MGIMO Tashkent', logo: process.env.PUBLIC_URL + '/partners/mgimo_tashkent.png' },
    { id: 2, name: 'Coca Cola Uzbekistan', logo: process.env.PUBLIC_URL + '/partners/coca_cola.png' },
    { id: 3, name: 'Pizza Hut', logo: process.env.PUBLIC_URL + '/partners/pizza_hut.png' },
    { id: 4, name: 'UNODC Uzbekistan', logo: process.env.PUBLIC_URL + '/partners/unodc.png' },
];

const PartnersPage = () => {
    const { t } = useLanguage();

    // Create a doubled list for infinite scroll effect
    const doubledPartners = [...PARTNERS, ...PARTNERS];

    return (
        <div className="page-transition min-h-screen pt-24 md:pt-32 pb-16">
            <div className="container-main">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                    <h1 className="text-4xl md:text-6xl mb-6 animate-fade-in-up">
                        {t('ourPartners')}
                    </h1>
                    <p className="text-[var(--text-muted)] text-lg md:text-xl animate-fade-in-up delay-100">
                        {t('partnersSubtitle')}
                    </p>
                </div>

                {/* Train Animation Section */}
                <div className="relative overflow-hidden py-12 bg-[var(--surface)] border-y border-[var(--text-muted)]/10">
                    {/* Gradient Overlays for Fade Effect */}
                    <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-[var(--surface)] to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-[var(--surface)] to-transparent z-10" />

                    {/* Marquee Container */}
                    <div className="animate-marquee flex items-center gap-12 md:gap-24">
                        {doubledPartners.map((partner, index) => (
                            <div
                                key={`${partner.id}-${index}`}
                                className="flex flex-col items-center justify-center w-32 md:w-48 shrink-0 group"
                            >
                                <div className="h-20 md:h-32 w-full flex items-center justify-center bg-white/5 rounded-xl border border-white/5 group-hover:bg-white/10 group-hover:border-[var(--primary)]/30 transition-all duration-300 backdrop-blur-sm px-6 py-4">
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
                                    />
                                </div>
                                <span className="mt-4 text-[var(--text-muted)] group-hover:text-[var(--primary)] text-sm md:text-base font-medium transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
                                    {partner.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action or Info Section */}
                <div className="mt-24 text-center animate-fade-in-up delay-400">
                    <div className="inline-block p-8 md:p-12 glass border border-[var(--text-muted)]/10 rounded-3xl max-w-2xl">
                        <h2 className="text-2xl md:text-3xl mb-4 text-[var(--primary)]">
                            Interested in partnering?
                        </h2>
                        <p className="text-[var(--text-muted)] mb-8">
                            Become a part of the leading MUN conference and support future leaders.
                        </p>
                        <a
                            href="https://t.me/ihl_mun"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnersPage;
