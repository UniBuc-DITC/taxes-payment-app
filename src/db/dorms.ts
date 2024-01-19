import { DormWithTax } from "@/types/forms/dorms";
import prisma from "./prisma";

export async function getDormsWithTax(): Promise<DormWithTax[]> {
  return await prisma.studentDorm.findMany({
    include: {
      studentDormTaxValues: true,
    },
    where: { euPlatescAccount: { isNot: null } },
  });
}
