import { useState, useEffect } from 'react';
import axios from 'axios';
import { SectionTitle } from '@/components/common/SectionTitle';
import { PersonCard } from '@/components/common/PersonCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useLanguage } from '@/contexts/LanguageContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SpeakersPage = () => {
  const { t } = useLanguage();
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const res = await axios.get(`${API}/speakers`);
        setSpeakers(res.data);
      } catch (e) {
        console.error('Error fetching speakers:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchSpeakers();
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
            backgroundImage: `url('https://images.unsplash.com/photo-1764874299006-bf4266427ec9?w=1600')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="container-main relative">
          <SectionTitle
            title={t('guestSpeakers')}
            subtitle={t('speakersSubtitle')}
          />
        </div>
      </section>

      {/* Speakers Section */}
      <section className="section-padding pt-0">
        <div className="container-main">
          <div className="max-w-3xl mb-16">
            <p className="text-text-muted text-lg leading-relaxed">
              Our opening ceremony features distinguished speakers from various fields including
              diplomacy, academia, and international organizations. Their insights and experiences
              will inspire delegates to engage meaningfully with global issues.
            </p>
          </div>

          {speakers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {speakers.map((speaker, i) => (
                <div
                  key={speaker.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <PersonCard
                    name={speaker.name}
                    role={speaker.title}
                    experience={speaker.experience}
                    photo_url={speaker.photo_url}
                    variant="large"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-surface border border-white/5">
              <h3 className="font-heading text-2xl mb-4">{t('comingSoon')}</h3>
              <p className="text-text-muted">
                {t('speakersComingSoon')}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SpeakersPage;
