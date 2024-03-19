import Navbar from "@/components/navbar";
import prisma from "@/db/prisma";
import AddFacultyTaxForm from "@/components/forms/admin/addFacultyTax";

export default async function Add() {
    const faculties = await prisma.faculty.findMany();

    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <AddFacultyTaxForm faculties={faculties} />
      </div>
    );
}
