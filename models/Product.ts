import mongoose, { Schema, Document } from "mongoose";

export type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  thumbnails: string[];
  sex: string;
  discount: number;
  stock: number;
  sizes: string[];
  bestSellers: boolean;
  newArrivals: boolean;
};
