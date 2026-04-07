-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('REFRESH', 'EMAIL_VERIFICATION', 'PASSWORD_RESET');

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "type_id" TEXT NOT NULL,
    "age_type_id" TEXT NOT NULL,
    "size_type_id" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "language_id" TEXT NOT NULL,

    CONSTRAINT "PetType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetAge" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "language_id" TEXT NOT NULL,

    CONSTRAINT "PetAge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetSize" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "language_id" TEXT NOT NULL,

    CONSTRAINT "PetSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetPersonality" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "language_id" TEXT NOT NULL,

    CONSTRAINT "PetPersonality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "user_role" NOT NULL DEFAULT 'user',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "isRevoked" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PetToPetPersonality" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PetToPetPersonality_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "Pet_type_id_age_type_id_size_type_id_idx" ON "Pet"("type_id", "age_type_id", "size_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Token_tokenHash_key" ON "Token"("tokenHash");

-- CreateIndex
CREATE INDEX "Token_userId_type_idx" ON "Token"("userId", "type");

-- CreateIndex
CREATE INDEX "_PetToPetPersonality_B_index" ON "_PetToPetPersonality"("B");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "PetType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_age_type_id_fkey" FOREIGN KEY ("age_type_id") REFERENCES "PetAge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_size_type_id_fkey" FOREIGN KEY ("size_type_id") REFERENCES "PetSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PetToPetPersonality" ADD CONSTRAINT "_PetToPetPersonality_A_fkey" FOREIGN KEY ("A") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PetToPetPersonality" ADD CONSTRAINT "_PetToPetPersonality_B_fkey" FOREIGN KEY ("B") REFERENCES "PetPersonality"("id") ON DELETE CASCADE ON UPDATE CASCADE;
