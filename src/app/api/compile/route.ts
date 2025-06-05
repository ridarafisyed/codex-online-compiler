import { NextResponse } from "next/server";
import { compileJavascript, compilePython3, compileCpp } from "@/utils/compileCode";

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
      switch (language) {
        case "javascript":
          const jsResult = compileJavascript(code);
          return NextResponse.json(jsResult);
        case "python3":
          const pyResult = await compilePython3(code);
          return NextResponse.json(pyResult);
        case "cpp":
          const cppResult = await compileCpp(code);
          return NextResponse.json(cppResult);
        default:
          return NextResponse.json({
            success: false,
            error: `Unsupported language: ${language}`,
          });
      }
    } catch (err: unknown) {
      return NextResponse.json({
        success: false,
        error: (err as Error).message,
      });
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: "Invalid request",
    });
  }
};
