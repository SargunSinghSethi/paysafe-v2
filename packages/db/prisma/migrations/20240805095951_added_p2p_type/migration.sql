/*
  Warnings:

  - Added the required column `type` to the `p2pTransfer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "p2pType" AS ENUM ('Debit', 'Credit');

-- AlterTable
ALTER TABLE "p2pTransfer" ADD COLUMN     "type" "p2pType" NOT NULL;
