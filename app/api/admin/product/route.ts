import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import productModel from "@/models/productModel";
import { authOptions } from "@/lib/utils";

interface productCreate {
  name: string;
  price: number;
  description: string;
  images: string[];
  thumbnails: string[];
  sex: string;
  discount: number;
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
  };

  const data = await req.formData();
  product.name = (data.get("name") as string) || "";
  product.price = parseFloat(data.get("price") as string) || 0;
  product.description = (data.get("description") as string) || "";
  product.discount = parseInt(data.get("discount") as string) || 0;
  product.sex = data.get("sex") as string;

  if (product.price <= 0) {
    return NextResponse.json(
      { message: "Price must be greater than zero" },
      { status: 400 }
    );
  }

  if (product.discount < 0 || product.discount > 100) {
    return NextResponse.json(
      { message: "Discount must be between 0 and 100" },
      { status: 400 }
    );
  }

  let id = 0;
  const slug = product.name.replaceAll(" ", "-").toLowerCase();
  const images = data.getAll("images");

  for (const file of images) {
    if (!file) continue;
    const fileName = `${slug}-${id++}.webp`;
    const filePath = path.join("public/images", fileName);
    const fileSmallPath = path.join("public/images", `small-${fileName}`);

    const arrayBuffer = await (file as File).arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    try {
      // Save the main image with max size 1000x1000 and convert to WebP
      await sharp(buffer)
        .resize(1000, 1000, { fit: "cover" })
        .webp({ quality: 95 })
        .toFile(filePath);

      // Save the small thumbnail (176x176)
      await sharp(buffer)
        .resize(176, 176)
        .webp({ quality: 80 })
        .toFile(fileSmallPath);
      console.log("Image processed:", filePath);
      product.images.push(filePath.replace("public", ""));
      product.thumbnails.push(fileSmallPath.replace("public", ""));
    } catch (error) {
      console.error("Error processing image:", error);
      return NextResponse.json(
        { message: "Error processing image" },
        { status: 500 }
      );
    }
  }

  try {
    await productModel.create({ ...product, id: 0 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Error creating product" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Product created" });
}
