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
      <nav className="container mx-auto p-4 pt-6 md:p-6 lg:p">
        <Link to="/" prefetch="intent" className="text-2xl font-semibold">
          Moofies <span className="text-teal-500">DB</span>
        </Link>
        <ul className="flex justify-between"></ul>
      </nav>
      <main>{children}</main>
    </>
  );
}
