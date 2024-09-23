"use client";
import React, { useState, useContext } from "react";
import styles from "@/styles/Dashboard.module.css";
import AuthContext from "@/components/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { UpdateBalSchema, UpdateBalSchemaType } from "../helpers/schema";
import { API_URL } from "@/helpers/vars";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const UpdateBal = ({ api, CROrDR }: { api: string; CROrDR: string }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateBalSchemaType>({
    mode: "onTouched",
    resolver: zodResolver(UpdateBalSchema),
  });

  const [error, setError] = useState("");
  const watchAccNo = watch("account_no");
  const router = useRouter();
  console.log(errors);

  // useEffect(() => {
  //   const subscription = watch((value, { name, type }) =>
  //     console.log(value, name, type)
  //   );

  //   return () => subscription.unsubscribe();
  // }, [watch]);

  const { getAllUsers, users }: any = useContext(AuthContext);

  const updateBal = async ({
    account_no,
    amount,
    currency,
  }: // date
  UpdateBalSchemaType) => {
    // const adjustedTime = new Date(date);
    // const created_at = adjustedTime.toISOString();
    const res = await fetch(`${API_URL}/admin/${api}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account_no,
        amount,
        currency,
        // created_at,
        fullName: users?.[acc_pos]?.fullName,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      getAllUsers();
      alert("user account balance has been updated");
      reset();
    } else {
      setError(data.message);
      error ?? console.log(error);
    }
  };

  // console.log({ bal: users });
  const acc = 1;
  console.log(users?.[acc]?.account_bal);

  if (users && watchAccNo) {
    var acc_pos = users
      .map((x: any) => {
        return x.account_no;
      })
      .indexOf(+watchAccNo);
  }

  // console.log(acc_pos);

  return (
    <div className={styles.details}>
      <div className={`${styles.con} ${styles.over}`}>
        <h6 className="tac">{CROrDR} Account Balance</h6>
        <form
          onSubmit={handleSubmit(updateBal)}
          method="POST"
          className="space-y-4 mb-6"
        >
          <Input
            type="number"
            placeholder="Account Number"
            // onChange={(e) => setAccount_no(e.target.value)}
            {...register("account_no", { valueAsNumber: true })}
          />
          <span className={styles.error}> {errors.account_no?.message}</span>
          <div>
            {acc_pos !== -1 ? (
              <div>
                <p>Name: {users?.[acc_pos]?.fullName}</p>
                {/* <p>
                  Current Account Balance:
                  {users?.[acc_pos]?.account_bal?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p> */}
              </div>
            ) : (
              <p>The account number you provided does not exist</p>
            )}
          </div>
          <Input
            type="number"
            placeholder="Amount"
            {...register("amount", { valueAsNumber: true })}
          />
          <span className={styles.error}> {errors.amount?.message}</span>
          <div style={{ marginBottom: "20px" }}>
            <label>
              Select Currency:
              <input
                type="radio"
                {...register("currency")}
                value="$"
                className="ml-3"
              />{" "}
              $
              <input
                type="radio"
                value="€"
                {...register("currency")}
                className="ml-3"
              />{" "}
              €
            </label>
          </div>
          <span className={styles.error}> {errors.currency?.message}</span>
          {/* <input type='datetime-local' {...register('date')} /> */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="mx-auto block"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBal;
