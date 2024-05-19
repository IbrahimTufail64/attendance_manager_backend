/*
  Warnings:

  - You are about to drop the `Atendance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Atendance" DROP CONSTRAINT "Atendance_userId_fkey";

-- DropTable
DROP TABLE "Atendance";
