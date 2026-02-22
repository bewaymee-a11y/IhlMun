import { useState, useEffect } from 'react';
import { SectionTitle } from '@/components/common/SectionTitle';
import { PersonCard } from '@/components/common/PersonCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { STATIC_SECRETARIAT, STATIC_SETTINGS } from '@/data/staticData';

const AboutPage = () => {
  const { t } = useLanguage();
  const [secretariat] = useState(STATIC_SECRETARIAT);
  const [settings] = useState(STATIC_SETTINGS);

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
              </div>
            </div>

            <div className="bg-surface border border-[var(--text-muted)]/20 p-8">
              <h4 className="font-heading text-2xl mb-6">{t('conferenceDetails')}</h4>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-[var(--text-muted)]/20 gap-1 sm:gap-4">
                  <span className="text-text-muted">{t('date')}</span>
                  <span className="font-mono text-primary">{settings?.conference_date || '18–19 April 2026'}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-[var(--text-muted)]/20 gap-1 sm:gap-4">
                  <span className="text-text-muted">{t('location')}</span>
                  <span className="font-mono">{settings?.conference_location || 'International House Lyceum, Tashkent'}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-[var(--text-muted)]/20 gap-1 sm:gap-4">
                  <span className="text-text-muted">{t('committeesCount')}</span>
                  <span className="font-mono">8</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-3 gap-1 sm:gap-4">
                  <span className="text-text-muted">{t('delegates')}</span>
                  <span className="font-mono">200+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secretariat Section */}
          <div>
            <SectionTitle
              title="The Secretariat"
              subtitle="Meet the Minds Behind the Conference"
            />

            {secretariat.length > 0 ? (
              <>
                {/* Top 3 Leaders */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
                  {secretariat.filter(m => m.tier === 1).map((member, i) => (
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
                        variant="large"
                      />
                    </div>
                  ))}
                </div>

                {/* Secretariat Letter */}
                <div className="bg-[var(--surface)] border border-[var(--primary)]/20 p-8 md:p-12 max-w-4xl mx-auto mb-20 text-[var(--text-muted)] space-y-6 text-sm md:text-base leading-relaxed font-serif italic text-justify relative">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[var(--primary)] -translate-x-2 -translate-y-2" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[var(--primary)] translate-x-2 translate-y-2" />

                  <p className="font-heading not-italic text-lg text-[var(--text-main)]">Dear Esteemed Delegates,</p>

                  <p>On behalf of the entire Secretariat team, it is our distinct honor to welcome you to IHL MUN – Interhouse Model United Nations.</p>

                  <p>This conference is the product of months of dedication, collaboration, and thoughtful preparation across every branch of our Secretariat. Yet, beyond schedules, agendas, and planning, it is your presence — your ideas, engagement, and commitment — that defines the spirit of this conference. It is through your participation that dialogue gains meaning and debate gains purpose, and for this, we extend our sincere appreciation.</p>

                  <p>Our Secretariat is united by a shared belief in the value of Model United Nations as a platform for growth, responsibility, and dialogue. From the guidance of the Secretary-General and Director-General, to the leadership of the various departmental heads, and the efforts of every coordinator and volunteer working behind the scenes, this conference stands as a collective endeavor. Each member of our team has contributed time, care, and determination to ensure that IHL MUN is conducted with academic depth, organizational excellence, and genuine respect for every delegate.</p>

                  <p>We recognize the responsibility entrusted to us in creating an environment where discussion is meaningful, perspectives are valued, and every participant feels supported. Throughout the conference, you will engage with complex global challenges that demand critical thinking, cooperation, and principled diplomacy. We encourage you to approach debate with openness, integrity, and mutual respect, knowing that it is through sincere dialogue that understanding is built and progress is achieved.</p>

                  <p>Whether this is your first MUN experience or one of many, we hope that IHL MUN offers you an opportunity not only to strengthen your skills, but also to gain perspective, confidence, and lasting connections. Our aim is for every delegate to leave this conference with a deeper appreciation for diplomacy and a renewed sense of purpose.</p>

                  <p>Please remember that the Secretariat team remains fully at your disposal throughout the conference. Should you require guidance, assistance, or clarification, we are always ready to support you. Your experience is of great importance to us.</p>

                  <p>We look forward to welcoming you and witnessing the thoughtful debate, responsible leadership, and constructive solutions you will bring to our committees. Until then, we wish you productive preparation and a truly meaningful conference experience.</p>

                  <div className="pt-6 not-italic font-heading">
                    <p className="text-[var(--text-main)] mb-1">With warm regards,</p>
                    <p className="text-[var(--primary)]">The Secretariat Team</p>
                    <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mt-1">IHL MUN – Interhouse Model United Nations</p>
                  </div>
                </div>

                {/* Other Members */}
                <div className="py-8 border-t border-[var(--text-muted)]/10">
                  <h3 className="font-heading text-xl text-center mb-12 uppercase tracking-widest text-[var(--text-main)]">Secretariat Departments</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {secretariat.filter(m => m.tier === 2).map((member, i) => (
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
                </div>
              </>
            ) : (
              <div className="text-center py-16 bg-[var(--surface)] border border-[var(--text-muted)]/20">
                <p className="text-[var(--text-muted)]">
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
