import React from "react";
import CodeMirror, { ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { Extension } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";

interface CodeEditorProps {
  value: string; // The code to display
  onChange: (value: string) => void; // Callback when the code changes
  extensions?: Extension[]; // Optional extensions for language support
  height?: string; // Optional height of the editor
  theme?: ReactCodeMirrorProps["theme"]; // Optional theme for the editor
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  extensions = [javascript()], // Default to JavaScript
  height = "500px",
  theme = "dark",
}) => {
  return (
    <CodeMirror
      value={value}
      height={height}
      extensions={extensions}
      onChange={onChange}
      theme={theme}
    />
  );
};

export default CodeEditor;
