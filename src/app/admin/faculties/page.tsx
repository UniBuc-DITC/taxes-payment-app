import prisma from "@/db/prisma";
import FacultyList from "@/components/admin/FacultyList.client";
import { Faculty } from "@prisma/client";

export default async function getAll() {
  const faculties: Faculty[] = await prisma.faculty.findMany({
    orderBy: {
      nameRo: "asc",
    },
  });

  return <FacultyList faculties={faculties} />;
}
