-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "tags" TEXT[],
ALTER COLUMN "webUrl" DROP NOT NULL;
