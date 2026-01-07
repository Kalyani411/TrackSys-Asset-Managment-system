/*
  Warnings:

  - Added the required column `requestType` to the `AssetRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `asset` MODIFY `status` ENUM('ACTIVE', 'ASSIGNED', 'REPAIR', 'RETURN', 'REQUESTED') NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE `assetrequest` ADD COLUMN `requestType` ENUM('CHECKOUT', 'RETURN') NOT NULL;
