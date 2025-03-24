import React from "react";
import { CiShop } from "react-icons/ci";
import { ProductsTable } from "./productsTable";
import { Divider } from "@nextui-org/react";
import AddProducts from "./addProducts";

function ProductsPage() {
  return (
    <>
      <section className="flex flex-col p-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">View Products</h1>
          <div className="flex items-center space-x-2">
            <CiShop className="h-6 w-6" />
          </div>
        </div>
        <ProductsTable />
      </section>
      <AddProducts />
    </>
  );
}

export default ProductsPage;
