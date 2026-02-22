import { User } from 'lucide-react';

export const PersonCard = ({ name, role, experience, photo_url, variant = 'default', imagePosition = 'center 40%' }) => {
  const isPlaceholder = !photo_url || photo_url.includes('placeholder');
  let imageUrl = photo_url;
  if (photo_url?.startsWith('/')) {
    imageUrl = `${process.env.PUBLIC_URL || ''}${photo_url}`;
  } else if (photo_url?.startsWith('./')) {
    imageUrl = `${process.env.PUBLIC_URL || ''}/${photo_url.substring(2)}`;
  }

  return (
    <div
      data-testid="person-card"
      className={`group relative ${variant === 'large'
        ? 'bg-[var(--surface)] border border-[var(--text-muted)]/10 p-4 md:p-6 card-hover overflow-hidden'
        : 'text-center'
        }`}
    >
      {/* Photo container — vertical portrait */}
      <div
        className={`relative mx-auto overflow-hidden ${variant === 'large'
          ? 'w-full aspect-[3/4] mb-3 md:mb-4'
          : 'w-32 sm:w-40 md:w-48 aspect-[4/5] rounded-2xl mb-3 md:mb-4 border border-[var(--text-muted)]/10'
          }`}
      >
        {isPlaceholder ? (
          <div className="w-full h-full bg-[var(--surface-highlight)] flex items-center justify-center">
            <User className="w-12 h-12 text-[var(--text-muted)]" />
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: imagePosition }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className={variant === 'large' ? '' : 'px-1'}>
        <h3 className="font-heading text-sm md:text-base mb-1 text-[var(--text-main)]">{name}</h3>
        <p className="text-[var(--primary)] text-xs font-mono uppercase tracking-wider mb-1 md:mb-2">{role}</p>
        <p className="text-[var(--text-muted)] text-xs leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">{experience}</p>
      </div>
    </div>
  );
};
