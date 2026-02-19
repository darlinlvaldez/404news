import SideBar from "../../components/SideBar";

export default function AdminLayout({ children }) {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-900 text-gray-100">

      <aside className="w-64 bg-green-800 hidden md:flex flex-col shadow-xl overflow-y-auto">
        <SideBar />
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        {children}

        <footer className="p-4 bg-gray-900 border-t border-gray-700 text-center text-xs text-gray-500">
          &copy; 2026 404 NEWS
        </footer>
      </main>

    </div>
  );
}
