// src/app/layout.js
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";

import ClientWrapper from "./components/ClientWrapper";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "SFK Real Estate Consultancy",
  description: "SFK Real Estate Consultancy Official Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${manrope.variable}`}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
