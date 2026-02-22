import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp, Users } from 'lucide-react';
import { SectionTitle } from '@/components/common/SectionTitle';
import { PersonCard } from '@/components/common/PersonCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { STATIC_COMMITTEES } from '@/data/staticData';

const CommitteesPage = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get('id');

  const [committees, setCommittees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCommittee, setExpandedCommittee] = useState(selectedId);

  useEffect(() => {
    // Use static data — no backend needed
    setCommittees(STATIC_COMMITTEES);
    setLoading(false);
    if (selectedId) {
      setExpandedCommittee(selectedId);
      setTimeout(() => {
        document.getElementById(`committee-${selectedId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [selectedId]);



  return (
    <div className="page-transition pt-24">
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1679205691826-9157415559c2?w=1600')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="container-main relative">
          <SectionTitle
            title={t('ourCommittees')}
            subtitle={t('committeesSubtitle')}
          />
        </div>
      </section>

      {/* Committees List */}
      <section className="section-padding pt-0">
        <div className="container-main">
          <div className="space-y-6">
            {committees.length === 0 ? (
              <div className="text-center py-20 text-[var(--text-muted)]">
                <p className="text-lg">{t('noCommitteesYet') || 'No committees available yet.'}</p>
              </div>
            ) : committees.map((committee, i) => (
              <div
                key={committee.id}
                id={`committee-${committee.id}`}
                data-testid={`committee-${committee.id}`}
                className={`bg-surface border border-[var(--text-muted)]/20 overflow-hidden transition-all duration-500 ${expandedCommittee === committee.id ? 'border-primary/30' : ''
                  }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Header */}
                <button
                  onClick={() => setExpandedCommittee(expandedCommittee === committee.id ? null : committee.id)}
                  className="w-full flex items-center justify-between p-4 md:p-8 text-left group"
                  data-testid={`committee-toggle-${committee.id}`}
                >
                  <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-0">
                    <div
                      className="w-12 h-12 md:w-20 md:h-20 bg-cover bg-center rounded-sm shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundImage: `url('${process.env.PUBLIC_URL}${committee.background_image?.replace('./', '/')}')` }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {!committee.registration_open && (
                          <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 font-mono uppercase">
                            {t('registrationClosed')}
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading text-lg md:text-3xl group-hover:text-primary transition-colors truncate">
                        {committee.name_ru || committee.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-text-muted text-xs md:text-sm">
                        <Users size={14} />
                        <span>{committee.chairs?.length || 0} {t('chairs')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-text-muted group-hover:text-primary transition-colors shrink-0 ml-2">
                    {expandedCommittee === committee.id ? (
                      <ChevronUp size={24} />
                    ) : (
                      <ChevronDown size={24} />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${expandedCommittee === committee.id ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="px-3 sm:px-6 md:px-8 pb-8">
                    {/* Background Image inside Expanded View */}
                    <div
                      className="relative h-48 md:h-64 mb-8 bg-cover rounded-sm"
                      style={{
                        backgroundImage: `url('${process.env.PUBLIC_URL}${committee.background_image?.replace('./', '/')}')`,
                        backgroundPosition: committee.banner_position || 'center 20%'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                    </div>

                    {/* Description */}
                    <p className="text-text-muted text-lg leading-relaxed mb-8 max-w-3xl">
                      {committee.description}
                    </p>

                    {/* Agenda */}
                    <div className="mb-8 md:mb-10">
                      <h4 className="font-heading text-lg md:text-xl mb-4">{t('agenda')}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {committee.agenda?.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 p-3 md:p-4 bg-surface-highlight border border-[var(--text-muted)]/20"
                          >
                            <span className="text-primary font-mono text-sm shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                            <span className="text-text-muted text-sm md:text-base">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Chairs */}
                    <div className="mb-8 md:mb-10">
                      <h4 className="font-heading text-lg md:text-xl mb-4 md:mb-6">{t('committeeChairs')}</h4>
                      <div className="flex flex-wrap -mx-2 md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-6">
                        {committee.chairs?.map((chair) => (
                          <div key={chair.id} className="w-1/2 md:w-auto px-2 mb-4 md:mb-0">
                            <PersonCard
                              name={chair.name}
                              role={chair.role}
                              experience={chair.experience}
                              photo_url={chair.photo_url}
                              imagePosition={chair.image_position || 'center 40%'}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Register Button */}
                    {committee.registration_open ? (
                      <Link
                        to={`/register/${committee.id}`}
                        data-testid={`register-btn-${committee.id}`}
                        className="btn-primary inline-flex items-center gap-2 group"
                      >
                        {t('registerForCommittee')}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="btn-secondary opacity-50 cursor-not-allowed"
                      >
                        {t('registrationClosed')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommitteesPage;
