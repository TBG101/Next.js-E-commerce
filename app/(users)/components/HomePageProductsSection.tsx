import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Product from "./Product";

interface HomePageProductsSectionProps {
  title: string;
  subtitle?: string;
  data: any;
  icon?: React.ReactNode;
}

function HomePageProductsSection({
  title,
  subtitle,
  data,
  icon,
}: HomePageProductsSectionProps) {
  if (!data || !data.products) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-6 lg:px-12"
    >
      {/* Section Header */}
      <div className="mb-16 space-y-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-3"
        >
          {icon && (
            <div className="rounded-full bg-orange-50 p-2 text-orange-600">
              {icon}
            </div>
          )}
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
            {title}
          </h2>
        </motion.div>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto max-w-2xl text-lg text-gray-600"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Products Grid */}
      <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {data.products.length > 0 &&
          data.products.map((product: any, index: number) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.4 + index * 0.1,
              }}
            >
              <Product data={product} />
            </motion.div>
          ))}
      </div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center"
      >
        <Button
          as={Link}
          href="/products"
          variant="bordered"
          size="lg"
          endContent={<ArrowRight className="h-5 w-5" />}
          className="border-gray-300 px-8 py-6 text-base font-semibold text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
        >
          View All {title}
        </Button>
      </motion.div>
    </motion.section>
  );
}

export default HomePageProductsSection;
