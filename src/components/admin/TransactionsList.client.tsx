'use client'

import React from "react";
import { Transaction } from "@prisma/client";
import { flexRender, 
getCoreRowModel, 
getPaginationRowModel, 
getSortedRowModel, 
useReactTable,
SortingState, 
getFilteredRowModel } from '@tanstack/react-table'
import { useMemo } from "react";
import { columns } from "@/app/[locale]/admin/transactions/columns";

type Props = {
    transactions: Transaction[]
}

export default function TransactionsList({transactions} : Props) {

    const data = useMemo(() => transactions, [])
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [search, setSearch] = React.useState<string>();
    const table = useReactTable({
        data, 
        columns, 
        state: {
            sorting,
            globalFilter: search
        },
        debugTable: true,
        onSortingChange: setSorting,
        onGlobalFilterChange: setSearch,
        getCoreRowModel: getCoreRowModel(), 
        getPaginationRowModel:getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    })
    
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 px-3 py-2 rounded-md"
                        placeholder="Search..."
                    />
                    <div>
                        <button
                            className="mr-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => table.setPageIndex(0)}
                        >
                            First Page
                        </button>
                        <button
                            className="mr-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={!table.getCanPreviousPage()}
                            onClick={() => table.previousPage()}
                        >
                            Previous Page
                        </button>
                        <button
                            className="mr-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={!table.getCanNextPage()}
                            onClick={() => table.nextPage()}
                        >
                            Next Page
                        </button>
                        <button
                            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        >
                            Last Page
                        </button>
                    </div>
                </div>
            <div className="overflow-x-auto">
                
                <table className="table-auto min-w-full divide-y divide-gray-200">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="user-table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" onClick={header.column.getToggleSortingHandler()}>
                                        <div>{flexRender(header.column.columnDef.header, header.getContext())}{{asc: ' 🔼', desc: ' 🔽'}[header.column.getIsSorted() as string] ?? null}</div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

