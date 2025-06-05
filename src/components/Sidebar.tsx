"use client";

import React from "react";
import { SidebarProps } from "@/types";
import { ICONS } from "@/constants/icons";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "next-themes";
import {
  Sidebar as ShadcnSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarProvider,
} from "@/components/ui";
import { Button } from "@/components/ui";
import { Separator } from "@/components/ui";
import { Switch } from "@/components/ui";
import { Moon, Sun } from "lucide-react";

const Sidebar: React.FC<SidebarProps> = ({ languages, onSelect }) => {
  const { language: selectedLanguage } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // After mounting, we can safely show the theme UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SidebarProvider defaultOpen>
      <ShadcnSidebar>
        <SidebarHeader className="p-4">
          <h2 className="text-lg font-semibold">Codex</h2>
        </SidebarHeader>
        <Separator />
        <SidebarContent className="p-4">
          <div className="space-y-2">
            {languages.map((lang) => (
              <Button
                key={lang}
                variant={lang === selectedLanguage ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => onSelect(lang)}
              >
                <span className="mr-2">{ICONS[lang]}</span>
                {lang}
              </Button>
            ))}
          </div>
        </SidebarContent>
        <Separator />
        <SidebarFooter className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch
                checked={mounted && resolvedTheme === "dark"}
                onCheckedChange={(checked: boolean) => setTheme(checked ? "dark" : "light")}
              />
              <Moon className="h-4 w-4" />
            </div>
          </div>
        </SidebarFooter>
      </ShadcnSidebar>
    </SidebarProvider>
  );
};

export default Sidebar;
