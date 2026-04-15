import "server-only";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png"]);
const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;

export async function saveUploadedFile(
  file: File | null,
  existingUrl?: string | null,
) {
  if (!file || file.size === 0) {
    return existingUrl || null;
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Please upload a JPG or PNG image.");
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error("Image must be 2MB or smaller.");
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
