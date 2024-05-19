/*
  Warnings:

  - You are about to drop the `CustomMeal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FavoriteFood` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Food` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FoodCatalog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Target` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Atendance" DROP CONSTRAINT "Atendance_id_fkey";

-- DropForeignKey
ALTER TABLE "CustomMeal" DROP CONSTRAINT "CustomMeal_userId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteFood" DROP CONSTRAINT "FavoriteFood_userId_fkey";

-- DropForeignKey
ALTER TABLE "Food" DROP CONSTRAINT "Food_catalogId_fkey";

-- DropForeignKey
ALTER TABLE "Food" DROP CONSTRAINT "Food_favoriteId_fkey";

-- DropForeignKey
ALTER TABLE "Food" DROP CONSTRAINT "Food_mealId_fkey";

-- DropForeignKey
ALTER TABLE "FoodCatalog" DROP CONSTRAINT "FoodCatalog_userId_fkey";

-- DropForeignKey
ALTER TABLE "Target" DROP CONSTRAINT "Target_userId_fkey";

-- AlterTable
ALTER TABLE "Atendance" ADD COLUMN     "userId" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "CustomMeal";

-- DropTable
DROP TABLE "FavoriteFood";

-- DropTable
DROP TABLE "Food";

-- DropTable
DROP TABLE "FoodCatalog";

-- DropTable
DROP TABLE "Target";

-- AddForeignKey
ALTER TABLE "Atendance" ADD CONSTRAINT "Atendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
