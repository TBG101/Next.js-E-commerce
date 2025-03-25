"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { userType } from "@/models/userModel";
import { fetchCustomers, fetchOrders } from "@/apiqueries/serverActions";
import { OrderType } from "@/models/orderModel";
import { Order } from "@/lib/types";

export function OrdersTable() {
  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "user",
      header: "User",
      cell: ({ row }) => <div>name</div>,
    },
    {
      accessorKey: "orderItems",
      header: "Number of Items",
      cell: ({ row }) => (
        <div>
          {row.original.orderItems.reduce((pv, cv, index) => {
            return pv + cv.quantity;
          }, 0).toString()}
        </div>
      ),
    },
    {
      accessorKey: "shippingAddress",
      header: "Shipping Address",
      cell: ({ row }) => {
        const address = row.original.shippingAddress;
        return (
          <div>
            {address?.fullName ?? "N/A"}, {address?.address ?? "N/A"},{" "}
            {address?.city ?? "N/A"}, {address?.postalCode ?? "N/A"},{" "}
            {address?.country ?? "N/A"}
          </div>
        );
      },
    },
    {
      accessorKey: "paymentMethod",
      header: "Payment Method",
      cell: ({ row }) => (
        <div>
          {row.getValue("paymentMethod") === 0
            ? "Cash On Delivery"
            : "Credit Card"}
        </div>
      ),
    },
    {
      accessorKey: "shippingPrice",
      header: "Shipping Price",
      cell: ({ row }) => <div>${row.getValue("shippingPrice")}</div>,
    },
    {
      accessorKey: "totalPrice",
      header: "Total Price",
      cell: ({ row }) => (
        <div>${(row.getValue("totalPrice") as number).toFixed(2)}</div>
      ),
    },
    {
      accessorKey: "isPaid",
      header: "Paid",
      cell: ({ row }) => <div>{row.getValue("isPaid") ? "Yes" : "No"}</div>,
    },
    {
      accessorKey: "paidAt",
      header: "Paid At",
      cell: ({ row }) => (
        <div>
          {row.getValue("paidAt")
            ? new Date(row.getValue("paidAt") as string).toLocaleString()
            : "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "isDelivered",
      header: "Delivered",
      cell: ({ row }) => (
        <div>{row.getValue("isDelivered") ? "Yes" : "No"}</div>
      ),
    },
    {
      accessorKey: "deliveredAt",
      header: "Delivered At",
      cell: ({ row }) => (
        <div>
          {row.getValue("deliveredAt")
            ? new Date(row.getValue("deliveredAt") as string).toLocaleString()
            : "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "confirmedAt",
      header: "Confirmed At",
      cell: ({ row }) => (
        <div>
          {row.getValue("confirmedAt")
            ? new Date(row.getValue("confirmedAt") as string).toLocaleString()
            : "N/A"}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      size: 80,
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div className="flex items-center justify-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-green-500 hover:bg-green-100"
            >
              <FaRegEdit size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:bg-red-100"
            >
              <MdDelete size={16} />
            </Button>
          </div>
        );
      },
    },
  ];

  const [data, setData] = React.useState<Order[]>([]);
  React.useEffect(() => {
    fetchOrders({ limit: 10 }).then((res) => {
      const data = res as Order[];
      setData(data);
      console.log(data);
    });
  }, []);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input placeholder="Filter Products..." className="max-w-sm" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="text-base font-black">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        minWidth: cell.column.columnDef.size,
                        maxWidth: cell.column.columnDef.size,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
