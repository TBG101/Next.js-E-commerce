"use server";
import { authOptions } from "@/lib/authUtils";
import dbConnect from "@/lib/dbConnect";
import { orderModel, orderType } from "@/models/orderModel";
import { userModel, userType } from "@/models/userModel";
import { getServerSession } from "next-auth";

export async function fetchCustomers({ limit = 10 }: { limit?: number }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Not authenticated");
  }
  await dbConnect();

  const customers = await userModel.find().limit(limit).lean();
  const serializedCustomers = customers.map((customer) => ({
    ...customer,
    _id: customer._id.toString(),
  }));
  return serializedCustomers as userType[];
}

export async function fetchOrders({ limit = 10 }: { limit?: number }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Not authenticated");
  }
  await dbConnect();

  const orders = await orderModel.find().limit(limit).lean();
  const serializedOrders = orders.map((order) => ({
    ...order,
    _id: order._id.toString(),
  }));

  console.log("Orders", serializedOrders);
  return serializedOrders as orderType[];
}
