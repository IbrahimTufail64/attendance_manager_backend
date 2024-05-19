-- CreateTable
CREATE TABLE "Atendance" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "marked" TEXT NOT NULL DEFAULT 'absent',
    "isPending" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Atendance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Atendance" ADD CONSTRAINT "Atendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
