'use client'

import React, { useState, useEffect } from 'react';
import { EuPlatescAccount } from "@prisma/client";
import { setEuPlatescDidacticOnly } from "@/actions/actions";

export default function HomeClient({ accounts }: { accounts: EuPlatescAccount[] }) {
    const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);

    const handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const accountId = parseInt(event.target.value);
        setSelectedAccountId(accountId);
    };

    const handleSave = async () => {
        if (selectedAccountId !== null) {
            await Promise.all(accounts.map(async (account) => {
                await setEuPlatescDidacticOnly(account.id, account.id === selectedAccountId);
            }));
        }
    };

    useEffect(() => {
        const selectedAccount = accounts.find(account => account.didacticPremiumCardOnly);
        if (selectedAccount) {
            setSelectedAccountId(selectedAccount.id);
        }
    }, [accounts]);

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-center text-xl font-semibold mb-6">Contul pentru plata cu card didactic</h1>
            <div className="flex flex-col items-center">
                <select
                    className="p-2 bg-white border rounded-lg shadow-md hover:bg-gray-100 cursor-pointer"
                    value={selectedAccountId || ""}
                    onChange={handleSelectChange}
                >
                    <option value="" disabled>Select an account</option>
                    {accounts.map((account) => (
                        <option key={account.id} value={account.id}>
                            {account.name} 
                        </option>
                    ))}
                </select>
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
