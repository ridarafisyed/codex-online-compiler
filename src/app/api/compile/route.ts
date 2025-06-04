import { NextResponse } from "next/server";
import { compileJavascript, compilePython3 } from "@/utils/compileCode";

export const POST = async (req: Request) => {
  try {
    const { code, language } = await req.json();

    if (!code || !language) {
      return NextResponse.json({
        success: false,
        error: "Code and language are required fields",
      });
    }

    try {
      if (language === "javascript") {
        const result = compileJavascript(code);
        return NextResponse.json(result);
      }
      if (language === "python3") {
        const result = await compilePython3(code);
        console.log(result);
        return NextResponse.json(result);
      }
    } catch (err: unknown) {
      return NextResponse.json({
        success: false,
        error: (err as Error).message,
      });
    }
  } catch {
    return NextResponse.json({
      success: false,
      error: "Invalid request",
    });
  }
};
