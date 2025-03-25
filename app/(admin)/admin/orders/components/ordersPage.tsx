import React from "react";
import { OrdersTable } from "./odersTable";

async function OrdersPage() {
  return (
    <section className="flex flex-col  ">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">View Orders</h1>
      </div>

      <OrdersTable />
    </section>
  );
}

export default OrdersPage;
