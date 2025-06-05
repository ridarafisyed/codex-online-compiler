"use client";

import React from "react";
import { Play, RotateCcw } from "lucide-react";
import { PAGE_NAME } from "@/constants/languages";
import { Button, Card, CardHeader, Separator } from "@/components/ui";

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
    <Card className="w-full mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="font-semibold text-lg">
          {PAGE_NAME[selectedLanguage]}
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onReset}
            className="h-9 w-9"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={onRun}
            className="h-9 w-9"
          >
            <Play className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <Separator />
    </Card>
  );
};

export default StatusBar;
