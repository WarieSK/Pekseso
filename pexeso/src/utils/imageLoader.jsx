// Vite špecifická funkcia: import.meta.glob
// Načíta všetky súbory s danými príponami z priečinka
const imageModules = import.meta.glob(
  "../assets/images/*.{png,jpg,jpeg,svg,JPG,JPEG,PNG}",
  {
    eager: true,
  }
);

/**
 * Pole reťazcov, kde každý reťazec je verejná cesta (URL) k danému obrázku.
 *
 * imageModules vyzerá napr. takto:
 * {
 * "../assets/images/foto1.jpg": { default: "/src/assets/images/foto1.jpg" },
 * ...
 * }
 */
export const availableImages = Object.values(imageModules).map(
  (module) => module.default
);

console.log("Načítané obrázky (availableImages):", availableImages);
console.log("Počet obrázkov:", availableImages.length);
// Všetky cesty k obrázkom budú načítané hneď, ako sa načíta tento modul.
