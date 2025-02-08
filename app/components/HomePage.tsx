"use client";

import React, { useEffect } from "react";
import { Image, Button } from "@nextui-org/react";
import HomePageProductsSection from "./HomePageProductsSection";
import { getProducts } from "@/apiqueries/apiqueries";
import Loading from "../components/Loading";

function HomePage() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apidata = await getProducts({ maxProducts: 4 });
        console.log(apidata);
        setProducts(apidata);
      } catch (error) {
        console.error("Error:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col">
      <hr />
      <Image
        src={`/landing_page.png`}
        radius="none"
        alt="failed"
        className="w-screen object-fill shadow-sm"
      />
      <HomePageProductsSection title="New Arrivals" data={products} />
      <HomePageProductsSection title="Best Sellers" data={products} />
      <HomePageProductsSection title="Women" data={products} />
      <HomePageProductsSection title="Men" data={products} />
    </div>
  );
}

export default HomePage;
