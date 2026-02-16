import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import { SectionTitle } from '@/components/common/SectionTitle';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useLanguage } from '@/contexts/LanguageContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const MediaPage = () => {
  const { t } = useLanguage();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await axios.get(`${API}/media`);
        setPhotos(res.data);
      } catch (e) {
        console.error('Error fetching photos:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="page-transition pt-24">
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 hero-glow" />
        <div className="container-main relative">
          <SectionTitle
            title={t('mediaGallery')}
            subtitle={t('photosFromEvents')}
          />
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding pt-0">
        <div className="container-main">
          {photos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {photos.map((photo, i) => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative aspect-square overflow-hidden bg-surface border border-white/5 card-hover animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.05}s` }}
                  data-testid={`photo-${photo.id}`}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm font-mono text-primary">{photo.date}</p>
                    <p className="text-sm text-white truncate">{photo.caption}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-surface border border-white/5">
              <h3 className="font-heading text-2xl mb-4">{t('galleryComingSoon')}</h3>
              <p className="text-text-muted">
                {t('photosShared')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-primary transition-colors"
            onClick={() => setSelectedPhoto(null)}
          >
            <X size={32} />
          </button>
          <div
            className="max-w-5xl max-h-[90vh] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <div className="mt-4 text-center">
              <p className="font-mono text-primary text-sm">{selectedPhoto.date}</p>
              <p className="text-text-muted">{selectedPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaPage;
