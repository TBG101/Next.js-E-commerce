"use client";
import React, { useEffect } from "react";
import { CartContext } from "../providers";
import {
  Navbar as Nav,
  Image,
  Avatar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Input,
  Divider,
} from "@nextui-org/react";
import { useState, useContext } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import SearchInput from "./SearchInput";
import { useSession, signOut } from "next-auth/react";
import { FaRegCircleUser } from "react-icons/fa6";
import { CartItem } from "@/lib/types";

function Navbar() {
  const [activeItem, setActiveItem] = useState("");
  const { cart, addToCart, deleteFromCart } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = ["Men", "Women", "About", "Contact"];
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const activeMenuItem = menuItems.find((item) =>
      pathname
        .toLowerCase()
        .split("/")
        .some((path) => path.toLowerCase() === item.toLowerCase()),
    );
    console.log(activeMenuItem);
    if (activeMenuItem) {
      setActiveItem(activeMenuItem);
    } else setActiveItem("");
  }, [pathname]);

  return (
    <Nav
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      isBlurred={false}
      classNames={{
        base: ["h-[110px]", "md:h-[70px]", "border-b-1"],
        wrapper: ["w-full max-w-[1440px]"],
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[4px]",
          "data-[active=true]:after:bg-primary",
          "data-hover:after:content-['']",

          "data-[active=false]:after:opacity-0",
          "hover:after:absolute",
          "hover:after:bottom-0",
          "hover:after:left-0",
          "hover:after:right-0",
          "hover:after:h-[4px]",
          "hover:after:bg-primary",

          "hover:after:opacity-100",
          "after:transition-all",
          "after:duration-500",
          "after:ease-in-out",

          "transition-all",
          "duration-300",
          "ease-in-out",
        ],
        menuItem: [
          "flex",
          "relative",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[4px]",
          "data-[active=true]:after:bg-primary",
          "data-hover:after:content-['']",
          "hover:after:absolute",
          "hover:after:bottom-0",
          "hover:after:left-0",
          "hover:after:right-0",
          "hover:after:h-[4px]",
          "hover:after:bg-primary",
          "transition-all",
          "duration-300",
          "ease-in-out",
        ],
      }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
        <div className="flex h-full w-full flex-row">
          <NavbarContent justify="center" className="">
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className=" outline-none md:hidden "
              icon={(isOpen) =>
                !isOpen ? (
                  <svg
                    width="16"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 12v3H0v-3h16Zm0-6v3H0V6h16Zm0-6v3H0V0h16Z"
                      fill="#69707D"
                      fillRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    width="14"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
                      fill="#69707D"
                      fillRule="evenodd"
                    />
                  </svg>
                )
              }
            />
            <NavbarBrand className="">
              <Link
                href="/"
                className="flex h-full w-full items-center justify-center"
                onClick={() => {
                  setActiveItem("");
                }}
              >
                <Image src="/brand.png" alt="brand" width={130} />
              </Link>
            </NavbarBrand>
          </NavbarContent>
          <NavbarContent
            className="hidden items-center gap-4 px-9 font-bold md:flex"
            justify="center"
          >
            <NavbarItem isActive={activeItem === "Men"}>
              <Link color="foreground" href="/men">
                Men
              </Link>
            </NavbarItem>
            <NavbarItem isActive={activeItem === "Women"}>
              <Link color="foreground" href="/women">
                Women
              </Link>
            </NavbarItem>
            <NavbarItem isActive={activeItem === "About"}>
              <Link color="foreground" href="#">
                About
              </Link>
            </NavbarItem>
            <NavbarItem isActive={activeItem === "Contact"}>
              <Link color="foreground" href="#">
                Contact
              </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end" className="gap-5">
            <span className="hidden md:flex">
              <SearchInput />
            </span>

            <Dropdown>
              <DropdownTrigger>
                <div className="relative cursor-pointer">
                  <svg
                    width="22"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                      fill="#69707D"
                      fillRule="nonzero"
                    />
                  </svg>
                  {cart.length > 0 ? (
                    <div className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-neutral-white">
                      {cart.reduce(
                        (total: number, product: CartItem) =>
                          total + product.quantity,
                        0,
                      )}
                    </div>
                  ) : null}
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions " className="bg-none">
                {cart.map((item: CartItem) => (
                  <DropdownItem key={item._id} className="">
                    <div className="flex items-center justify-between gap-2 text-sm ">
                      <div className="flex flex-row items-center justify-center gap-2 ">
                        <div>
                          <Image
                            alt={`/${item.image}`}
                            width={50}
                            radius="md"
                            src={`/${item.image}`}
                          />
                        </div>
                        <div className="flex flex-col ">
                          <div className="text-neutral-dark-grayish-blue">
                            {item.name}
                          </div>
                          <div className="flex gap-1">
                            <div className="text-neutral-dark-grayish-blue">
                              ${item.price.toFixed(2)} x {item.quantity}
                            </div>
                            <div className="font-bold text-current">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button
                        onPress={() => deleteFromCart(item._id)}
                        className="w-15 min-w-0 bg-gray-900 hover:bg-red-500"
                        radius="sm"
                      >
                        <Image
                          radius="none"
                          width={15}
                          src="/images/icon-delete.svg"
                          alt="icon-delete"
                        />
                      </Button>
                    </div>
                  </DropdownItem>
                ))}
                {cart.length > 0 ? (
                  <DropdownItem key={"checkout"}>
                    <Button
                      className="w-full bg-primary-orange text-white"
                      onPress={() => {
                        router.push("/checkout");
                      }}
                    >
                      Checkout
                    </Button>
                  </DropdownItem>
                ) : (
                  []
                )}
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger>
                <div className="flex w-7 items-center justify-center transition-all duration-300 ease-in-out md:w-10">
                  <Avatar
                    as="button"
                    className="bg-transparent transition-transform"
                    name="Jason Hughes"
                    size="sm"
                    alt="image-avatar"
                    fallback={<FaRegCircleUser size={24} color="#69707D" />}
                  />
                </div>
              </DropdownTrigger>
              {session && session.user && status === "authenticated" && (
                <DropdownMenu className="bg-none" variant="light">
                  <DropdownItem key="welcome" className="gap-2 pb-2">
                    <p className="tracking-widest">
                      Welcome{" "}
                      <span className="font-medium">{session.user.name}</span>!
                    </p>
                  </DropdownItem>
                  <DropdownItem key="Settings" className="gap-2 pb-2">
                    <p className="tracking-widest">Settings</p>
                  </DropdownItem>
                  <DropdownItem key="logout" className="gap-2">
                    <p className="tracking-widest">
                      <Link
                        href={""}
                        onClick={() => {
                          signOut();
                        }}
                      >
                        Log out
                      </Link>
                    </p>
                  </DropdownItem>
                </DropdownMenu>
              )}
              {!session && (
                <DropdownMenu className="bg-none">
                  <DropdownItem key={"login"}>
                    <Link href={"/login"}>
                      <Button className="w-full bg-primary-orange text-white">
                        Login
                      </Button>
                    </Link>
                  </DropdownItem>
                  <DropdownItem key={"register"}>
                    <Link href="/register">
                      <Button className="w-full bg-primary-orange text-white">
                        Sign up
                      </Button>
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              )}
            </Dropdown>
            {/* <div className="hidden md:flex">

              <ThemeSwitcher />
            </div> */}
          </NavbarContent>
          <NavbarMenu className="w-2/3 border-1 font-bold shadow-lg ">
            <span className="pt-[40px]">
              {menuItems.map((item, index) => (
                <NavbarMenuItem
                  key={`${item}-${index}`}
                  isActive={false}
                  className="flex flex-grow-0"
                >
                  <Link
                    color={"foreground"}
                    className="w-full"
                    href={"/" + item.toLowerCase()}
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                  >
                    {item}
                  </Link>
                </NavbarMenuItem>
              ))}
            </span>
          </NavbarMenu>
        </div>
        <span className="flex w-full md:hidden">
          <SearchInput />
        </span>
      </div>
    </Nav>
  );
}

export default Navbar;
