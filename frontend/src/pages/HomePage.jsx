import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Users, Globe, Award, Mic, CheckCircle, FileText } from 'lucide-react';
import { SectionTitle } from '@/components/common/SectionTitle';
import DarkVeil from '@/components/ui/DarkVeil';
import { useLanguage } from '@/contexts/LanguageContext';
import { STATIC_COMMITTEES, STATIC_SETTINGS } from '@/data/staticData';

const LOGO_URL = process.env.PUBLIC_URL + '/logo_transparent.png';

const HomePage = () => {
  const [committees] = useState(STATIC_COMMITTEES.slice(0, 6));
  const [settings] = useState(STATIC_SETTINGS);
  const { t } = useLanguage();

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section
        data-testid="hero-section"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[var(--background)]" />
          <div className="absolute inset-0 opacity-50">
            <DarkVeil />
          </div>
          <div className="absolute inset-0 hero-glow" />
          <div className="absolute inset-0 gold-glow opacity-30" />
          <div className="absolute -top-16 -left-16 w-80 sm:w-96 h-80 sm:h-96 border border-[var(--primary)]/15 rounded-full animate-pulse-glow hidden md:block" />
          <div className="absolute -bottom-20 -right-20 w-[28rem] sm:w-[36rem] h-[28rem] sm:h-[36rem] border border-[var(--secondary)]/15 rounded-full animate-pulse-glow hidden md:block" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 container-main pt-32 md:pt-36 pb-24 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Logo without container */}
            <div className="mb-6 animate-fade-in-up relative inline-block">
              <img
                src={LOGO_URL}
                alt="IHL MUN Logo"
                className="w-24 h-24 md:w-32 md:h-32 object-contain"
              />
            </div>

            {/* Title */}
            <h1
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none mb-6 animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="block text-[var(--text-main)]">{t('ihlModel')}</span>
              <span className="block text-[var(--primary)]">{t('unitedNations')}</span>
            </h1>

            {/* Badge with date and FREE mention */}


            {/* Description */}
            <p
              className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              {t('heroDescription')}
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              <Link
                to="/committees"
                data-testid="hero-register-btn"
                className="btn-primary flex items-center justify-center gap-2 group animate-pulse-glow px-8 py-4 text-xl tracking-widest w-full sm:w-auto min-w-[200px]"
              >
                {t('applyNow')}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/selection-process"
                data-testid="hero-selection-btn"
                className="btn-secondary flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <FileText className="w-4 h-4" />
                {t('selectionProcess')}
              </Link>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 pt-0 border-t-0 border-transparent animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-[var(--primary)]" />
                </div>
                <p className="font-heading text-2xl md:text-3xl text-[var(--text-main)]">18-19 April 2026</p>
                <p className="font-mono text-sm text-[var(--text-muted)]">{t('date')}</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-[var(--primary)]" />
                </div>
                <p className="font-heading text-2xl md:text-3xl text-[var(--text-main)]">International House Lyceum</p>
                <p className="font-mono text-sm text-[var(--text-muted)]">{t('location')}</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-[var(--primary)]" />
                </div>
                <p className="font-heading text-2xl md:text-3xl text-[var(--text-main)]">8</p>
                <p className="font-mono text-sm text-[var(--text-muted)]">{t('committeesCount')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}

      </section>

      {/* Selection Process Preview */}
      <section data-testid="selection-preview" className="section-padding bg-[var(--surface)]">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle
                title={t('freeParticipationWithSelection')}
                subtitle={t('selectionDescription')}
              />
              <div className="space-y-4 mb-8">
                {[
                  t('allApplicationsReviewed'),
                  t('checkOriginality'),
                  t('shortlistedInterview'),
                  t('finalDecisions')
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-[var(--text-muted)]">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/selection-process"
                className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--text-main)] transition-colors group"
              >
                <span className="font-mono text-sm uppercase tracking-wider">{t('learnMoreSelection')}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Globe, title: t('globalPerspective'), desc: t('globalPerspectiveDesc') },
                { icon: Mic, title: t('leadershipSkills'), desc: t('leadershipSkillsDesc') },
                { icon: Award, title: t('recognition'), desc: t('recognitionDesc') },
                { icon: Users, title: t('networking'), desc: t('networkingDesc') },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[var(--surface-highlight)] border border-[var(--text-muted)]/10 p-6 card-hover"
                >
                  <item.icon className="w-8 h-8 text-[var(--primary)] mb-4" />
                  <h3 className="font-heading text-xl mb-2 text-[var(--text-main)]">{item.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Committees Preview */}
      <section data-testid="committees-preview" className="section-padding">
        <div className="container-main">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionTitle
              title={t('ourCommittees')}
              subtitle={t('committeesSubtitle')}
              className="mb-0"
            />
            <Link
              to="/committees"
              className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--text-main)] transition-colors group shrink-0"
            >
              <span className="font-mono text-sm uppercase tracking-wider">{t('viewAllCommittees')}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {committees.map((committee, i) => (
              <Link
                key={committee.id}
                to={`/committees?id=${committee.id}`}
                data-testid={`committee-card-${i}`}
                className="group relative h-64 overflow-hidden bg-[var(--surface)] border border-[var(--text-muted)]/10 card-hover"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${process.env.PUBLIC_URL}${committee.background_image?.replace('./', '/')}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/50 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-6">
                  <span className="text-[var(--primary)] font-mono text-xs uppercase tracking-wider mb-2">
                    {committee.chairs?.length || 0} {t('chairs')}
                  </span>
                  <h3 className="font-heading text-xl md:text-2xl text-[var(--text-main)] group-hover:text-[var(--primary)] transition-colors">
                    {committee.name_ru || committee.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section data-testid="cta-section" className="section-padding pb-16 bg-[var(--surface)] relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 bottom-0 gold-glow opacity-50" style={{ background: 'radial-gradient(circle at 50% 30%, rgba(255,199,44,0.12) 0%, rgba(10,22,40,0) 65%)' }} />
        <div className="container-main relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 text-[var(--text-main)]">
              {t('readyToApply')}
            </h2>
            <p className="text-[var(--text-muted)] mb-10">
              {t('chooseCommittee')}
            </p>
            <Link
              to="/committees"
              data-testid="cta-register-btn"
              className="btn-primary inline-flex items-center gap-2 group animate-pulse-glow"
            >
              {t('applyNow')}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
