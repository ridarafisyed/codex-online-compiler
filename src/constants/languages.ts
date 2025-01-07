import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { DiPython } from "react-icons/di";

export const LANGUAGES = ["javascript", "python3", "cpp"];

export const LANGUAGE_EXTENSIONS: Record<string, any> = {
  javascript: javascript(),
  python3: python(),
  cpp: cpp(),
};

export const PAGE_NAME: Record<string, string> = {
  javascript: "main.js",
  python3: "main.py",
  cpp: "main.cpp",
};

export const LANGUAGE_STARTER_CODE: Record<string, string> = {
  javascript: "console.log('Hello World');",
  python3: "print('Hello world')",
  cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World" << endl;\n    return 0;\n}',
};
