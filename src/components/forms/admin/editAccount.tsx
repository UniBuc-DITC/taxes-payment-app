"use client";

import { updateEuPlatescAccount } from "@/actions/actions";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { IoAddCircleOutline } from "react-icons/io5";
import { euPlatescAccountSchema } from "@/utils/forms/validationSchemas";

type Props = {
  searchParams: {
    id: string;
    name: string;
    description?: string;
    merchantId: string;
    secretKey: string;
  };
};
type Input = z.infer<typeof euPlatescAccountSchema>;

export default function EditAccount({ searchParams }: Props) {
  const { id, name, description, merchantId, secretKey } = searchParams;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    resolver: zodResolver(euPlatescAccountSchema),
  });

  const processForm: SubmitHandler<Input> = async (data) => {
    await updateEuPlatescAccount(data, parseInt(id, 10));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="py-10 flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
          <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
            Editeaza Cont EuPlatesc
          </h1>
          <form onSubmit={handleSubmit(processForm)} className="space-y-6">
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-center">
                Nume Cont
              </label>
              <input
                {...register("name")}
                type="text"
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                placeholder="Introduceți numele contului"
                defaultValue={name}
              />
              {errors.name && (
                <p className="text-xs italic text-red-600 text-center">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-center">
                Descriere
              </label>
              <textarea
                {...register("description")}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                placeholder="Introduceți o descriere"
                defaultValue={description}
              ></textarea>
              {errors.description && (
                <p className="text-xs italic text-red-600 text-center">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-center">
                ID Comerciant
              </label>
              <input
                {...register("merchantId")}
                type="text"
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                placeholder="Introduceți ID-ul comerciantului"
                defaultValue={merchantId}
              />
              {errors.merchantId && (
                <p className="text-xs italic text-red-600 text-center">
                  {errors.merchantId.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-center">
                Cheie Secretă
              </label>
              <input
                {...register("secretKey")}
                type="text"
                className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                placeholder="Introduceți cheia secretă"
                defaultValue={secretKey}
              />
              {errors.secretKey && (
                <p className="text-xs italic text-red-600 text-center">
                  {errors.secretKey.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              <IoAddCircleOutline className="mr-2" /> Editeaza
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
