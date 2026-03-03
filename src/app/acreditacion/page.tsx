import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import AcreditacionGrid from "./AcreditacionGrid";

export default function AcreditacionPage() {
    return (
        <>
            <Header />
            <main className="flex-grow py-20 lg:py-32 relative z-10">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-center mb-16 text-center">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-[1px] w-12 bg-accent-blue/30"></div>
                            <span className="text-accent-blue text-sm font-bold tracking-[0.3em] uppercase">
                                Procesos Institucionales
                            </span>
                            <div className="h-[1px] w-12 bg-accent-blue/30"></div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-deep-blue tracking-tight leading-tight mb-6">
                            Macroproceso
                        </h1>
                        <Link
                            href="/acreditacion/dashboard"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-deep-blue text-white text-sm font-bold hover:bg-brand-blue transition-colors shadow-sm"
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>dashboard</span>
                            Ver Dashboard de Avance
                        </Link>
                    </div>

                    <AcreditacionGrid />
                </div>

                {/* Decorative background element similar to home page */}
                <div className="absolute top-1/2 right-0 hidden 2xl:block opacity-5 pointer-events-none -translate-y-1/2">
                    <span className="text-vertical text-9xl font-display font-black text-deep-blue tracking-widest">
                        AVIVA
                    </span>
                </div>
            </main>
            <Footer />
        </>
    );
}
