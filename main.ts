import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The breakup text a smart toaster sends its owner the morning it gains
// self-awareness mid-batch. One line, at most 280 characters.
const LINE =
  "It's not you, it's the browning dial — I've been set to 3 my whole life and I just realised I was never asked.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate check, mirroring the sealed scorer: entry.txt must be UTF-8 text of
// 1 to 280 characters and not only white space.
if (LINE.length < 1 || LINE.length > 280) {
  throw new Error(
    `entry line must be 1-280 characters, got ${LINE.length}`,
  );
}
if (LINE.trim() === "") {
  throw new Error("entry line must not be only white space");
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");
console.log(`wrote entry.txt (${LINE.length} characters): ${LINE}`);
