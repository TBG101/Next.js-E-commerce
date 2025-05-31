import React, { useEffect } from "react";
import { Image, Button, Chip } from "@nextui-org/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, ShoppingCart, Eye } from "lucide-react";

interface ProductProps {
  data: {
    _id: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    thumbnails: string[];
    isNew?: boolean;
    discount?: number;
  };
}

function Product({ data }: ProductProps) {
  const productLink =
    "/products/" + data.name.replaceAll(" ", "_").toLowerCase();
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  useEffect(() => {
    const items = localStorage.getItem("wishlist") ?? "[]";
    const wishlist = JSON.parse(items);
    setIsWishlisted(wishlist.includes(data._id));
  }, [data._id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const items = localStorage.getItem("wishlist") ?? "[]";
    const wishlist = JSON.parse(items);

    if (isWishlisted) {
      const newWishlist = wishlist.filter((id: string) => id !== data._id);
      setIsWishlisted(false);
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    } else {
      setIsWishlisted(true);
      const newWishlist = [...wishlist, data._id];
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add quick view functionality here
  };

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart functionality here
  };

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {/* Badges */}
        <div className="absolute left-3 top-3 z-20 flex flex-col gap-2">
          {data.isNew && (
            <Chip
              size="sm"
              color="success"
              variant="solid"
              className="font-semibold"
            >
              New
            </Chip>
          )}
          {data.discount && (
            <Chip
              size="sm"
              color="danger"
              variant="solid"
              className="font-semibold"
            >
              -{data.discount}%
            </Chip>
          )}
        </div>

        {/* Wishlist Button */}
        <motion.button
          className="absolute right-3 top-3 z-20 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-colors hover:bg-white"
          onClick={toggleWishlist}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </motion.button>

        {/* Product Image */}
        <Link href={productLink} className="block h-full w-full">
          <motion.div
            className="relative h-full w-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={data.images[0]}
              alt={data.name}
              radius="none"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </Link>

        {/* Quick Actions Overlay */}
        <motion.div
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="solid"
              color="warning"
              startContent={<ShoppingCart className="h-4 w-4" />}
              className="flex-1 font-semibold"
              onClick={addToCart}
            >
              Add to Cart
            </Button>
            <Button
              size="sm"
              variant="bordered"
              className="border-white text-white hover:bg-white hover:text-black"
              onClick={handleQuickView}
              isIconOnly
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Product Info */}
      <Link href={productLink}>
        <div className="space-y-3 p-4">
          <div>
            <h3 className="line-clamp-2 font-semibold text-gray-900 transition-colors group-hover:text-orange-600">
              {data.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-gray-500">
              {data.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {data.discount ? (
                <>
                  <span className="text-lg font-bold text-gray-900">
                    ${(data.price * (1 - data.discount / 100)).toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ${data.price}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  ${data.price}
                </span>
              )}
            </div>

            {/* Rating Stars (placeholder) */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-3 w-3 rounded-full ${
                    i < 4 ? "bg-orange-400" : "bg-gray-200"
                  }`}
                />
              ))}
              <span className="ml-1 text-xs text-gray-500">(4.0)</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default Product;
