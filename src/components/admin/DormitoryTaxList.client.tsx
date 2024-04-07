"use client";

import Navbar from "@/components/navbar";
import Link from "next/link";
import { deleteTaxDorm } from "@/actions/actions";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { StudentDorm, StudentDormTaxValue } from "@prisma/client";

export default function DormitoryTaxList({
  taxStudentDorm,
  studentDorms,
}: {
  taxStudentDorm: StudentDormTaxValue[];
  studentDorms: StudentDorm[];
}) {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-gray-100 p-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Lista Valori Taxe Cazare
          </h1>
          <div className="flex justify-end mb-4">
            <Link href="dormitory/add" passHref>
              <p className="inline-block bg-green-500 p-3 rounded-full hover:bg-green-600 cursor-pointer">
                <FaPlus className="text-white text-4xl" />
              </p>
            </Link>
          </div>
          <div className="bg-white shadow-md rounded-lg">
            <ul className="divide-y divide-gray-200">
              {taxStudentDorm.map((value) => (
                <li
                  key={value.id}
                  className="px-6 py-4 flex justify-between items-center hover:bg-gray-50"
                >
                  <div>
                    <div className="text-lg font-medium">
                      <strong>Valoare: </strong> {value.value.toString()}
                    </div>
                    <div>
                      <strong>Camin: </strong>{" "}
                      {
                        studentDorms.find(
                          (dorm) => dorm.id === value.studentDormId,
                        )?.name
                      }
                    </div>
                    <div>
                      <strong>Observatii (RO): </strong> {value.remarksRo}
                    </div>
                    <div>
                      <strong>Observatii (EN): </strong> {value.remarksEn}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={{
                        pathname: `dormitory/update`,
                        query: {
                          id: value.id,
                          value: value.value.toString(),
                          studentDormId: value.studentDormId,
                          remarksRo: value.remarksRo,
                          remarksEn: value.remarksEn,
                        },
                      }}
                      passHref
                    >
                      <p className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 inline-flex items-center justify-center cursor-pointer">
                        <FaEdit className="text-white text-2xl" />
                      </p>
                    </Link>
                    <form action={deleteTaxDorm} method="post">
                      <input type="hidden" name="taxDormId" value={value.id} />
                      <button
                        type="submit"
                        className="p-2 bg-red-500 rounded-full hover:bg-red-600 inline-flex items-center justify-center"
                      >
                        <FaTrash className="text-white text-2xl" />
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
