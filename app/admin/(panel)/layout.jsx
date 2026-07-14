import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "sileo";
import { verifyToken } from "@/server/utils/jwt";
import SideBar from "@/components/admin/SideBar";

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();  
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  let user;

  try {
    user = await verifyToken(token);
  } catch {
    redirect("/admin/login");
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-900 text-gray-100">

      <Toaster
        position="top-right"
        theme="dark"
        options={{
          fill: "#030712",
          roundness: 12,
          styles: {
            title: "text-white!",
            description: "text-gray-400!",
            badge: "bg-white/10!",
            button: "bg-white/10! hover:bg-white/20!",
          },
        }}
      />

      <aside className="w-64 bg-green-800 hidden md:flex flex-col shadow-xl overflow-y-auto">
        <SideBar user={user} />
      </aside>

      <main className="flex flex-col flex-1 min-w-0">
        <div className="flex-1 overflow-x-auto overflow-y-auto">
          {children}
        </div>

        <footer className="p-4 bg-gray-900 border-t border-gray-700 text-center text-xs text-gray-500">
          &copy; 2026 404 NEWS
        </footer>
      </main>

    </div>
  );
}