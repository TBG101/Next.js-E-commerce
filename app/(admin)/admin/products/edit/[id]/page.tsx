import React from "react";
import EditProductForm from "../components/editProductForm";

interface EditProductPageProps {
  params: {
    _id: string;
  };
}

async function EditProductPage({ params }: EditProductPageProps) {
  return (
    <main className="p-3">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Edit Product</h1>
      </div>
      <EditProductForm productId={params._id} />
    </main>
  );
}

export default EditProductPage;
