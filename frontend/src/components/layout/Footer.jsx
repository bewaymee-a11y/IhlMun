import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin, Calendar, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const LOGO_URL = process.env.PUBLIC_URL + '/logo_transparent.png';

export const Footer = ({ settings }) => {
  const { t } = useLanguage();

  return (
    <footer data-testid="footer" className="mt-0 bg-[var(--surface)] min-h-[280px]">
      {/* Gold accent top bar */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-60" />

      <div className="container-main py-20 md:py-16">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="space-y-5 lg:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_URL}
                alt="IHL MUN Logo"
                className="w-12 h-12 object-contain"
              />
              <div>
                <h3 className="font-heading text-xl text-[var(--text-main)] tracking-wide">IHL MUN</h3>
                <p className="text-xs text-[var(--primary)] uppercase tracking-widest">2026</p>
              </div>
            </div>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              {t('footerDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm uppercase tracking-widest mb-5 text-[var(--primary)]">{t('quickLinks')}</h4>
            <div className="flex flex-col gap-3">
              {[
                { to: '/', label: t('home') },
                { to: '/committees', label: t('committees') },
                { to: '/selection-process', label: t('selection') },
                { to: '/about', label: t('aboutUs') },
                { to: '/media', label: t('media') },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors text-sm flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-[var(--primary)] transition-all duration-300 inline-block" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Conference Info */}
          <div>
            <h4 className="font-heading text-sm uppercase tracking-widest mb-5 text-[var(--primary)]">{t('conferenceInfo')}</h4>
            <div className="flex flex-col gap-4 text-sm text-[var(--text-muted)]">
              <div className="flex items-start gap-3">
                <Calendar size={15} className="text-[var(--primary)] mt-0.5 shrink-0" />
                <span>{settings?.conference_date || 'March 2026'}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-[var(--primary)] mt-0.5 shrink-0" />
                <span>{settings?.conference_location || 'Tashkent, Uzbekistan'}</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={15} className="text-[var(--primary)] mt-0.5 shrink-0" />
                <a href="mailto:ihlmun@mail.com" className="hover:text-[var(--primary)] transition-colors">ihlmun@mail.com</a>
              </div>
            </div>
          </div>

          {/* Social & CTA */}
          <div>
            <h4 className="font-heading text-sm uppercase tracking-widest mb-5 text-[var(--primary)]">{t('connect')}</h4>
            <div className="flex flex-col gap-5">
              <a
                href="https://www.instagram.com/ihl_mun/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-instagram"
                className="flex items-center gap-3 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors group"
              >
                <div className="w-9 h-9 bg-[var(--surface-highlight)] border border-[var(--text-muted)]/10 flex items-center justify-center group-hover:border-[var(--primary)] transition-colors">
                  <Instagram size={16} />
                </div>
                <span className="text-sm">@ihl_mun</span>
              </a>
              <a
                href="https://t.me/ihl_mun"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-telegram"
                className="flex items-center gap-3 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors group"
              >
                <div className="w-9 h-9 bg-[var(--surface-highlight)] border border-[var(--text-muted)]/10 flex items-center justify-center group-hover:border-[var(--primary)] transition-colors">
                  <Send size={16} />
                </div>
                <span className="text-sm">Telegram</span>
              </a>
              <Link
                to="/committees"
                className="btn-primary text-center text-xs py-3 px-5 inline-block"
              >
                {t('applyNow')} →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[var(--text-muted)] text-xs tracking-wide">
            © 2026 IHL Model United Nations. {t('allRightsReserved')}
          </p>
          <Link
            to="/admin"
            className="text-[var(--text-muted)]/50 hover:text-[var(--primary)] transition-colors text-xs"
          >
            {t('adminPanel')}
          </Link>
        </div>
      </div>
    </footer>
  );
};