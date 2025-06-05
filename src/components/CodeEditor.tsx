"use client";

import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { LANGUAGE_EXTENSIONS } from "@/constants/languages";
import { CodeEditorProps } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "next-themes";
import { Card, CardContent } from "@/components/ui";
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { githubLight } from '@uiw/codemirror-theme-github';

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show the editor after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const languageExtension =
    LANGUAGE_EXTENSIONS[language] || LANGUAGE_EXTENSIONS["javascript"];

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <CodeMirror
          value={value}
          extensions={[languageExtension, javascript()]}
          theme={theme === 'dark' ? vscodeDark : githubLight}
          onChange={(value) => onChange(value || "")}
          className="rounded-lg"
          style={{
            height: "20rem",
            overflowY: "auto",
          }}
        />
      </CardContent>
    </Card>
  );
};

export default CodeEditor;
