/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `Pet` table. All the data in the column will be lost.
  - The primary key for the `PetAge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `PetAge` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `PetPersonality` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `PetPersonality` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `PetSize` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `PetSize` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `PetType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `PetType` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Token` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_updatedBy_fkey";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "updatedAt",
DROP COLUMN "updatedBy";

-- AlterTable
ALTER TABLE "PetAge" DROP CONSTRAINT "PetAge_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "PetAge_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PetPersonality" DROP CONSTRAINT "PetPersonality_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "PetPersonality_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PetSize" DROP CONSTRAINT "PetSize_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "PetSize_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PetType" DROP CONSTRAINT "PetType_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "PetType_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Token" DROP CONSTRAINT "Token_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Token_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Token_id_seq";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "updatedAt";

-- CreateTable
CREATE TABLE "PetTypeTranslation" (
    "id" SERIAL NOT NULL,
    "typeId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PetTypeTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetAgeTranslation" (
    "id" SERIAL NOT NULL,
    "ageId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PetAgeTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetSizeTranslation" (
    "id" SERIAL NOT NULL,
    "sizeId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PetSizeTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetPersonalityTranslation" (
    "id" SERIAL NOT NULL,
    "personalityId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PetPersonalityTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Story" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT[],
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoryUpvote" (
    "id" TEXT NOT NULL,
    "storyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "StoryUpvote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoryComment" (
    "id" TEXT NOT NULL,
    "storyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StoryComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoryTag" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "StoryTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoryTagTranslation" (
    "id" SERIAL NOT NULL,
    "tagId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "StoryTagTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StoryTags" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_StoryTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "PetTypeTranslation_typeId_language_key" ON "PetTypeTranslation"("typeId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "PetAgeTranslation_ageId_language_key" ON "PetAgeTranslation"("ageId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "PetSizeTranslation_sizeId_language_key" ON "PetSizeTranslation"("sizeId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "PetPersonalityTranslation_personalityId_language_key" ON "PetPersonalityTranslation"("personalityId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "StoryUpvote_storyId_userId_key" ON "StoryUpvote"("storyId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "StoryTagTranslation_tagId_language_key" ON "StoryTagTranslation"("tagId", "language");

-- CreateIndex
CREATE INDEX "_StoryTags_B_index" ON "_StoryTags"("B");

-- AddForeignKey
ALTER TABLE "PetTypeTranslation" ADD CONSTRAINT "PetTypeTranslation_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "PetType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetAgeTranslation" ADD CONSTRAINT "PetAgeTranslation_ageId_fkey" FOREIGN KEY ("ageId") REFERENCES "PetAge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetSizeTranslation" ADD CONSTRAINT "PetSizeTranslation_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "PetSize"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetPersonalityTranslation" ADD CONSTRAINT "PetPersonalityTranslation_personalityId_fkey" FOREIGN KEY ("personalityId") REFERENCES "PetPersonality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryUpvote" ADD CONSTRAINT "StoryUpvote_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryUpvote" ADD CONSTRAINT "StoryUpvote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryComment" ADD CONSTRAINT "StoryComment_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryComment" ADD CONSTRAINT "StoryComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryTagTranslation" ADD CONSTRAINT "StoryTagTranslation_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "StoryTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoryTags" ADD CONSTRAINT "_StoryTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Story"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoryTags" ADD CONSTRAINT "_StoryTags_B_fkey" FOREIGN KEY ("B") REFERENCES "StoryTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
