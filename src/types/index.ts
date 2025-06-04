import { NextRequest, NextResponse } from "next/server";

export interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

export interface SidebarProps {
  languages: string[];
  selectedLanguage: string;
  onSelect: (language: string) => void;
}

interface CustomRequestBody {
  language: string;
  code: string;
}

export interface CustomNextRequest extends NextRequest {
  json: () => Promise<CustomRequestBody>;
}

interface CustomResponsePayload {
  success: boolean;
  output?: string;
  error?: string;
}

export type CustomNextResponse = NextResponse<CustomResponsePayload>;
