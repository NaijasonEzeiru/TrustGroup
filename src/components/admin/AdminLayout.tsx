"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import AuthContext from "../AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Nav from "../header/Nav";
import DashboardNav from "../dashboard/DashboardNav";
import DashboardNavMobile from "../dashboard/DashboardNavMobile";
import AdminDashboardNav from "./AdminDashboardNav";
import AdminDashboardNavMobile from "./AdminDashboardNavMobile";

const AdminLayout = ({ children }: any) => {
  const { getAllUsers, user }: any = useContext(AuthContext);
  const pathname = usePathname();
  const admin = user?.isAdmin && pathname.startsWith("/admin");
  const reg = user && pathname.startsWith("/dashboard");

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div
      className={`grid min-h-screen w-full ${
        reg || admin ? "md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]" : ""
      }`}
    >
      <div
        className={`hidden border-r bg-muted/40 h-full ${
          (reg || admin) && "lg:block"
        }`}
      >
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <span className="flex items-center gap-2 font-semibold">
              {/* <Landmark className="h-6 w-6" /> */}
              <Link href="/">
                <p className="logo px-2 font-semibold">TrustGroupCU</p>
              </Link>
            </span>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 h-full">
            <p className="text-2xl ml-7 my-5 font-bold">{user?.fullName}</p>
            {admin && <AdminDashboardNav />}
            {reg && <DashboardNav />}
          </div>
          <div className="mt-auto p-4"></div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-0">
          {reg && <DashboardNavMobile />}
          {admin && <AdminDashboardNavMobile />}
          <Nav />
        </header>
        <main
          className={`flex flex-1 flex-col overflow-hidden w-screen lg:w-full ${
            admin || reg ? "p-4 lg:gap-6 lg:p-6" : "gap-4 p-0 lg:gap-6 lg:p-0"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
