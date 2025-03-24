import { NextRequest, NextResponse } from 'next/server'
import Product from '@/models/productModel';
import dbConnect from '@/lib/dbConnect';

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const searchParams = req.nextUrl.searchParams
        const id = searchParams.get('id');
        if (!id)
            return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });


        const product = await Product.findById(id).exec();

        if (product) {
            return NextResponse.json({ product });
        } else {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
    }
}