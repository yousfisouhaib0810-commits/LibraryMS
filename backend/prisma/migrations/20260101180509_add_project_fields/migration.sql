-- AlterTable
ALTER TABLE "ContactMessage" ADD COLUMN     "appName" TEXT,
ADD COLUMN     "budget" TEXT,
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'contact',
ALTER COLUMN "subject" DROP NOT NULL,
ALTER COLUMN "message" DROP NOT NULL;
