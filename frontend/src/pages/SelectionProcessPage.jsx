import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, FileText, Users, Search, MessageSquare, Mail } from 'lucide-react';
import { SectionTitle } from '@/components/common/SectionTitle';
import { useLanguage } from '@/contexts/LanguageContext';

const SelectionProcessPage = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: FileText,
      title: t('submitApplicationStep'),
      description: t('submitApplicationDesc')
    },
    {
      icon: Search,
      title: t('applicationReview'),
      description: t('applicationReviewDesc')
    },
    {
      icon: MessageSquare,
      title: t('interviewOptional'),
      description: t('interviewDesc')
    },
    {
      icon: Mail,
      title: t('finalDecision'),
      description: t('finalDecisionDesc')
    }
  ];

  const criteria = [
    t('originalityResponses'),
    t('noAiContent'),
    t('noPlagiarism'),
    t('relevanceQuestions'),
    t('depthUnderstanding'),
    t('demonstratedMotivation'),
    t('munExperienceHelpful'),
    t('commitmentParticipate')
  ];

  return (
    <div className="page-transition pt-24">
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 hero-glow" />
        <div className="container-main relative">
          <SectionTitle
            title={t('registrationSelectionProcess')}
            subtitle={t('everythingYouNeed')}
          />

          {/* Free participation banner */}
          <div className="bg-green-500/10 border border-green-500/30 p-6 md:p-8 max-w-3xl">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-8 h-8 text-green-400 shrink-0" />
              <div>
                <h3 className="font-heading text-2xl text-green-400 mb-2">{t('participationCompletelyFree')}</h3>
                <p className="text-text-muted">
                  {t('freeParticipationDescription')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Selection Works */}
      <section className="section-padding pt-0">
        <div className="container-main">
          <h2 className="font-heading text-3xl md:text-4xl mb-12">{t('howSelectionWorks')}</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {steps.map((step, i) => (
              <div
                key={i}
                className="bg-surface border border-[var(--text-muted)]/20 p-6 relative"
              >
                <div className="absolute top-4 right-4 text-primary/20 font-heading text-5xl">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <step.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-heading text-xl mb-3">{step.title}</h3>
                <p className="text-text-muted text-sm">{step.description}</p>
              </div>
            ))}
          </div>

          {/* What We Look For */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl mb-8">{t('whatWeLookFor')}</h2>
              <p className="text-text-muted mb-8">
                {t('whatWeLookForDesc')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {criteria.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-text-muted">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface border border-[var(--text-muted)]/20 p-8">
              <h3 className="font-heading text-2xl mb-6 flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" />
                {t('applicationTips')}
              </h3>
              <div className="space-y-4 text-text-muted">
                <p>
                  <strong className="text-[var(--text-main)]">{t('beOriginal')}</strong> {t('beOriginalDesc')}
                </p>
                <p>
                  <strong className="text-[var(--text-main)]">{t('beSpecific')}</strong> {t('beSpecificDesc')}
                </p>
                <p>
                  <strong className="text-[var(--text-main)]">{t('showPassion')}</strong> {t('showPassionDesc')}
                </p>
                <p>
                  <strong className="text-[var(--text-main)]">{t('meetWordRequirements')}</strong> {t('meetWordRequirementsDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-surface">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl mb-6">{t('readyToApply')}</h2>
            <p className="text-text-muted mb-8">
              {t('chooseCommittee')}
            </p>
            <Link
              to="/committees"
              data-testid="selection-apply-btn"
              className="btn-primary inline-flex items-center gap-2 group"
            >
              {t('viewCommitteesApply')}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SelectionProcessPage;
