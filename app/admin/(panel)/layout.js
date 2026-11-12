import { redirect } from "next/navigation";

import SideNav from "@/app/components/Sidenav";
import { isAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin · Glorious Publications" };

export default function AdminLayout({ children }) {
  if (!isAdmin()) redirect("/admin/login");
  return (
    <div className="flex min-h-screen flex-col md:h-screen md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-4 sm:p-6 md:overflow-y-auto md:p-10">{children}</div>
    </div>
  );
}
