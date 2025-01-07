"use client";

import React, { useState, useEffect } from "react";
import CodeEditor from "@/components/CodeEditor";
import OutputDisplay from "@/components/OutputDisplay";
import Sidebar from "@/components/Sidebar";
import StatusBar from "@/components/StatusBar";
import { LANGUAGE_STARTER_CODE, LANGUAGES } from "@/constants/languages";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { language, starterCode, setLanguage } = useLanguage();
  const [code, setCode] = useState<string>(starterCode);
  const [output, setOutput] = useState<string>("");

  // Update code when the language changes
  useEffect(() => {
    setCode(LANGUAGE_STARTER_CODE[language] || "");
  }, [language]);

  // Run code handler
  const handleRunCode = async () => {
    try {
      const response = await fetch("/api/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code, language: language }),
      });
      const data = await response.json();
      if (data.success) {
        setOutput(data.logs.join("\n"));
      } else {
        setOutput(`${data.logs.join("\n")}\nError: ${data.error}`);
      }
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  // Reset code handler
  const handleCodeReset = () => {
    setCode(LANGUAGE_STARTER_CODE[language] || "");
    setOutput("");
  };

  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <Sidebar
        languages={LANGUAGES}
        selectedLanguage={language}
        onSelect={(lang) => setLanguage(lang)}
      />

      <div className="flex flex-col items-center w-full p-4">
        {/* StatusBar */}
        <StatusBar
          selectedLanguage={language}
          onRun={handleRunCode}
          onReset={handleCodeReset}
        />

        {/* CodeEditor */}
        <CodeEditor value={code} onChange={setCode} language={language} />

        {/* OutputDisplay */}
        <OutputDisplay output={output} />
      </div>
    </div>
  );
}
