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
      <label htmlFor="name" className="mb-1 ml-1 text-sm text-gray-800 ">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <Input
        isRequired
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        validate={(value) => {
          if (!value) {
            setError("This field is required");
            return "This field is required";
          }
          if (
            type === "email" &&
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
          ) {
            setError("Invalid email address");
            return "Invalid email address";
          }
          setError("");
          return "";
        }}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        radius="sm"
        classNames={{
       
        }}
      />
    </div>
  );
}

export default MyCheckoutFormFields;
