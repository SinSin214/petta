/*
  Warnings:

  - You are about to drop the column `location_id` on the `Pet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[location_id]` on the table `PetLocation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `location_id` to the `PetLocation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_location_id_fkey";

-- DropIndex
DROP INDEX "Pet_location_id_key";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "location_id";

-- AlterTable
ALTER TABLE "PetLocation" ADD COLUMN     "location_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PetLocation_location_id_key" ON "PetLocation"("location_id");

-- AddForeignKey
ALTER TABLE "PetLocation" ADD CONSTRAINT "PetLocation_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
