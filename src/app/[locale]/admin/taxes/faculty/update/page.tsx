import Navbar from "@/components/navbar";
import Button from "@/components/UI/button";
import { updateTaxFaculty } from "@/actions/actions";
import prisma from "@/db/prisma";
import EditFacultyTaxForm from "@/components/forms/admin/editFacultyTax";

type Props = {
  searchParams: {
    id: string;
    value: string;
    studyCycle: string;
    facultyId: string;
    facultyTaxType: string;
    remarksRo: string;
    remarksEn: string;
  };
};

export default async function Edit({ searchParams }: Props) {
  const faculties = await prisma.faculty.findMany();
  const {
    id,
    value,
    studyCycle,
    facultyId,
    facultyTaxType,
    remarksRo,
    remarksEn,
  } = searchParams;
  const searchParamsForForm = {
    id: parseInt(id, 10),
    value: value,
    studyCycle: studyCycle,
    facultyId: parseInt(facultyId),
    facultyTaxType: facultyTaxType,
    remarksRo: remarksRo,
    remarksEn: remarksEn,
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <EditFacultyTaxForm
        faculties={faculties}
        searchParams={searchParamsForForm}
      />
    </div>
  );
}
