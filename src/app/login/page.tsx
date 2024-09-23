"use client";

import Link from "next/link";
import React, { useContext, useState, useEffect } from "react";
import styles from "@/styles/Form.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginSchemaType } from "../../helpers/schema";
import AuthContext from "@/components/AuthContext";
import { useRouter } from "next/navigation";

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const { login, error, user }: any = useContext(AuthContext);

  // const router = useRouter();

  // useEffect(() => {
  //   user && router.push('/');

  //   //   return () => {
  //   // 	second
  //   //   }
  // }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    mode: "onTouched",
    resolver: zodResolver(LoginSchema),
  });

  return (
    <section className={styles.background}>
      <div className={styles.form}>
        {error && <h6 className={styles.error}>{error}</h6>}
        <h2>TrustGroupCU</h2>
        <h6>Login To Your Account</h6>
        <form onSubmit={handleSubmit(login)} method="POST">
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...register("email")}
          />
          <span className={styles.error}>{errors?.email?.message}</span>
          <input
            type="password"
            placeholder="Password"
            autoComplete="password"
            {...register("password")}
          />
          <span className={styles.error}>{errors?.password?.message}</span>
          <label>
            {" "}
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(!rememberMe)}
            />{" "}
            Remember Me
          </label>
          <button type="submit" disabled={isSubmitting}>
            Login
          </button>
          <p>
            Do not Have An Account?{" "}
            <Link href={"/register"}> Create Account</Link>
          </p>
          <p>
            <Link href={""}>Forgot Password?</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
