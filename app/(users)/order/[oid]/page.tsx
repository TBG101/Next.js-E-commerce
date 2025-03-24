"use client";
import { getOrder } from "@/apiqueries/apiqueries";
import Loading from "@/app/(users)/components/Loading";
import { Order, OrderItem } from "@/lib/types";
import { Divider } from "@nextui-org/react";
import { stat } from "fs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

function OrderTracker() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const param = useParams();
  const { oid } = param;
  const [error, setError] = React.useState("");
  const [order, setOrder] = React.useState<Order>();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    (async () => {
      if (!session) return;
      if (!session.user) return;

      if (status != "authenticated") return;

      if (!oid) {
        setError("Order ID is required");
      }
      if (Array.isArray(oid)) {
        setError("Invalid Order ID");
      }

      try {
        let order = (await getOrder(oid as string)) as Order;
        setOrder(order);
        console.log(order);
      } catch (error: any) {
        setError(error.message);
      }
      setLoading(false);
    })();
  }, [oid, session, status]);

  if (status === "loading") return <Loading />;
  else if (status === "authenticated")
    if (loading) return <Loading />;
    else
      return (
        <section className="flex w-full flex-grow flex-col items-center justify-center bg-gray-50 p-6">
          <h1 className="mb-6 text-3xl font-bold">Order Tracker</h1>
          {error && <p className="mb-4 text-red-500">{error}</p>}
          {order && (
            <div className="mx-auto w-full max-w-4xl rounded-xl bg-white p-8 shadow-lg">
              <h2 className="mb-6 border-b pb-2 text-2xl font-bold">
                Order Details
              </h2>
              <div className="mb-8">
                <p className="mb-2 text-gray-700">
                  <span className="font-semibold">Order ID:</span> {order._id}
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-semibold">Order Date:</span>{" "}
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-semibold">Payment Method:</span>{" "}
                  {order.paymentMethod === 0
                    ? "Cash on delivery"
                    : "Credit Card"}
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-semibold">Payment Status:</span>{" "}
                  {order.isPaid ? "Paid" : "Not Paid"}
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-semibold">Delivery Status:</span>{" "}
                  {order.isDelivered ? "Delivered" : "Not Delivered"}
                </p>
              </div>
              <h2 className="mb-6 border-b pb-2 text-2xl font-bold">
                Shipping Address
              </h2>
              <div className="mb-8">
                <p className="mb-2 text-gray-700">
                  <span className="font-semibold">Address:</span>{" "}
                  {order.shippingAddress.address}
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-semibold">City:</span>{" "}
                  {order.shippingAddress.city}
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-semibold">Postal Code:</span>{" "}
                  {order.shippingAddress.postalCode}
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-semibold">Country:</span>{" "}
                  {order.shippingAddress.country}
                </p>
              </div>
              <h2 className="mb-6 border-b pb-2 text-2xl font-bold">
                Products
              </h2>
              <ul className="space-y-4 px-2">
                {order.orderItems.map((item: OrderItem, index) => (
                  <li
                    className="flex items-center justify-between  rounded-md pb-2"
                    key={index}
                  >
                    <div className="flex items-center space-x-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={82}
                        height={82}
                        className="rounded-sm object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-800">
                      ${item.price.toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      );
  else if (status === "unauthenticated" || status === "error") {
    router.push("/login");
    return <Loading />;
  }
  return <Loading />;
}

export default OrderTracker;
