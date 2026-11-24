// absurd-invention: a one-sentence pitch for the make.fun bounty
// "One-Sentence Absurd Invention Pitch" — a ridiculous invention that
// fixes the tiny everyday annoyance of a TV remote lost in the sofa.
// The program writes the pitch to entry.txt in the output directory.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The pitch: one sentence, 157 characters, one terminal period.
const ENTRY =
  "A TV remote with separation anxiety that beeps louder the deeper it slides between the sofa cushions until it tearfully confesses exactly where it is hiding.";

// Validate the entry the way the sealed gate scorer does: UTF-8 text of
// 1 to 220 characters, not only white space, and exactly one sentence.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 220) {
  throw new Error(`entry must be 1-220 characters, got ${chars}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
const sentenceEnds = [...ENTRY].filter((c) => c === ".").length;
if (sentenceEnds !== 1 || !ENTRY.endsWith(".")) {
  throw new Error("entry must be exactly one sentence ending with a period");
}

// Deterministic output: no network, no clock, no randomness.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote entry.txt (${chars} chars, 1 sentence)`);
