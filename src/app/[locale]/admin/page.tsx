import Navbar from "@/components/navbar";
import prisma from "@/db/prisma";
import HomeClient from "@/components/admin/Home.client";


export default async function Home() {
  const accounts = await prisma.euPlatescAccount.findMany({
    orderBy: {
      didacticPremiumCardOnly: "desc"
    }
  });
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <HomeClient accounts={accounts} />
    </div>
  );
}