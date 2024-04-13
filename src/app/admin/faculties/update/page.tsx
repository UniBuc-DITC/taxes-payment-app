import Navbar from "@/components/navbar";
import prisma from "@/db/prisma";
import EditFacultyForm from "@/components/forms/admin/editFaculty";

type Params = {
  searchParams: {
    id: string;
    nameRo: string;
    nameEn: string;
    accountId?: string;
  };
};

export default async function EditFaculty({ searchParams }: Params) {
  const accounts = await prisma.euPlatescAccount.findMany({
    orderBy: {
      description: "asc",
    },
  });

  const searchParamsForForm = {
    id: parseInt(searchParams.id, 10),
    nameRo: searchParams.nameRo,
    nameEn: searchParams.nameEn,
    euPlatescAccount:
      searchParams.accountId !== undefined
        ? parseInt(searchParams.accountId, 10)
        : null,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <EditFacultyForm accounts={accounts} searchParams={searchParamsForForm} />
    </div>
  );
}
