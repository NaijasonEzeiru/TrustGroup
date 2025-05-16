"use client";

import AuthContext from "@/components/AuthContext";
import React, { useContext } from "react";
import styles from "@/styles/Dashboard.module.css";
import { DataTable } from "@/components/table/data-table";
import { VerifyColumns } from "@/components/table/columns";

const Kyc = () => {
  const { users } = useContext(AuthContext);

  return (
    <div className={styles.details}>
      <div className={`${styles["con"]} ${styles["over"]}`}>
        <p>Users Documents</p>
        <DataTable
          columns={VerifyColumns}
          data={users?.filter((user) => user.verification) || []}
          isLoading={false}
        />
      </div>
    </div>
  );
};

export default Kyc;
