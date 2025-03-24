import React from "react";
import { CustomersTable } from "./customersTable";

async function CustomersPage() {
  
  return (
    <section className="flex flex-col  ">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">View Customers</h1>
      </div>
      
        <CustomersTable />
      
    </section>
  );
}

export default CustomersPage;
