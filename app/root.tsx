import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import stylesheet from "~/tailwind.css?url";
import React, { ReactNode } from "react";
import { FaArrowRight } from "react-icons/fa6";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Sublayout>
          {children}
          <ScrollRestoration />
          <Scripts />
        </Sublayout>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

function Sublayout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav
        style={{ backgroundColor: "transparent", zIndex: 99 }}
        className="fixed top-0 right-0 left-0 z-9"
      >
        <div className="container mx-auto p-4 flex items-center justify-between">
          <Link
            to="/"
            prefetch="intent"
            className="text-2xl text-white font-semibold text-gray-800"
          >
            Ayu<span className="text-blue-500">k</span>
            <span className="text-yellow-500">Moofies</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-2 mx-4 ">
            <input
              type="text"
              placeholder="Search for movies..."
              className="w-full px-4 text-color-gray bg-black-500 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/signup"
              className="flex items-center justify-between bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Login
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </>
  );
}
