import React from "react";

interface OutputDisplayProps {
  output: string;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ output }) => {
  return (
    <div className="w-full max-w-screen ">
      <div className=" w-full max-w-screen mt-2 mb-4 pb-2 border-b-2 border-gray-700 space-y-2 ">
        <h3 className="text-lg font-semibold mt-6 border-x-2 border-t-2 rounded border-gray-500 max-w-24 px-2">
          Terminal:
        </h3>
      </div>
      <div className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white overflow-x-auto whitespace-pre-wrap">
        <code className="text-sm px-4">{output || ""}</code>
      </div>
    </div>
  );
};

export default OutputDisplay;
