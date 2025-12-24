import { unstable_noStore } from "next/cache";

import prisma from "@/lib/prisma";
import { Faculty } from "@/generated/prisma/client";

import FacultyList from "@/components/admin/FacultyList.client";

export default async function getAll() {
  unstable_noStore();

  const faculties: Faculty[] = await prisma.faculty.findMany({
    orderBy: {
      nameRo: "asc",
    },
  });

  return <FacultyList faculties={faculties} />;
}
