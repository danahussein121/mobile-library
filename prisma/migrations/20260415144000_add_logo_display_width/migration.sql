-- AlterTable
ALTER TABLE "public"."SiteSettings"
ADD COLUMN IF NOT EXISTS "logoDisplayWidth" INTEGER NOT NULL DEFAULT 230;
