import { Transaction } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Transaction>();
export const columns = [
  columnHelper.accessor("id", {
    header: () => "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("epid", {
    header: () => "epid",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: () => "status",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("description", {
    header: () => "description",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("value", {
    header: () => "value",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("firstName", {
    header: () => "FIRST NAME",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastName", {
    header: () => "LAST NAME",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("personalIdCode", {
    header: () => "CNP",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("country", {
    header: () => "Country",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("city", {
    header: () => "City",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("phoneNumber", {
    header: () => "phone number",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("emailAddress", {
    header: () => "email",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("createdAt", {
    header: () => "Created At",
    cell: (info) => {
      const createdAt = info.getValue() as Date;
      const formattedCreatedAt = createdAt.toLocaleString();
      return <div>{formattedCreatedAt}</div>;
    },
  }) /*
  columnHelper.accessor("updatedAt", {
    header: () => "Updated At",
    cell: (info) => info.getValue(),
  }), */,
];
