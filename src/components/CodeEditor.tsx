"use client";

import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { LANGUAGE_EXTENSIONS } from "@/constants/languages";
import { CodeEditorProps } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
  const { language } = useLanguage();
  const languageExtension =
    LANGUAGE_EXTENSIONS[language] || LANGUAGE_EXTENSIONS["javascript"];

  return (
    <div className="w-full">
      <CodeMirror
        value={value}
        extensions={[languageExtension]}
        theme="dark"
        onChange={(value) => onChange(value || "")}
        className="border border-gray-700 rounded-lg"
        style={{
          height: "20rem",
          overflowY: "auto",
        }}
      />
    </div>
  );
};

export default CodeEditor;
