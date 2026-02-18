import { useState, useEffect } from 'react';
import axios from 'axios';
import { SectionTitle } from '@/components/common/SectionTitle';
import { PersonCard } from '@/components/common/PersonCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useLanguage } from '@/contexts/LanguageContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AboutPage = () => {
  const { t } = useLanguage();
  const [secretariat, setSecretariat] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [secRes, settingsRes] = await Promise.all([
          axios.get(`${API}/secretariat`),
          axios.get(`${API}/settings`)
        ]);
        setSecretariat(secRes.data);
        setSettings(settingsRes.data);
      } catch (e) {
        console.error('Error fetching data:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="page-transition pt-24">
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1668792125379-2f3978a21586?w=1600')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="container-main relative">
          <SectionTitle
            title={t('aboutUs')}
            subtitle={t('meetTheTeam')}
          />
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding pt-0">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
            <div>
              <h3 className="font-heading text-3xl mb-6">{t('ourMission')}</h3>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  {settings?.about_description ||
                    'IHL Model United Nations is the premier MUN conference in Uzbekistan, bringing together young diplomats from across the region.'}
                </p>
                <p>
                  Our conference provides a platform for students to develop their skills in
                  diplomacy, public speaking, negotiation, and critical thinking while engaging
                  with pressing global issues.
                </p>
                <p>
                  Hosted in the historic city of Tashkent, IHL MUN brings together participants
                  from Central Asia and beyond to simulate the workings of the United Nations
                  and other international bodies.
                </p>
              </div>
            </div>

            <div className="bg-surface border border-[var(--text-muted)]/20 p-8">
              <h4 className="font-heading text-2xl mb-6">{t('conferenceDetails')}</h4>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-[var(--text-muted)]/20">
                  <span className="text-text-muted">{t('date')}</span>
                  <span className="font-mono text-primary">{settings?.conference_date || '18–19 April 2026'}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[var(--text-muted)]/20">
                  <span className="text-text-muted">{t('location')}</span>
                  <span className="font-mono">{settings?.conference_location || 'International House Lyceum, Tashkent'}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[var(--text-muted)]/20">
                  <span className="text-text-muted">{t('committeesCount')}</span>
                  <span className="font-mono">8</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-text-muted">{t('delegates')}</span>
                  <span className="font-mono">200+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secretariat */}
          <div>
            <SectionTitle
              title={t('theSecretariat')}
              subtitle={t('meetTheTeam')}
            />

            {secretariat.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {secretariat.map((member, i) => (
                  <div
                    key={member.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <PersonCard
                      name={member.name}
                      role={member.role}
                      experience={member.experience}
                      photo_url={member.photo_url}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-surface border border-[var(--text-muted)]/20">
                <p className="text-text-muted">
                  {t('secretariatSoon')}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
