"use client";

import Navbar from "@/components/navbar";
import { IoAddCircle } from "react-icons/io5";
import { createTaxFaculty } from "@/actions/actions";
import { Faculty, FacultyTaxType, StudyCycle } from "@prisma/client";
import { useState } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { facultyTaxSchema } from "@/utils/forms/validationSchemas";

type Input = z.infer<typeof facultyTaxSchema>;

export default function AddFacultyTaxForm({
  faculties,
}: {
  faculties: Faculty[];
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Input>({
    resolver: zodResolver(facultyTaxSchema),
  });

  const processForm: SubmitHandler<Input> = async (data) => {
    await createTaxFaculty(data);
  };
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  const selectFaculties = faculties.map((faculty) => ({
    value: faculty.id,
    label: faculty.nameRo,
  }));

  const selectStudyCycles = [
    { value: "bachelors", label: "Licenta" },
    { value: "masters", label: "Masterat" },
    { value: "doctorate", label: "Doctorat" },
    { value: "postgraduate", label: "Postuniversitar" },
  ];

  const selectFacultyTaxTypes = [
    { value: "admission", label: "Admitere" },
    { value: "tuition", label: "Taxa de scolarizare" },
  ];
  return (
    <main className="py-10 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Adaugă Taxă Facultate
        </h1>

        <form
          onSubmit={handleSubmit(processForm)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold text-center">
              Valoare
            </label>
            <input
              {...register("value")}
              type="number"
              className="block h-10 w-full border border-gray-300 rounded-md p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Introdu valoarea"
            />
            {errors.value && (
              <p className="text-xs italic text-red-600 text-center">
                {errors.value.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold text-center">
              Ciclu de studiu
            </label>
            <Controller
              control={control}
              name="studyCycle"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Select
                  ref={ref}
                  onChange={(newValue) => onChange(newValue?.value)}
                  onBlur={onBlur}
                  value={selectStudyCycles.find(
                    (option) => option.value === value,
                  )}
                  className="basic-single w-full"
                  classNamePrefix="select"
                  isDisabled={isDisabled}
                  isLoading={isLoading}
                  isClearable={isClearable}
                  isRtl={isRtl}
                  isSearchable={isSearchable}
                  required={false}
                  options={selectStudyCycles}
                />
              )}
            />
            {errors.studyCycle && (
              <p className="text-xs italic text-red-600 text-center">
                {errors.studyCycle.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold text-center">
              Alege o facultate
            </label>
            <Controller
              control={control}
              name="facultyId"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Select
                  ref={ref}
                  onChange={(newValue) => onChange(newValue?.value)}
                  onBlur={onBlur}
                  value={selectFaculties.find(
                    (option) => option.value === value,
                  )}
                  className="basic-single w-full"
                  classNamePrefix="select"
                  isDisabled={isDisabled}
                  isLoading={isLoading}
                  isClearable={isClearable}
                  isRtl={isRtl}
                  isSearchable={isSearchable}
                  required={false}
                  options={selectFaculties}
                />
              )}
            />
            {errors.facultyId && (
              <p className="text-xs italic text-red-600 text-center">
                {errors.facultyId.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold text-center">
              Tip taxa facultate
            </label>
            <Controller
              control={control}
              name="facultyTaxType"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Select
                  ref={ref}
                  onChange={(newValue) => onChange(newValue?.value)}
                  onBlur={onBlur}
                  value={selectFacultyTaxTypes.find(
                    (option) => option.value === value,
                  )}
                  className="basic-single w-full"
                  classNamePrefix="select"
                  isDisabled={isDisabled}
                  isLoading={isLoading}
                  isClearable={isClearable}
                  isRtl={isRtl}
                  isSearchable={isSearchable}
                  required={false}
                  options={selectFacultyTaxTypes}
                />
              )}
            />
            {errors.facultyTaxType && (
              <p className="text-xs italic text-red-600 text-center">
                {errors.facultyTaxType.message}
              </p>
            )}
          </div>

          <div className="flex flex-col col-span-2">
            <label className="text-gray-700 font-semibold text-center">
              Observatii (RO)
            </label>
            <textarea
              {...register("remarksRo")}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Introdu observatii in romana"
            />
          </div>

          <div className="flex flex-col col-span-2">
            <label className="text-gray-700 font-semibold text-center">
              Observatii (EN)
            </label>
            <textarea
              {...register("remarksEn")}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Introdu observatii in engleza"
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              <IoAddCircle className="mr-2" /> Adauga
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
