'use client'

import Link from "next/link";
import { deleteTaxFaculty } from "@/actions/actions";
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { Faculty, FacultyTaxValue } from "@prisma/client";

interface Props {
    taxFaculties: FacultyTaxValue[]
    faculties: Faculty[]

}

export default function FacultyTaxList({taxFaculties, faculties} : Props) {
  

  const tuitionValues = taxFaculties.filter(value => value.facultyTaxType === 'tuition');
  const admissionValues = taxFaculties.filter(value => value.facultyTaxType === 'admission');
  return (
    
      <main className="min-h-screen bg-gray-100 p-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Listă Valorilor Taxelor Facultății
          </h1>
          <div className="flex justify-end mb-4">
            <Link href={`faculty/add`} passHref>
              <p className="inline-block bg-green-500 p-3 rounded-full hover:bg-green-600 cursor-pointer">
                <FaPlus className="text-white text-4xl" />
              </p>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4 text-center">
                Taxă Școlarizare
              </h2>
              {tuitionValues.map((value) => (
                <div key={value.id} className="border p-4 rounded-md mb-4 bg-white">
                  <div><strong>Valoare: </strong> {value.value.toString()}</div>
                  <div><strong>Ciclu de Studiu: </strong> {value.studyCycle}</div>
                  <div><strong>Facultate :</strong> {faculties.find(faculty => faculty.id === value.facultyId)?.nameRo}</div>
                  <div><strong>Tip de Taxă: </strong> {value.facultyTaxType}</div>
                  <div><strong>Observații (RO) :</strong> {value.remarksRo}</div>
                  <div><strong>Observații (EN) :</strong> {value.remarksEn}</div>
                  <div className="flex justify-end gap-2">
                    <Link href={{
                      pathname: `faculty/update`,
                      query: {
                        id: value.id,
                        value: value.value.toString(),
                        studyCycle: value.studyCycle,
                        facultyId: value.facultyId,
                        facultyTaxType: value.facultyTaxType,
                        remarksRo: value.remarksRo,
                        remarksEn: value.remarksEn,
                        
                      },
                    }} passHref>
                       <p className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 inline-flex items-center justify-center cursor-pointer">
                        <FaEdit className="text-white text-2xl" />
                      </p>
                    </Link>
                    <form action={deleteTaxFaculty} method="post">
                      <input type="hidden" name="taxFacultyId" value={value.id} />
                      <button type="submit" className="p-2 bg-red-500 rounded-full hover:bg-red-600 inline-flex items-center justify-center">
                        <FaTrash className="text-white text-2xl" />
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4 text-center">
                Taxă Admitere
              </h2>
              {admissionValues.map((value) => (
                <div key={value.id} className="border p-4 rounded-md mb-4 bg-white">
                  <div><strong>Valoare :</strong> {value.value.toString()}</div>
                  <div><strong>Ciclu de Studiu: </strong> {value.studyCycle}</div>
                  <div><strong>Facultate: </strong> {faculties.find(faculty => faculty.id === value.facultyId)?.nameRo}</div>
                  <div><strong>Tip de Taxă :</strong> {value.facultyTaxType}</div>
                  <div><strong>Observații (RO): </strong> {value.remarksRo}</div>
                  <div><strong>Observații (EN): </strong> {value.remarksEn}</div>
                  <div className="flex justify-end gap-2">
                    <Link href={{
                      pathname: `faculty/update`,
                      query: {
                        id: value.id,
                        value: value.value.toString(),
                        studyCycle: value.studyCycle,
                        facultyId: value.facultyId,
                        facultyTaxType: value.facultyTaxType,
                        remarksRo: value.remarksRo,
                        remarksEn: value.remarksEn,
                      },
                    }} passHref>
                      <p className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 inline-flex items-center justify-center cursor-pointer">
                        <FaEdit className="text-white text-2xl" />
                      </p>
                    </Link>
                    <form action={deleteTaxFaculty} method="post">
                      <input type="hidden" name="taxFacultyId" value={value.id} />
                      <button type="submit" className="p-2 bg-red-500 rounded-full hover:bg-red-600 inline-flex items-center justify-center">
                        <FaTrash className="text-white text-2xl" />
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
  );
}


