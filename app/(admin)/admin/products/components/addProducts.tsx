"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Input,
  Radio,
  RadioGroup,
  Textarea,
  Button,
  Spinner,
} from "@nextui-org/react";
import { NumberInput } from "@heroui/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface ProductForm {
  name: string;
  description: string;
  price: number;
  stock: number;
  discount: number;
  sex: "male" | "female" | "unisex" | "";
  sizes: string[];
  bestSellers: boolean;
  newArrivals: boolean;
}

function AddProducts() {
  const [formData, setFormData] = useState<ProductForm>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    discount: 0,
    sex: "",
    sizes: [],
    bestSellers: false,
    newArrivals: false,
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sizes = ["XS", "S", "M", "L", "XL"];

  const handleInputChange = (field: keyof ProductForm, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSizeToggle = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);

    // Create preview URLs
    files.forEach((file) => {
      const url = URL.createObjectURL(file);
      setPreviewUrls((prev) => [...prev, url]);
    });
  };

  const removeImage = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
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

    if (!formData.sex) {
      toast.error("Please select a gender");
      return;
    }

    if (formData.sizes.length === 0) {
      toast.error("Please select at least one size");
      return;
    }

    if (selectedFiles.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();

      // Append form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "sizes") {
          formDataToSend.append(key, (value as string[]).join(","));
        } else {
          formDataToSend.append(key, value.toString());
        }
      });

      // Append images
      selectedFiles.forEach((file) => {
        formDataToSend.append("images", file);
      });

      const response = await fetch("/api/admin/product", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        // Reset form
        setFormData({
          name: "",
          description: "",
          price: 0,
          stock: 0,
          discount: 0,
          sex: "",
          sizes: [],
          bestSellers: false,
          newArrivals: false,
        });
        setSelectedFiles([]);
        setPreviewUrls([]);
      } else {
        toast.error(result.message || "Error creating product");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col p-2 py-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Add Products</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 xl:flex-row">
          <Card
            className="p-4"
            shadow="none"
            classNames={{
              base: `bg-muted/70 w-full !max-w-[1000px] mt-4 pb-4 shadow xl:!max-w-[800px]`,
              header: "text-lg font-semibold p-2",
              body: "flex flex-col space-y-4",
            }}
          >
            <CardHeader>General Information</CardHeader>
            <CardBody>
              <div className="flex flex-col gap-4 pt-1">
                <Input
                  placeholder="Product Name"
                  label="Product Name"
                  labelPlacement="outside"
                  isRequired={true}
                  radius="sm"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  classNames={{
                    label: ["!text-black", "text-base", "font-base"],
                    input: [
                      "bg-transparent",
                      "text-black/90",
                      "placeholder:text-black/50",
                    ],
                    innerWrapper: ["bg-transparent"],
                    inputWrapper: [
                      "bg-default-200/100",
                      "group-data-[focus=true]:bg-default-200/100",
                      "!cursor-text",
                    ],
                  }}
                />

                <Textarea
                  placeholder="Product Description"
                  label="Product Description"
                  labelPlacement="outside"
                  radius="sm"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  classNames={{
                    label: ["!text-black", "text-base", "font-base"],
                    input: [
                      "bg-transparent",
                      "text-black/90",
                      "placeholder:text-black/50",
                    ],
                    innerWrapper: ["bg-transparent"],
                    inputWrapper: [
                      "bg-default-200/100",
                      "group-data-[focus=true]:bg-default-200/100",
                      "!cursor-text",
                    ],
                  }}
                  isRequired={true}
                />

                <div className="flex flex-grow flex-col gap-6 lg:flex-row lg:gap-6">
                  <div className="flex h-full flex-col items-start justify-start gap-1">
                    <label className="text-base font-medium">Size *</label>
                    <p className="text-sm text-gray-600">
                      Pick Available Sizes
                    </p>
                    <ul className="flex flex-row items-center space-x-2">
                      {sizes.map((size) => (
                        <li
                          key={size}
                          className={`h-16 w-16 cursor-pointer rounded-md text-center transition-all duration-200 ${
                            formData.sizes.includes(size)
                              ? "bg-primary text-white"
                              : "bg-default-200/100 hover:bg-primary/20"
                          }`}
                          onClick={() => handleSizeToggle(size)}
                        >
                          <div className="flex h-full items-center justify-center">
                            {size}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex w-full flex-grow flex-col gap-1 p-2">
                    <label className="text-base font-medium">Gender *</label>
                    <p className="text-sm text-gray-600">
                      Pick Available Gender
                    </p>
                    <RadioGroup
                      color="warning"
                      value={
                        formData.sex.charAt(0).toUpperCase() +
                        formData.sex.slice(1)
                      }
                      onValueChange={(value) =>
                        handleInputChange("sex", value.toLowerCase())
                      }
                      classNames={{
                        base: "h-full w-full",
                        wrapper:
                          "flex flex-row items-center justify-start gap-4 pt-1 lg:flex-grow lg:justify-between",
                        label: ["!text-black", "text-base", "font-base"],
                      }}
                    >
                      {["Male", "Female", "Unisex"].map((value) => (
                        <Radio key={value} value={value}>
                          {value}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card
            className="p-4"
            shadow="none"
            classNames={{
              base: "bg-muted/70 flex-grow mt-4 pb-4 shadow h-full",
              header: "text-lg font-semibold p-2",
              body: "flex flex-col space-y-4 p-2",
            }}
          >
            <CardHeader>Upload Images</CardHeader>
            <CardBody>
              <div className="flex flex-col gap-4 pt-1">
                <div className="flex w-full items-center justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <svg
                        className="mb-4 h-8 w-8 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG or WEBP (MAX. 10MB)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                {previewUrls.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={url}
                          alt={`Preview ${index}`}
                          className="h-20 w-20 rounded-lg object-cover"
                        />
                        <Button
                          size="sm"
                          color="danger"
                          className="min-w-unit-6 h-unit-6 absolute -right-2 -top-2"
                          onClick={() => removeImage(index)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="flex flex-col gap-4 xl:flex-row">
          <Card
            className="p-4"
            shadow="none"
            classNames={{
              base: `bg-muted/70 w-full pb-4 shadow !max-w-[1000px] xl:!max-w-[800px]`,
              header: "text-lg font-semibold p-2",
              body: "flex flex-col space-y-4 p-2",
            }}
          >
            <CardHeader>Product Pricing</CardHeader>
            <CardBody>
              <div className="flex flex-col gap-6 xl:flex-row xl:gap-3">
                <NumberInput
                  minValue={0.01}
                  label="Base Price"
                  placeholder="Product base price"
                  labelPlacement="outside"
                  isRequired={true}
                  radius="sm"
                  value={formData.price}
                  onValueChange={(value) =>
                    handleInputChange("price", value || 0)
                  }
                  classNames={{
                    label: ["!text-black", "text-base", "font-base"],
                    input: [
                      "bg-transparent",
                      "text-black/90",
                      "placeholder:text-black/50",
                    ],
                    innerWrapper: ["bg-transparent"],
                    inputWrapper: [
                      "bg-default-200/100",
                      "group-data-[focus=true]:bg-default-200/100",
                      "!cursor-text",
                    ],
                  }}
                  formatOptions={{
                    style: "currency",
                    currency: "USD",
                  }}
                />

                <NumberInput
                  minValue={0}
                  label="Stock"
                  placeholder="Quantity"
                  labelPlacement="outside"
                  isRequired={true}
                  radius="sm"
                  value={formData.stock}
                  onValueChange={(value) =>
                    handleInputChange("stock", value || 0)
                  }
                  classNames={{
                    label: ["!text-black", "text-base", "font-base"],
                    input: [
                      "bg-transparent",
                      "text-black/90",
                      "placeholder:text-black/50",
                    ],
                    innerWrapper: ["bg-transparent"],
                    inputWrapper: [
                      "bg-default-200/100",
                      "group-data-[focus=true]:bg-default-200/100",
                      "!cursor-text",
                    ],
                  }}
                />

                <NumberInput
                  minValue={0}
                  maxValue={100}
                  label="Discount"
                  placeholder="Discount percentage"
                  labelPlacement="outside"
                  radius="sm"
                  value={formData.discount}
                  onValueChange={(value) =>
                    handleInputChange("discount", value || 0)
                  }
                  classNames={{
                    label: ["!text-black", "text-base", "font-base"],
                    input: [
                      "bg-transparent",
                      "text-black/90",
                      "placeholder:text-black/50",
                    ],
                    innerWrapper: ["bg-transparent"],
                    inputWrapper: [
                      "bg-default-200/100",
                      "group-data-[focus=true]:bg-default-200/100",
                      "!cursor-text",
                    ],
                  }}
                  formatOptions={{
                    style: "percent",
                    maximumFractionDigits: 0,
                  }}
                />
              </div>
            </CardBody>
          </Card>
          {/* Product Options Card */}
          <Card
            className="p-4"
            shadow="none"
            classNames={{
              base: `bg-muted/70 w-full pb-4 shadow !max-w-[1000px] xl:!max-w-[800px]`,
              header: "text-lg font-semibold p-2",
              body: "flex flex-col space-y-4 p-2",
            }}
          >
            <CardHeader>Product Options</CardHeader>
            <CardBody>
              <div className="flex flex-col gap-4 xl:flex-row xl:gap-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="bestSellers"
                    checked={formData.bestSellers}
                    onChange={(e) =>
                      handleInputChange("bestSellers", e.target.checked)
                    }
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <label
                    htmlFor="bestSellers"
                    className="text-base font-medium"
                  >
                    Best Seller
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="newArrivals"
                    checked={formData.newArrivals}
                    onChange={(e) =>
                      handleInputChange("newArrivals", e.target.checked)
                    }
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <label
                    htmlFor="newArrivals"
                    className="text-base font-medium"
                  >
                    New Arrival
                  </label>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="bordered"
            onPress={() => {
              setFormData({
                name: "",
                description: "",
                price: 0,
                stock: 0,
                discount: 0,
                sex: "",
                sizes: [],
                bestSellers: false,
                newArrivals: false,
              });
              setSelectedFiles([]);
              setPreviewUrls([]);
            }}
          >
            Reset
          </Button>
          <Button
            type="submit"
            color="primary"
            disabled={isLoading}
            className="min-w-24"
          >
            {isLoading ? <Spinner size="sm" /> : "Create Product"}
          </Button>
        </div>
      </form>
    </section>
  );
}

export default AddProducts;
