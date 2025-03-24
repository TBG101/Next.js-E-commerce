"use client";
import { createProduct } from "@/apiqueries/apiqueries";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import AdminForm from "../../(admin)/admin/components/adminForm";

function Admin() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-5xl font-extrabold text-gray-800">
          Admin Page
        </h1>
        <p className="text-xl text-gray-600">Welcome to the admin page</p>
      </div>

      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-md">
        <AdminForm />
      </div>
    </section>
  );
}

export default Admin;
