import { languages } from "monaco-editor/esm/metadata";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { RiResetLeftLine } from "react-icons/ri";
import { PAGE_NAME } from "@/constants/languages";

interface StatusBarProps {
  selectedLanguage: string;
  onRun: () => void;
  onReset: () => void;
}

const StatusBar: React.FC<StatusBarProps> = ({
  selectedLanguage,
  onRun,
  onReset,
}) => {
  return (
    <div className="flex justify-between items-center w-full mb-4 border-b-2 border-gray-700 space-y-2">
      <h3 className="font-bold text-lg rounded-t-lg border-gray-700 border-x-2 border-t-2 px-3">
        {PAGE_NAME[selectedLanguage]}
      </h3>
      <div className="space-x-3 mb-2">
        <button
          onClick={onReset}
          className="px-4 py-2 mb-2 text-white rounded-lg bg-gray-700"
        >
          <RiResetLeftLine />
        </button>
        <button
          onClick={onRun}
          className="px-4 py-2 text-white rounded-lg bg-blue-400"
        >
          <FaPlay />
        </button>
      </div>
    </div>
  );
};

export default StatusBar;
