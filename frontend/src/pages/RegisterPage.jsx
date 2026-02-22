import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertCircle, Info, Loader2 } from 'lucide-react';
import axios from 'axios';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useLanguage } from '@/contexts/LanguageContext';
import { STATIC_COMMITTEES } from '@/data/staticData';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const RegisterPage = () => {
  const { t } = useLanguage();
  const { committeeId } = useParams();

  // Find committee from static data — no API call needed
  const [committee] = useState(() =>
    STATIC_COMMITTEES.find((c) => c.id === committeeId) || null
  );
  const [loading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(''); // e.g. 'Waking up server...'
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Ping the server on mount so it wakes up before the user submits
  useEffect(() => {
    axios.get(`${API}/`).catch(() => { }); // fire-and-forget warm-up
  }, []);

  const [formData, setFormData] = useState({
    first_name: '',
    surname: '',
    email: '',
    phone: '',
    telegram: '',
    date_of_birth: '',
    place_of_study: '',
    mun_experience: '',
    motivation: '',
    global_crisis: '',
  });

  const [wordCounts, setWordCounts] = useState({
    motivation: 0,
    global_crisis: 0,
  });

  useEffect(() => {
    if (!committee && committeeId) {
      setError('Committee not found');
    }
  }, [committee, committeeId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setError('');

    // Count words
    if (name === 'motivation' || name === 'global_crisis') {
      const words = newValue.trim().split(/\s+/).filter(w => w.length > 0);
      setWordCounts((prev) => ({ ...prev, [name]: words.length }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.first_name.trim()) return setError('Please enter your First Name / Имя');
    if (!formData.surname.trim()) return setError('Please enter your Surname / Фамилия');
    if (!formData.email.trim()) return setError('Please enter your Email Address / Адрес электронной почты');
    if (!formData.phone.trim()) return setError('Please enter your Phone Number / Номер телефона');
    if (!formData.telegram.trim()) return setError('Please enter your Telegram Username / Имя пользователя Telegram');
    if (!formData.date_of_birth.trim()) return setError('Please enter your Date of Birth / Дата рождения');
    if (!formData.place_of_study.trim()) return setError('Please enter your Place of Study / Место обучения');
    if (!formData.mun_experience.trim()) return setError('Please describe your MUN experience / Опишите ваш опыт участия в MUN');

    if (!formData.motivation.trim()) return setError('Please enter your motivation / Опишите вашу мотивацию');
    if (wordCounts.motivation > 250) return setError(`Motivation must be max 250 words (currently ${wordCounts.motivation} words) / Мотивация должна быть до 250 слов`);

    if (!formData.global_crisis.trim()) return setError('Please write about a global crisis / Напишите о глобальном кризисе');
    if (wordCounts.global_crisis < 200 || wordCounts.global_crisis > 300) return setError(`Global crisis essay must be 200-300 words (currently ${wordCounts.global_crisis} words) / Эссе о глобальном кризисе должно быть 200-300 слов`);

    setSubmitting(true);
    setSubmitStatus('Sending...');

    // Show a helpful message if the server takes more than 5 seconds to respond
    const slowTimer = setTimeout(() => {
      setSubmitStatus('Waking up server, please wait (~30 sec)...');
    }, 5000);

    try {
      await axios.post(`${API}/registrations`, {
        ...formData,
        committee_id: committeeId,
      }, { timeout: 60000 });
      setSuccess(true);
    } catch (e) {
      const message = e.response?.data?.detail || 'Application failed. Please try again.';
      setError(message);
    } finally {
      clearTimeout(slowTimer);
      setSubmitting(false);
      setSubmitStatus('');
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
            className="inline-flex items-center gap-2 text-text-muted hover:text-[var(--text-main)] transition-colors mb-6"
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
          <div className="bg-surface border border-[var(--text-muted)]/20 p-6 mb-6">
            <h2 className="font-heading text-xl mb-6">{t('personalInformation')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-text-muted mb-2">{t('firstName')} *</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="input-minimal"
                  placeholder={t('firstName')}
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-text-muted mb-2">{t('surname')} *</label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  className="input-minimal"
                  placeholder={t('surname')}
                  required
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
                  required
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
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-text-muted mb-2">{t('telegramUsername')} *</label>
                <input
                  type="text"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleChange}
                  className="input-minimal"
                  placeholder="@username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-text-muted mb-2">{t('dateOfBirth')} *</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className="input-minimal"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-text-muted mb-2">{t('placeOfStudy')} *</label>
                <input
                  type="text"
                  name="place_of_study"
                  value={formData.place_of_study}
                  onChange={handleChange}
                  className="input-minimal"
                  placeholder={t('placeOfStudy')}
                  required
                />
              </div>
            </div>
          </div>

          {/* Essay Questions */}
          <div className="bg-surface border border-[var(--text-muted)]/20 p-6 mb-6">
            <h2 className="font-heading text-xl mb-6">{t('applicationQuestions')}</h2>

            <div className="space-y-8">
              <div>
                <label className="block text-sm text-text-muted mb-2">
                  {t('munExperienceQ')} *
                </label>
                <textarea
                  name="mun_experience"
                  value={formData.mun_experience}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-[var(--text-muted)]/20 p-3 text-[var(--text-main)] resize-none h-24 focus:outline-none focus:border-primary transition-colors"
                  placeholder="N/A"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-text-muted mb-2">
                  {t('motivationQ')} *
                </label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-[var(--text-muted)]/20 p-3 text-[var(--text-main)] resize-none h-40 focus:outline-none focus:border-primary transition-colors"
                  placeholder={t('motivationQ')}
                  required
                />
                <p className={`text-sm mt-1 ${wordCounts.motivation > 250 ? 'text-red-400' : 'text-text-muted'}`}>
                  {wordCounts.motivation}/250 words max
                </p>
              </div>

              <div>
                <label className="block text-sm text-text-muted mb-2">
                  {t('globalCrisisQ')} *
                </label>
                <textarea
                  name="global_crisis"
                  value={formData.global_crisis}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-[var(--text-muted)]/20 p-3 text-[var(--text-main)] resize-none h-56 focus:outline-none focus:border-primary transition-colors"
                  placeholder={t('globalCrisisQ')}
                  required
                />
                <p className={`text-sm mt-1 ${(wordCounts.global_crisis < 200 || wordCounts.global_crisis > 300) ? 'text-red-400' : 'text-green-400'}`}>
                  {wordCounts.global_crisis} words (200-300 required)
                </p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            data-testid="submit-registration"
            className="btn-primary w-full md:w-auto flex items-center justify-center gap-2 min-w-[200px]"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{submitStatus || 'Sending...'}</span>
              </>
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
