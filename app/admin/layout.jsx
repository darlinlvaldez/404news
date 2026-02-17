import SideBar from "../../components/page";

export default function AdminLayout({ children }) {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-900 text-gray-100">

      <aside className="w-64 bg-green-800 hidden md:flex flex-col shadow-xl overflow-y-auto">
        <SideBar />
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>

    </div>
  );
}
