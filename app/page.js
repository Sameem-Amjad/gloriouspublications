import BooksWithFilters from "./components/BooksWithFilters";

import Footer from "./components/Footer";
import HomeHeader from "./components/HomeHeader";
export default function Home() {
  return (
    <div className="flex-1 overflow-x-hidden">
      <HomeHeader />
      <BooksWithFilters />
      <Footer />
    </div>
  );
}
