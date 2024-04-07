"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateTaxDorm } from "@/actions/actions";
import { IoAddCircleOutline } from "react-icons/io5";

import { dormTaxSchema } from "@/utils/forms/validationSchemas";
import { StudentDorm } from "@prisma/client";
import { useState } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";

type Input = z.infer<typeof dormTaxSchema>;
type Props = {
  dormitories: StudentDorm[];
  searchParams: {
    id: number;
    value: string;
    studentDormId: number;
    remarksRo?: string;
    remarksEn?: string;
  };
};

export default function EditTaxDormForm({ dormitories, searchParams }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Input>({
    resolver: zodResolver(dormTaxSchema),
    defaultValues: {
      studentDormId: searchParams.studentDormId,
    },
  });
  const processForm: SubmitHandler<Input> = async (data) => {
    await updateTaxDorm(data, searchParams.id);
  };

  const selectDorms = dormitories.map((dorm) => ({
    value: dorm.id,
    label: dorm.name,
  }));

  const [isClearable, setIsClearable] = useState(false);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  return (
    <main className="py-10 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Editeaza Taxă Cazare Camin
        </h1>
        <form
          onSubmit={handleSubmit(processForm)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold text-center">
              Valoare
            </label>
            <input
              {...register("value")}
              type="number"
              className="w-full h-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:ring-opacity-50 focus:outline-none focus:border-green-500 transition duration-300 ease-in-out hover:border-green-500"
              placeholder="Introdu valoarea"
              defaultValue={searchParams.value}
            />
            {errors.value && (
              <p className="text-xs italic text-red-600 text-center">
                {errors.value.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 font-semibold text-center">
              Alege un camin
            </label>
            <Controller
              control={control}
              name="studentDormId"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Select
                  ref={ref}
                  onChange={(newValue) => onChange(newValue?.value)}
                  onBlur={onBlur}
                  value={selectDorms.find((option) => option.value === value)}
                  className="basic-single w-full"
                  classNamePrefix="select"
                  isDisabled={isDisabled}
                  isLoading={isLoading}
                  isClearable={isClearable}
                  isRtl={isRtl}
                  isSearchable={isSearchable}
                  required={false}
                  options={selectDorms}
                />
              )}
            />
            {errors.studentDormId && (
              <p className="text-xs italic text-red-600 text-center">
                {errors.studentDormId.message}
              </p>
            )}
          </div>

          <div className="flex flex-col col-span-2">
            <label className="block text-gray-700 font-semibold text-center">
              Observații (RO)
            </label>
            <textarea
              {...register("remarksRo")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:ring-opacity-50 focus:outline-none focus:border-green-500 transition duration-300 ease-in-out hover:border-green-500"
              placeholder="Introdu observații în română"
              defaultValue={searchParams.remarksRo}
            />
          </div>

          <div className="flex flex-col col-span-2">
            <label className="block text-gray-700 font-semibold text-center">
              Observații (EN)
            </label>
            <textarea
              {...register("remarksEn")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:ring-opacity-50 focus:outline-none focus:border-green-500 transition duration-300 ease-in-out hover:border-green-500"
              placeholder="Introdu observații în engleză"
              defaultValue={searchParams.remarksEn}
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              <IoAddCircleOutline className="mr-2" /> Editeaza
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
