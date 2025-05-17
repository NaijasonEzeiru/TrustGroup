"use client";

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  RowData,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TransactionsSchema } from "@/helpers/schema";
import { z } from "zod";
import { CalendarIcon, Plus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
// import { Link, useLocation } from "react-router-dom";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

// Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<z.infer<typeof TransactionsSchema>>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);
    if (id == "fullName") {
      return <span className="capitalize">{value as string}</span>;
    } else {
      return (
        <Input
          className="out-of-range:border-red-600"
          required
          value={value as string}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onBlur={onBlur}
        />
      );
    }
  },
};

function useSkipper() {
  const shouldSkipRef = useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

export default function CreateTransactions({
  trans,
  id,
}: {
  trans: z.infer<typeof TransactionsSchema>;
  id: number;
}) {
  const [data, setData] = useState<z.infer<typeof TransactionsSchema>[]>(trans);

  const [loading, setLoading] = useState(false);
  console.log({ trans });

  const updateAmount = (index: number, newValue: number) => {
    const newItems = [...data]; // Create a copy of the array
    newItems[index].amount = newValue; // Modify the copy
    setData(newItems); // Update the state with the new array
  };

  const updateType = (index: number, newValue: string) => {
    const newItems = [...data]; // Create a copy of the array
    newItems[index].type = newValue; // Modify the copy
    setData(newItems); // Update the state with the new array
  };

  const updateDate = (index: number, newValue: string) => {
    const newItems = [...data]; // Create a copy of the array
    newItems[index].date = newValue; // Modify the copy
    setData(newItems); // Update the state with the new array
  };
  const updateNote = (index: number, newValue: string) => {
    const newItems = [...data]; // Create a copy of the array
    newItems[index].note = newValue; // Modify the copy
    setData(newItems); // Update the state with the new array
  };

  const columns = [
    {
      accessorKey: "id",
      header: () => <span>Transaction ID</span>,
    },
    {
      accessorKey: "accountName",
      header: () => <span>Account name</span>,
    },
    {
      accessorKey: "amount",
      header: () => <span>Amount</span>,
      cell: ({ getValue, row }) => {
        const initialValue = getValue();
        const [value, setValue] = useState(initialValue);
        useEffect(() => {
          setValue(initialValue);
        }, [initialValue]);
        return (
          <Input
            type="number"
            onChange={(e) => {
              setValue(e.target.value);
              updateAmount(row.index, +e.target.value);
            }}
            value={value as string}
          />
        );
      },
    },
    {
      accessorKey: "type",
      header: () => <span>Type</span>,
      cell: ({ getValue, row }) => {
        const initialValue = getValue();
        const [value, setValue] = useState(initialValue);
        useEffect(() => {
          setValue(initialValue);
        }, [initialValue]);
        return (
          <Select
            value={value as string}
            onValueChange={(val) => {
              setValue(val);
              updateType(row.index, val);
            }}
            required
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Type</SelectLabel>
                <SelectItem value="Deposit">Deposit</SelectItem>
                <SelectItem value="Withdrawal">Withdrawal</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ getValue, row }) => {
        const initialValue = getValue();
        const [value, setValue] = useState(initialValue);
        useEffect(() => {
          setValue(initialValue);
        }, [initialValue]);
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[180px] justify-start text-left font-normal",
                  !value && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {value ? format(value, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={value}
                onSelect={(e) => {
                  updateDate(row.index, e);
                  setValue(e);
                }}
                required
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );
      },
    },
    {
      accessorKey: "note",
      header: "Note",
      cell: ({ getValue, row }) => {
        const initialValue = getValue();
        const [value, setValue] = useState(initialValue);
        useEffect(() => {
          setValue(initialValue);
        }, [initialValue]);
        return (
          <Input
            onChange={(e) => {
              updateNote(row.index, e.target.value);
              setValue(e.target.value);
            }}
            value={value as string}
            placeholder="Add note (optional)"
          />
        );
      },
    },
    {
      header: "Delete",
      cell: ({ row }) => {
        return (
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setData((prevItems) => {
                return prevItems.filter((_, index) => index !== row.index);
              })
            }
          >
            <X className="text-orange-700" />
          </Button>
        );
      },
    },
  ];

  //   const studentData = [
  //     {
  //       _id: "66a687d64c92cafaed484ace",
  //       fullName: "hope oboite",
  //       username: "hope2024",
  //       __v: 0,
  //     },
  //   ];

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    debugTable: true,
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/${id}/add-transactions`, {
        method: "PUT",
        body: JSON.stringify({ data }),
      });
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="p-2" onSubmit={(e) => e.preventDefault()}>
        <h1 className="text-2xl mb-6 font-medium">Add transactions</h1>
        <Table>
          <TableHeader className="bg-primary text-primary-foreground">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-primary">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-white hover:bg-primary"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Button
          type="button"
          onClick={() => {
            console.log({ data });
            setData((oldData) => [
              ...oldData,
              {
                accountName: "",
                amount: 0,
                date: "",
                id: "",
                note: "",
                type: "",
              },
            ]);
          }}
          //   disabled={isLoading}
          variant="outline"
          size="icon"
          className="mt-6 float-right flex item-center justify-center"
        >
          <Plus />
        </Button>
        <Button
          type="submit"
          onClick={() => handleSubmit()}
          disabled={loading}
          className="mt-6 block"
        >
          Create transactions
        </Button>
      </form>
    </>
  );
}
