"use client";

import React, { useEffect } from "react";
import { Image, Button } from "@nextui-org/react";
import HomePageProductsSection from "./HomePageProductsSection";
import { getProducts } from "@/apiqueries/apiqueries";
import Loading from "../components/Loading";

function HomePage() {
  const [products, setProducts] = React.useState([]);
  const [menProducts, setMenProducts] = React.useState([]);
  const [womenProducts, setWomenProducts] = React.useState([]);
  const [bestSellers, setBestSellers] = React.useState([]);
  const [newArrivals, setNewArrivals] = React.useState([]);

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [men, women, bestSellers, newArrivals] = await Promise.all([
          getProducts({ maxProducts: 4, sex: "male" }),
          getProducts({ maxProducts: 4, sex: "female" }),
          getProducts({ bestSellers: true }),
          getProducts({ newArrivals: true }),
        ]);
        setMenProducts(men);
        setWomenProducts(women);
        setBestSellers(bestSellers);
        setNewArrivals(newArrivals);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex h-full w-full flex-col">
      <hr />
      <Image
        src={`/landing_page.png`}
        radius="none"
        alt="failed"
        className="w-screen object-fill shadow-sm"
      />

      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loading />
        </div>
      ) : (
        <>
          <HomePageProductsSection title="New Arrivals" data={products} />
          <HomePageProductsSection title="Best Sellers" data={products} />
          <HomePageProductsSection title="Women" data={menProducts} />
          <HomePageProductsSection title="Men" data={womenProducts} />
        </>
      )}
    </div>
  );
}

export default HomePage;
