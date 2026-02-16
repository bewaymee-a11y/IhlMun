import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Users, Globe, Award, Mic, CheckCircle, FileText } from 'lucide-react';
import axios from 'axios';
import { SectionTitle } from '@/components/common/SectionTitle';
import { useLanguage } from '@/contexts/LanguageContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const LOGO_URL = 'https://customer-assets.emergentagent.com/job_59399e88-526c-4fa4-9ba6-4f1971c66f66/artifacts/ezbkvbq2_photo_2026-01-27%2018.52.01.jpeg';

const HomePage = () => {
  const [committees, setCommittees] = useState([]);
  const [settings, setSettings] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [commRes, settingsRes] = await Promise.all([
          axios.get(`${API}/committees`),
          axios.get(`${API}/settings`)
        ]);
        setCommittees(commRes.data.slice(0, 6));
        setSettings(settingsRes.data);
      } catch (e) {
        console.error('Error fetching data:', e);
      }
    };
    fetchData();
  }, []);

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
          <div className="absolute inset-0 hero-glow" />
          <div className="absolute inset-0 gold-glow opacity-30" />
          <div className="absolute top-1/4 left-10 w-64 h-64 border border-[var(--primary)]/10 rounded-full animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 border border-[var(--secondary)]/20 rounded-full" />
        </div>

        {/* Content */}
        <div className="relative z-10 container-main pt-32 md:pt-36 pb-24 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Logo with glow effect */}
            <div className="mb-6 animate-fade-in-up relative inline-block">
              <div className="absolute inset-0 bg-[var(--primary)]/20 blur-3xl rounded-full scale-150" />
              <div className="relative p-3 border-2 border-[var(--primary)]/30 rounded-full bg-[var(--surface)]/50 backdrop-blur-sm">
                <img 
                  src={LOGO_URL} 
                  alt="IHL MUN Logo" 
                  className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full opacity-80"
                />
              </div>
            </div>

            {/* Title */}
            <h1
              className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none mb-6 animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="block text-[var(--text-main)]">{t('ihlModel')}</span>
              <span className="block text-[var(--primary)]">{t('unitedNations')}</span>
            </h1>

            {/* Badge with date and FREE mention */}
            <div
              className="inline-flex flex-col sm:flex-row items-center gap-3 mb-6 animate-fade-in-up"
              style={{ animationDelay: '0.15s' }}
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-[var(--surface)] border border-[var(--primary)]/30">
                <span className="w-2 h-2 bg-[var(--primary)] rounded-full animate-pulse" />
                <span className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider">
                  {settings?.conference_date || 'March 2026'} • Tashkent
                </span>
              </div>
              <span className="text-xs font-mono text-[var(--text-muted)]/70 uppercase tracking-wider">
                {t('freeForSelected')}
              </span>
            </div>

            {/* Description */}
            <p
              className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              {t('heroDescription')}
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap justify-center gap-4 animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              <Link
                to="/committees"
                data-testid="hero-register-btn"
                className="btn-primary flex items-center gap-2 group animate-pulse-glow"
              >
                {t('applyNow')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/selection-process"
                data-testid="hero-selection-btn"
                className="btn-secondary flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                {t('selectionProcess')}
              </Link>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-[var(--text-muted)]/10 animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-[var(--primary)]" />
                </div>
                <p className="font-heading text-2xl md:text-3xl text-[var(--text-main)]">{settings?.conference_date || 'March 2026'}</p>
                <p className="font-mono text-sm text-[var(--text-muted)]">{t('date')}</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-[var(--primary)]" />
                </div>
                <p className="font-heading text-2xl md:text-3xl text-[var(--text-main)]">Tashkent</p>
                <p className="font-mono text-sm text-[var(--text-muted)]">{t('location')}</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-[var(--primary)]" />
                </div>
                <p className="font-heading text-2xl md:text-3xl text-[var(--text-main)]">7</p>
                <p className="font-mono text-sm text-[var(--text-muted)]">{t('committeesCount')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-[var(--primary)]/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-[var(--primary)] rounded-full animate-pulse" />
          </div>
        </div>
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
                  style={{ backgroundImage: `url('${committee.background_image}')` }}
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
      <section data-testid="cta-section" className="section-padding bg-[var(--surface)] relative overflow-hidden">
        <div className="absolute inset-0 gold-glow opacity-50" />
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
