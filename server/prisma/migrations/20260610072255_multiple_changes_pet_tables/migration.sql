/*
  Warnings:

  - You are about to drop the column `personalities` on the `Pet` table. All the data in the column will be lost.
  - The primary key for the `PetAge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ageId` on the `PetAgeTranslation` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `PetAgeTranslation` table. All the data in the column will be lost.
  - The primary key for the `PetPersonality` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `language` on the `PetPersonalityTranslation` table. All the data in the column will be lost.
  - You are about to drop the column `personalityId` on the `PetPersonalityTranslation` table. All the data in the column will be lost.
  - The primary key for the `PetSize` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `language` on the `PetSizeTranslation` table. All the data in the column will be lost.
  - You are about to drop the column `sizeId` on the `PetSizeTranslation` table. All the data in the column will be lost.
  - The primary key for the `PetType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `language` on the `PetTypeTranslation` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `PetTypeTranslation` table. All the data in the column will be lost.
  - The primary key for the `StoryTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_StoryTags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[petAgeId,languageId]` on the table `PetAgeTranslation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[petPersonalityId,languageId]` on the table `PetPersonalityTranslation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[petSizeId,languageId]` on the table `PetSizeTranslation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[petTypeId,languageId]` on the table `PetTypeTranslation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `languageId` to the `PetAgeTranslation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petAgeId` to the `PetAgeTranslation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageId` to the `PetPersonalityTranslation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petPersonalityId` to the `PetPersonalityTranslation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageId` to the `PetSizeTranslation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petSizeId` to the `PetSizeTranslation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageId` to the `PetTypeTranslation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petTypeId` to the `PetTypeTranslation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Story` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PetAgeTranslation" DROP CONSTRAINT "PetAgeTranslation_ageId_fkey";

-- DropForeignKey
ALTER TABLE "PetPersonalityTranslation" DROP CONSTRAINT "PetPersonalityTranslation_personalityId_fkey";

-- DropForeignKey
ALTER TABLE "PetSizeTranslation" DROP CONSTRAINT "PetSizeTranslation_sizeId_fkey";

-- DropForeignKey
ALTER TABLE "PetTypeTranslation" DROP CONSTRAINT "PetTypeTranslation_typeId_fkey";

-- DropForeignKey
ALTER TABLE "StoryTagTranslation" DROP CONSTRAINT "StoryTagTranslation_tagId_fkey";

-- DropForeignKey
ALTER TABLE "_StoryTags" DROP CONSTRAINT "_StoryTags_B_fkey";

-- DropIndex
DROP INDEX "PetAgeTranslation_ageId_language_key";

-- DropIndex
DROP INDEX "PetPersonalityTranslation_personalityId_language_key";

-- DropIndex
DROP INDEX "PetSizeTranslation_sizeId_language_key";

-- DropIndex
DROP INDEX "PetTypeTranslation_typeId_language_key";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "personalities";

-- AlterTable
ALTER TABLE "PetAge" DROP CONSTRAINT "PetAge_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PetAge_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PetAge_id_seq";

-- AlterTable
ALTER TABLE "PetAgeTranslation" DROP COLUMN "ageId",
DROP COLUMN "language",
ADD COLUMN     "languageId" TEXT NOT NULL,
ADD COLUMN     "petAgeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PetPersonality" DROP CONSTRAINT "PetPersonality_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PetPersonality_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PetPersonality_id_seq";

-- AlterTable
ALTER TABLE "PetPersonalityTranslation" DROP COLUMN "language",
DROP COLUMN "personalityId",
ADD COLUMN     "languageId" TEXT NOT NULL,
ADD COLUMN     "petPersonalityId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PetSize" DROP CONSTRAINT "PetSize_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PetSize_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PetSize_id_seq";

-- AlterTable
ALTER TABLE "PetSizeTranslation" DROP COLUMN "language",
DROP COLUMN "sizeId",
ADD COLUMN     "languageId" TEXT NOT NULL,
ADD COLUMN     "petSizeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PetType" DROP CONSTRAINT "PetType_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PetType_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PetType_id_seq";

-- AlterTable
ALTER TABLE "PetTypeTranslation" DROP COLUMN "language",
DROP COLUMN "typeId",
ADD COLUMN     "languageId" TEXT NOT NULL,
ADD COLUMN     "petTypeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "content" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "StoryTag" DROP CONSTRAINT "StoryTag_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "StoryTag_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "StoryTag_id_seq";

-- AlterTable
ALTER TABLE "StoryTagTranslation" ALTER COLUMN "tagId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_StoryTags" DROP CONSTRAINT "_StoryTags_AB_pkey",
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_StoryTags_AB_pkey" PRIMARY KEY ("A", "B");

-- CreateTable
CREATE TABLE "ProvinceTranslation" (
    "id" SERIAL NOT NULL,
    "provinceId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProvinceTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DistrictTranslation" (
    "id" SERIAL NOT NULL,
    "districtId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DistrictTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PetToPetPersonality" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PetToPetPersonality_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProvinceTranslation_provinceId_languageId_key" ON "ProvinceTranslation"("provinceId", "languageId");

-- CreateIndex
CREATE UNIQUE INDEX "DistrictTranslation_districtId_languageId_key" ON "DistrictTranslation"("districtId", "languageId");

-- CreateIndex
CREATE INDEX "_PetToPetPersonality_B_index" ON "_PetToPetPersonality"("B");

-- CreateIndex
CREATE UNIQUE INDEX "PetAgeTranslation_petAgeId_languageId_key" ON "PetAgeTranslation"("petAgeId", "languageId");

-- CreateIndex
CREATE UNIQUE INDEX "PetPersonalityTranslation_petPersonalityId_languageId_key" ON "PetPersonalityTranslation"("petPersonalityId", "languageId");

-- CreateIndex
CREATE UNIQUE INDEX "PetSizeTranslation_petSizeId_languageId_key" ON "PetSizeTranslation"("petSizeId", "languageId");

-- CreateIndex
CREATE UNIQUE INDEX "PetTypeTranslation_petTypeId_languageId_key" ON "PetTypeTranslation"("petTypeId", "languageId");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "PetType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_ageTypeId_fkey" FOREIGN KEY ("ageTypeId") REFERENCES "PetAge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_sizeTypeId_fkey" FOREIGN KEY ("sizeTypeId") REFERENCES "PetSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetTypeTranslation" ADD CONSTRAINT "PetTypeTranslation_petTypeId_fkey" FOREIGN KEY ("petTypeId") REFERENCES "PetType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetAgeTranslation" ADD CONSTRAINT "PetAgeTranslation_petAgeId_fkey" FOREIGN KEY ("petAgeId") REFERENCES "PetAge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetSizeTranslation" ADD CONSTRAINT "PetSizeTranslation_petSizeId_fkey" FOREIGN KEY ("petSizeId") REFERENCES "PetSize"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetPersonalityTranslation" ADD CONSTRAINT "PetPersonalityTranslation_petPersonalityId_fkey" FOREIGN KEY ("petPersonalityId") REFERENCES "PetPersonality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetLocation" ADD CONSTRAINT "PetLocation_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetLocation" ADD CONSTRAINT "PetLocation_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProvinceTranslation" ADD CONSTRAINT "ProvinceTranslation_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DistrictTranslation" ADD CONSTRAINT "DistrictTranslation_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryTagTranslation" ADD CONSTRAINT "StoryTagTranslation_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "StoryTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PetToPetPersonality" ADD CONSTRAINT "_PetToPetPersonality_A_fkey" FOREIGN KEY ("A") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PetToPetPersonality" ADD CONSTRAINT "_PetToPetPersonality_B_fkey" FOREIGN KEY ("B") REFERENCES "PetPersonality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StoryTags" ADD CONSTRAINT "_StoryTags_B_fkey" FOREIGN KEY ("B") REFERENCES "StoryTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
