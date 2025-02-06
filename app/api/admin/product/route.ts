import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import productModel from "@/models/productModel";
import { authOptions } from "@/lib/utils";
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
      { status: 400 },
    );
  }

  if (product.discount < 0 || product.discount > 100) {
    return NextResponse.json(
      { message: "Discount must be between 0 and 100" },
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

  return NextResponse.json({ message: "Product created" }, { status: 201 });
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
