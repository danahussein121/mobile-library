-- AlterTable
ALTER TABLE "public"."Event" ADD COLUMN     "isTentative" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "locationAr" TEXT,
ADD COLUMN     "type" TEXT;
