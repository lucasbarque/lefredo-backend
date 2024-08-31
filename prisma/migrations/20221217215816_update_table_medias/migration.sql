/*
  Warnings:

  - You are about to drop the column `passwordSalt` on the `users` table. All the data in the column will be lost.
  - Added the required column `filename` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "filename" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "passwordSalt";
