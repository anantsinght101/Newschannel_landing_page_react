import { createContext, useContext, useState } from "react";

const LanguageContext = createContext({
  lang: "mr",
  setLang: () => {},
  toggleLang: () => {},
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("mr"); // Default language: Marathi

  const toggleLang = () => {
    setLang((prev) => (prev === "mr" ? "en" : "mr"));
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
