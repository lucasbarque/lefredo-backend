/*
  Warnings:

  - The `prepTime` column on the `dishes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "dishes" DROP COLUMN "prepTime",
ADD COLUMN     "prepTime" INTEGER NOT NULL DEFAULT 0;
