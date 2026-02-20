/*
  Warnings:

  - You are about to drop the column `slug` on the `Uploads` table. All the data in the column will be lost.
  - You are about to drop the column `videoURL` on the `Uploads` table. All the data in the column will be lost.
  - Added the required column `thumbnailUrl` to the `Uploads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoUrl` to the `Uploads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Uploads" DROP COLUMN "slug",
DROP COLUMN "videoURL",
ADD COLUMN     "thumbnailUrl" TEXT NOT NULL,
ADD COLUMN     "videoUrl" TEXT NOT NULL;
