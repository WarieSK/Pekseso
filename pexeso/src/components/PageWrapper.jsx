// App.js alebo PageWrapper.js

import React from "react";
import useImageLoader from "../hooks/useImageLoader";

// Zoznam URL adries vašich veľkých obrázkov
const CRITICAL_IMAGES = [
  "/assets/hero-background.jpg",
  "/assets/main-gallery-img.jpg",
  // ... ďalšie dôležité obrázky
];

const PageWrapper = ({ children }) => {
  // Využitie hooku na sledovanie načítania
  const imagesLoaded = useImageLoader(CRITICAL_IMAGES);

  // Na tomto mieste môžete implementovať loading animáciu pomocou CSS
  const LoadingAnimation = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div className="spinner">Načítavam...</div>
    </div>
  );

  return (
    <>
      {/* 1. Zobrazíme loading, ak obrázky nie sú načítané */}
      {!imagesLoaded && LoadingAnimation}

      {/* 2. Zobrazíme skutočný obsah, až keď sú obrázky načítané */}
      <div
        style={{
          opacity: imagesLoaded ? 1 : 0,
          transition: "opacity 0.5s",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default PageWrapper;
