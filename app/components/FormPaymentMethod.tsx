import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Select, SelectItem } from '@nextui-org/react';
import React from 'react'
import { IoMdCheckmark } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
function FormPaymentMethod(
    {   
        value,
        setValue,
    }: {
        value: string;
        setValue: (value: string) => void;
    }
) {

    return (
        <div className="flex w-full flex-col items-start justify-center">
            <Select
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                isRequired
                radius='sm'
                disableSelectorIconRotation
                className="max-w-xs"
                label="Payment Method"
                labelPlacement="outside"
                placeholder="Select payment method"
                selectorIcon={<IoChevronDown />}
                selectionMode='single'
                classNames={
                    {
                        base: ["border-1", "dark:bg-default/60", "dark:border-default/60", "hover:bg-default-200/70", "dark:hover:bg-default/70", "group-data-[focus=true]:bg-default-200/50", "dark:group-data-[focus=true]:bg-default/60", "!cursor-text", "rounded-lg"],
                    }
                }
            >
                {["Cash on delivery", "Credit Card"].map((method, index) => (
                    <SelectItem key={index}>{method}</SelectItem>
                ))}
            </Select>
        </div >
    )
}

export default FormPaymentMethod