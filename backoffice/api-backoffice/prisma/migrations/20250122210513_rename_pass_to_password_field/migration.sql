/*
  Warnings:

  - You are about to drop the column `pass` on the `UserCustomer` table. All the data in the column will be lost.
  - Added the required column `password` to the `UserCustomer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserCustomer" DROP COLUMN "pass",
ADD COLUMN     "password" TEXT NOT NULL;
