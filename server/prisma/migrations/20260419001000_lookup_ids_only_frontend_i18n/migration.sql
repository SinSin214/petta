-- Consolidated pending changes after initial migration:
-- 1) Keep PetType/PetAge/PetSize as ID-only lookup tables
-- 2) Remove Pet<->PetPersonality join table
-- 3) Keep PetPersonality with composite key (id, language_id)

-- Drop join table for Pet-PetPersonality many-to-many
DROP TABLE "_PetToPetPersonality";

-- Change PetPersonality PK from (id) to (id, language_id)
ALTER TABLE "PetPersonality" DROP CONSTRAINT "PetPersonality_pkey";
ALTER TABLE "PetPersonality" ADD CONSTRAINT "PetPersonality_pkey" PRIMARY KEY ("id", "language_id");

-- PetType
ALTER TABLE "PetType" DROP COLUMN "name";
ALTER TABLE "PetType" DROP COLUMN "language_id";

-- PetAge
ALTER TABLE "PetAge" DROP COLUMN "name";
ALTER TABLE "PetAge" DROP COLUMN "language_id";

-- PetSize
ALTER TABLE "PetSize" DROP COLUMN "name";
ALTER TABLE "PetSize" DROP COLUMN "language_id";
