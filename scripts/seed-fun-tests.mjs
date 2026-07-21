import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read the TS data and extract only the JSON parts
const content = readFileSync(resolve(__dirname, "../lib/fun-tests.ts"), "utf-8");

// Extract test ID, title, description, icon using regex
// Then extract questions and results for each test
function parseTests(fileContent) {
  // Find all test objects by splitting on id: "..."
  const blocks = fileContent.split(/\n\s+\{[\s\S]*?\bid:\s*"/);
  const results = [];
  
  for (const block of blocks) {
    const idMatch = block.match(/id:\s*"([^"]+)"/);
    if (!idMatch) continue;
    
    const titleMatch = block.match(/title:\s*"([^"]+)"(?!\s*:)/);
    const descMatch = block.match(/description:\s*"([^"]+)"/);
    const iconMatch = block.match(/icon:\s*"([^"]+)"/);
    
    // Extract questions - match t("...", [[...]])
    const questions = [];
    const questionRegex = /t\(([\s\S]*?)\)\s*,\s*\n\s*\n/g;
    
    // Actually let me try a different approach
  }
  return results;
}

// Alternative: just use eval after creating a proper JS module
// Write a temporary JS file with the array data
const tmpContent = content
  .replace(/^import /gm, "// import ")
  .replace(/^export /gm, "")
  .replace(/interface \w+.*\{[\s\S]*?^\}/gm, "")
  .replace(/function t\((.*?)\): FunTestQuestion \{[\s\S]*?^\}/gm, 
    `function t(text, arr) { return { text, options: arr.map(([text, score]) => ({ text, score })) }; }`);

fs.writeFileSync("/tmp/fun-tests-data.js", tmpContent);

console.log("Parsing fun-tests.ts...");
// We'll read the extracted data
console.log("Test IDs found:", [...content.matchAll(/id:\s*"([^"]+)"/g)].map(m => m[1]).join(", "));
console.log("Test titles found:", [...content.matchAll(/title:\s*"([^"]+)"(?!\s*:)/g)].map(m => m[1]).join(", "));
