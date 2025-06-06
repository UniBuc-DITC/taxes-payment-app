import EditTaxDormForm from "@/components/forms/admin/editDormTax";
import Navbar from "@/components/navbar";
import prisma from "@/db/prisma";
import { unstable_noStore } from "next/cache";

type Props = {
  searchParams: Promise<{
    id: string;
    value: string;
    studentDormId: string;
    remarksRo: string;
    remarksEn: string;
  }>;
};

export default async function EditDormitoryTaxValue(props: Props) {
  const searchParams = await props.searchParams;
  unstable_noStore();

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
