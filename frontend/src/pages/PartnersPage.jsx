import { useLanguage } from '@/contexts/LanguageContext';

const PARTNERS = [
    { id: 1, translationKey: 'unUzbekistan', logo: process.env.PUBLIC_URL + '/partners/un_uzb.png' },
    { id: 2, translationKey: 'imunmt', logo: process.env.PUBLIC_URL + '/partners/imunmt.jpg' },
    { id: 3, translationKey: 'cocaColaUzbekistan', logo: process.env.PUBLIC_URL + '/partners/coca_cola.png' },
    { id: 4, translationKey: 'pizzaHut', logo: process.env.PUBLIC_URL + '/partners/pizza_hut.png' },
    { id: 5, translationKey: 'unodcUzbekistan', logo: process.env.PUBLIC_URL + '/partners/unodc.png' },
];

const PartnersPage = () => {
    const { t } = useLanguage();

    // Create a 4x list for infinite scroll effect to ensure no gaps on high-res mobile/desktop
    const quadrupledPartners = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

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
                    {/* Gradient Overlays for Fade Effect - Hide on mobile to save space if needed, or keep for aesthetics */}
                    <div className="absolute inset-y-0 left-0 w-12 md:w-40 bg-gradient-to-r from-[var(--surface)] to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-12 md:w-40 bg-gradient-to-l from-[var(--surface)] to-transparent z-10" />

                    {/* Marquee Container */}
                    <div className="animate-marquee gap-8 md:gap-20 items-start">
                        {quadrupledPartners.map((partner, index) => (
                            <div
                                key={`${partner.id}-${index}`}
                                className="flex flex-col items-center w-[140px] md:w-[220px] shrink-0 group px-2"
                            >
                                {/* Logo Box */}
                                <div className="w-full h-24 md:h-36 flex items-center justify-center bg-white/5 rounded-xl border border-white/5 group-hover:bg-white/10 group-hover:border-[var(--primary)]/30 transition-all duration-300 backdrop-blur-sm px-4 md:px-6">
                                    <img
                                        src={partner.logo}
                                        alt={t(partner.translationKey)}
                                        className="max-h-[65%] max-w-[85%] object-contain transition-all duration-500 opacity-90 group-hover:opacity-100"
                                    />
                                </div>
                                {/* Name Label */}
                                <span className="mt-4 text-[var(--text-muted)] group-hover:text-[var(--primary)] text-xs md:text-sm font-medium transition-all duration-300 text-center opacity-80 group-hover:opacity-100 whitespace-normal line-clamp-2">
                                    {t(partner.translationKey)}
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
