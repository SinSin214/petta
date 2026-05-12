/*
  Warnings:

  - You are about to drop the column `location` on the `Pet` table. All the data in the column will be lost.
  - The primary key for the `PetPersonality` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `language_id` on the `PetPersonality` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `PetPersonality` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[location_id]` on the table `Pet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdBy` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_id` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "location",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT[],
ADD COLUMN     "isAdopted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "location_id" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedBy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PetPersonality" DROP CONSTRAINT "PetPersonality_pkey",
DROP COLUMN "language_id",
DROP COLUMN "name",
ADD CONSTRAINT "PetPersonality_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "PetLocation" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "ward" TEXT NOT NULL,
    "province" TEXT NOT NULL,

    CONSTRAINT "PetLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PetPersonality" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PetPersonality_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PetPersonality_B_index" ON "_PetPersonality"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Pet_location_id_key" ON "Pet"("location_id");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "PetLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PetPersonality" ADD CONSTRAINT "_PetPersonality_A_fkey" FOREIGN KEY ("A") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PetPersonality" ADD CONSTRAINT "_PetPersonality_B_fkey" FOREIGN KEY ("B") REFERENCES "PetPersonality"("id") ON DELETE CASCADE ON UPDATE CASCADE;
