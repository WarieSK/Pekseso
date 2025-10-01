// src/hooks/useTheme.js
import { useState, useEffect } from "react";

const DARK_CLASS = "dark-mode";
const STORAGE_KEY = "pexeso-dark-mode";

// Funkcia na zistenie, či systém preferuje tmavý režim
const getSystemPreference = () => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false;
};

const useTheme = () => {
  // Inicializácia: Použijeme uloženú preferenciu, inak systémovú preferenciu.
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const storedValue = localStorage.getItem(STORAGE_KEY);

      if (storedValue !== null) {
        // 1. Ak je preferencia uložená, použijeme ju.
        return JSON.parse(storedValue);
      } else {
        // 2. Ak nie je uložená, použijeme systémovú preferenciu.
        return getSystemPreference();
      }
    } catch (error) {
      console.error(
        "Chyba pri čítaní localStorage, použitá systémová preferencia.",
        error
      );
      return getSystemPreference();
    }
  });

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // useEffect na aplikovanie triedy na telo a uloženie do LocalStorage
  useEffect(() => {
    const body = document.body;

    if (isDarkMode) {
      body.classList.add(DARK_CLASS);
    } else {
      body.classList.remove(DARK_CLASS);
    }

    // Uloženie preferencie užívateľa
    localStorage.setItem(STORAGE_KEY, JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Sledovanie systémových zmien, ak nie je nastavená manuálna preferencia
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      if (localStorage.getItem(STORAGE_KEY) === null) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return { isDarkMode, toggleTheme };
};

export default useTheme;
