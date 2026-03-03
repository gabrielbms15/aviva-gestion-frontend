"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === "/") return pathname === "/";
        return pathname.startsWith(path);
    };

    const navLinkClass = (path: string) => {
        const active = isActive(path);
        const base = "text-sm transition-colors duration-200";
        if (active) {
            return `${base} font-bold text-deep-blue relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-accent-blue`;
        }
        return `${base} font-semibold text-deep-blue/70 hover:text-deep-blue`;
    };

    return (
        <header className="w-full sticky top-0 z-50 transition-all duration-300 backdrop-blur-md bg-light-bg/90 border-b border-deep-blue/10">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/logo.webp"
                        alt="MedNetwork Logo"
                        width={400}
                        height={120}
                        className="h-38 w-auto object-contain"
                        priority
                    />
                </Link>
                <nav className="hidden md:flex items-center gap-12">
                    <Link className={navLinkClass("/")} href="/">
                        Gestión Documentaria
                    </Link>
                    <Link className={navLinkClass("/acreditacion")} href="/acreditacion">
                        Macroprocesos
                    </Link>
                    <Link className={navLinkClass("/locations")} href="#">
                        Locations
                    </Link>
                    <Link
                        className="px-8 py-3 rounded-none border border-deep-blue bg-transparent text-deep-blue text-sm font-bold hover:bg-deep-blue hover:text-white transition-all duration-300 uppercase tracking-wider shadow-sm"
                        href="#"
                    >
                        Contact Us
                    </Link>
                </nav>
            </div>
        </header>
    );
}
