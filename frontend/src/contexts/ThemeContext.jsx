import { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const theme = 'dark';

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--background', '#0A1628');
    root.style.setProperty('--surface', '#0F1D32');
    root.style.setProperty('--surface-highlight', '#162544');
    root.style.setProperty('--text-main', '#FFFFFF');
    root.style.setProperty('--text-muted', '#A0B4D0');
    root.style.setProperty('--primary', '#FFC72C');
    root.style.setProperty('--primary-dim', '#E5B327');
    root.style.setProperty('--secondary', '#1E3A8A');
    root.style.setProperty('--accent-glow', 'rgba(255, 199, 44, 0.15)');
    root.style.setProperty('--hero-glow-color', 'rgba(30, 58, 138, 0.3)');
  }, []);

  const toggleTheme = () => { }; // No-op

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
