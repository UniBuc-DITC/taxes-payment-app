import prisma from "@/db/prisma";
import AddTaxDormForm from "@/components/forms/admin/addDormTax";
import Navbar from "@/components/navbar";
export default async function AddDormitoryTaxValue() {
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
