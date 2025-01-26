import React from 'react';
import { Image, Button, useDisclosure } from "@nextui-org/react";
import Link from 'next/link';



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
    return (
        <Link href={productLink} className='flex flex-col gap-1 justify-center items-start cursor-pointer'>
            <div className='aspect-square max-h-96'>
                <Image src={`/images/image-product-1.jpg`}
                    radius="none"
                    alt='failed'
                    isZoomed={true}
                    className="object-fill shadow-sm" />
            </div>
            <h3 className='text-small text-zinc-700'>
                {product.data.name}
            </h3>
            <div className="text-base text-black font-bold">
                ${product.data.price}
            </div>
        </Link>
    )
}

export default Product