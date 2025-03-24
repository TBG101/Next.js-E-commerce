import { Input } from "@nextui-org/react";
import React from "react";

function MyCheckoutFormFields({
  name,
  placeholder,
  type,
  value,
  setValue,
}: {
  name: string;
  placeholder: string;
  type: string;
  value: string;
  setValue: (value: string) => void;
}) {
  const [error, setError] = React.useState<string>("");

  return (
    <div className="flex w-full flex-col items-start justify-center">

      <Input
        isRequired
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        validate={(value) => {
          if (!value) {
            return "This field is required";
          }
          if (
            type === "email" &&
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
          ) {
            return "Invalid email address";
          }
          return "";
        }}
        type={type}
        name={name}
        id={name}
        label={name.charAt(0).toUpperCase() + name.slice(1)}  
        labelPlacement="outside"
        placeholder={placeholder}
        radius="sm"
        classNames={{
          inputWrapper: [
            "border-1",
            "dark:bg-default/60",
            "dark:border-default/60",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
      />
    </div>
  );
}

export default MyCheckoutFormFields;
