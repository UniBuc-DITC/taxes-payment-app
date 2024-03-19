import Navbar from "@/components/navbar";
import prisma from "@/db/prisma";
import AddDormitoryForm from "@/components/forms/admin/addDorm";

export default async function AddDormitory() {
  const accounts = await prisma.euPlatescAccount.findMany({
    orderBy: {
      description: "asc"
    }
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <AddDormitoryForm accounts={accounts} />
    </div>
  );
}
