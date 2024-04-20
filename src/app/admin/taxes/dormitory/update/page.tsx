import EditTaxDormForm from "@/components/forms/admin/editDormTax";
import Navbar from "@/components/navbar";
import prisma from "@/db/prisma";

type Props = {
  searchParams: {
    id: string;
    value: string;
    studentDormId: string;
    remarksRo: string;
    remarksEn: string;
  };
};

export default async function EditDormitoryTaxValue({ searchParams }: Props) {
  const dormitories = await prisma.studentDorm.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const searchParamsForForm = {
    id: parseInt(searchParams.id, 10),
    value: searchParams.value,
    studentDormId: parseInt(searchParams.studentDormId, 10),
    remarksRo: searchParams.remarksRo,
    remarksEn: searchParams.remarksEn,
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <EditTaxDormForm
        dormitories={dormitories}
        searchParams={searchParamsForForm}
      />
    </div>
  );
}
