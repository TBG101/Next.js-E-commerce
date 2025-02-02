import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <footer className=" mt-auto pt-10 pb-2">
            <div className='bg-white rounded-lg shadow-sm m-4 dark:bg-gray-800 border-1 border-neutral-500 border-opacity-25'>
                <div className="text-neutral-800 w-full mx-auto max-w-screen-xl p-4 flex flex-col items-center justify-center md:flex sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm  sm:text-center dark:text-gray-400">© 2023 {" "}
                        <Link href="https://sneakers.com/" className="hover:underline">Sneakers</Link>. All Rights Reserved.
                    </span>
                    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-neutral-700 dark:text-gray-400 sm:mt-0">
                        <li>
                            <Link href="#" className="hover:underline me-4 md:me-6 hover:font-bold">About</Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:underline me-4 md:me-6 hover:font-bold">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:underline hover:font-bold">Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>


    )
}

export default Footer