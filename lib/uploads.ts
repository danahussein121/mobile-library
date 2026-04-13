import "server-only";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export async function saveUploadedFile(
  file: File | null,
  existingUrl?: string | null,
) {
  if (!file || file.size === 0) {
    return existingUrl || null;
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const extension = path.extname(file.name) || ".bin";
  const fileName = `${Date.now()}-${randomUUID()}${extension}`;
  const relativeDirectory = path.join("uploads", "admin");
  const relativePath = path.join(relativeDirectory, fileName);
  const absoluteDirectory = path.join(process.cwd(), "public", relativeDirectory);
  const absolutePath = path.join(process.cwd(), "public", relativePath);

  await mkdir(absoluteDirectory, { recursive: true });
  await writeFile(absolutePath, buffer);

  return `/${relativePath.replaceAll("\\", "/")}`;
}
