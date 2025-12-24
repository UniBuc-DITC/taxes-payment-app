import prisma from "@/lib/prisma";
import { EuPlatescAccount } from "@/generated/prisma/client";
import AccountList from "@/components/admin/AccountList.client";
import { unstable_noStore } from "next/cache";

export default async function getAllServer() {
  unstable_noStore();

  const accounts: EuPlatescAccount[] = await prisma.euPlatescAccount.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return <AccountList accounts={accounts} />;
}
