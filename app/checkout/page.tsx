"use client";
import { getProducts, sendCheckout } from "@/apiqueries/apiqueries";
import React, { useContext } from "react";
import { Button, Divider, } from "@nextui-org/react";
import MyCheckoutFormFields from "../components/myCheckoutFormFields";
import { CartContext } from "../providers";
import CartProduct from "./component/CartProduct";
import FormPaymentMethod from "../components/FormPaymentMethod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CheckoutFields } from "@/lib/types";



function Checkout() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { cart, addToCart, deleteFromCart } = useContext(CartContext);

  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("");
  const [error, setError] = React.useState("");
  const [succes, setSucces] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (cart.length === 0) {
      // handle erros
      setLoading(false);
      setError("Cart is empty");
      return;
    }

    const order: CheckoutFields = {
      name,
      email,
      address,
      phone,
      city,
      postalCode: zip,
      country,
      paymentMethod: parseInt(paymentMethod),
      cartItems: cart,
    };

    // Here you can handle the order submission, e.g., send it to your API
    console.log(order);
    try {
      let res = await sendCheckout(order);
      console.log(res);
      localStorage.removeItem("cart");
      setSucces(true);
      router.push("/order/" + res.id);
    } catch (e: any) {
      console.log(e);
      setLoading(false);
      if (e.message === "Unauthorized") {
        router.push("/login");
        return;
      } else {
        setError(e.message);
      }
    }


  };

  const calculateTotale = () => {
    let total = 0;
    Array.isArray(cart) &&
      cart.forEach((product) => {
        total += product.price * product.quantity;
      });
    return total;
  }



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
              <CartProduct
                key={product.id}
                cartItem={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        </section>
        <Divider
          orientation="vertical"
          className="relative hidden h-[800px] xl:block"
        />

        {Array.isArray(cart) && cart.length >= 0 && <form
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

            <FormPaymentMethod
              value={paymentMethod}
              setValue={setPaymentMethod} />

            <Button
              isDisabled={loading || succes}
              isLoading={loading}
              color={!succes ? "primary" : "success"}
              type="submit"
              className="w-full text-lg font-medium tracking-wide text-secondary-foreground mt-2"
            >
              {succes && "Order placed"}
              {loading && !succes && "Loading"}
              {!loading && !succes && <>Checkout <span className="font-bold tracking-wide">${calculateTotale()}</span></>}
            </Button>
            {error && (
              <p className="text-red-500 text-center">{error}</p>
            )}
          </div>
        </form>}
      </div >
    </main >
  );
}

export default Checkout;
