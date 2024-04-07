"use client";

import Navbar from "@/components/navbar";
import Link from "next/link";
import { EuPlatescAccount } from "@prisma/client";
import { deleteEuPlatescAccount } from "@/actions/actions";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

interface Props {
  accounts: EuPlatescAccount[];
}

export default function getAllEuPlatescAccounts({ accounts }: Props) {
  return (
    <div>
      <Navbar />
      <main className="flex min-h-screen bg-gray-100 p-10 flex-col items-center justify-start">
        <div className="w-full max-w-4xl">
          <div className="mb-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Gestionare conturi EuPlatesc
            </h1>
            <Link href={{ pathname: "euplatesc-accounts/add" }} passHref>
              <p className="inline-block bg-green-500 p-3 rounded-full hover:bg-green-600 cursor-pointer">
                <FaPlus className="text-white text-4xl" />
              </p>
            </Link>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {accounts.map((account) => (
                <li
                  key={account.id}
                  className="px-6 py-4 flex justify-between items-center hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {account.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {account.description || "No description"}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Link
                      href={{
                        pathname: "euplatesc-accounts/update",
                        query: {
                          id: account.id,
                          name: account.name,
                          description: account.description,
                          merchantId: account.merchantId,
                          secretKey: account.secretKey,
                          didacticPremiumCardOnly:
                            account.didacticPremiumCardOnly,
                        },
                      }}
                      passHref
                    >
                      <p className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 inline-flex items-center justify-center cursor-pointer">
                        <FaEdit className="text-white text-2xl" />
                      </p>
                    </Link>
                    <form action={deleteEuPlatescAccount} method="post">
                      <input
                        type="hidden"
                        name="accountId"
                        value={account.id}
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
