import prisma from "@/db/prisma";
import Navbar from "@/components/navbar";
import { FacultyTaxValue } from "@prisma/client";
import FacultyTaxList from "@/components/admin/FacultyTaxList.client";
import {unstable_noStore} from "next/cache";

export default async function getAll() {
  unstable_noStore();

  const taxFaculties: FacultyTaxValue[] = await prisma.facultyTaxValue.findMany(
    {
      orderBy: {
        value: "asc",
      },
    },
  );
  const faculties = await prisma.faculty.findMany();
  return (
    <div>
      <Navbar />
      <FacultyTaxList taxFaculties={taxFaculties} faculties={faculties} />
    </div>
  );
}
