/*
  Warnings:

  - You are about to drop the column `isProMember` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isProMember",
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "profileUrl" TEXT;

-- CreateTable
CREATE TABLE "Atendance" (
    "id" SERIAL NOT NULL,
    "marked" TEXT NOT NULL DEFAULT 'absent',
    "isPending" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Atendance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Atendance" ADD CONSTRAINT "Atendance_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
