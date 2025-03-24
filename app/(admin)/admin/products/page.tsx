import React from "react";
import ProductsPage from "./components/productsPage";
import { Divider } from "@nextui-org/react";

async function page() {
  return (
    <main className="p-2">
      <ProductsPage />
    </main>
  );
}

export default page;
