import Navbar from "@/components/navbar";
import prisma from "@/db/prisma";
import AddDormitoryForm from "@/components/forms/admin/addDorm";
import { unstable_noStore } from "next/cache";

export default async function AddDormitory() {
  unstable_noStore();

  const accounts = await prisma.euPlatescAccount.findMany({
    orderBy: {
      description: "asc",
    },
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <AddDormitoryForm accounts={accounts} />
    </div>
  );
}
