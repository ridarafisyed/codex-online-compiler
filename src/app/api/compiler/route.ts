import { NextResponse } from "next/server";
import { exec } from "child_process";
import fs from "fs/promises";

type CompileRequest = {
  language: string;
  code: string;
};

type CompileResponse = {
  success: boolean;
  output?: string;
  error?: string;
};

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { language, code }: CompileRequest = await req.json();

    if (!language || !code) {
      return NextResponse.json(
        { success: false, error: "Language and code are required." },
        { status: 400 }
      );
    }

    // File extensions for supported languages
    const fileExtensions: Record<string, string> = {
      javascript: "js",
      python: "py",
    };

    const ext = fileExtensions[language];
    if (!ext) {
      return NextResponse.json(
        { success: false, error: "Unsupported language." },
        { status: 400 }
      );
    }

    // Write code to a temporary file
    const fileName = `temp.${ext}`;
    await fs.writeFile(fileName, code);

    // Commands to execute the code
    const commands: Record<string, string> = {
      javascript: `node ${fileName}`,
      python: `python3 ${fileName}`,
    };

    const command = commands[language];

    return new Promise((resolve) => {
      exec(command, async (error, stdout, stderr) => {
        // Clean up the temp file
        await fs.unlink(fileName);

        if (error) {
          resolve(
            NextResponse.json({
              success: false,
              error: stderr || error.message,
            })
          );
        } else {
          resolve(
            NextResponse.json({
              success: true,
              output: stdout,
            })
          );
        }
      });
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error." },
      { status: 500 }
    );
  }
}
