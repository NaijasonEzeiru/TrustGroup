import { TransactionsSchema } from "@/helpers/schema";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { z } from "zod";
import { IUser } from "../AuthContext";
import { Cell, VerifyOptions } from "./cell";

export const transactionsColumns: ColumnDef<
  z.infer<typeof TransactionsSchema>
>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => {
      return <div>{format(getValue(), "PPP")}</div>;
    },
  },
  {
    header: "Description",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.accountName} - {row.original.note}
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Ref.",
  },
  {
    accessorKey: "amount",
    header: "Amount ($)",
    cell: ({ row }) => {
      return (
        <div
          className={`${
            row.original.type == "Deposit"
              ? "text-green-700"
              : "text-orange-700"
          }`}
        >
          {row.original.type == "Withdrawal" && "-"}{" "}
          {row.original.amount.toLocaleString()}
        </div>
      );
    },
  },
];

export const loanColumns = [
  {
    accessorKey: "currency",
    header: "Loan ID",
  },
  {
    accessorKey: "charge",
    header: "Next Payment Date",
  },
  {
    accessorKey: "cr_or_dr",
    header: "Status",
  },
  {
    accessorKey: "type",
    header: "Amount to Pay",
  },
  {
    accessorKey: "condition",
    header: "Action",
  },
];

export const UsersColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "account_no",
    header: "A/C Number",
  },
  {
    accessorKey: "fullName",
    header: "Name",
  },
  // {
  //   accessorKey: "email",
  //   header: "Email",
  // },
  {
    accessorKey: "phoneNumber",
    header: "Phone No",
  },
  {
    accessorKey: "created_at",
    header: "Registered Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      // date.toISOString().substring(0, 10);
      console.log({ verified: row.getValue("verified"), date });
      return <div>{date.toISOString().slice(0, 10)}</div>;
    },
  },
  // {
  //   accessorKey: "verified",
  //   header: "Status",
  //   cell: ({ row }) => (
  //     <div>{!!row.getValue("verified") ? "Verified" : "Unverified"}</div>
  //   ),
  // },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <Cell row={row} />;
    },
  },
];

export const VerifyColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "account_no",
    header: "A/C Number",
  },
  {
    accessorKey: "fullName",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <VerifyOptions original={row.original} />;
    },
  },
];
