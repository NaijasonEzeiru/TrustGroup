"use client";

import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  Landmark,
  Columns3,
  Gift,
  Vault,
  ArrowRight,
  CircleDollarSign,
  HandCoins,
  Ticket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../AuthContext";
import { FaUsers, FaPlusCircle } from "react-icons/fa";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { BiTransfer } from "react-icons/bi";
import Link from "next/link";
import Dropdown from "../dashboard/Dropdown";
import { Accordion } from "../ui/accordion";
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
    // setOpen(window.matchMedia("(min-width: 1050px)").matches);
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
            <Link href="/" className="flex items-center gap-2 font-semibold">
              {/* <Landmark className="h-6 w-6" /> */}
              <span>
                <Link href="/">
                  <p className="logo px-2 font-semibold">TrustGroupCU</p>
                </Link>
              </span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 h-full">
            {admin && <AdminDashboardNav />}
            {reg && <DashboardNav />}
          </div>
          <div className="mt-auto p-4">
            {/* <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-0">
          {reg && <DashboardNavMobile />}
          {admin && <AdminDashboardNavMobile />}

          {/* <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div> */}
          <Nav />
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
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
