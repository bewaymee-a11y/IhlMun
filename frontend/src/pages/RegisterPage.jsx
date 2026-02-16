import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertCircle, Info } from 'lucide-react';
import axios from 'axios';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useLanguage } from '@/contexts/LanguageContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const RegisterPage = () => {
  const { t, language } = useLanguage();
  const { committeeId } = useParams();
  
  const [committee, setCommittee] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    full_name: '',
    institution: '',
    phone: '',
    telegram: '',
    email: '',
    why_attend: '',
    mun_experience: '',
    why_committee: '',
    alternative_committees: '',
    consent_interview: false,
    understands_selection: false,
  });

  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [commRes, settingsRes] = await Promise.all([
          axios.get(`${API}/committees/${committeeId}`),
          axios.get(`${API}/settings`)
        ]);
        setCommittee(commRes.data);
        setSettings(settingsRes.data);
      } catch (e) {
        console.error('Error fetching data:', e);
        setError('Committee not found');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [committeeId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setError('');

    // Count words for why_attend
    if (name === 'why_attend') {
      const words = value.trim().split(/\s+/).filter(w => w.length > 0);
      setWordCount(words.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.full_name.trim()) return setError('Please enter your full name');
    if (!formData.institution.trim()) return setError('Please enter your institution');
    if (!formData.phone.trim()) return setError('Please enter your phone number');
    if (!formData.telegram.trim()) return setError('Please enter your Telegram username');
    if (!formData.email.trim()) return setError('Please enter your email');
    if (wordCount < 80) return setError(`"Why do you want to attend" must be at least 80 words (currently ${wordCount} words)`);
    if (!formData.mun_experience.trim()) return setError('Please describe your MUN experience');
    if (!formData.why_committee.trim()) return setError('Please explain why you chose this committee');
    if (!formData.alternative_committees.trim()) return setError('Please list alternative committees');
    if (!formData.understands_selection) return setError('Please confirm you understand the selection process');

    setSubmitting(true);

    try {
      await axios.post(`${API}/registrations`, {
        ...formData,
        committee_id: committeeId,
      });
      setSuccess(true);
    } catch (e) {
      const message = e.response?.data?.detail || 'Application failed. Please try again.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center animate-scale-in">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="font-heading text-3xl mb-4">{t('applicationReceived')}</h1>
          <p className="text-text-muted mb-8">
            {t('thankYouApplying')} <span className="text-primary">{committee?.name}</span>.
            {' '}{t('reviewContact')}
          </p>
          <Link to="/committees" className="btn-primary">
            {t('backToCommittees')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition min-h-screen pt-20 pb-12">
      <div className="container-main">
        {/* Header */}
        <div className="py-8 md:py-12">
          <Link
            to="/committees"
            className="inline-flex items-center gap-2 text-text-muted hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            <span className="text-sm font-mono uppercase tracking-wider">{t('backToCommittees')}</span>
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4">
            {t('applyFor')} <span className="text-primary">{committee?.name_ru || committee?.name}</span>
          </h1>
          <p className="text-text-muted max-w-2xl">
            {t('fillApplicationForm')}
          </p>
        </div>

        {/* Free participation notice */}
        <div className="bg-primary/10 border border-primary/30 p-4 md:p-6 mb-8 flex items-start gap-4">
          <Info className="w-6 h-6 text-primary shrink-0 mt-0.5" />
          <div>
            <h3 className="font-heading text-lg text-primary mb-2">{t('participationIsFree')}</h3>
            <p className="text-text-muted text-sm">
              {t('freeNotice')}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-3xl" data-testid="registration-form">
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 text-red-400 mb-6" data-testid="form-error">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {/* Personal Information */}
          <div className="bg-surface border border-white/5 p-6 mb-6">
            <h2 className="font-heading text-xl mb-6">{t('personalInformation')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-text-muted mb-2">{t('fullName')} *</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="input-minimal"
                  placeholder={t('fullName')}
                  data-testid="input-full-name"
                />
              </div>

              <div>
                <label className="block text-sm text-text-muted mb-2">{t('institution')} *</label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  className="input-minimal"
                  placeholder={t('institution')}
                  data-testid="input-institution"
                />
              </div>

              <div>
                <label className="block text-sm text-text-muted mb-2">{t('phoneNumber')} *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-minimal"
                  placeholder="+998 XX XXX XX XX"
                  data-testid="input-phone"
                />
              </div>

              <div>
                <label className="block text-sm text-text-muted mb-2">Telegram *</label>
                <input
                  type="text"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleChange}
                  className="input-minimal"
                  placeholder="@username"
                  data-testid="input-telegram"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-text-muted mb-2">{t('email')} *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-minimal"
                  placeholder="your@email.com"
                  data-testid="input-email"
                />
              </div>
            </div>
          </div>

          {/* Essay Questions */}
          <div className="bg-surface border border-white/5 p-6 mb-6">
            <h2 className="font-heading text-xl mb-6">{t('applicationQuestions')}</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-text-muted mb-2">
                  {t('whyAttend')} * <span className="text-primary">({t('minimum80Words')})</span>
                </label>
                <textarea
                  name="why_attend"
                  value={formData.why_attend}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-white/10 p-3 text-white resize-none h-40 focus:outline-none focus:border-primary transition-colors"
                  placeholder={t('whyAttend')}
                  data-testid="input-why-attend"
                />
                <p className={`text-sm mt-1 ${wordCount >= 80 ? 'text-green-400' : 'text-text-muted'}`}>
                  {t('wordCount')}: {wordCount}/80 {t('minimum')}
                </p>
              </div>

              <div>
                <label className="block text-sm text-text-muted mb-2">
                  {t('munExperience')} * <span className="text-primary">({t('twoSentences')})</span>
                </label>
                <textarea
                  name="mun_experience"
                  value={formData.mun_experience}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-white/10 p-3 text-white resize-none h-24 focus:outline-none focus:border-primary transition-colors"
                  placeholder={t('munExperience')}
                  data-testid="input-mun-experience"
                />
              </div>

              <div>
                <label className="block text-sm text-text-muted mb-2">
                  {t('whyCommittee')} {committee?.name}? *
                </label>
                <textarea
                  name="why_committee"
                  value={formData.why_committee}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-white/10 p-3 text-white resize-none h-24 focus:outline-none focus:border-primary transition-colors"
                  placeholder={t('whyCommittee')}
                  data-testid="input-why-committee"
                />
              </div>

              <div>
                <label className="block text-sm text-text-muted mb-2">
                  {t('alternativeCommittees')} *
                </label>
                <textarea
                  name="alternative_committees"
                  value={formData.alternative_committees}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-white/10 p-3 text-white resize-none h-24 focus:outline-none focus:border-primary transition-colors"
                  placeholder={t('alternativeCommittees')}
                  data-testid="input-alternative-committees"
                />
              </div>
            </div>
          </div>

          {/* Consent */}
          <div className="bg-surface border border-white/5 p-6 mb-6">
            <h2 className="font-heading text-xl mb-6">{t('consentConfirmation')}</h2>
            
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="consent_interview"
                  checked={formData.consent_interview}
                  onChange={handleChange}
                  className="w-5 h-5 accent-primary mt-0.5"
                  data-testid="checkbox-consent-interview"
                />
                <span className="text-text-muted">
                  {t('consentInterview')}
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="understands_selection"
                  checked={formData.understands_selection}
                  onChange={handleChange}
                  className="w-5 h-5 accent-primary mt-0.5"
                  data-testid="checkbox-understands-selection"
                />
                <span className="text-text-muted">
                  {t('understandsSelection')} *
                </span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            data-testid="submit-registration"
            className="btn-primary w-full md:w-auto flex items-center justify-center gap-2"
          >
            {submitting ? (
              <LoadingSpinner size="sm" />
            ) : (
              t('submitApplication')
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
