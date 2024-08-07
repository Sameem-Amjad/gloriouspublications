import { Inter } from "next/font/google";
import "../globals.css";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
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
