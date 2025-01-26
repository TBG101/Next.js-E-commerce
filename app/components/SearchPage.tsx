"use client";
import { searchProducts } from "@/apiqueries/apiqueries";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import Loading from "./Loading";

function SearchPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getSerchProducts = async () => {
      if (!searchQuery) return [];
      console.log(searchQuery);
      searchProducts(searchQuery as string).then((data) => {
        console.log(data.response);
        setProducts(data.response);
      });
      setIsLoading(false);
    };
    getSerchProducts();
  }, [searchQuery]);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <h1 className="w-full py-5 text-center text-3xl font-bold">
        {products.length} Results Found
      </h1>

      <section className="h-full  overflow-x-hidden px-4">
        <div className="grid  grid-cols-1  items-center justify-center  gap-4  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.length > 0 &&
            products.map((product: any) => {
              return (
                <div className="place-self-center" key={product.id}>
                  <Product key={product.id} data={product} />
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
}

export default SearchPage;
