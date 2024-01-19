import { FacultyWithTax } from "@/types/forms/faculties";
import { FacultyTaxType, StudyCycle } from "@prisma/client";
import prisma from "./prisma";

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
