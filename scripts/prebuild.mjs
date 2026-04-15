import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

const schemaPath = path.join(process.cwd(), "prisma", "schema.prisma");

if (!existsSync(schemaPath)) {
  process.exit(0);
}

const result = spawnSync("npx", ["prisma", "generate"], {
  stdio: "inherit",
  shell: process.platform === "win32",
  env: {
    ...process.env,
    PRISMA_CLIENT_ENGINE_TYPE: process.env.PRISMA_CLIENT_ENGINE_TYPE ?? "binary",
  },
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
