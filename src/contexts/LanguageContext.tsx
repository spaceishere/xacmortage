"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface LanguageContextType {
  isEnglish: boolean;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [isEnglish, setIsEnglish] = useState(false); // Default to Mongolian

  const toggleLanguage = () => {
    setIsEnglish((prev) => !prev);
  };

  return <LanguageContext.Provider value={{ isEnglish, toggleLanguage }}>{children}</LanguageContext.Provider>;
};
