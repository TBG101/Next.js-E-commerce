"use client";
import { createProduct } from "@/apiqueries/apiqueries";
import MyCheckoutFormFields from "@/app/components/myCheckoutFormFields";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";

function AdminForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    images: [] as File[],
    sex: "male",
    discount: "",
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, files } = e.target;
    setSuccess("");
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? [...prevData.images, ...Array.from(files)] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("sex", formData.sex);
    data.append("discount", formData.discount);
    formData.images.forEach((file) => data.append("images", file));
    try {
      const res = await createProduct(data);
      setFormData({
        name: "",
        price: "",
        description: "",
        images: [] as File[],
        sex: "male",
        discount: "",
      });
      setLoading(false);
      setSuccess("Product added successfully");
    } catch (res: any) {
      setLoading(false);
      setError(res.message);
    }
  };

  return (
    <form className="flex flex-col gap-6 " onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-gray-800">Add New Product</h2>

      <div className="flex flex-col">
        <label htmlFor="name" className="text-sm font-medium text-gray-600">
          Name
        </label>
        <MyCheckoutFormFields
          name="name"
          placeholder="Enter product name"
          type="text"
          value={formData.name}
          setValue={(value) =>
            setFormData((prevData) => ({
              ...prevData,
              name: value,
            }))
          }
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="price" className="text-sm font-medium text-gray-600">
          Price
        </label>
        <MyCheckoutFormFields
          name="price"
          placeholder="Enter product price"
          type="number"
          value={formData.price}
          setValue={(value) =>
            setFormData((prevData) => ({
              ...prevData,
              price: value,
            }))
          }
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="description"
          className="text-sm font-medium text-gray-600"
        >
          Description
        </label>
        <MyCheckoutFormFields
          name="description"
          placeholder="Enter product description"
          type="text"
          value={formData.description}
          setValue={(value) =>
            setFormData((prevData) => ({
              ...prevData,
              description: value,
            }))
          }
        />
        {/* <textarea
          id="description"
          name="description"
          className="mt-1 rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
          value={formData.description}
          onChange={handleChange}
          required
        /> */}
      </div>

      <div className="flex flex-col">
        <label htmlFor="images" className="text-sm font-medium text-gray-600">
          Images
        </label>
        <input
          type="file"
          id="images"
          name="images"
          className="hidden"
          onChange={handleChange}
          multiple
          required
        />
        <label
          htmlFor="images"
          className="mt-2 cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-600"
        >
          Upload Images
        </label>
        <div className="mt-4 flex flex-wrap gap-4">
          {formData.images.map((file: File, index: number) => (
            <div key={index} className="relative">
              <Image
                src={URL.createObjectURL(file)}
                alt={`image-${index}`}
                className="h-24 w-24 rounded-lg object-cover"
              />
              <button
                type="button"
                className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-xs text-white"
                onClick={() => {
                  setFormData((prevData) => ({
                    ...prevData,
                    images: prevData.images.filter((_, i) => i !== index),
                  }));
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="sex" className="text-sm font-medium text-gray-600">
          Sex
        </label>
        <select
          id="sex"
          name="sex"
          className="mt-1 rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
          value={formData.sex}
          onChange={handleChange}
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unisex">Unisex</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="discount" className="text-sm font-medium text-gray-600">
          Discount
        </label>
        <input
          type="number"
          id="discount"
          name="discount"
          className="mt-1 rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
          value={formData.discount}
          onChange={handleChange}
          required
        />
      </div>

      <Button
        isLoading={loading}
        color={success ? "success" : "primary"}
        type="submit"
        radius="lg"
        className="py-3 text-base font-medium text-white"
      >
        {loading ? "Submitting..." : "Add Product"}
      </Button>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      {success && <p className="mt-2 text-sm text-green-500">{success}</p>}
    </form>
  );
}

export default AdminForm;
