import React from "react";
import { Button, Divider, Image } from "@nextui-org/react";
import { CartItem } from "@/lib/types";
import { CldImage } from "next-cloudinary";

function CartProduct({
  cartItem,
  addToCart,
}: {
  cartItem: CartItem;
  addToCart: any;
}) {
  return (
    <div className=" flex flex-col justify-start gap-4">
      <div className="relative flex h-24 items-center justify-between gap-2 text-sm md:h-40 xl:h-48 ">
        <div className="flex flex-row items-center justify-start">
          <span className="aspect-square h-24 w-24 md:h-40 md:w-40 xl:h-48 xl:w-48">
            <Image
              alt={`/${cartItem.image}`}
              radius="sm"
              src={`/${cartItem.image}`}
            />
          </span>
          <div className="flex w-full flex-col gap-1  self-start pl-2 text-xs md:text-base xl:w-[280px] ">
            <div className="text-xs font-medium tracking-normal text-neutral-950 md:text-lg md:tracking-wider">
              {cartItem.name}
            </div>
            <div className="font-bold text-current text-primary-orange">
              ${(cartItem.price * cartItem.quantity).toFixed(2)}
            </div>
            <div className="text-neutral-dark-grayish-blue">
              ${cartItem.price.toFixed(2)} x {cartItem.quantity}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-around gap-4 xl:flex-row xl:items-center">
          <div className="flex flex-row ">
            <div className="rounded-l-md border-1 border-r-0 border-neutral-800 border-opacity-50  p-3 md:p-3 md:px-6">
              1
            </div>

            <div
              className="cursor-pointer select-none border-1 border-r-0 border-neutral-800  border-opacity-50 p-3 transition-all ease-in hover:bg-neutral-200 md:p-3"
              onClick={() => addToCart({ ...cartItem, quantity: 1 })}
            >
              +
            </div>

            <div
              className="cursor-pointer select-none rounded-r-md border-1 border-neutral-800  border-opacity-50 p-3 transition-all ease-in hover:bg-neutral-200 md:p-3"
              onClick={() => addToCart({ ...cartItem, quantity: -1 })}
            >
              -
            </div>
          </div>
          <Button
            onPress={() => {}}
            className="w-15 min-w-0 bg-gray-900 hover:bg-red-500"
            radius="sm"
          >
            <Image
              radius="none"
              width={15}
              src="/images/icon-delete.svg"
              alt="icon-delete"
            />
          </Button>
        </div>
      </div>

      <Divider orientation="horizontal" />
    </div>
  );
}

export default CartProduct;
