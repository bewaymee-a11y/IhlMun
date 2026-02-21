import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import CommitteesPage from '@/pages/CommitteesPage';
import RegisterPage from '@/pages/RegisterPage';
import AboutPage from '@/pages/AboutPage';
import SpeakersPage from '@/pages/SpeakersPage';
import MediaPage from '@/pages/MediaPage';
import SelectionProcessPage from '@/pages/SelectionProcessPage';
import AdminPage from '@/pages/AdminPage';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function AppContent() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${API}/settings`);
        setSettings(res.data);
      } catch (e) {
        console.error('Error fetching settings:', e);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="App min-h-screen bg-[var(--background)] text-[var(--text-main)] transition-colors duration-300">
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />

      <HashRouter>
        <Routes>
          {/* Admin route without navbar/footer */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Public routes with navbar/footer */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <main>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/committees" element={<CommitteesPage />} />
                    <Route path="/register/:committeeId" element={<RegisterPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/speakers" element={<SpeakersPage />} />
                    <Route path="/media" element={<MediaPage />} />
                    <Route path="/selection-process" element={<SelectionProcessPage />} />
                  </Routes>
                </main>
                <Footer settings={settings} />
              </>
            }
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
