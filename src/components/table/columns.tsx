import { ColumnDef } from "@tanstack/react-table";

type Transaction = {
  // id: 4,
  amount: number;
  charge: number;
  type: string;
  condition: string;
  cr_or_dr: "CR" | "DR";
  currency: string;
  from: string;
  to: string;
  created_at: string;
  userAccount_no: number;
}[];

type Users = {
  fullName: string;
  phoneNumber: string;
  email: string;
  created_at: string;
  account_no: number;
  account_bal: number;
  verified: boolean;
  verifying: boolean;
  pending_KYC: boolean;
  verification_id: null;
  currency: string;
  verification: null;
  transactions: Transaction[];
}[];

export const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      date.toISOString().substring(0, 10);
      return <div>{row.getValue("created_at").slice(0, 10)}</div>;
    },
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount").toLocaleString();
      return <div>{amount}</div>;
    },
  },
  {
    accessorKey: "charge",
    header: "Charge",
  },
  {
    header: "Grand Total",
    cell: ({ row }) => {
      const type = row.getValue("cr_or_dr");
      const amount = row.getValue("amount").toLocaleString();
      return (
        <div className={type == "CR" ? "text-green-500" : "text-orange-700"}>
          {amount}
        </div>
      );
    },
  },
  {
    accessorKey: "cr_or_dr",
    header: "DR/CR",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    header: "Method",
    cell: () => <div>Manual</div>,
  },
  {
    accessorKey: "condition",
    header: "Status",
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

export const usersColumns: ColumnDef<Users>[] = [
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
      return <div>{row.getValue("created_at").slice(0, 10)}</div>;
    },
  },
  {
    accessorKey: "verified",
    header: "Status",
    cell: ({ row }) => (
      <div>{!!row.getValue("verified") ? "Verified" : "Unverified"}</div>
    ),
  },
];
