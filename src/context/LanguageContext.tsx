"use client";
import { LANGUAGE_STARTER_CODE } from "@/constants/languages";
import React, { createContext, useContext, useState } from "react";

interface LanguageContextType {
  language: string;
  starterCode: string;
  setLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [language, setLanguage] = useState("javascript");
  const [starterCode, setStarterCode] = useState(
    LANGUAGE_STARTER_CODE[language]
  );
  const handleSetLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
    setStarterCode(LANGUAGE_STARTER_CODE[newLanguage] || "");
  };

  return (
    <LanguageContext.Provider
      value={{ language, starterCode, setLanguage: handleSetLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const languageContext = useContext(LanguageContext);

  if (!languageContext) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return languageContext;
};
