/*
  Warnings:

  - You are about to drop the column `createdAt` on the `p2pTransfer` table. All the data in the column will be lost.
  - Added the required column `timestamp` to the `p2pTransfer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "p2pTransfer" DROP COLUMN "createdAt",
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;
