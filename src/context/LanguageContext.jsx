import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../i18n/translations";

const LanguageContext = createContext({
  lang: "mr",
  setLang: () => {},
  toggleLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem("newsyatra_lang");
    return saved === "en" || saved === "mr" ? saved : "mr";
  });

  useEffect(() => {
    localStorage.setItem("newsyatra_lang", lang);
  }, [lang]);

  const setLang = (newLang) => {
    if (newLang === "mr" || newLang === "en") {
      setLangState(newLang);
    }
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === "mr" ? "en" : "mr"));
  };

  /**
   * Centralized i18n lookup function
   * @param {string} key - Translation key in translations.js
   * @returns {string} Translated UI string for active language
   */
  const t = (key) => {
    if (!translations[key]) {
      console.warn(`[i18n] Missing translation key: "${key}"`);
      return key;
    }
    return translations[key][lang] || translations[key].mr || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
