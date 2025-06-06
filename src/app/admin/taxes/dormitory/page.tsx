import prisma from "@/db/prisma";
import { StudentDormTaxValue, StudentDorm } from "@prisma/client";
import DormitoryTaxList from "@/components/admin/DormitoryTaxList.client";
import { unstable_noStore } from "next/cache";

export default async function getAll() {
  unstable_noStore();

  const taxStudentDorm: StudentDormTaxValue[] =
    await prisma.studentDormTaxValue.findMany({
      orderBy: {
        value: "asc",
      },
    });
  const studentDorms: StudentDorm[] = await prisma.studentDorm.findMany();

  return (
    <DormitoryTaxList
      taxStudentDorm={taxStudentDorm}
      studentDorms={studentDorms}
    />
  );
}
