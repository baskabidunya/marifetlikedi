import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const content = readFileSync(resolve(__dirname, "../lib/fun-tests.ts"), "utf-8");

function extractJsonFromTs() {
  const lines = content.split("\n");
  let startLine = -1;
  let endLine = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === "export const FUN_TESTS: FunTest[] = [") {
      startLine = i;
    }
    if (startLine > 0 && lines[i].trim() === "];") {
      endLine = i;
      break;
    }
  }
  if (startLine < 0 || endLine < 0) throw new Error("Could not find FUN_TESTS array");

  const arrayContent = lines.slice(startLine, endLine + 1).join("\n");
  return arrayContent;
}

const arrayContent = extractJsonFromTs();
const fs = await import("fs");

// Write a temp JS file that exports the data (after replacing TS types/helpers)
let jsContent = arrayContent
  .replace(/export const FUN_TESTS: FunTest\[\] = /, "const FUN_TESTS = ")
  .replace(/(\s+)t\(/g, (m, ws) => {
    return `${ws}{ text: `;
  })
  .replace(/,?\s*\],?\s*\)/g, (m) => {
    // Close the question object
    const after = m.endsWith(",");
    return " }" + (after ? "," : "");
  });

// This approach is getting too complex. Let me use a different strategy.
// Actually, let me just run node with the --loader ts-node or use eval.

// Simplest approach: Write a temp JS file that has all the data as a plain array
