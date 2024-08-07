import { Inter } from "next/font/google";
import "@/app/globals.css";
import HomeHeader from "@/app/components/HomeHeader";
import Footer from "@/app/components/Footer";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HomeHeader/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
