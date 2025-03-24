import React, { useEffect } from "react";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

interface ProductProps {
  data: {
    _id: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    thumbnails: string[];
  };
}

function Product(product: ProductProps) {
  const productLink =
    "/products/" + product.data.name.replaceAll(" ", "_").toLowerCase();
  const [isWhislisted, setIsWhislisted] = React.useState(false);

  useEffect(() => {
    const items = localStorage.getItem("whislist") ?? "[]";
    const whislist = JSON.parse(items);
    setIsWhislisted(whislist.includes(product.data._id));
  }, []);

  const toggleWhislist = () => {
    const items = localStorage.getItem("whislist") ?? "[]";
    const whislist = JSON.parse(items);
    if (isWhislisted) {
      const newWhislist = whislist.filter(
        (id: string) => id !== product.data._id,
      );
      setIsWhislisted(false);
      localStorage.setItem("whislist", JSON.stringify(newWhislist));
    } else {
      setIsWhislisted(true);
      const newWhislist = [...whislist, product.data._id];
      localStorage.setItem("whislist", JSON.stringify(newWhislist));
    }
  };

  return (
    <div>
      <div className="relative flex ">
        <button
          className=" absolute right-0 z-20 m-3 cursor-pointer border-0 border-transparent bg-transparent "
          onClick={toggleWhislist}
        >
          {isWhislisted ? (
            <FaHeart className="text-2xl text-red-500" size={24} />
          ) : (
            <FaRegHeart className="text-2xl text-neutral-800 " size={24} />
          )}
        </button>
      </div>
      <Link
        href={productLink}
        className="flex cursor-pointer flex-col items-start justify-center"
      >
        <div className="aspect-square max-h-96 bg-neutral-300">
          <Image
            src={`${product.data.images[0]}`}
            radius="none"
            alt="failed"
            isZoomed={true}
            className="object-fill shadow-sm"
          />
        </div>
        <h3 className="pl-1 pt-1 text-sm font-light text-neutral-800">
          {product.data.name}
        </h3>
        <div className="pl-1 text-sm font-semibold text-neutral-800 ">
          ${product.data.price}
        </div>
      </Link>
    </div>
  );
}

export default Product;
