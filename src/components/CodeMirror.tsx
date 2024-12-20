import { useState } from "react";
import CodeEditor from "./CodeEditor";

const EditorPage: React.FC = () => {
  const [code, setCode] = useState<string>("// Start coding here!");

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  return (
    <div style={{ margin: "20px" }}>
      <h1>CodeMirror Editor in Next.js (TypeScript)</h1>
      <CodeEditor value={code} onChange={handleCodeChange} />
      <p>Output:</p>
      <pre>{code}</pre> {/* Display the current code */}
    </div>
  );
};

export default EditorPage;
