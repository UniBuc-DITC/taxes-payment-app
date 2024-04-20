"use client";

import React, { useState } from "react";
import { EuPlatescAccount } from "@prisma/client";
import { setEuPlatescDidacticOnly } from "@/actions/actions";
import Select from "react-select";

export default function HomeClient({
  accounts,
}: {
  accounts: EuPlatescAccount[];
}) {
  const [selectedAccount, setSelectedAccount] =
    useState<EuPlatescAccount | null>(accounts[0]);

  const handleSelectChange = (selectedOption: any) => {
    setSelectedAccount(
      selectedOption
        ? accounts.find((account) => account.id === selectedOption.value) ||
            null
        : null,
    );
  };

  const handleSave = async () => {
    if (selectedAccount !== null) {
      await setEuPlatescDidacticOnly(selectedAccount.id, true);
      await Promise.all(
        accounts.map(async (account) => {
          if (account.id !== selectedAccount.id) {
            await setEuPlatescDidacticOnly(account.id, false);
          }
        }),
      );
    }
  };

  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-center text-xl font-semibold mb-6">
        Contul pentru plata cu card didactic
      </h1>
      <div className="flex flex-col items-center">
        <Select
          options={accounts.map((account) => ({
            value: account.id,
            label: account.name,
          }))}
          value={
            selectedAccount
              ? { value: selectedAccount.id, label: selectedAccount.name }
              : null
          }
          onChange={handleSelectChange}
          placeholder="Select an account"
          isClearable={isClearable}
          isSearchable={isSearchable}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isRtl={isRtl}
        />
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}
