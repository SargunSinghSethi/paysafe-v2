/*
  Warnings:

  - Added the required column `fromType` to the `p2pTransfer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toType` to the `p2pTransfer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "p2pType" AS ENUM ('Debit', 'Credit');

-- AlterTable
ALTER TABLE "p2pTransfer" ADD COLUMN     "fromType" "p2pType" NOT NULL,
ADD COLUMN     "toType" "p2pType" NOT NULL;
