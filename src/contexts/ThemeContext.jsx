import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    // Update CSS variables based on theme
    const root = document.documentElement;
    
    if (theme === 'light') {
      root.style.setProperty('--background', '#F5F7FA');
      root.style.setProperty('--surface', '#FFFFFF');
      root.style.setProperty('--surface-highlight', '#F0F2F5');
      root.style.setProperty('--text-main', '#1A1A2E');
      root.style.setProperty('--text-muted', '#6B7280');
      root.style.setProperty('--primary', '#1E3A8A');
      root.style.setProperty('--primary-dim', '#1E40AF');
      root.style.setProperty('--secondary', '#3B82F6');
      root.style.setProperty('--accent-glow', 'rgba(30, 58, 138, 0.15)');
    } else {
      root.style.setProperty('--background', '#0A1628');
      root.style.setProperty('--surface', '#0F1D32');
      root.style.setProperty('--surface-highlight', '#162544');
      root.style.setProperty('--text-main', '#FFFFFF');
      root.style.setProperty('--text-muted', '#A0B4D0');
      root.style.setProperty('--primary', '#FFC72C');
      root.style.setProperty('--primary-dim', '#E5B327');
      root.style.setProperty('--secondary', '#1E3A8A');
      root.style.setProperty('--accent-glow', 'rgba(255, 199, 44, 0.15)');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
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
