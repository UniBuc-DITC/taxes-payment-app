import Navbar from "@/components/navbar";
import prisma from "@/db/prisma";
import HomeClient from "@/components/admin/Home.client";
import { unstable_noStore } from "next/cache";

export default async function Home() {
  unstable_noStore();

  const accounts = await prisma.euPlatescAccount.findMany({
    orderBy: {
      didacticPremiumCardOnly: "desc",
    },
  });
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <HomeClient accounts={accounts} />
    </div>
  );
}
