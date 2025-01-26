"use client";
import { getProducts } from "@/apiqueries/apiqueries";
import React, { useEffect } from "react";
import Loading from "../components/Loading";
import Product from "../components/Product";

function Women() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const getData = async () => {
      getProducts({ sex: "female" }).then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
    };

    getData();
  }, []);

  return (
    <main className="flex w-full min-w-[375px] flex-col items-center justify-center overflow-auto transition-all duration-300 ease-in-out">
      {loading && (
        <div>
          <Loading />
        </div>
      )}
      <h1 className="py-5 text-3xl font-bold">Women</h1>
      <section className="h-full  overflow-x-hidden px-4">
        <div className="grid  grid-cols-1  items-center justify-center  gap-4  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.length > 0 &&
            products.map((product: any) => {
              return (
                <div className="place-self-center" key={product.id}>
                  <Product data={product} />
                </div>
              );
            })}
        </div>
      </section>
    </main>
  );
}

export default Women;
