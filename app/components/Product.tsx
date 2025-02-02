import React, { useEffect } from 'react';
import { Image, Button, useDisclosure } from "@nextui-org/react";
import Link from 'next/link';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

interface ProductProps {

    data: {
        id: number;
        name: string;
        price: number;
        description: string;
        images: string[];
        thumbnails: string[];
    }

}

function Product(product: ProductProps | any) {
    const productLink = "/products/" + product.data.name.replaceAll(" ", "_").toLowerCase();
    const [isWhislisted, setIsWhislisted] = React.useState(false)



    useEffect(() => {
        const items = localStorage.getItem("whislist") ?? "[]"
        const whislist = JSON.parse(items)
        setIsWhislisted(whislist.includes(product.data.id))

    }, [])

    const toggleWhislist = () => {
        const items = localStorage.getItem("whislist") ?? "[]"
        const whislist = JSON.parse(items)
        if (isWhislisted) {
            const newWhislist = whislist.filter((id: number) => id !== product.data.id)
            setIsWhislisted(false)
            localStorage.setItem("whislist", JSON.stringify(newWhislist))
        } else {
            setIsWhislisted(true)
            const newWhislist = [...whislist, product.data.id]
            localStorage.setItem("whislist", JSON.stringify(newWhislist))
        }
    }


    return (

        <span>
            <div className='relative flex '>
                <button className=' absolute right-0 bg-transparent border-0 border-transparent z-20 cursor-pointer m-3 '
                    onClick={toggleWhislist}
                >
                    {isWhislisted ? < FaHeart className='text-2xl text-red-500' size={24} />
                        :
                        <FaRegHeart className='text-2xl text-neutral-800 ' size={24} />}
                </button>
            </div>
            <Link href={productLink} className='flex flex-col justify-center items-start cursor-pointer'>
                <div className='aspect-square max-h-96'>

                    <Image src={`/images/image-product-1.jpg`}
                        radius="none"
                        alt='failed'
                        isZoomed={true}
                        className="object-fill shadow-sm" />
                </div>
                <h3 className='text-sm text-neutral-800 font-light pt-1 pl-1'>
                    {product.data.name}
                </h3>
                <div className="text-sm text-neutral-800 font-semibold pl-1 ">
                    ${product.data.price}
                </div>
            </Link>
        </span>
    )
}

export default Product