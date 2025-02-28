import localFont from "next/font/local";
import "./globals.css";
import NavBar from './components/Navbar';
import ThemeProvider from './components/ThemeProvidor';
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
       <WishlistProvider>
  <CartProvider>
    <ThemeProvider>
      <NavBar />
      {children}
    </ThemeProvider>
  </CartProvider>
</WishlistProvider>
      </body>
    </html>
  );
}
