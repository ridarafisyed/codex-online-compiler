"use client";

import React from "react";
import { SidebarProps } from "@/types";
import { ICONS } from "@/constants/icons";
import { useLanguage } from "@/context/LanguageContext";

const Sidebar: React.FC<SidebarProps> = ({ languages, onSelect }) => {
  const { language } = useLanguage();

  return (
    <div className="bg-gray-800 text-white h-screen p-4">
      <ul className="space-y-2">
        {languages.map((language) => (
          <li
            key={language}
            className={`cursor-pointer p-2 rounded-lg ${
              language === language ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => onSelect(language)}
          >
            {ICONS[language]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
