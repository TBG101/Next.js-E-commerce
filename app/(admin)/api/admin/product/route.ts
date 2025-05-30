import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import productModel from "@/models/productModel";
import { authOptions } from "@/lib/authUtils";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface productCreate {
  name: string;
  price: number;
  description: string;
  images: string[];
  thumbnails: string[];
  sex: string;
  discount: number;
  stock: number;
  sizes: string[];
  bestSellers?: boolean;
  newArrivals?: boolean;
}

export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const product: productCreate = {
    name: "",
    price: 0,
    description: "",
    images: [],
    thumbnails: [],
    sex: "",
    discount: 0,
    stock: 0,
    sizes: [],
    bestSellers: false,
    newArrivals: false,
  };

  const data = await req.formData();
  product.name = (data.get("name") as string) || "";
  product.price = parseFloat(data.get("price") as string) || 0;
  product.description = (data.get("description") as string) || "";
  product.discount = parseInt(data.get("discount") as string) || 0;
  product.stock = parseInt(data.get("stock") as string) || 0;
  product.sex = data.get("sex") as string;
  product.bestSellers = data.get("bestSellers") === "true";
  product.newArrivals = data.get("newArrivals") === "true";

  // Handle sizes array
  const sizesString = data.get("sizes") as string;
  if (sizesString) {
    product.sizes = sizesString.split(",");
  }

  // Validation
  if (!product.name.trim()) {
    return NextResponse.json(
      { message: "Product name is required" },
      { status: 400 },
    );
  }

  if (product.price <= 0) {
    return NextResponse.json(
      { message: "Price must be greater than zero" },
      { status: 400 },
    );
  }

  if (product.stock < 0) {
    return NextResponse.json(
      { message: "Stock cannot be negative" },
      { status: 400 },
    );
  }

  if (product.discount < 0 || product.discount > 100) {
    return NextResponse.json(
      { message: "Discount must be between 0 and 100" },
      { status: 400 },
    );
  }

  if (!product.sex) {
    return NextResponse.json(
      { message: "Gender selection is required" },
      { status: 400 },
    );
  }

  let id = 0;
  const slug = product.name.replaceAll(" ", "-").toLowerCase();
  const images = data.getAll("images");

  for (const file of images) {
    if (!file) continue;
    const fileName = `${slug}-${id++}`;
    const fileNameThumbnail = `${slug}-${id++}-thumbnail`;
    const arrayBuffer = await (file as File).arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    try {
      const secure_url = await uploadFile(buffer, fileName);
      const secure_urlThumbnail = await uploadFile(
        buffer,
        fileNameThumbnail,
        true,
      );

      product.images.push(secure_url);
      product.thumbnails.push(secure_urlThumbnail);
    } catch (error: any) {
      console.error("Error processing image:", error);
      return NextResponse.json(
        { message: "Error processing image" },
        { status: 500 },
      );
    }
  }

  try {
    await productModel.create({ ...product, id: 0 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Error creating product" },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "Product created successfully" },
    { status: 201 },
  );
}

export async function GET(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin")
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);
  const search = url.searchParams.get("search") || "";

  if (page <= 0 || limit <= 0) {
    return NextResponse.json(
      { message: "Page and limit must be positive integers" },
      { status: 400 },
    );
  }

  try {
    // Build search query
    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { sex: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const totalProducts = await productModel.countDocuments(searchQuery);
    const products = await productModel
      .find(searchQuery)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json(
      {
        products,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
        searchQuery: search,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 },
    );
  }
}

async function uploadFile(
  buffer: Buffer,
  id: string,
  isThumbnail: boolean = false,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        public_id: id,
        folder: "products",
        format: "webp",
        transformation: isThumbnail
          ? [{ width: 172, height: 172, crop: "fill" }, { quality: "auto" }]
          : [{ width: 1000, height: 1000, crop: "fill" }, { quality: "auto" }],
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        if (!result) {
          return reject("Error uploading image to Cloudinary");
        }

        resolve(result.secure_url);
      },
    );

    uploadStream.end(buffer);
  });
}
