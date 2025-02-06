"use client";
import { createProduct } from "@/apiqueries/apiqueries";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";

function Admin() {
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
    console.log(data);
    try {
      const res = await createProduct(data);
      console.log(res);
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
      console.error(res);
      setLoading(false);
      setError(res.message);
    }
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-5xl font-extrabold text-gray-800">
          Admin Page
        </h1>
        <p className="text-xl text-gray-600">Welcome to the admin page</p>
      </div>

      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-gray-700">
          Add Products
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 rounded-md border p-2"
              value={formData.name}
              onChange={handleChange}
              accept="image/*"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="mt-1 rounded-md border p-2"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="mt-1 rounded-md border p-2"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="images" className="text-gray-700">
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
              className="mt-1 cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white transition-all hover:bg-blue-600"
            >
              Upload Images
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.images &&
                formData.images.map((file: File, index: number) => (
                  <div key={index} className="relative border-1 shadow-sm">
                    <span className="absolute bottom-0 right-0 m-1 aspect-square rounded-full bg-gray-800 px-2 py-1 text-xs text-white">
                      {index + 1}
                    </span>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`image-${index}`}
                      className="h-28 w-28 rounded-md object-scale-down"
                    />

                    <button
                      type="button"
                      className="absolute right-0 top-0 rounded-full bg-red-500 px-2 py-1 text-xs text-white"
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
            <label htmlFor="sex" className="text-gray-700">
              Sex
            </label>
            <select
              id="sex"
              name="sex"
              className="mt-1 rounded-md border p-2"
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
            <label htmlFor="discount" className="text-gray-700">
              Discount
            </label>
            <input
              type="number"
              id="discount"
              name="discount"
              className="mt-1 rounded-md border p-2"
              value={formData.discount}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            isLoading={loading}
            color={success ? "success" : "primary"}
            type="submit"
            radius="sm"
            className="tracking-wider text-white font-semibold text-lg py-4"
          >
            Add Product
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Admin;
