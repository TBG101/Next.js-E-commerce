import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className=" container mx-auto mt-auto w-full pb-2 pt-10">
      <div className="m-4 rounded-lg border-1 border-neutral-500 border-opacity-25 bg-white shadow-sm dark:bg-gray-800">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-center p-4 text-neutral-800 sm:flex-row sm:items-center sm:justify-between md:flex">
          <span className="text-sm  dark:text-gray-400 sm:text-center">
            © 2023{" "}
            <Link href="https://sneakers.com/" className="hover:underline">
              Sneakers
            </Link>
            . All Rights Reserved.
          </span>
          <ul className="mt-3 flex flex-wrap items-center space-x-3 text-sm font-medium text-neutral-700 dark:text-gray-400 sm:mt-0 sm:space-x-0">
            <li>
              <Link
                href="#"
                className="me-4 hover:font-bold hover:underline md:me-6"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="me-4 hover:font-bold hover:underline md:me-6"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:font-bold hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
