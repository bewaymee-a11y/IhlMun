export const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-2 border-[var(--primary)]/20 border-t-[var(--primary)] rounded-full animate-spin`}
      />
    </div>
  );
};

export const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-[var(--text-muted)]">Loading...</p>
      </div>
    </div>
  );
};
