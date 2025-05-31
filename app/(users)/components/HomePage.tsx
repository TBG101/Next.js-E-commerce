"use client";

import React, { useEffect } from "react";
import { Image, Button, Chip } from "@nextui-org/react";
import { motion } from "framer-motion";
import HomePageProductsSection from "./HomePageProductsSection";
import { getProducts } from "@/apiqueries/apiqueries";
import Loading from "../components/Loading";
import Link from "next/link";
import { ArrowRight, Star, TrendingUp, Sparkles, Users } from "lucide-react";

function HomePage() {
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

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-white via-slate-50 to-neutral-100">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="relative h-[70vh] w-full lg:h-[80vh]">
          <div className="relative h-full w-full">
            {/* Background Image */}
            <Image
              src="/landing_page.png"
              radius="none"
              alt="Hero Image"
              className="h-full w-full min-w-full "
              width={"100%"}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-transparent to-transparent opacity-70" />
          </div>

          {/* Hero Content */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-6 lg:px-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="max-w-2xl space-y-6"
              >
                <Chip
                  startContent={<Sparkles className="h-4 w-4" />}
                  variant="flat"
                  color="warning"
                  className="border-orange-200 bg-orange-100 text-orange-800"
                >
                  New Collection Available
                </Chip>

                <h1 className="text-4xl font-bold leading-tight text-white lg:text-6xl">
                  Discover Your
                  <span className="block text-orange-400">Perfect Style</span>
                </h1>

                <p className="text-lg leading-relaxed text-gray-100 lg:text-xl">
                  Explore our curated collection of premium products designed to
                  elevate your lifestyle and express your unique personality.
                </p>

                <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                  <Button
                    as={Link}
                    href="/products"
                    size="lg"
                    color="warning"
                    variant="solid"
                    endContent={<ArrowRight className="h-5 w-5" />}
                    className="px-8 py-6 text-base font-semibold"
                  >
                    Shop Now
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="border-b border-gray-100 bg-white py-16"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { icon: Users, label: "Happy Customers", value: "50K+" },
              { icon: Star, label: "5-Star Reviews", value: "10K+" },
              { icon: TrendingUp, label: "Products Sold", value: "100K+" },
              { icon: Sparkles, label: "Premium Quality", value: "100%" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="space-y-3 text-center"
              >
                <div className="flex justify-center">
                  <div className="rounded-full bg-orange-50 p-3 text-orange-600">
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-gray-900 lg:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Products Sections */}
      <div className="space-y-20 py-20">
        <HomePageProductsSection
          title="New Arrivals"
          subtitle="Discover the latest additions to our collection"
          data={newArrivals}
          icon={<Sparkles className="h-6 w-6" />}
        />
        <HomePageProductsSection
          title="Best Sellers"
          subtitle="Our most popular products loved by customers"
          data={bestSellers}
          icon={<TrendingUp className="h-6 w-6" />}
        />
        <HomePageProductsSection
          title="For Her"
          subtitle="Elegant and sophisticated pieces for women"
          data={womenProducts}
          icon={<Star className="h-6 w-6" />}
        />
        <HomePageProductsSection
          title="For Him"
          subtitle="Bold and refined styles for men"
          data={menProducts}
          icon={<Users className="h-6 w-6" />}
        />
      </div>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-orange-500 to-amber-500 py-20"
      >
        <div className="container mx-auto px-6 text-center lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl space-y-6"
          >
            <h2 className="text-3xl font-bold text-white lg:text-5xl">
              Join Our Style Community
            </h2>
            <p className="text-lg text-orange-100">
              Get exclusive access to new arrivals, special offers, and style
              inspiration delivered to your inbox.
            </p>
            <Button
              size="lg"
              variant="solid"
              className="bg-white px-8 py-6 text-base font-semibold text-orange-600 transition-colors hover:bg-gray-100"
              endContent={<ArrowRight className="h-5 w-5" />}
            >
              Subscribe Now
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

export default HomePage;
