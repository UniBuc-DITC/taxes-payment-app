'use client'

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createFaculty } from "@/actions/actions";
import { EuPlatescAccount } from "@prisma/client";
import { IoAddCircleOutline } from 'react-icons/io5';
import { useState } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";


import { facultySchema } from "@/utils/forms/validationSchemas";

type Input = z.infer<typeof facultySchema>;

const AddFacultyForm = ({ accounts }: { accounts: EuPlatescAccount[] }) => {
  const {
    register, 
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<Input>({
    resolver: zodResolver(facultySchema)
  });

  const processForm: SubmitHandler<Input> = async data => {
    await createFaculty(data);
  };
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  const selectAccounts = accounts.map((account) => ({
    value: account.id,
    label: account.name
  }))


  return (
    <main className="py-10 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Adaugă Facultate
        </h1>
        <form onSubmit={handleSubmit(processForm)} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold text-center">
              Nume facultate (RO)
            </label>
            <input
              className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1"
              placeholder='Introduceți numele facultății (RO)'
              {...register("nameRo")}
            />
            {errors.nameRo && <p className="text-xs italic text-red-600 text-center">{errors.nameRo.message}</p>}
          </div>
  
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold text-center">
              Nume facultate (EN)
            </label>
            <input
              className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1"
              placeholder='Introduceți numele facultății (EN)'
              {...register("nameEn")}
            />
            {errors.nameEn && <p className="text-xs italic text-red-600 text-center">{errors.nameEn.message}</p>}
          </div>
    
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold text-center">
              Alege un cont
            </label>
            <Controller
              control={control}
              name = "accountId"
              render={({field: { onChange, onBlur, value, ref }}) => (                
                <Select
                    ref = {ref}
                    onChange={(newValue) => onChange(newValue?.value)}
                    onBlur={onBlur}
                    value={selectAccounts.find((option) => option.value === value)}
                    className="basic-single"
                    classNamePrefix="select"
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    isClearable={isClearable}
                    isRtl={isRtl}
                    isSearchable={isSearchable}
                    required={false}
                    options={selectAccounts}
                  />
              )}
              
            />
            {errors.accountId && <p className="text-xs italic text-red-600 text-center">{errors.accountId.message}</p>}
          </div>
  
          <button type="submit" className="w-full flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1">
            <IoAddCircleOutline className="mr-2" /> Adaugă
          </button>
        </form>
      </div>
    </main>
  );
  
};

export default AddFacultyForm;
