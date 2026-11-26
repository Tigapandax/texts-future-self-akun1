import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MESSAGE =
  "Hey, it's you from 2036. The plant you keep forgetting to water outlived us both. " +
  "Also, stop Googling your symptoms — the answer is still water and sleep.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function checkMessage(text: string): string {
  const trimmed = text.trim();
  if (trimmed.length < MIN_CHARS || trimmed.length > MAX_CHARS) {
    throw new Error(
      `message must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${trimmed.length}`,
    );
  }
  return trimmed;
}

function outputPath(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  return join(dir, "entry.txt");
}

function main(): void {
  const line = checkMessage(MESSAGE);
  const target = outputPath();
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, line + "\n", "utf8");
  console.log(`wrote ${line.length} characters to ${target}`);
  console.log(line);
}

main();
