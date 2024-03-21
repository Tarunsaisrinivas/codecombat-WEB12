import React from "react";
import "./globals.css";
import NavBar from "@/components/Navbar";

export const metadata = {
  title: "Code Combat",
  description: "Developed by ISTE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>
<body className="min-h-screen flex flex-col">
    <header className="h-16">
      <NavBar/>
    </header>
    <main className="flex-grow md:flex hidden">
      {children}
      </main>
      <div className="md:hidden">
        Please Open in Desktop
      </div>
</body>
    </html>
  );
}
