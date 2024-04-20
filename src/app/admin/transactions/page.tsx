import prisma from "@/db/prisma";
import { Transaction } from "@prisma/client";
import TransactionsList from "@/components/admin/TransactionsList.client";
import Navbar from "@/components/navbar";

export default async function getAll() {
  const transactions: Transaction[] = await prisma.transaction.findMany();
  return (
    <div>
      <Navbar />
      <TransactionsList transactions={transactions} />
    </div>
  );
}
