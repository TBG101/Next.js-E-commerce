"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/models/Product";
import { ArrowLeft, Save } from "lucide-react";
import { Textarea } from "@nextui-org/react";
import { toast } from "react-hot-toast";

interface EditProductFormProps {
  productId: string;
}

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  sex: string;
  discount: number;
  sizes: string[];
  bestSellers: boolean;
  newArrivals: boolean;
  images: string[];
}

function EditProductForm({ productId }: EditProductFormProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    sex: "",
    discount: 0,
    sizes: [],
    bestSellers: false,
    newArrivals: false,
    images: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/admin/product/${productId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.statusText}`);
        }

        const result = await response.json();
        setProduct(result.product);
        setFormData({
          name: result.product.name || "",
          description: result.product.description || "",
          price: result.product.price || 0,
          stock: result.product.stock || 0,
          sex: result.product.sex || "",
          discount: result.product.discount || 0,
          sizes: result.product.sizes || [],
          bestSellers: result.product.bestSellers || false,
          newArrivals: result.product.newArrivals || false,
          images: result.product.images || [],
        });
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch product",
        );
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);
  const handleInputChange = (
    field: keyof ProductFormData,
    value: string | number | boolean | string[],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Product name is required");
      return;
    }

    if (formData.price <= 0) {
      toast.error("Price must be greater than zero");
      return;
    }

    if (formData.stock < 0) {
      toast.error("Stock cannot be negative");
      return;
    }

    if (!formData.sex) {
      toast.error("Please select a gender");
      return;
    }

    if (formData.sizes.length === 0) {
      toast.error("Please select at least one size");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const response = await fetch(`/api/admin/product/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update product: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        toast.success("Product updated successfully!");
        router.push("/admin/products");
        router.refresh();
      } else {
        throw new Error(result.message || "Failed to update product");
      }
    } catch (err) {
      console.error("Error updating product:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update product";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-lg">Loading product...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-lg text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-lg">Product not found</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="mr-2"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {" "}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discount}
                  onChange={(e) =>
                    handleInputChange("discount", parseInt(e.target.value) || 0)
                  }
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
              />
            </div>{" "}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    handleInputChange("price", parseFloat(e.target.value) || 0)
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) =>
                    handleInputChange("stock", parseInt(e.target.value) || 0)
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="sex">Gender</Label>
                <Select
                  value={formData.sex}
                  onValueChange={(value) => handleInputChange("sex", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="unisex">Unisex</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Available Sizes</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`rounded-md border px-4 py-2 transition-colors ${
                      formData.sizes.includes(size)
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      const newSizes = formData.sizes.includes(size)
                        ? formData.sizes.filter((s) => s !== size)
                        : [...formData.sizes, size];
                      handleInputChange("sizes", newSizes);
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="bestSellers"
                  checked={formData.bestSellers}
                  onChange={(e) =>
                    handleInputChange("bestSellers", e.target.checked)
                  }
                  className="rounded border-gray-300"
                />
                <Label htmlFor="bestSellers">Best Seller</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="newArrivals"
                  checked={formData.newArrivals}
                  onChange={(e) =>
                    handleInputChange("newArrivals", e.target.checked)
                  }
                  className="rounded border-gray-300"
                />
                <Label htmlFor="newArrivals">New Arrival</Label>
              </div>
            </div>
            {error && (
              <div className="rounded bg-red-50 p-3 text-sm text-red-500">
                {error}
              </div>
            )}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="flex items-center"
              >
                {saving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="mr-1 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditProductForm;
