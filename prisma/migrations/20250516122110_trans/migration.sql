-- CreateTable
CREATE TABLE "Trans" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'Deposit',
    "condition" TEXT NOT NULL DEFAULT 'Completed',
    "currency" TEXT NOT NULL DEFAULT '$',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "userAccount_no" INTEGER NOT NULL,
    "note" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Trans_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trans" ADD CONSTRAINT "Trans_userAccount_no_fkey" FOREIGN KEY ("userAccount_no") REFERENCES "User"("account_no") ON DELETE RESTRICT ON UPDATE CASCADE;
