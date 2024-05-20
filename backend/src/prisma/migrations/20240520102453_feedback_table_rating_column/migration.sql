/*
  Warnings:

  - Added the required column `rating` to the `feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "feedback" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
