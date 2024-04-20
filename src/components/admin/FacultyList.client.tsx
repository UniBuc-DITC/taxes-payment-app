"use client";

import Navbar from "@/components/navbar";
import Link from "next/link";
import { deleteFaculty } from "@/actions/actions";
import { Faculty } from "@prisma/client";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

interface Props {
  faculties: Faculty[];
}

export default function FacultyList({ faculties }: Props) {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-gray-100 p-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Gestionare facultati
            </h1>
            <Link href={{ pathname: "faculties/add" }} passHref>
              <p className="inline-block bg-green-500 p-3 rounded-full hover:bg-green-600 cursor-pointer">
                <FaPlus className="text-white text-4xl" />
              </p>
            </Link>
          </div>
          <div className="bg-white shadow-md rounded-lg">
            <ul className="divide-y divide-gray-200">
              {faculties.map((faculty) => (
                <li
                  key={faculty.id}
                  className="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                >
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {faculty.nameRo}
                    </h2>
                    <h4 className="text-md text-gray-600">{faculty.nameEn}</h4>
                  </div>
                  <div className="flex items-center">
                    <Link
                      href={{
                        pathname: "faculties/update",
                        query: {
                          id: faculty.id,
                          nameRo: faculty.nameRo,
                          nameEn: faculty.nameEn,
                          accountId: faculty.euplatescAccountId,
                        },
                      }}
                      passHref
                    >
                      <button className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 inline-flex items-center justify-center cursor-pointer">
                        <FaEdit className="text-white text-2xl" />
                      </button>
                    </Link>
                    <form action={deleteFaculty} method="POST">
                      <input
                        type="hidden"
                        name="facultyId"
                        value={faculty.id}
                      />
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
