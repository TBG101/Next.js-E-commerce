"use client";
import { createProduct } from "@/apiqueries/apiqueries";
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
    stock: "",
    sizes: [] as string[],
    bestSellers: false,
    newArrivals: false,
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
    data.append("stock", formData.stock);
    data.append("sizes", formData.sizes.join(","));
    data.append("bestSellers", formData.bestSellers.toString());
    data.append("newArrivals", formData.newArrivals.toString());
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
        stock: "",
        sizes: [] as string[],
        bestSellers: false,
        newArrivals: false,
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
        <Input
          label="Product Title"
          labelPlacement="outside"
          placeholder="Your Product Title"
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              name: e.target.value,
            }))
          }
          isClearable
          radius="sm"
          classNames={{
            label: "text-black/50 dark:text-white/90 text-sm",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "bg-white",
              "border-1",
              "border-neutral-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focus=true]:bg-default-200/50",
              "dark:group-data-[focus=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="price" className="text-sm font-medium text-gray-600">
          Price
        </label>
        <Input
          name="price"
          placeholder="Enter product price"
          type="number"
          value={formData.price}
          onChange={(e) => {
            setFormData((prevData) => ({
              ...prevData,
              price: e.target.value,
            }));
          }}
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="description"
          className="text-sm font-medium text-gray-600"
        >
          Description
        </label>
        <Input
          name="description"
          placeholder="Enter product description"
          type="text"
          value={formData.description}
          onChange={(e) => {
            setFormData((prevData) => ({
              ...prevData,
              description: e.target.value,
            }));
          }}
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
      </div>{" "}
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
      <div className="flex flex-col">
        <label htmlFor="stock" className="text-sm font-medium text-gray-600">
          Stock
        </label>
        <input
          type="number"
          id="stock"
          name="stock"
          className="mt-1 rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
          value={formData.stock}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="sizes" className="text-sm font-medium text-gray-600">
          Sizes (comma-separated)
        </label>
        <input
          type="text"
          id="sizes"
          name="sizes"
          className="mt-1 rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
          value={formData.sizes.join(",")}
          onChange={(e) => {
            setFormData((prevData) => ({
              ...prevData,
              sizes: e.target.value
                .split(",")
                .map((size) => size.trim())
                .filter((size) => size !== ""),
            }));
          }}
          placeholder="S, M, L, XL"
        />
      </div>
      <div className="flex gap-6">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="bestSellers"
            name="bestSellers"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={formData.bestSellers}
            onChange={(e) => {
              setFormData((prevData) => ({
                ...prevData,
                bestSellers: e.target.checked,
              }));
            }}
          />
          <label
            htmlFor="bestSellers"
            className="text-sm font-medium text-gray-600"
          >
            Best Seller
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="newArrivals"
            name="newArrivals"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={formData.newArrivals}
            onChange={(e) => {
              setFormData((prevData) => ({
                ...prevData,
                newArrivals: e.target.checked,
              }));
            }}
          />
          <label
            htmlFor="newArrivals"
            className="text-sm font-medium text-gray-600"
          >
            New Arrival
          </label>
        </div>
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
