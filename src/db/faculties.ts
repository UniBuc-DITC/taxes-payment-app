import { FacultyWithTax } from "@/types/forms/faculties";
import { FacultyTaxType, StudyCycle } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";

export async function getFacultiesWithTax(
  facultyTaxType: FacultyTaxType,
  studyCycle: StudyCycle,
): Promise<FacultyWithTax[]> {
  return await prisma.faculty.findMany({
    include: {
      facultyTaxValues: { where: { facultyTaxType, studyCycle } },
    },
    where: { euPlatescAccount: { isNot: null } },
  });
}
