-- CreateTable
CREATE TABLE "Page" (
    "id" SERIAL NOT NULL,
    "releaseId" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "weidth" INTEGER NOT NULL,
    "s3Key" TEXT NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Release"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
