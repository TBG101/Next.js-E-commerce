"use client";
import { Card, CardBody, CardHeader, Input } from "@nextui-org/react";

function AddProducts() {
  return (
    <section className="flex flex-col p-2 py-3 ">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Add Products</h1>
      </div>
      <Card
        className="p-4"
        shadow="none"
        classNames={{
          base: "bg-muted/70 w-[800px] mt-3",
          header: "text-lg font-semibold p-2",
          body: "flex flex-col space-y-4 p-2 ",
        }}
      >
        <CardHeader>General Information</CardHeader>
        <CardBody>
          <div className="flex flex-col space-y-10">
            <Input
              placeholder="Product Name"
              label="Product Name"
              labelPlacement="outside"
              isRequired={true}
              isClearable={true}
              classNames={{
                label: "text-red/50 dark:text-white/90",

                input: [
                  "bg-transparent",
                  "text-black/90 dark:text-white/90",
                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "bg-default-200/100",
                  "group-data-[focus=true]:bg-default-200/100",
                  "!cursor-text",
                ],
              }}
            />
            <Input
              placeholder="Product Description"
              label="Product Description"
              labelPlacement="outside"
              isClearable={true}
              variant="faded"
              isRequired={true}
              classNames={{
                label: [
                  "text-black",
                  "group-data-[focus=true]:text-primary text-black",
                  "text-black",
                ],
                input: [
                  "bg-transparent",
                  "text-black/90 dark:text-white/90",
                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "bg-default-200/100",
                  "group-data-[focus=true]:bg-default-200/100",
                  "!cursor-text",
                ],
              }}
            />
            <Input
              placeholder="Product Price"
              label="Product Price"
              labelPlacement="outside"
              isRequired={true}
              isClearable={true}
              classNames={{
                label: ["text-black", "group-data-[focus=true]:text-primary"],
                input: [
                  "bg-transparent",
                  "text-black/90 dark:text-white/90",
                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "bg-default-200/100",
                  "group-data-[focus=true]:bg-default-200/100",
                  "!cursor-text",
                ],
              }}
            />
            <Input
              placeholder="Product Stock"
              label="Product Stock"
              labelPlacement="outside"
              isRequired={true}
              isClearable={true}
              classNames={{
                label: ["text-black", "group-data-[focus=true]:text-primary"],
                input: [
                  "bg-transparent",
                  "text-black/90 dark:text-white/90",
                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "bg-default-200/100",
                  "group-data-[focus=true]:bg-default-200/100",
                  "!cursor-text",
                ],
              }}
            />
          </div>
        </CardBody>
      </Card>
    </section>
  );
}

export default AddProducts;
