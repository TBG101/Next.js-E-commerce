import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect';
import productModel from '@/models/productModel';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    await dbConnect();
    try {
        const slug = (await params).slug;

        const productName = slug.replace(/_/g, " ").toLowerCase();
        const regEX = new RegExp(productName, 'i');
        const product = await productModel.findOne({
            name: {
                $regex: regEX
            }
        }).exec();


        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json(error)
    }

}