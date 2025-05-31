import dbConnect from "@/lib/dbConnect";
import productModel from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params;

    const product = await productModel.findById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch product" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params;

    const body = await request.json();
    const {
      name,
      description,
      price,
      stock,
      sex,
      discount,
      sizes,
      bestSellers,
      newArrivals,
      images,
    } = body;

    // Validation
    if (!name || !description || !sex) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, description, and gender are required",
        },
        { status: 400 },
      );
    }

    if (price <= 0) {
      return NextResponse.json(
        { success: false, message: "Price must be greater than zero" },
        { status: 400 },
      );
    }

    if (stock < 0) {
      return NextResponse.json(
        { success: false, message: "Stock cannot be negative" },
        { status: 400 },
      );
    }

    if (discount < 0 || discount > 100) {
      return NextResponse.json(
        { success: false, message: "Discount must be between 0 and 100" },
        { status: 400 },
      );
    }
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        stock,
        sex,
        discount: discount || 0,
        sizes: sizes || [],
        bestSellers: bestSellers || false,
        newArrivals: newArrivals || false,
        images: images || [],
        updatedAt: new Date(),
      },
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update product" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params;

    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete product" },
      { status: 500 },
    );
  }
}
