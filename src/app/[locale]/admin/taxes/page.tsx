'use client'

import Link from "next/link";
import Navbar from "@/components/navbar";
import { usePathname } from "next/navigation";

export default function Taxes() {
  const pathname = usePathname();
  const lang = pathname?.split('/')[1] || "ro";

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="py-10 flex flex-col items-center">
        <div className="max-w-4xl mx-auto w-full">
          <h1 className="text-4xl font-bold text-center mb-10">
            {lang === 'ro' ? 'Administrare Taxe' : 'Tax Management'}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href={`taxes/faculty/`} passHref>
              <button className="flex items-center justify-center bg-green-500 text-white text-xl py-4 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:-translate-y-1 w-full">
                {lang === 'ro' ? 'Taxe Facultate' : 'Faculty Taxes'}
              </button>
            </Link>
            <Link href={`taxes/dormitory/`} passHref>
              <button className="flex items-center justify-center bg-blue-500 text-white text-xl py-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1 w-full">
                {lang === 'ro' ? 'Taxe Cămin' : 'Dormitory Taxes'}
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
