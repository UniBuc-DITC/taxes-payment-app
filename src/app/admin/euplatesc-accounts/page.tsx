import prisma from "@/db/prisma";
import { EuPlatescAccount } from "@prisma/client";
import AccountList from "@/components/admin/AccountList.client";

export default async function getAllServer() {
  const accounts: EuPlatescAccount[] = await prisma.euPlatescAccount.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return <AccountList accounts={accounts} />;
}
