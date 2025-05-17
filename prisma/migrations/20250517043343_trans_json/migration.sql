/*
  Warnings:

  - You are about to drop the `Trans` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Trans" DROP CONSTRAINT "Trans_userAccount_no_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "trans" JSONB[];

-- DropTable
DROP TABLE "Trans";
