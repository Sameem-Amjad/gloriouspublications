import Footer from "../components/Footer";
import HomeHeader from "../components/HomeHeader";

export default function ShopLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <HomeHeader />
      {process.env.NEXT_PUBLIC_DEMO_MODE === "true" ? (
        <p className="bg-amber-50 px-4 py-2 text-center text-xs text-amber-900">
          Demo store: the catalogue is sample public-domain classics, and no payment is taken.
        </p>
      ) : null}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
