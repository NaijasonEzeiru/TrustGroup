import AuthContext from "@/components/AuthContext";
import React, { useContext, useState } from "react";
// import { format } from 'date-fns';
// import styles from "@/styles/Dashboard.module.css";
import { DataTable } from "../table/data-table";
import { transactionsColumns } from "../table/columns";

const Transactions = () => {
  const { user }: any = useContext(AuthContext);

  return (
    <>
      <p className="mt-3">Recent Transactions</p>
      {user?.transactions && (
        <DataTable
          columns={transactionsColumns}
          data={user?.transactions}
          isLoading={false}
        />
      )}
    </>
  );
};

export default Transactions;
