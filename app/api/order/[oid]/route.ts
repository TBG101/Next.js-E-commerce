import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils";
import { NextResponse } from "next/server";
import Order from "@/models/orderModel";

export async function GET(req: Request, context: { params: { oid: string } }) {
    const { oid } = context.params;

    await dbConnect()
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    let order = await Order.findById(oid).exec();

    if (!order)
        return NextResponse.json({ message: 'Order not found' }, { status: 404 });

    console.log(order.user);
    console.log(session.user.id);
    if (order.user.toString() != session.user.id.toString())
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });


    return NextResponse.json(order);
}