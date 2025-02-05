import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextApiRequest } from "next";
import Product from "@/app/components/Product";

enum sex {
  "unisex",
  "male",
  "female",
}

interface productCreate {
  name: string;
  price: number;
  description: string;
  images: File[];
  sex: sex;
  discount: number;
}

export async function POST(req: NextApiRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    req.body as productCreate;
  } catch (error: any) {
    return NextResponse.json(
      { message: "Invalid request body", error },
      { status: 400 },
    );
  }

  const product: productCreate = req.body;

  if (
    !product.name ||
    !product.price ||
    !product.description ||
    !product.images
  ) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 },
    );
  }

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

  if (product.images.length < 1) {
    return NextResponse.json(
      { message: "At least one image is required" },
      { status: 400 },
    );
  }

  

  return NextResponse.json({ message: "Product created" });
}
