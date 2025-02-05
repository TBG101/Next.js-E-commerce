
import React, { useEffect } from 'react'
import Product from './Product'

interface HomePageProductsSectionProps {
    title: string,
    data: any
}

function HomePageProductsSection({ title, data
}: HomePageProductsSectionProps) {
    if (!data || !data.products) {
        return <span></span>
    }

    return (
        <section className='flex flex-col w-full gap-10 justify-center items-center pt-10'>
            <div className='flex flex-row w-full gap-2 justify-center items-center'>
                <hr className='w-full ml-5' />
                <h2 className='text-2xl w-min text-nowrap mx-2 tracking-wider font-medium'>
                    {title}
                </h2>
                <hr className='w-full mr-5' />
            </div>

            <div className='flex flex-row gap-2 justify-center items-center px-5 flex-wrap lg:flex-nowrap '>
                {
                    data.products.length > 0 &&
                    data.products.map((product: any) => {
                        return (
                            <Product key={product._id} data={product} />
                        )
                    })
                }
            </div>

        </section>
    )
}

export default HomePageProductsSection