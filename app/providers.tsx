"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React, { useState, createContext, useEffect } from "react";
import { CartItem } from "@/lib/types";


export const CartContext = createContext<any>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    getCartFromLocalStorage();
  }, []);

  const getCartFromLocalStorage = () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
  };

  const addToCart = async (item: CartItem) => {
    setCart((prevCart) => {
      // Check if the item already exists in the cart
      const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);

      if (existingItem) {
        // If the item already exists, return a new array where the existing item's quantity is updated
        const newCart = prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: (cartItem.quantity + item.quantity) < 0 ? 0 : cartItem.quantity + item.quantity }
            : cartItem,
        );
        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      } else {
        if (item.quantity < 1) {
          return prevCart;
        }
        // If the item doesn't exist, add the new item to the cart
        const newCart = [...prevCart, item];
        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("cart", cart);
  };

  const deleteFromCart = (id: string) => {

    setCart((prevCart) => {
      let newCart = prevCart.filter((cartItem) => cartItem._id !== id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <CartContext.Provider value={{ cart, addToCart, deleteFromCart }}>
          {children}
        </CartContext.Provider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

