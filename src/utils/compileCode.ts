import { exec } from "child_process";

type CompileResult = {
  success: boolean;
  logs: string[];
  error?: string;
};

type ConsoleArgs = (string | number | boolean | object)[];

export const compileJavascript = (code: string): CompileResult => {
  const logs: string[] = [];
  const customConsole = {
    log: (...args: ConsoleArgs) => logs.push(args.join(" ")),
    error: (...args: ConsoleArgs) => logs.push("Error: " + args.join(" ")),
    warn: (...args: ConsoleArgs) => logs.push("Warning: " + args.join(" ")),
  };

  try {
    const console = customConsole;
    new Function("console", code)(console);
    return { success: true, logs };
  } catch (err: unknown) {
    const error = err as Error;
    return {
      success: false,
      logs,
      error: error.message,
    };
  }
};

export const compilePython3 = (code: string): Promise<CompileResult> => {
  return new Promise((resolve) => {
    const logs: string[] = [];

    const restrictedImports = ["os", "sys", "subprocess"];

    if (
      restrictedImports.some((imp) =>
        new RegExp(`\\bimport\\s+${imp}\\b`).test(code)
      )
    ) {
      const result: CompileResult = {
        success: false,
        logs: [],
        error:
          "Restricted import detected. You cannot use os, sys, or subprocess.",
      };
      return resolve(result);
    }

    exec(
      `python3 -c "${code.replace(/"/g, '\\"')}"`,
      (err: Error | null, stdout: string, stderr: string) => {
        if (err || stderr) {
          resolve({
            success: false,
            logs: [],
            error: stderr?.trim() || err?.message,
          });
        } else {
          if (stdout) {
            logs.push(...stdout.trim().split("\n"));
          }
          resolve({
            success: true,
            logs,
          });
        }
      }
    );
  });
};
