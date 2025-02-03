"use client";
import React, { useState } from "react";

function Admin() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    images: null,
    thumbnails: null,
    sex: "male",
    discount: "",
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
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
              className="mt-1 rounded-md border p-2"
              onChange={handleChange}
              multiple
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="thumbnails" className="text-gray-700">
              Thumbnails
            </label>
            <input
              type="file"
              id="thumbnails"
              name="thumbnails"
              className="mt-1 rounded-md border p-2"
              onChange={handleChange}
              multiple
              required
            />
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

          <button
            type="submit"
            className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Add Product
          </button>
        </form>
      </div>
    </section>
  );
}

export default Admin;
