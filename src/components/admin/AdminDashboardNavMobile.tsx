import { FaUsers, FaPlusCircle } from "react-icons/fa";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { BiTransfer } from "react-icons/bi";
import Link from "next/link";
import DropdownMobile from "../dashboard/DropdownMobile";
import {
  ArrowRight,
  CircleDollarSign,
  Columns3,
  Gift,
  HandCoins,
  Menu,
  Ticket,
  Vault,
} from "lucide-react";
import { Accordion } from "../ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";

const AdminDashboardNavMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden mr-4"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Accordion type="single" collapsible className="w-full">
            <Link
              href="/admin"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Columns3 className="h-4 w-4" />
              Dashboard
            </Link>
            <DropdownMobile
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
            </DropdownMobile>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              {/* <Send className="h-4 w-4" /> */}
              <CircleDollarSign className="h-4 w-4" />
              Transfer Requests
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              {/* <Package className="h-4 w-4" /> */}
              <BiTransfer />
              Wire Transfer
            </Link>
            <DropdownMobile
              top="Deposit"
              content={{
                "Deposit Request": "#",
                "Make Deposit": "/admin/users/credit-acc",
                "Deposit History": "#",
              }}
            >
              <FaPlusCircle />
            </DropdownMobile>
            <DropdownMobile
              top="Withdraw"
              content={{
                "Withdraw Request": "#",
                "Make Withdraw": "/admin/users/debit-acc",
                "Withdraw History": "#",
              }}
            >
              <ArrowRight className="h-4 w-4" />
            </DropdownMobile>
            <DropdownMobile
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
            </DropdownMobile>
            <DropdownMobile
              top="Fixed Deposit"
              content={{
                "All New": "#",
                "All FDR": "#",
                "FDR Packages": "#",
              }}
            >
              <Vault className="h-4 w-4" />
            </DropdownMobile>
            <DropdownMobile
              top="Gift Cards"
              content={{ "Gift Cards": "#", "Used Gift Cards": "#" }}
            >
              <Gift className="h-4 w-4" />
            </DropdownMobile>
            <DropdownMobile
              top="Support Tickets"
              content={{
                "Active Tickets": "#",
                "Pending Tickets": "#",
                "Closed Tickets": "#",
              }}
            >
              <Ticket className="h-4 w-4" />
            </DropdownMobile>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <HandCoins className="h-4 w-4" />
              All Transactions
            </Link>
          </Accordion>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default AdminDashboardNavMobile;
