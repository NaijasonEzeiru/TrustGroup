"use client";
import AuthContext from "@/components/AuthContext";
import { UsersColumns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import styles from "@/styles/Dashboard.module.css";
import { useContext } from "react";
const Users = () => {
  const { users }: any = useContext(AuthContext);
  console.log({ users });
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
