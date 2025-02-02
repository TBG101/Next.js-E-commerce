import { NextRequest, NextResponse } from 'next/server'
import productModel from '@/models/productModel';
import dbConnect from '@/lib/dbConnect';

export async function GET(req: NextRequest, res: NextResponse) {
    await dbConnect();
    try {
        const searchParams = req.nextUrl.searchParams
        const search = searchParams.get('search');
        if (!search) return NextResponse.json({ message: 'Search query is required' });
        const regEX = new RegExp(search, 'i');
        const response = await productModel.find({
            name: {
                $regex: regEX
            }
        }).exec();

        return NextResponse.json({ response })
    } catch (error) {
        return NextResponse.json(error)
    }

}