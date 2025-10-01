// src/components/ResultModal.jsx
import React from "react";
import "./ResultModal.css";

const ResultModal = ({ finalTime, onNewGame, onShowGallery }) => {
  // Funkcia na formátovanie času
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    // Prekrytie pozadia (overlay)
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Hurá!!!</h2>
        <p>
          Dokončila si pexeso! Nezabudni si zapísať čas. Nikdy nevieš kedy
          prekonáš svoj rekord (Obaja vieme, že ten môj už nikto neprekoná xD).
        </p>

        <div className="modal-time-result">
          Tvoj čas:
          <strong>{formatTime(finalTime)}</strong>
        </div>

        {/* KONTAJNER PRE TLAČIDLÁ - používa .modal-actions */}
        <div className="modal-actions">
          {/* PRIMÁRNE TLAČIDLO (Hrať znova) */}
          <button className="btn-primary" onClick={onNewGame}>
            Hrať Znova
          </button>

          {/* SEKUNDÁRNE TLAČIDLO (Galéria) - volá funkciu na otvorenie galérie */}
          <button className="btn-secondary" onClick={onShowGallery}>
            Galéria
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
