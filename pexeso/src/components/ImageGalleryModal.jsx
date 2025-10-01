// src/components/ImageGalleryModal.jsx
import { availableImages } from "../utils/imageLoader";
import React, { useState } from "react"; // <--- ZMENA: Import useState
import "./ImageGalleryMOdal.css";

// Pridali sme prop 'onClose', ktorá je potrebná na zatvorenie modalu
const ImageGalleryModal = ({ onClose }) => {
  const imagesToDisplay = availableImages || [];

  // NOVÝ STAV: Drží URL obrázku, ktorý sa má zobraziť v lightboxe (alebo null)
  const [selectedImage, setSelectedImage] = useState(null);

  if (imagesToDisplay.length === 0) {
    // Používame modálne triedy
    return (
      <div className="image-gallery-modal-overlay">
        <div className="image-gallery-modal-content">
          <button className="gallery-close-btn" onClick={onClose}>
            &times;
          </button>
          <p>
            Galéria sa nenačítala. Skontrolujte nastavenie ciest k obrázkom.
          </p>
        </div>
      </div>
    );
  }

  // Funkcia na zobrazenie lightboxu
  const openLightbox = (imgSrc) => {
    setSelectedImage(imgSrc);
  };

  // Funkcia na zatvorenie lightboxu
  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // --- KOMPONENT LIGHTBOXU ---
  const Lightbox = ({ src, onClose }) => {
    if (!src) return null;

    return (
      <div className="lightbox-overlay" onClick={onClose}>
        <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
          <img src={src} alt="Zväčšený obrázok" className="lightbox-image" />
          <button className="lightbox-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
      </div>
    );
  };
  // --------------------------

  return (
    // Hlavný modal galérie
    <div className="image-gallery-modal-overlay">
      <div className="image-gallery-modal-content">
        {/* Tlačidlo na zatvorenie hlavného modalu galérie */}
        <button className="gallery-close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Dostupné Obrázky</h2>
        <p>Kliknutím na obrázok ho zobrazíš v plnej veľkosti.</p>
        <p>Fajné, však? xD</p>

        <div className="image-gallery-grid">
          {imagesToDisplay.map((imgSrc, index) => (
            // ZMENA: Pridanie onClick, ktoré otvorí lightbox
            <div
              key={index}
              className="gallery-card"
              onClick={() => openLightbox(imgSrc)} // <--- NOVÁ LOGIKA
            >
              <img src={imgSrc} alt={`Dostupný obrázok ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Vykreslenie Lightboxu, ak je vybraný obrázok */}
      <Lightbox src={selectedImage} onClose={closeLightbox} />
    </div>
  );
};

export default ImageGalleryModal;
