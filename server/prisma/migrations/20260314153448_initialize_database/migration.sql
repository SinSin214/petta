-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type_id" TEXT NOT NULL,
    "age" INTEGER,
    "age_type_id" TEXT NOT NULL,
    "size_type_id" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "personality" TEXT[],
    "description" TEXT,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PetType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetAge" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PetAge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetSize" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PetSize_pkey" PRIMARY KEY ("id")
);
