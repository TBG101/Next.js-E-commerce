"use client";
import { getOrder } from '@/apiqueries/apiqueries';
import Loading from '@/app/components/Loading';
import { Order, OrderItem } from '@/lib/types';
import { Divider } from '@nextui-org/react';
import { stat } from 'fs';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

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

            if (status != 'authenticated') return;

            if (!oid) {
                setError('Order ID is required');
            }
            if (Array.isArray(oid)) {
                setError('Invalid Order ID');
            }

            try {
                let order = await getOrder(oid as string) as Order;
                setOrder(order);
                console.log(order);

            } catch (error: any) {
                setError(error.message);
            }
            setLoading(false);
        })();


    }, [status]);

    if (status === 'loading') return <Loading />;

    else
        if (status === 'authenticated')
            if (loading) return <Loading />;
            else
                return (
                    <section className='w-full flex-grow flex flex-col items-center justify-center p-6 bg-gray-50'>
                        <h1 className='text-3xl font-bold mb-6'>Order Tracker</h1>
                        {error && <p className='text-red-500 mb-4'>{error}</p>}
                        {order && (
                            <div className='w-full max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl'>
                                <h2 className='text-2xl font-bold mb-6 border-b pb-2'>Order Details</h2>
                                <div className='mb-8'>
                                    <p className='text-gray-700 mb-2'><span className='font-semibold'>Order ID:</span> {order._id}</p>
                                    <p className='text-gray-700 mb-2'><span className='font-semibold'>Order Date:</span> {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</p>
                                    <p className='text-gray-700 mb-2'><span className='font-semibold'>Payment Method:</span> {order.paymentMethod === 0 ? "Cash on delivery" : "Credit Card"}</p>
                                    <p className='text-gray-700 mb-2'><span className='font-semibold'>Payment Status:</span> {order.isPaid ? 'Paid' : 'Not Paid'}</p>
                                    <p className='text-gray-700 mb-2'><span className='font-semibold'>Delivery Status:</span> {order.isDelivered ? 'Delivered' : 'Not Delivered'}</p>

                                </div>
                                <h2 className='text-2xl font-bold mb-6 border-b pb-2'>Shipping Address</h2>
                                <div className='mb-8'>
                                    <p className='text-gray-700 mb-2'><span className='font-semibold'>Address:</span> {order.shippingAddress.address}</p>
                                    <p className='text-gray-700 mb-2'><span className='font-semibold'>City:</span> {order.shippingAddress.city}</p>
                                    <p className='text-gray-700 mb-2'><span className='font-semibold'>Postal Code:</span> {order.shippingAddress.postalCode}</p>
                                    <p className='text-gray-700 mb-2'><span className='font-semibold'>Country:</span> {order.shippingAddress.country}</p>
                                </div>
                                <h2 className='text-2xl font-bold mb-6 border-b pb-2'>Products</h2>
                                <ul className='space-y-4 px-2'>
                                    {order.orderItems.map((item: OrderItem) => (
                                        <><li key={item.name} className='flex justify-between items-center  rounded-md'>
                                            <div className='flex items-center space-x-4'>
                                                <Image src={"/" + item.image} alt={item.name} width={82} height={82} className='object-cover rounded-sm' />
                                                <div>
                                                    <p className='text-gray-800 font-semibold'>{item.name}</p>
                                                    <p className='text-gray-600'>Quantity: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p className='text-gray-800 font-semibold'>${item.price.toFixed(2)}</p>
                                        </li>
                                            <Divider />
                                        </>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>
                );

        else if (status === 'unauthenticated' || status === 'error') {
            router.push('/login');
            return <Loading />;
        }
    return <Loading />;
}

export default OrderTracker;
