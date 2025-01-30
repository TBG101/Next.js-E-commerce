"use client";
import { getProducts } from "@/apiqueries/apiqueries";
import React, { useContext, useEffect } from "react";
import Loading from "../components/Loading";
import Product from "../components/Product";
import { Button, Divider, Input, Image } from "@nextui-org/react";
import MyCheckoutFormFields from "../components/myCheckoutFormFields";
import { CartContext } from "../providers";

function Checkout() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { cart, addToCart, deleteFromCart } = useContext(CartContext);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [country, setCountry] = React.useState("");

  useEffect(() => { }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main className="flex h-full items-center justify-center pt-2">
      <div className=" flex h-full w-full min-w-[0] flex-col items-center justify-center gap-4  pt-4 md:min-w-[375px] md:gap-12 xl:w-full xl:max-w-full xl:flex-row  xl:items-start 2xl:gap-16">
        <section className=" flex h-full w-full max-w-[400px]  flex-col items-start justify-center gap-4 rounded-lg border-1 bg-white px-4  py-4 shadow-lg xl:max-w-[800px] xl:px-8">
          <h1 className=" text-center text-2xl font-bold text-gray-800 xl:text-4xl">
            Cart
          </h1>
          <Divider orientation="horizontal" />
          <div className="flex w-full flex-col gap-4">
            {Array.isArray(cart) && cart.length === 0 && (
              <h1 className="py-4 text-lg font-bold tracking-wider text-primary-orange">
                Cart is empty
              </h1>
            )}
            {cart.map((product: any) => (
              <div
                key={product.id}
                className="items- flex flex-col justify-start gap-4"
              >
                {
                  <div className="relative flex h-24 items-center justify-between gap-2 text-sm md:h-40 xl:h-48 ">
                    <div className="flex flex-row items-center justify-start">
                      <span className="aspect-square h-24 w-24 md:h-40 md:w-40 xl:h-48 xl:w-48">
                        <Image
                          alt={`/${product.image}`}
                          radius="sm"
                          src={`/${product.image}`}
                        />
                      </span>
                      <div className="flex w-full flex-col gap-1  self-start pl-2 text-xs md:text-base xl:w-[280px] ">
                        <div className="text-xs font-medium tracking-normal text-neutral-950 md:text-lg md:tracking-wider">
                          {product.name}
                        </div>
                        <div className="font-bold text-current text-primary-orange">
                          ${(product.price * product.quantity).toFixed(2)}
                        </div>
                        <div className="text-neutral-dark-grayish-blue">
                          ${product.price.toFixed(2)} x {product.quantity}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-around gap-4 xl:flex-row xl:items-center">
                      <div className="flex flex-row ">
                        <div className="border-1 p-3  md:p-3 md:px-6">1</div>
                        <div className="border-1 p-3  md:p-3">+</div>
                        <div className="border-1 p-3  md:p-3">-</div>
                      </div>
                      <Button
                        onPress={() => deleteFromCart(product.id)}
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
                }
                <Divider orientation="horizontal" />
              </div>
            ))}
          </div>
        </section>
        <Divider
          orientation="vertical"
          className="relative hidden h-[800px] xl:block"
        />
        <form
          onSubmit={onSubmit}
          className="h-full w-full max-w-[400px] rounded-lg border-1 bg-white px-4 py-10 shadow-lg md:px-10 "
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className=" self-start text-start text-2xl font-bold text-gray-800 xl:text-4xl">
              Checkout
            </h1>
            <MyCheckoutFormFields
              name="name"
              placeholder="Enter your name"
              type="text"
              setValue={setName}
              value={name}
            />
            <MyCheckoutFormFields
              name="email"
              placeholder="Enter your email"
              type="email"
              setValue={setEmail}
              value={email}
            />
            <MyCheckoutFormFields
              name="phone"
              placeholder="Enter your phone"
              type="tel"
              setValue={setPhone}
              value={phone}
            />
            <MyCheckoutFormFields
              name="address"
              placeholder="Enter your address"
              type="text"
              setValue={setAddress}
              value={address}
            />
            <MyCheckoutFormFields
              name="city"
              placeholder="Enter your city"
              type="text"
              setValue={setCity}
              value={city}
            />
            <MyCheckoutFormFields
              name="state"
              placeholder="Enter your state"
              type="text"
              setValue={setState}
              value={state}
            />
            <MyCheckoutFormFields
              name="zip"
              placeholder="Enter your zip code"
              type="text"
              setValue={setZip}
              value={zip}
            />
            <MyCheckoutFormFields
              name="country"
              placeholder="Enter your country"
              type="text"
              setValue={setCountry}
              value={country}
            />
            <Button
              color="primary"
              type="submit"
              onSubmit={() => { }}
              className="w-full text-lg font-medium tracking-wide text-secondary-foreground"
            >
              Checkout
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Checkout;
