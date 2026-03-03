import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import DireccionamientoClient from "./DireccionamientoClient";

export default function DireccionamientoPage() {
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
                        <span className="text-deep-blue/70">Direccionamiento</span>
                    </div>

                    {/* Page header */}
                    <div className="flex flex-col items-center justify-center mb-12 text-center">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-[1px] w-12 bg-accent-blue/30" />
                            <span className="text-accent-blue text-sm font-bold tracking-[0.3em] uppercase">
                                Gestión de Avances
                            </span>
                            <div className="h-[1px] w-12 bg-accent-blue/30" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-deep-blue tracking-tight leading-tight mb-3">
                            Direccionamiento
                        </h1>
                        <p className="text-deep-blue/50 text-sm max-w-lg leading-relaxed">
                            Seguimiento y gestión de criterios de acreditación del macroproceso DIR.
                            Actualiza el estado de cada criterio y adjunta los documentos de evidencia correspondientes.
                        </p>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mb-10 p-4 rounded-2xl bg-white/60 border border-deep-blue/8">
                        <span className="text-xs font-bold text-deep-blue/40 uppercase tracking-wider mr-2">Puntaje:</span>
                        {[
                            { score: 0, label: "Nivel 0", color: "bg-slate-100 text-slate-600 ring-slate-300" },
                            { score: 1, label: "Nivel 1", color: "bg-blue-50 text-accent-blue ring-accent-blue/40" },
                            { score: 2, label: "Nivel 2", color: "bg-emerald-50 text-emerald-700 ring-emerald-300" },
                        ].map((l) => (
                            <span key={l.score} className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full ring-2 ${l.color}`}>
                                <span className="font-black">{l.score}</span> {l.label}
                            </span>
                        ))}
                        <div className="h-4 w-px bg-deep-blue/10 mx-1" />
                        <span className="text-xs text-deep-blue/40">
                            Clic en el estado para cambiarlo · Clic en <strong>Documentos</strong> para adjuntar evidencias
                        </span>
                    </div>

                    {/* Interactive client component */}
                    <DireccionamientoClient />

                </div>

                {/* Decorative background */}
                <div className="absolute top-1/2 right-0 hidden 2xl:block opacity-5 pointer-events-none -translate-y-1/2">
                    <span className="text-vertical text-9xl font-display font-black text-deep-blue tracking-widest">
                        DIR
                    </span>
                </div>
            </main>
            <Footer />
        </>
    );
}
