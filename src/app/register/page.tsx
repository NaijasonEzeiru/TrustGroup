"use client";

import Link from "next/link";
import React, { FC, useContext, useEffect, useState } from "react";
import styles from "@/styles/Form.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterSchemaType } from "../../helpers/schema";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
// import AuthContext from '@/components/AuthContext';
// import Spinner from '@/components/Spinner';
import { API_URL } from "@/helpers/vars";

const Register: FC = () => {
  const [error, setError] = useState(null) as any;
  const [phoneNumber, setPhoneNumnber] = useState("") as any;

  const router = useRouter();

  // useEffect(() => {
  //   user && router.push('/');
  //   setLoading(false);
  // }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) });

  const signUp = async ({ email, password, fullName }: any) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        phoneNumber,
        fullName,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      console.log(data);
      router.push("/login");
    } else {
      setError(data.message);
      error ?? console.log(error);
    }
    // } else {
    // 	setError(
    // 		"You appear to be offline. Check your internet connection"
    // 	);
    // 	console.log("error");
    // }
  };

  return (
    <section className={styles.background}>
      <div className={styles.form}>
        {/* {loading ? (
          <Spinner />
        ) : ( */}
        <span>
          {error && <h6 className={styles.error}>{error}</h6>}
          <h2>TrustGroupCU</h2>
          <h6>Create Your Account Now</h6>
          <form onSubmit={handleSubmit(signUp)} method="POST">
            <input
              type="text"
              {...register("fullName")}
              placeholder="Full Name"
            />
            <span className={styles.error}> {errors.fullName?.message}</span>
            <input
              type="email"
              placeholder="E-mail Address"
              required={false}
              {...register("email")}
            />
            <span className={styles.error}> {errors.email?.message}</span>
            {/* <input
							type="number"
							placeholder="Phone number"
							{...register("phoneNumber")}
						/> */}
            <PhoneInput
              // name="PhoneInputWithCountrySelect"
              // control={control}
              rules={{ required: false }}
              placeholder="Phone Number"
              {...register("phoneNumber")}
              value={phoneNumber}
              // onChange={(e: any) => {
              // 	console.log(e.target);
              // 	setPhoneNumnber(e.target);
              // }}
              // required={false}
              onChange={setPhoneNumnber}
            />
            <span className={styles.error}> {errors.phoneNumber?.message}</span>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            <span className={styles.error}> {errors.password?.message}</span>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirm_password")}
            />
            <span className={styles.error}>
              {" "}
              {errors.confirm_password?.message}
            </span>
            <label>
              {" "}
              <input
                type="checkbox"
                {...register("agree")}
                // onClick={(e) => setAgree(!agree)}
              />{" "}
              I agree with the{" "}
              <Link href={"/privacy-policy"}>Privacy Policy</Link> &{" "}
              <Link href={"/terms-condition"}>Terms and Condition</Link>
            </label>
            <span className={styles.error}> {errors.agree?.message}</span>
            <button type="submit" disabled={isSubmitting}>
              Create My Account
            </button>
          </form>
          <p>
            Already Have An Account? <Link href={"/login"}>Log in Here</Link>
          </p>
        </span>
        {/* )} */}
      </div>
    </section>
  );
};

export default Register;
