"use server";
import { authOptions } from "@/lib/authUtils";
import dbConnect from "@/lib/dbConnect";
import { Order, userType } from "@/lib/types";
import { OrderModel } from "@/models/orderModel";
import { userModel } from "@/models/userModel";
import { getServerSession } from "next-auth";

export async function fetchCustomers({ limit = 10 }: { limit?: number }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Not authenticated");
  }
  await dbConnect();

  const customers = await userModel.find().limit(limit).lean<userType[]>();
  const serializedCustomers: userType[] = customers.map((customer) => ({
    _id: customer._id.toString(),
    email: customer.email,
    name: customer.name,
    role: customer.role,
    createdAt: customer.createdAt,
  }));
  return serializedCustomers as userType[];
}

export async function fetchOrders({ limit = 10 }: { limit?: number }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Not authenticated");
  }
  await dbConnect();

  const orders = await OrderModel.find({}).limit(limit).lean<Order[]>();

  const serializedOrders: Order[] = orders.map((order) => {
    const returnOrder: Order = {
      _id: order._id.toString(),
      user: order.user?.toString(), // Serialize user field
      orderItems: order.orderItems.map((item) => {
        return {
          _id: item._id.toString(),
          name: item.name,
          quantity: item.quantity,
          image: item.image,
          price: item.price,
          product: item.product.toString(),
        };
      }), // Include orderItems
      shippingAddress: order.shippingAddress, // Include shippingAddress
      paymentMethod: order.paymentMethod, // Include paymentMethod
      shippingPrice: order.shippingPrice, // Include shippingPrice
      totalPrice: order.totalPrice, // Include totalPrice
      isPaid: order.isPaid, // Include isPaid
      isDelivered: order.isDelivered, // Include isDelivered
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      paidAt: order.paidAt,
      deliveredAt: order.deliveredAt,
      confirmedAt: order.confirmedAt,
    };
    return returnOrder;
  }) as Order[];
  console.log(serializedOrders);
  return serializedOrders;
}
