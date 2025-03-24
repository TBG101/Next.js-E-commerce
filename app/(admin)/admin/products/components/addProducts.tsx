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
} from "@nextui-org/react";
import { NumberInput } from "@heroui/react";

function FormInput({
  label,
  placeholder,
}: {
  label?: string;
  placeholder?: string;
}) {
  return (
    <Input
      placeholder={placeholder}
      label={label}
      labelPlacement="outside"
      isRequired={true}
      radius="sm"
      classNames={{
        label: ["!text-black", "text-base", "font-base"],
        input: ["bg-transparent", "text-black/90", "placeholder:text-black/50"],
        innerWrapper: ["bg-transparent"],
        inputWrapper: [
          "bg-default-200/100",
          "group-data-[focus=true]:bg-default-200/100",
          "!cursor-text",
        ],
      }}
    />
  );
}

function AddProducts() {
  return (
    <section className="flex flex-col p-2 py-3 ">
      <div className="flex items-center justify-between">
        <h1 className="font-semibol text-2xl">Add Products</h1>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 xl:flex-row">
          <Card
            className="p-4"
            shadow="none"
            classNames={{
              base: `bg-muted/70 w-full !max-w-[1000px]  mt-4 pb-4  shadow xl:!max-w-[800px]`,
              header: "text-lg font-semibold p-2",
              body: "flex flex-col space-y-4  ",
            }}
          >
            <CardHeader>General Information</CardHeader>
            <CardBody>
              <div className="flex flex-col gap-4 pt-1">
                <FormInput label="Product Name" placeholder="Product Name" />
                <FormInput
                  label="Product Description"
                  placeholder="Product Description"
                />
                <Textarea
                  placeholder="Product Description"
                  label="Product Description"
                  labelPlacement="outside"
                  radius="sm"
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
                  {/* Size Section */}
                  <div className="flex h-full flex-col items-start justify-start gap-1 ">
                    <label className="text-base font-medium">Size</label>
                    <p className="text-sm text-gray-600">
                      Pick Available Sizes
                    </p>
                    <ul className="flex flex-row items-center space-x-2">
                      {["XS", "S", "M", "L", "XL"].map((size) => (
                        <li
                          key={size}
                          className="h-16 w-16 cursor-pointer rounded-md bg-default-200/100 text-center transition-all duration-200 hover:bg-primary-orange/80"
                        >
                          <div className="flex h-full items-center justify-center">
                            {size}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Gender Section */}
                  <div className="flex w-full flex-grow flex-col gap-1 p-2">
                    <label className="text-base font-medium">Gender</label>
                    <p className="text-sm text-gray-600">
                      Pick Available Gender
                    </p>
                    <RadioGroup
                      color="warning"
                      classNames={{
                        base: "h-full w-full",
                        wrapper:
                          "flex flex-row items-center justify-start gap-4 pt-1 lg:flex-grow lg:justify-between",
                        label: ["!text-black", "text-base", "font-base"],
                      }}
                    >
                      {["Male", "Female", "UniSex"].map((value) => (
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
              base: "bg-muted/70 flex-grow mt-4 pb-4 shadow h-full ",
              header: "text-lg font-semibold p-2",
              body: "flex flex-col space-y-4 p-2  ",
            }}
          >
            <CardHeader>Upload Image</CardHeader>
            <CardBody>
              <div className="flex flex-col gap-4 pt-1">
                <div className="flex w-full items-center justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500  dark:hover:bg-gray-800"
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <svg
                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
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
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>
                <div className="flex w-full items-center justify-start">
                  <label
                    htmlFor="dropzone-file2"
                    className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <svg
                      className="h-6 w-6 text-gray-500 dark:text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </label>
                  <input id="dropzone-file2" type="file" className="hidden" />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="flex flex-col gap-4 xl:flex-row">
          {/* IMAGE UPLOADING */}
          <Card
            className="p-4"
            shadow="none"
            classNames={{
              base: `bg-muted/70 w-full  pb-4  shadow !max-w-[1000px] xl:!max-w-[800px]`,
              header: "text-lg font-semibold p-2",
              body: "flex flex-col space-y-4 p-2  ",
            }}
          >
            <CardHeader>Product Pricing</CardHeader>
            <CardBody>
              <div className="flex flex-col gap-6 xl:flex-row xl:gap-3 ">
                <NumberInput
                  minValue={1}
                  label="Base Pricing"
                  placeholder="Product base price"
                  labelPlacement="outside"
                  isRequired={true}
                  radius="sm"
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
                  minValue={1}
                  label="Stock "
                  placeholder="Quantity"
                  labelPlacement="outside"
                  isRequired={true}
                  radius="sm"
                  type=""
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
                  label="Discount"
                  placeholder="Product Discounted price"
                  labelPlacement="outside"
                  isRequired={true}
                  radius="sm"
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
                  }}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default AddProducts;
