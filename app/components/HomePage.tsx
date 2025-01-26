"use client";

import React, { useEffect } from 'react'
import { Image, Button } from "@nextui-org/react";
import HomePageProductsSection from './HomePageProductsSection';
import { getProducts } from '@/apiqueries/apiqueries';
import Loading from '../components/Loading';


function HomePage() {
    const [products, setProducts] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apidata = await getProducts({ maxProducts: 4 });
                console.log(apidata)
                setProducts(apidata);
            } catch (error) {
                console.error("Error:", error);
            }
            setLoading(false);
        };

        fetchData();
    }, [])

    if (loading) {
        return <div className='flex justify-center items-center h-full w-full'>
            <Loading />
        </div>
    }

    return (
        <div className='flex flex-col w-full h-full'>
            <hr />
            <Image src={`/screenshots/scrnshot1.png`}
                radius="none"
                alt='failed'
                className="object-fill shadow-sm"
            />
            <HomePageProductsSection title='New Arrivals' data={products} />
            <HomePageProductsSection title='Best Sellers' data={products} />
            <HomePageProductsSection title='Women' data={products} />
            <HomePageProductsSection title='Men' data={products} />
        </div >

    );
}

export default HomePage