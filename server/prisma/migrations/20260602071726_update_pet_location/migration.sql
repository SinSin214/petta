/*
  Warnings:
  - You are about to drop the column `age_type_id` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `size_type_id` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `type_id` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `location_id` on the `PetLocation` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `PetLocation` table. All the data in the column will be lost.
  - You are about to drop the column `ward` on the `PetLocation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[locationId]` on the table `Pet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ageTypeId` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sizeTypeId` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `districtId` to the `PetLocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinceId` to the `PetLocation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_age_type_id_fkey";

-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_size_type_id_fkey";

-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_type_id_fkey";

-- DropForeignKey
ALTER TABLE "PetLocation" DROP CONSTRAINT "PetLocation_location_id_fkey";

-- DropIndex
DROP INDEX "Pet_type_id_age_type_id_size_type_id_idx";

-- DropIndex
DROP INDEX "PetLocation_location_id_key";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "age_type_id",
DROP COLUMN "size_type_id",
DROP COLUMN "type_id",
ADD COLUMN     "ageTypeId" TEXT NOT NULL,
ADD COLUMN     "locationId" TEXT NOT NULL,
ADD COLUMN     "sizeTypeId" TEXT NOT NULL,
ADD COLUMN     "typeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PetLocation" DROP COLUMN "location_id",
DROP COLUMN "province",
DROP COLUMN "ward",
ADD COLUMN     "districtId" TEXT NOT NULL,
ADD COLUMN     "provinceId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Province" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "District" (
    "id" TEXT NOT NULL,
    "provinceId" TEXT NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pet_locationId_key" ON "Pet"("locationId");

-- CreateIndex
CREATE INDEX "Pet_typeId_ageTypeId_sizeTypeId_idx" ON "Pet"("typeId", "ageTypeId", "sizeTypeId");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "PetType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_ageTypeId_fkey" FOREIGN KEY ("ageTypeId") REFERENCES "PetAge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_sizeTypeId_fkey" FOREIGN KEY ("sizeTypeId") REFERENCES "PetSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "PetLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetLocation" ADD CONSTRAINT "PetLocation_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetLocation" ADD CONSTRAINT "PetLocation_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
