"use client";

import Navbar from "@/components/navbar";
import Link from "next/link";
import { deleteDormitory } from "@/actions/actions";
import { StudentDorm } from "@prisma/client";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

interface Props {
  dormitories: StudentDorm[];
}

export default function DormitoryList({ dormitories }: Props) {
  return (
    <div>
      <Navbar />
      <main className="flex min-h-screen bg-gray-100 p-10 flex-col items-center justify-start">
        <div className="w-full max-w-4xl">
          <div className="mb-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Gestionare camine
            </h1>
            <Link href="dormitories/add">
              <p className="inline-block bg-green-500 p-3 rounded-full hover:bg-green-600 cursor-pointer">
                <FaPlus className="text-white text-4xl" />
              </p>
            </Link>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {dormitories.map((dormitory) => (
                <li
                  key={dormitory.id}
                  className="px-6 py-4 flex justify-between items-center hover:bg-gray-50"
                >
                  <span className="flex-1 text-sm font-medium text-gray-900">
                    {dormitory.name}
                  </span>
                  <div className="flex items-center">
                    <Link
                      href={{
                        pathname: "dormitories/update",
                        query: {
                          id: dormitory.id,
                          name: dormitory.name,
                          accountId: dormitory.euplatescAccountId,
                        },
                      }}
                      passHref
                    >
                      <p className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 inline-flex items-center justify-center cursor-pointer">
                        <FaEdit className="text-white text-2xl" />
                      </p>
                    </Link>
                    <form action={deleteDormitory}>
                      <input
                        type="hidden"
                        name="dormitoryId"
                        value={dormitory.id}
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
