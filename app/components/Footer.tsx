import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <footer className=" mt-auto ">
            <div className='bg-white rounded-lg shadow-sm m-4 dark:bg-gray-800 border-1 '>
                <div className="w-full mx-auto max-w-screen-xl p-4 flex flex-col items-center justify-center md:flex sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link href="https://flowbite.com/" className="hover:underline">Sneakers</Link>. All Rights Reserved.
                    </span>
                    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                        <li>
                            <Link href="#" className="hover:underline me-4 md:me-6">About</Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:underline">Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>


    )
}

export default Footer