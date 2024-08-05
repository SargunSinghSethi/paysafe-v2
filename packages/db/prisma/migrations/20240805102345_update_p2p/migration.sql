/*
  Warnings:

  - You are about to drop the column `fromType` on the `p2pTransfer` table. All the data in the column will be lost.
  - You are about to drop the column `toType` on the `p2pTransfer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "p2pTransfer" DROP COLUMN "fromType",
DROP COLUMN "toType";

-- DropEnum
DROP TYPE "p2pType";
