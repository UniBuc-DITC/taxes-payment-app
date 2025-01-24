import Navbar from "@/components/navbar";
import prisma from "@/db/prisma";
import EditDormitoryForm from "@/components/forms/admin/editDorm";
import { unstable_noStore } from "next/cache";

type Params = {
  searchParams: Promise<{
    id: string;
    name: string;
    accountId?: string;
  }>;
};

export default async function EditDormitory(props: Params) {
  const searchParams = await props.searchParams;
  unstable_noStore();

  const accounts = await prisma.euPlatescAccount.findMany({
    orderBy: {
      description: "asc",
    },
  });

  const searchParamsForForm = {
    id: parseInt(searchParams.id, 10),
    name: searchParams.name,
    euPlatescAccount:
      searchParams.accountId !== undefined
        ? parseInt(searchParams.accountId, 10)
        : null,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <EditDormitoryForm
        accounts={accounts}
        searchParams={searchParamsForForm}
      />
    </div>
  );
}
