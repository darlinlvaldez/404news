"use client";

import { usePathname } from "next/navigation"
import Link from "next/link"

import {
  LayoutDashboard,
  Newspaper,
  FolderTree,
  Users,
  ShieldCheck,
  Ticket,
  LogOut,
} from "lucide-react";

export default function SideBar({user}) {
    const pathname = usePathname()

    const handleLogout = async () => {
        await fetch("/api/admin/logout", {
            method: "POST"
        });
        
        window.location.href = "/admin/login";
    };

    const links = [
        {
            name: "Dashboard",
            href: "/admin/dashboard",
            icon: LayoutDashboard,
            roles: ["superadmin", "admin", "editor", "support", "author"],
        },
        {
            name: "Noticias",
            href: "/admin/news",
            icon: Newspaper,
            roles: ["superadmin", "admin", "editor"],
        },
        {
            name: "Categorías",
            href: "/admin/categories",
            icon: FolderTree,
            roles: ["superadmin", "admin"],
        },
        {
            name: "Autores",
            href: "/admin/authors",
            icon: Users,
            roles: ["superadmin", "admin", "editor"],
        },
        {
            name: "Administradores",
            href: "/admin/users",
            icon: ShieldCheck,
            roles: ["superadmin", "admin"],
        },
        {
            name: "Tickets",
            href:
            user.role === "author"
                ? "/admin/authors/tickets"
                : "/admin/tickets",
            icon: Ticket,
            roles: ["superadmin", "admin", "support", "author"],
        },
    ];

    const getLinkClasses = (path) => 
        `block p-3 rounded-lg transition ${ pathname === path
            ? "bg-green-900 font-semibold shadow-inner" : "hover:bg-green-700"}`


    const buttonLogaut = `w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-md 
    transition text-sm cursor-pointer flex items-center justify-center gap-2`
  
    return (
    <div className="bg-gray-900 text-gray-100 flex min-h-screen">
        <aside className="w-64 bg-green-800 hidden md:flex flex-col shadow-xl">
            <div className="p-6 border-b border-green-700">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
                        <img src="/images/notfoundimage.jpg" alt="Usuario" className="w-full h-full object-cover"/>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-white">
                            {user.name}
                        </span>
                        <span className="text-xs text-green-200">
                            {user.role}
                        </span>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2 text-green-100">
            {links
                .filter((link) => link.roles.includes(user.role))
                .map((link) => {
                const Icon = link.icon;

                return (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`${getLinkClasses(link.href)} flex items-center gap-3`}
                    >
                    <Icon size={18} />
                    <span>{link.name}</span>
                </Link>
                );
            })}
            </nav>

            <div className="p-4 border-t border-green-700">
                <button onClick={handleLogout} className={buttonLogaut}>
                    <LogOut size={18} /> Cerrar Sesión
                </button>
            </div>
        </aside>
    </div>
    )
}    