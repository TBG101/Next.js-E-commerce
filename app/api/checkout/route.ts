import dbConnect from "@/lib/dbConnect"
import { NextResponse } from 'next/server';
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next"
import { CheckoutFields } from "@/lib/types";
import Order from "@/models/orderModel";
import Product from "@/models/productModel";
import mongoose from "mongoose";

export async function POST(req: Request, res: NextResponse) {
    await dbConnect()
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    try {
        const checkoutData = await req.json() as CheckoutFields;

        // Validate required fields
        if (!checkoutData.cartItems || !Array.isArray(checkoutData.cartItems) || checkoutData.cartItems.length === 0) {
            return NextResponse.json({ message: 'Cart items are required' }, { status: 400 });
        }
        if (!checkoutData.paymentMethod === undefined || checkoutData.paymentMethod === null) {
            return NextResponse.json({ message: 'Payment method is required' }, { status: 400 });
        }
        if (!checkoutData.name || !checkoutData.address || !checkoutData.city || !checkoutData.postalCode || !checkoutData.country) {
            return NextResponse.json({ message: 'Shipping address is incomplete' }, { status: 400 });
        }


        console.log(checkoutData);
        let items: { name: any; quantity: number; image: any; price: number; product: any; }[] = [];

        for (let item of checkoutData.cartItems) {
            if (!item.id || !item.quantity) {
                return NextResponse.json({ message: 'Invalid cart item' }, { status: 400 });
            }

            const product = await Product.findOne({ id: item.id }).exec();

            if (!product) {
                return NextResponse.json({ message: 'Product not found' }, { status: 404 });
            }

            if (!product) {
                return NextResponse.json({ message: 'Product not found' }, { status: 404 });
            }

            if (item.quantity <= 0) {
                continue;
            }

            if (!product.name || !product.price || !product.discount || !product.images || product.images.length === 0)
                return NextResponse.json({ message: 'Invalid product data' }, { status: 400 });


            if (!mongoose.Types.ObjectId.isValid(product.id)) {
                return NextResponse.json({ message: 'Invalid product ID' }, { status: 400 });
            }
            items.push({
                name: product.name,
                quantity: item.quantity,
                image: product.images[0],
                price: product.price * product.discount,
                product: await Product.findOne({ id: product.id }).exec(),
            });
        }

        if (items.length === 0) {
            return NextResponse.json({ message: 'No valid items in the cart' }, { status: 400 });
        }

        const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

        if (!mongoose.Types.ObjectId.isValid(session.user.id)) {
            return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
        }

        const order = new Order({
            user: session.user.id,
            paymentMethod: checkoutData.paymentMethod,
            shippingPrice: checkoutData.paymentMethod === 0 ? 0 : 7,
            shippingAddress: {
                fullName: checkoutData.name,
                address: checkoutData.address,
                city: checkoutData.city,
                postalCode: checkoutData.postalCode,
                country: checkoutData.country
            },
            orderItems: items,
            totalPrice: totalPrice,
            isPaid: false,
            paidAt: null,
            isDelivered: false,
            deliveredAt: null,
            confirmedAt: null
        });

        await order.save();


        return NextResponse.json({ message: 'Item created successfully', id: order._id }, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: 'An error occurred during checkout' }, { status: 500 });
    }
}

