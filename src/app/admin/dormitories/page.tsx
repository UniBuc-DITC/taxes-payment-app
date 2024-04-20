import prisma from "@/db/prisma";
import { StudentDorm } from "@prisma/client";
import DormitoryList from "@/components/admin/DormitoryList.client";

export default async function getAllServer() {
  const dormitories: StudentDorm[] = await prisma.studentDorm.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return <DormitoryList dormitories={dormitories} />;
}
