import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import AuthContext, { IUser } from "../AuthContext";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const VerifyOptions = ({ original }: { original: IUser }) => {
  const { getAllUsers } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const verify = async (account_no: number) => {
    setLoading(true);
    const res = await fetch("/api/admin/verify-doc", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        account_no,
      }),
    });
    const data = await res.json();
    console.log(data);
    setLoading(false);
    if (res.ok) {
      alert("User verified successfully");
      getAllUsers();
      console.log(data);
    } else {
      alert("unsuccessful");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => verify(original.account_no)}
          disabled={loading}
        >
          Verify {original.fullName}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {original.verification?.identity_doc ? (
          <>
            <Popover>
              <PopoverTrigger asChild>
                <button className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-muted w-full">
                  View ID document
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 h-80">
                <div className="relative">
                  <Image
                    src={original.verification?.identity_doc}
                    alt="Verification document"
                    className="h-full w-full"
                    height={240}
                    width={240}
                  />
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <button className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-muted w-full">
                  View address document
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 h-80">
                <div className="relative">
                  <Image
                    src={original.verification?.address_doc}
                    alt="Verification document"
                    className="h-full w-full"
                    height={240}
                    width={240}
                  />
                </div>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <DropdownMenuItem>Verified</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
