import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const LOGO_URL = process.env.PUBLIC_URL + '/logo_original.jpg';

export const Footer = ({ settings }) => {
  const { t } = useLanguage();

  return (
    <footer data-testid="footer" className="bg-[var(--surface)] border-t border-[var(--text-muted)]/10">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_URL}
                alt="IHL MUN Logo"
                className="w-14 h-14 object-contain mix-blend-screen"
                style={{
                  filter: 'brightness(0.9) contrast(1.4) saturate(1.1)',
                  clipPath: 'circle(48%)'
                }}
              />
              <div>
                <h3 className="font-heading text-xl text-[var(--text-main)]">IHL MUN</h3>
                <p className="text-sm text-[var(--text-muted)]">Tashkent, Uzbekistan</p>
              </div>
            </div>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              {t('footerDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg mb-4 text-[var(--primary)]">{t('quickLinks')}</h4>
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors text-sm">{t('home')}</Link>
              <Link to="/committees" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors text-sm">{t('committees')}</Link>
              <Link to="/selection-process" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors text-sm">{t('selection')}</Link>
              <Link to="/about" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors text-sm">{t('aboutUs')}</Link>
              <Link to="/media" className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors text-sm">{t('media')}</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg mb-4 text-[var(--primary)]">{t('conferenceInfo')}</h4>
            <div className="flex flex-col gap-3 text-sm text-[var(--text-muted)]">
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-[var(--primary)]" />
                <span>{settings?.conference_date || 'March 2026'}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-[var(--primary)]" />
                <span>{settings?.conference_location || 'Tashkent, Uzbekistan'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[var(--primary)]" />
                <span>ihlmun@example.com</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-lg mb-4 text-[var(--primary)]">{t('connect')}</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/ihl_mun/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-instagram"
                className="w-10 h-10 bg-[var(--surface-highlight)] border border-[var(--text-muted)]/10 flex items-center justify-center hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors text-[var(--text-muted)]"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[var(--text-muted)]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--text-muted)] text-sm">
            © 2026 IHL Model United Nations. {t('allRightsReserved')}
          </p>
          <Link
            to="/admin"
            className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors text-sm"
          >
            {t('adminPanel')}
          </Link>
        </div>
      </div>
    </footer>
  );
};
