-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "description" TEXT,
ADD COLUMN     "placeholderImage" TEXT,
ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'DRAFT';
