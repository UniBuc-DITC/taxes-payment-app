import Navbar from "@/components/navbar";
import prisma from "@/db/prisma";
import AddFacultyForm from "@/components/forms/admin/addFaculty";

export default async function AddFaculty() {
  const accounts = await prisma.euPlatescAccount.findMany({
    orderBy: {
      description: "asc",
    },
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <AddFacultyForm accounts={accounts} />
    </div>
  );
}
