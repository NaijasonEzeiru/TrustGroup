import styles from "@/styles/DashboardNav.module.css";
import { useContext, useState } from "react";
import { MdSpaceDashboard, MdRequestQuote } from "react-icons/md";
import {
  FaMoneyCheckAlt,
  FaUsers,
  FaUnlockAlt,
  FaMinusCircle,
  FaPlusCircle,
} from "react-icons/fa";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { HiDocumentReport } from "react-icons/hi";
import { BiSupport, BiTransfer } from "react-icons/bi";
import { BsGiftFill } from "react-icons/bs";
import Link from "next/link";
import Dropdown from "../dashboard/Dropdown";
import AuthContext from "../AuthContext";
import { Accordion } from "../ui/accordion";
import {
  ArrowRight,
  CircleDollarSign,
  Columns3,
  Gift,
  HandCoins,
  Ticket,
  Vault,
} from "lucide-react";

const AdminDashboardNav = () => {
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <Accordion type="single" collapsible className="w-full">
        <Link
          href="/admin"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted"
        >
          <Columns3 className="h-4 w-4" />
          Dashboard
        </Link>
        <Dropdown
          top="Users"
          content={{
            "Add New": "/admin/users/create",
            "All Users": "/admin/users",
            "KYC Documents": "/admin/users/kyc",
            "Verified Users": "#",
            "Unverified Users": "#",
          }}
        >
          <FaUsers />
        </Dropdown>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted"
        >
          {/* <Send className="h-4 w-4" /> */}
          <CircleDollarSign className="h-4 w-4" />
          Transfer Requests
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted"
        >
          {/* <Package className="h-4 w-4" /> */}
          <BiTransfer />
          Wire Transfer
        </Link>
        <Dropdown
          top="Deposit"
          content={{
            "Deposit Request": "#",
            "Make Deposit": "/admin/users/credit-acc",
            "Deposit History": "#",
          }}
        >
          <FaPlusCircle />
        </Dropdown>
        <Dropdown
          top="Withdraw"
          content={{
            "Withdraw Request": "#",
            "Make Withdraw": "/admin/users/debit-acc",
            "Withdraw History": "#",
          }}
        >
          <ArrowRight className="h-4 w-4" />
        </Dropdown>
        <Dropdown
          top="Loans Management"
          content={{
            "All Loans": "#",
            "Loan Calculator": "#",
            "Add New Loan": "#",
            "Loan Products": "#",
            "Loan Repayments": "#",
          }}
        >
          <RiMoneyDollarBoxFill />
        </Dropdown>
        <Dropdown
          top="Fixed Deposit"
          content={{
            "All New": "#",
            "All FDR": "#",
            "FDR Packages": "#",
          }}
        >
          <Vault className="h-4 w-4" />
        </Dropdown>
        <Dropdown
          top="Gift Cards"
          content={{ "Gift Cards": "#", "Used Gift Cards": "#" }}
        >
          <Gift className="h-4 w-4" />
        </Dropdown>
        <Dropdown
          top="Support Tickets"
          content={{
            "Active Tickets": "#",
            "Pending Tickets": "#",
            "Closed Tickets": "#",
          }}
        >
          <Ticket className="h-4 w-4" />
        </Dropdown>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted"
        >
          <HandCoins className="h-4 w-4" />
          All Transactions
        </Link>
      </Accordion>
    </nav>
  );
};

export default AdminDashboardNav;
