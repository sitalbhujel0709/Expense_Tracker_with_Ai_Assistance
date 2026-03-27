/*
  Warnings:

  - The `category` column on the `Expense` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ExpenseCategory" AS ENUM ('FOOD', 'TRANSPORT', 'ENTERTAINMENT', 'UTILITIES', 'OTHER');

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "category",
ADD COLUMN     "category" "ExpenseCategory" NOT NULL DEFAULT 'UTILITIES';
