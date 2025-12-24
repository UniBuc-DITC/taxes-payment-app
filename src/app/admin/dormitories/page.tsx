import prisma from "@/lib/prisma";
import { StudentDorm } from "@/generated/prisma/client";
import DormitoryList from "@/components/admin/DormitoryList.client";
import { unstable_noStore } from "next/cache";

export default async function getAllServer() {
  unstable_noStore();

  const dormitories: StudentDorm[] = await prisma.studentDorm.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return <DormitoryList dormitories={dormitories} />;
}
