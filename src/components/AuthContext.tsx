"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
// import type {} from "@prisma/client"

export interface IUser {
  email: string;
  isAdmin: boolean;
  fullName: string;
  phoneNumber: string;
  created_at: Date;
  account_no: number;
  account_bal: number;
  verified: boolean;
  verifying: boolean;
  pending_KYC: boolean;
  verification: null | { identity_doc: string; address_doc: string };
  verification_id: number | null;
  currency: string;
  transactions?: [];
}

interface IContext {
  user: IUser | null;
  users: IUser[] | null;
  loading: boolean;
  error: any;
  authChecking: boolean;
  login?: ({ email, password }: any) => Promise<void>;
  signout?: () => Promise<void>;
  checkUserLoggedIn?: () => Promise<void>;
  getAllUsers?: () => Promise<void>;
}

const AuthContext = createContext<IContext>({
  user: null,
  loading: false,
  error: null,
  authChecking: true,
  users: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [error, setError] = useState(null) as any;
  const [loading, setLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  const router = useRouter();

  const login = async ({ email, password }: any) => {
    setLoading(true);
    const res = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
      next: { revalidate: 0 },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    console.log({ loginDAta: data });
    setLoading(false);
    if (res?.ok) {
      setUser(data);
      router.refresh();
      // user?.isAdmin ? router.push("/dashboard") : router.push("/admin");
      if (user?.isAdmin) {
        window.location.href = "/dashboard";
        // router.push("/dashboard");
      } else {
        // router.push("/admin");
        window.location.href = "/admin";
      }
    } else {
      setError(data.message);
      error ?? console.log(error);
    }
  };

  const signout = async () => {
    const res = await fetch(`/api/auth/logout`, {
      method: "POST",
      credentials: "include",
      cache: "no-store",
      next: { revalidate: 0 },
    });
    setUser(null);
    router.push("/");
    router.refresh();
  };

  useEffect(() => {
    checkUserLoggedIn();
    // getAllUsers();
  }, []);

  console.log({ users });

  async function checkUserLoggedIn() {
    const res = await fetch(`/api/auth/login`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
      next: { revalidate: 0 },
    });
    const data = await res.json();
    console.log("🚀 ~ file: AuthContext.tsx:56 ~ data:", data);
    if (res.ok) {
      console.log({ acc_no: data.account_no });
      setUser(data);
      setAuthChecking(false);
    } else {
      console.log("failed");
      setUser(null);
      setAuthChecking(false);
    }
  }
  const getAllUsers = async () => {
    const res = await fetch(`/api/user`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
      next: { revalidate: 0 },
    });
    const data: IUser[] = await res.json();
    console.log("🚀 ~ file: AuthContext.tsx:56 ~ data:", data);
    if (res.ok) {
      setUsers([...data]);
      // router.refresh();
    } else {
      setUsers(null);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        loading,
        error,
        authChecking,
        login,
        signout,
        checkUserLoggedIn,
        getAllUsers,
      }}
    >
      {children}{" "}
    </AuthContext.Provider>
  );
};

export default AuthContext;
