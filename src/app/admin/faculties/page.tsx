import prisma from "@/db/prisma";
import FacultyList from "@/components/admin/FacultyList.client";
import { Faculty } from "@prisma/client";
import { unstable_noStore } from "next/cache";

export default async function getAll() {
  unstable_noStore();

  const faculties: Faculty[] = await prisma.faculty.findMany({
    orderBy: {
      nameRo: "asc",
    },
  });

  return <FacultyList faculties={faculties} />;
}
