import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import MacroprocesoManagementClient from "@/components/MacroprocesoManagementClient";
import { criteriosNyc, GRUPO_LABELS_NYC } from "./data";

export default function NutricionDieteticaPage() {
    return (
        <>
            <Header />
            <main className="flex-grow py-20 lg:py-28 relative z-10">
                <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-xs text-deep-blue/40 font-semibold mb-10 uppercase tracking-wider">
                        <Link href="/acreditacion" className="hover:text-accent-blue transition-colors">
                            Acreditación
                        </Link>
                        <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>chevron_right</span>
                        <span className="text-deep-blue/70">Nutrición y Dietética</span>
                    </div>

                    {/* Page header */}
                    <div className="flex flex-col items-center justify-center mb-12 text-center">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-[1px] w-12 bg-accent-blue/30" />
                            <span className="text-accent-blue text-base font-bold tracking-[0.3em] uppercase">
                                Macroproceso 20
                            </span>
                            <div className="h-[1px] w-12 bg-accent-blue/30" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-deep-blue tracking-tight leading-tight mb-3">
                            Nutrición y Dietética
                        </h1>
                        <p className="text-deep-blue/50 text-sm max-w-lg leading-relaxed">
                            Seguimiento y gestión de criterios del macroproceso NYC.
                            Expande cada criterio para gestionar requerimientos, documentos y estados.
                        </p>
                    </div>

                    <MacroprocesoManagementClient
                        criterios={criteriosNyc}
                        grupoLabels={GRUPO_LABELS_NYC}
                        lsStateKey="nyc_criteria_state"
                        lsLeaderKey="nyc_leader_info"
                    />

                </div>

                {/* Decorative background */}
                <div className="absolute top-1/2 right-0 hidden 2xl:block opacity-5 pointer-events-none -translate-y-1/2">
                    <span className="text-vertical text-9xl font-display font-black text-deep-blue tracking-widest">
                        NYC
                    </span>
                </div>
            </main>
            <Footer />
        </>
    );
}
