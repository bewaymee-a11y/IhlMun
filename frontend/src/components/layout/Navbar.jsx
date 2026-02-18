import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Sun, Moon, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const LOGO_URL = process.env.PUBLIC_URL + '/logo_transparent.png';

export const Navbar = ({ settings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setLangMenuOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/committees', label: t('committees') },
    { to: '/selection-process', label: t('selection') },
    { to: '/about', label: t('aboutUs') },
    { to: '/media', label: t('media') },
  ];

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  ];

  const isActive = (path) => location.pathname === path;

  const currentLang = languages.find(l => l.code === language);

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-[var(--surface)] border-b border-[var(--text-muted)]/10' : 'bg-transparent'
        }`}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            data-testid="navbar-logo"
            className="flex items-center gap-2 md:gap-3 group z-50"
          >
            <img
              src={LOGO_URL}
              alt="IHL MUN Logo"
              className="h-8 w-8 md:h-12 md:w-12 object-contain"
            />
            <span className="font-heading text-lg md:text-xl tracking-tight text-[var(--text-main)] group-hover:text-[var(--primary)] transition-colors">
              IHL MUN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-testid={`nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
                className={`text-sm uppercase tracking-widest transition-colors link-underline ${isActive(link.to)
                  ? 'text-[var(--primary)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 md:gap-3">


            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                data-testid="language-toggle"
                className="flex items-center gap-1 p-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
              >
                <Globe size={18} />
                <span className="text-xs font-mono hidden md:inline">{language.toUpperCase()}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 top-full mt-2 bg-[var(--surface)] border border-[var(--text-muted)]/20 shadow-lg min-w-[140px] z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setLangMenuOpen(false); }}
                      data-testid={`lang-${lang.code}`}
                      className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-[var(--surface-highlight)] transition-colors ${language === lang.code ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'
                        }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/ihl_mun/"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="instagram-link"
              className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors z-50"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>

            {/* Register Button */}
            <Link
              to="/committees"
              data-testid="nav-register-btn"
              className="hidden md:block btn-primary text-xs md:text-sm px-4 md:px-6 py-2 md:py-3"
            >
              {t('applyNow')}
            </Link>

            {/* Mobile menu button */}
            <button
              data-testid="mobile-menu-btn"
              className="lg:hidden p-2 text-[var(--text-main)] hover:text-[var(--primary)] transition-colors z-50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-[var(--background)] z-40 transition-all duration-300"
          style={{ top: '64px' }}
        >
          <div className="container-main py-8">
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  data-testid={`mobile-nav-${link.label.toLowerCase().replace(' ', '-')}`}
                  className={`text-2xl font-heading uppercase tracking-wider py-2 transition-colors border-b border-[var(--text-muted)]/10 ${isActive(link.to)
                    ? 'text-[var(--primary)]'
                    : 'text-[var(--text-main)] hover:text-[var(--primary)]'
                    }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Language Selector */}
              <div className="flex gap-2 py-4 border-b border-[var(--text-muted)]/10">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`flex items-center gap-2 px-4 py-2 border ${language === lang.code
                      ? 'border-[var(--primary)] text-[var(--primary)]'
                      : 'border-[var(--text-muted)]/20 text-[var(--text-muted)]'
                      }`}
                  >
                    <span>{lang.flag}</span>
                    <span className="text-sm">{lang.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>

              <Link
                to="/committees"
                onClick={() => setIsOpen(false)}
                data-testid="mobile-register-btn"
                className="btn-primary text-center mt-4"
              >
                {t('applyNow')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
