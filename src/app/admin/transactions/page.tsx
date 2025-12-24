import { unstable_noStore } from "next/cache";

import TransactionsList from "@/components/admin/TransactionsList.client";
import Navbar from "@/components/navbar";

import prisma from "@/lib/prisma";
import { Transaction } from "@/generated/prisma/client";

export default async function getAll() {
  unstable_noStore();

  const transactions: Transaction[] = await prisma.transaction.findMany();
  return (
    <div>
      <Navbar />
      <TransactionsList transactions={transactions} />
    </div>
  );
}
