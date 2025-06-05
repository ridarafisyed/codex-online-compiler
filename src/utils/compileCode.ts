import { exec } from "child_process";
import { writeFileSync, unlinkSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

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

export const compileCpp = (code: string): Promise<CompileResult> => {
  return new Promise((resolve) => {
    const logs: string[] = [];
    const tempDir = tmpdir();
    const sourceFile = join(tempDir, `temp_${Date.now()}.cpp`);
    const outputFile = join(tempDir, `temp_${Date.now()}`);

    try {
      // Write the code to a temporary file
      writeFileSync(sourceFile, code);

      // Compile the C++ code
      exec(`g++ ${sourceFile} -o ${outputFile}`, (compileErr, compileStdout, compileStderr) => {
        if (compileErr || compileStderr) {
          resolve({
            success: false,
            logs: [],
            error: compileStderr?.trim() || compileErr?.message,
          });
          return;
        }

        // Run the compiled program
        exec(outputFile, (runErr, runStdout, runStderr) => {
          // Clean up temporary files
          try {
            unlinkSync(sourceFile);
            unlinkSync(outputFile);
          } catch (cleanupErr) {
            console.error('Error cleaning up temporary files:', cleanupErr);
          }

          if (runErr || runStderr) {
            resolve({
              success: false,
              logs: [],
              error: runStderr?.trim() || runErr?.message,
            });
          } else {
            if (runStdout) {
              logs.push(...runStdout.trim().split("\n"));
            }
            resolve({
              success: true,
              logs,
            });
          }
        });
      });
    } catch (err) {
      resolve({
        success: false,
        logs: [],
        error: (err as Error).message,
      });
    }
  });
};
