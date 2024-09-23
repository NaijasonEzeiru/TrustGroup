"use client";

import Link from "next/link";
import React, { useContext } from "react";
import styles from "@/styles/Dashboard.module.css";
import AuthContext from "../AuthContext";
import { DataTable } from "../table/data-table";
import { loanColumns, transactionsColumns } from "../table/columns";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  // const { account_no, account_bal } = user;

  return (
    <div className="px-1 pb-6 bg-background shadow">
      {" "}
      {user ? (
        <>
          <div className={styles.con}>
            <p>Account Number</p>
            <p>{user?.account_no}</p>
          </div>
          <div className={styles.con}>
            <p>Account Balance</p>
            <p>
              {user?.currency}
              {user?.account_bal}
            </p>
          </div>
          <div className={styles.resFlex}>
            <div className="shadow">
              <div className={styles.flex}>
                <p>Active Users</p>{" "}
                <Link href={""}>
                  <p style={{ whiteSpace: "nowrap" }}>&#8594; View</p>
                </Link>
              </div>
              <p>$0</p>
            </div>
            <div className="shadow">
              <div className={styles.flex}>
                <p>Pending KYC</p>{" "}
                <Link href={""}>
                  <p style={{ whiteSpace: "nowrap" }}>&#8594; View</p>
                </Link>
              </div>
              <p>$0</p>
            </div>
            <div className="shadow">
              <div className={styles.flex}>
                <p>Pending Tickets</p>{" "}
                <Link href={""}>
                  <p style={{ whiteSpace: "nowrap" }}>&#8594; View</p>
                </Link>
              </div>
              <p>$0</p>
            </div>
            <div className="shadow">
              <div className={styles.flex}>
                <p>Deposit Requests</p>{" "}
                <Link href={""}>
                  <p style={{ whiteSpace: "nowrap" }}>&#8594; View</p>
                </Link>
              </div>
              <p>$0</p>
            </div>
          </div>
          <div className={styles.resFlex}>
            <div className="shadow">
              <div className={styles.flex}>
                <p>Withdrawal Requests</p>{" "}
                <Link href={""}>
                  <p style={{ whiteSpace: "nowrap" }}>&#8594; View</p>
                </Link>
              </div>
              <p>$0</p>
            </div>
            <div className="shadow">
              <div className={styles.flex}>
                <p>FDR Requests</p>{" "}
                <Link href={""}>
                  <p style={{ whiteSpace: "nowrap" }}>&#8594; View</p>
                </Link>
              </div>
              <p>$0</p>
            </div>
            <div className="shadow">
              <div className={styles.flex}>
                <p>Wire Transfer Requests</p>{" "}
                <Link href={""}>
                  <p style={{ whiteSpace: "nowrap" }}>&#8594; View</p>
                </Link>
              </div>
              <p>$0</p>
            </div>
          </div>
          <div className="px-4 overflow-x-auto">
            <p className="mt-5 mb-1">Up Comming Loan Payment</p>
            <DataTable
              columns={loanColumns}
              data={[]}
              isLoading={false}
              empty="You have no active loan available"
            />
            <p className="mt-5 mb-1">Recent Transactions</p>
            {!!user?.transactions && (
              <DataTable
                columns={transactionsColumns}
                data={user?.transactions}
                isLoading={false}
              />
            )}
          </div>{" "}
        </>
      ) : (
        <p className="tac">Loading</p>
      )}
    </div>
  );
};

export default Dashboard;
