'use client'

import { IoAddCircleOutline } from "react-icons/io5";
import { updateDormitory } from "@/actions/actions";
import { EuPlatescAccount } from "@prisma/client";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Select from "react-select"

import { dormSchema } from "@/utils/forms/validationSchemas";

type Input = z.infer<typeof dormSchema>
type Props = {
  accounts : EuPlatescAccount[], 
  searchParams: {
    id: number,
    name: string,
    euPlatescAccount? : number | null
  }
}

const EditDormitoryForm = ({ accounts, searchParams } : Props) => {
  const {id, name, euPlatescAccount} = searchParams;
  const {
    register, 
    handleSubmit,
    setValue,
    control,
    formState : {errors}
  } = useForm<Input>({
    resolver: zodResolver(dormSchema),
    defaultValues: {
      accountId: euPlatescAccount ? euPlatescAccount : undefined
    }
   
  })
  const processForm: SubmitHandler<Input> = async data => {
    await updateDormitory(data, id)
  }

  const [isClearable, setIsClearable] = useState(false);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  const selectAccounts = accounts.map((account) => ({
    value: account.id,
    label: account.name
  }))

  const selectAccountswithNull = [
    ...selectAccounts,
    {
      value: null,
      label: 'Niciun cont'
    }
  ]

  return (
    <main className="py-10 flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
        Editează Cămin
      </h1>
      <form onSubmit={handleSubmit(processForm)} className="space-y-6">
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold text-center">
            Nume cămin
          </label>
          <input 
            className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1"
            placeholder='Introduceți numele căminului'
            defaultValue={name}
            {...register("name")}
          />
          {errors.name && <p className="text-xs italic text-red-600 text-center">{errors.name.message}</p>}
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
                      value={selectAccountswithNull.find((option) => option.value === value)}
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={isDisabled}
                      isLoading={isLoading}
                      isClearable={isClearable}
                      isRtl={isRtl}
                      isSearchable={isSearchable}
                      required={false}
                      options={selectAccountswithNull}
                    />
                )}
                
              />
              {errors.accountId && <p className="text-xs italic text-red-600 text-center">{errors.accountId.message}</p>}
            </div>
        <button type="submit" className="w-full flex items-center justify-center px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1">
          <IoAddCircleOutline className="mr-2" /> Editează
        </button>
      </form>
    </div>
  </main>
  
  );
};

export default EditDormitoryForm;