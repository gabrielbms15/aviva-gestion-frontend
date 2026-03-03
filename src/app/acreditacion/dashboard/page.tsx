import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import DashboardClient from "./DashboardClient";

export default function DashboardPage() {
    return (
        <>
            <Header />
            <main className="flex-grow py-20 lg:py-24 relative z-10">
                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-xs text-deep-blue/40 font-semibold mb-10 uppercase tracking-wider">
                        <Link href="/acreditacion" className="hover:text-accent-blue transition-colors">
                            Acreditación
                        </Link>
                        <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>chevron_right</span>
                        <span className="text-deep-blue/70">Dashboard</span>
                    </div>

                    {/* Page header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-[1px] w-8 bg-accent-blue/40" />
                                <span className="text-accent-blue text-sm font-bold tracking-[0.3em] uppercase">
                                    Monitor de Avance
                                </span>
                            </div>
                            <h1 className="text-4xl font-display font-extrabold text-deep-blue tracking-tight">
                                Dashboard de Acreditación
                            </h1>
                            <p className="text-deep-blue/50 text-sm mt-2 max-w-md">
                                22 macroprocesos · 67 estándares · 328 criterios · Meta 90%
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-black/40 bg-white/70 border border-deep-blue/8 rounded-xl px-4 py-2.5">
                            <span className="material-symbols-outlined text-amber-400" style={{ fontSize: "14px" }}>info</span>
                            Datos simulados — conecta a tu sistema para datos reales
                        </div>
                    </div>

                    <DashboardClient />

                </div>
            </main>
            <Footer />
        </>
    );
}
