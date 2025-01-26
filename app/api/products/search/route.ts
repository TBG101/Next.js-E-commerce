import { NextRequest, NextResponse } from 'next/server'
import data from '@/data.json'

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const searchParams = req.nextUrl.searchParams
        const search = searchParams.get('search');
        if (!search) return NextResponse.json({ message: 'Search query is required' });

        const response = data.products.filter((product: any) => product.name.toLowerCase().includes(search.toLowerCase()))
        return NextResponse.json({ response })
    } catch (error) {
        return NextResponse.json(error)
    }

}