import { User } from 'lucide-react';

export const PersonCard = ({ name, role, experience, photo_url, variant = 'default' }) => {
  const isPlaceholder = !photo_url || photo_url.includes('placeholder');

  return (
    <div
      data-testid="person-card"
      className={`group relative overflow-hidden ${
        variant === 'large'
          ? 'bg-[var(--surface)] border border-[var(--text-muted)]/10 p-4 md:p-6 card-hover'
          : 'text-center'
      }`}
    >
      <div
        className={`relative mx-auto overflow-hidden ${
          variant === 'large'
            ? 'w-full h-32 md:h-48 mb-3 md:mb-4'
            : 'w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full mb-3 md:mb-4'
        }`}
      >
        {isPlaceholder ? (
          <div className="w-full h-full bg-[var(--surface-highlight)] flex items-center justify-center">
            <User className="w-8 h-8 md:w-16 md:h-16 text-[var(--text-muted)]" />
          </div>
        ) : (
          <img
            src={photo_url}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className={variant === 'large' ? '' : 'px-1'}>
        <h3 className="font-heading text-sm md:text-lg lg:text-xl mb-1 truncate text-[var(--text-main)]">{name}</h3>
        <p className="text-[var(--primary)] text-xs md:text-sm font-mono uppercase tracking-wider mb-1 md:mb-2 truncate">{role}</p>
        <p className="text-[var(--text-muted)] text-xs md:text-sm leading-relaxed line-clamp-2">{experience}</p>
      </div>
    </div>
  );
};
