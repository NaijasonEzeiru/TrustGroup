"use client";

import { useContext } from "react";
import styles from "@/styles/DashboardNav.module.css";
import { MdSpaceDashboard, MdSend } from "react-icons/md";
import {
  FaExchangeAlt,
  FaMoneyCheckAlt,
  FaRegCreditCard,
  FaUnlockAlt,
  FaMinusCircle,
  FaPlusCircle,
} from "react-icons/fa";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { HiDocumentReport } from "react-icons/hi";
import { BiSupport } from "react-icons/bi";
import Link from "next/link";
import Dropdown from "./Dropdown";
import AuthContext from "../AuthContext";
import { Accordion } from "../ui/accordion";

const DashboardNav = () => {
  const { user }: any = useContext(AuthContext);
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <Accordion type="single" collapsible className="w-full">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted"
        >
          <MdSpaceDashboard />
          Dashboard
        </Link>
        <Link
          href={
            user?.verified ? "/dashboard/send-money" : "/dashboard/verify-page"
          }
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted"
        >
          <MdSend />
          Send Money
        </Link>
        <Link
          href={user?.verified ? "#" : "/dashboard/verify-page"}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted"
        >
          <FaExchangeAlt />
          Exchange Money
        </Link>
        <Link
          href={
            user?.verified ? "/dashboard/send-money" : "/dashboard/verify-page"
          }
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted"
        >
          <FaMoneyCheckAlt />
          {/* <RiFileTransferFill /> */}
          Wire Transfer
        </Link>
        {/* <div
				className={!dropdown ? styles.flex : styles.dropdown}
				onClick={() => setDropdown(!dropdown)}
			>
				<FaRegCreditCard />
				Payment Request
			</div>
			<div className={styles.dropdownContent}>
				<Link href={"#"}>New Request</Link>
				<Link href={"#"}>All Requests</Link>
			</div> */}
        <Dropdown
          top="Payment Request"
          content={{ "New Request": "#", "All Requests": "#" }}
        >
          <FaRegCreditCard />
        </Dropdown>
        <Dropdown
          top="Deposit Money"
          content={{
            "Automatic Deposit": "#",
            "Manual Deposit": "#",
            "Redeem Gift Card": "#",
          }}
        >
          <FaPlusCircle />
        </Dropdown>
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted">
          <FaMinusCircle />
          Withdraw Money
        </div>
        <Dropdown
          top="Loans"
          content={{
            "Apply New Loan": "#",
            "My Loans": "#",
            "Loan Calculator": "#",
          }}
        >
          <RiMoneyDollarBoxFill />
        </Dropdown>
        <Dropdown
          top="Fixed Deposit"
          content={{ "Apply New FRD": "#", "FDR History": "#" }}
        >
          <FaUnlockAlt />
        </Dropdown>
        <Dropdown
          top="Support Tickets"
          content={{
            "Create New Ticket": "#",
            "Pending Tickets": "#",
            "Active Tickets": "#",
            "Closed Tickets": "#",
          }}
        >
          <BiSupport />
        </Dropdown>
        <Link
          href={"/dashboard"}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted"
        >
          <HiDocumentReport />
          Transactions Report
        </Link>
      </Accordion>
    </nav>
  );
};

export default DashboardNav;
