export const SectionTitle = ({ title, subtitle, align = 'left', className = '' }) => {
  return (
    <div
      className={`mb-12 md:mb-16 ${
        align === 'center' ? 'text-center' : ''
      } ${className}`}
    >
      <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-4 animate-fade-in-up text-[var(--text-main)]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[var(--text-muted)] text-lg md:text-xl max-w-2xl animate-fade-in-up delay-100" style={{ animationDelay: '0.1s' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
