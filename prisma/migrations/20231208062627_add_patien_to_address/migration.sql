/*
  Warnings:

  - Added the required column `is_primary` to the `PatienAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patien_id` to the `PatienAddress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PatienAddress" DROP CONSTRAINT "PatienAddress_id_fkey";

-- AlterTable
ALTER TABLE "PatienAddress" ADD COLUMN     "is_primary" BOOLEAN NOT NULL,
ADD COLUMN     "patien_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PatienAddress" ADD CONSTRAINT "PatienAddress_patien_id_fkey" FOREIGN KEY ("patien_id") REFERENCES "PatienRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
