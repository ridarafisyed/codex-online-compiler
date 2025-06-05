"use client";

import React from "react";

interface OutputDisplayProps {
  output: string;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ output }) => {
  return (
    <div className="w-full">
      <pre
        className="p-4 font-mono text-sm bg-muted/50 rounded-lg overflow-auto"
        style={{
          height: "10rem",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {output || "No output yet. Run your code to see the results."}
      </pre>
    </div>
  );
};

export default OutputDisplay;
