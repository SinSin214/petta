/*
  Warnings:

  - You are about to drop the column `locationId` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the `_PetPersonality` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[petId]` on the table `PetLocation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `petId` to the `PetLocation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_ageTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_sizeTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_typeId_fkey";

-- DropForeignKey
ALTER TABLE "PetLocation" DROP CONSTRAINT "PetLocation_districtId_fkey";

-- DropForeignKey
ALTER TABLE "PetLocation" DROP CONSTRAINT "PetLocation_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "_PetPersonality" DROP CONSTRAINT "_PetPersonality_A_fkey";

-- DropForeignKey
ALTER TABLE "_PetPersonality" DROP CONSTRAINT "_PetPersonality_B_fkey";

-- DropIndex
DROP INDEX "Pet_locationId_key";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "locationId",
ADD COLUMN     "personalities" TEXT[];

-- AlterTable
ALTER TABLE "PetLocation" ADD COLUMN     "petId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_PetPersonality";

-- CreateIndex
CREATE UNIQUE INDEX "PetLocation_petId_key" ON "PetLocation"("petId");

-- AddForeignKey
ALTER TABLE "PetLocation" ADD CONSTRAINT "PetLocation_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
