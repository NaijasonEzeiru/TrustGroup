"use client";

import Link from "next/link";
import React, { useContext } from "react";
import styles from "@/styles/Dashboard.module.css";
import AuthContext from "../AuthContext";
import Transactions from "./Transactions";
import { loanColumns } from "../table/columns";
import { DataTable } from "../table/data-table";

const Details = () => {
  const { user }: any = useContext(AuthContext);
  // const { account_no, account_bal } = user;
  console.log(user);

  return (
    <>
      <div className="bg-background shadow pb-4">
        <div className={styles.conp}>
          {!user?.verified && user?.verifying == false && (
            <p className={styles.warning}>
              Your account is not verified. Please submit all necessary
              documents.{" "}
              <Link href={"/dashboard/verify-page"}>Submit Documents</Link>
            </p>
          )}
        </div>
        <div className={styles.con}>
          <p>Account Number</p>
          <p>{user?.account_no}</p>
        </div>
        <div className={styles.con}>
          <p>Account Balance</p>
          <p>
            {user?.currency}
            {user?.account_bal?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className={styles.resFlex}>
          <div>
            <div className={styles.flex}>
              <p>Active Loans</p>{" "}
              <Link href={""}>
                <p style={{ whiteSpace: "nowrap" }}>&#8594; View</p>
              </Link>
            </div>
            <p>$0</p>
          </div>
          <div>
            <div className={styles.flex}>
              <p>Payment Requests</p>{" "}
              <Link href={""}>
                <p style={{ whiteSpace: "nowrap" }}>&#8594; View</p>
              </Link>
            </div>
            <p>$0</p>
          </div>
          <div>
            <div className={styles.flex}>
              <p>Active Fixed Deposits</p>{" "}
              <Link href={""}>
                <p style={{ whiteSpace: "nowrap" }}>&#8594; View</p>
              </Link>
            </div>
            <p>$0</p>
          </div>
          <div>
            <div className={styles.flex}>
              <p>Active Tickets</p>{" "}
              <Link href={""}>
                <p style={{ whiteSpace: "nowrap" }}>&#8594; View</p>
              </Link>
            </div>
            <p>$0</p>
          </div>
        </div>
        <div className="px-4 overflow-x-auto mt-4">
          <p>Up Comming Loan Payment</p>
          <DataTable
            columns={loanColumns}
            data={[]}
            isLoading={false}
            empty="You have no active loan available"
          />
          <Transactions />
        </div>
      </div>
    </>
  );
};

export default Details;
