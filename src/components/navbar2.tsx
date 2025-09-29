"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function Navbar2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  return (
    <nav className="sticky top-0 left-0 right-0 z-50">
      <div className="flex flex-wrap justify-center items-center mx-auto p-4 transition-all duration-700 ease-out backdrop-blur-xl w-full bg-primary text-accent shadow-sm "
      >
        {/* Logo */}
        {/* <Link
          href="https://flowbite.com"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Flowbite Logo"
            width={32}
            height={32}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap ">
            Flowbite
          </span>
        </Link> */}

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mega-menu-full-cta"
          aria-expanded={menuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Main menu */}
        <div
          id="mega-menu-full-cta"
          className={`${
            menuOpen ? "flex" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col mt-4 md:flex-row md:mt-0 md:space-x-8 md:justify-center">
            <li>
              <Link
                href="#"
                className="block py-2 px-3  border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Home
              </Link>
            </li>
            <li>
              <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="flex items-center justify-between w-full py-2 px-3  border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Company
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3  border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Marketplace
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3  border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Resources
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3  border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Dropdown (absolute overlay) */}
      {dropdownOpen && (
        <div
          id="mega-menu-full-cta-dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute left-0 w-full transition-all duration-700 ease-out backdrop-blur-xl shadow-md z-50 bg-primary text-accent"
        >
          <div className="grid max-w-screen-xl px-4 py-5 mx-auto text-sm  dark: md:grid-cols-3 md:px-6">
            {/* Column 1 */}
            <ul
              className="space-y-4 sm:mb-4 md:mb-0"
              aria-labelledby="mega-menu-full-cta-button"
            >
              <li>
                <Link
                  href="#"
                  className="hover:underline hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Online Stores
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Segmentation
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Marketing CRM
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Online Stores
                </Link>
              </li>
            </ul>

            {/* Column 2 */}
            <ul className="hidden mb-4 space-y-4 md:mb-0 sm:block">
              <li>
                <Link
                  href="#"
                  className="hover:underline hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Our Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline hover:text-blue-600 dark:hover:text-blue-500"
                >
                  License
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Resources
                </Link>
              </li>
            </ul>

            {/* Column 3 */}
            <div className="mt-4 md:mt-0">
              <h2 className="mb-2 font-semibold  ">
                Our brands
              </h2>
              <p className="mb-2  dark:text-gray-400">
                At Flowbite, we have a portfolio of brands that cater to a
                variety of preferences.
              </p>
              <Link
                href="#"
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-700"
              >
                Explore our brands
                <span className="sr-only">Explore our brands</span>
                <svg
                  className="w-3 h-3 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
