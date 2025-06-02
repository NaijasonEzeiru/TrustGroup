"use client";

import { useContext } from "react";
import AuthContext from "@/components/AuthContext";
import { UsersColumns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import styles from "@/styles/Dashboard.module.css";

const Users = () => {
  const { users } = useContext(AuthContext);
  return (
    <div className={styles.details}>
      <div className="px-2 py-5 bg-background shadow rounded">
        <p>All Users</p>
        {!!users && (
          <DataTable columns={UsersColumns} isLoading={false} data={users} />
        )}
      </div>
    </div>
  );
};

export default Users;
