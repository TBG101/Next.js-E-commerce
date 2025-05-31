"use client";
import React from "react";
import EditProductForm from "../components/editProductForm";
import { useParams } from "next/navigation";

function EditProductPage() {
  const params = useParams();
  const id = params.id as string;
  return (
    <main className="p-3">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit Product</h1>
      </div>
      <EditProductForm productId={id} />
    </main>
  );
}

export default EditProductPage;
