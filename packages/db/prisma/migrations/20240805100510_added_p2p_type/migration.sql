/*
  Warnings:

  - You are about to drop the column `type` on the `p2pTransfer` table. All the data in the column will be lost.
  - Added the required column `fromType` to the `p2pTransfer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toType` to the `p2pTransfer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "p2pTransfer" DROP COLUMN "type",
ADD COLUMN     "fromType" "p2pType" NOT NULL,
ADD COLUMN     "toType" "p2pType" NOT NULL;
