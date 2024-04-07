import prisma from "@/db/prisma";
import Navbar from "@/components/navbar";
import FacultyList from "@/components/admin/FacultyList.client";
import { unstable_noStore } from "next/cache";
import { Faculty } from "@prisma/client";

export default async function getAll() {
  const faculties: Faculty[] = await prisma.faculty.findMany({
    orderBy: {
      nameRo: "asc",
    },
  });

  return <FacultyList faculties={faculties} />;
}
