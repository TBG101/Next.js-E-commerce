import { NextRequest, NextResponse } from 'next/server'
import productModel from '@/models/productModel';
import dbConnect from '@/lib/dbConnect';

export async function GET(req: NextRequest, res: NextResponse) {
    await dbConnect();
    try {
        const searchParams = req.nextUrl.searchParams

        const maxProducts = searchParams.get('maxProducts');


        const maxProductsNumber = maxProducts ? parseInt(maxProducts) : 20;

        let products = await productModel.find().limit(maxProductsNumber).exec();

        const sex = searchParams.get('sex');

        if (!sex)
            return NextResponse.json({ products });

        if (sex === "male") {
            products = products.filter((product) => {
                if (product.sex === "male" || product.sex === "unisex") return product;
            });
        } else {
            products = products.filter((product) => {
                if (product.sex === "female" || product.sex === "unisex") return product;
            });
        }

        const response = { products };
        return NextResponse.json(response)
    } catch (error) {
        return NextResponse.json(error)
    }

}