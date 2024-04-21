import prisma from "@/db/prisma";
import AddTaxDormForm from "@/components/forms/admin/addDormTax";
import Navbar from "@/components/navbar";
import {unstable_noStore} from "next/cache";

export default async function AddDormitoryTaxValue() {
  unstable_noStore();

  const dormitories = await prisma.studentDorm.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <AddTaxDormForm dormitories={dormitories} />
    </div>
  );
}
