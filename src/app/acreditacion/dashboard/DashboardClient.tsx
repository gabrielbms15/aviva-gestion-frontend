"use client";

import { useState, useEffect, useRef } from "react";

/* ── Data ───────────────────────────────────────────── */
type Macroproceso = {
    id: string;
    number: number;
    name: string;
    icon: string;
    criterios: number;
    // Simulated current progress (% of criterios done). Replace later with real data.
    progreso: number;
};

const MACROPROCESOS: Macroproceso[] = [
    { id: "DIR", number: 1, name: "Direccionamiento", icon: "settings_applications", criterios: 11, progreso: 64 },
    { id: "GRH", number: 2, name: "Gestión de Recursos Humanos", icon: "group", criterios: 11, progreso: 45 },
    { id: "GCA", number: 3, name: "Gestión de la Calidad", icon: "verified", criterios: 22, progreso: 50 },
    { id: "MRA", number: 4, name: "Manejo del Riesgo de la Atención", icon: "warning", criterios: 48, progreso: 29 },
    { id: "GSD", number: 5, name: "Gestión de Seguridad ante Desastres", icon: "emergency", criterios: 20, progreso: 35 },
    { id: "CGP", number: 6, name: "Control de la Gestión y Prestación", icon: "analytics", criterios: 15, progreso: 60 },
    { id: "ATA", number: 7, name: "Atención Ambulatoria", icon: "medical_services", criterios: 17, progreso: 53 },
    { id: "AEX", number: 8, name: "Atención Extramural", icon: "local_hospital", criterios: 13, progreso: 23 },
    { id: "ATH", number: 9, name: "Atención de Hospitalización", icon: "bed", criterios: 23, progreso: 39 },
    { id: "EMG", number: 10, name: "Atención de Emergencia", icon: "hail", criterios: 14, progreso: 71 },
    { id: "ATQ", number: 11, name: "Atención Quirúrgica", icon: "masks", criterios: 25, progreso: 44 },
    { id: "DIV", number: 12, name: "Docencia e Investigación", icon: "school", criterios: 15, progreso: 20 },
    { id: "ADT", number: 13, name: "Atención de Apoyo Diagnóstico y Tratamiento", icon: "biotech", criterios: 11, progreso: 55 },
    { id: "ADA", number: 14, name: "Admisión y Alta", icon: "login", criterios: 16, progreso: 75 },
    { id: "RCR", number: 15, name: "Referencia y Contrarreferencia", icon: "sync_alt", criterios: 13, progreso: 31 },
    { id: "GMD", number: 16, name: "Gestión de Medicamentos", icon: "medication", criterios: 15, progreso: 47 },
    { id: "GIF", number: 17, name: "Gestión de la Información", icon: "info", criterios: 14, progreso: 57 },
    { id: "DLDE", number: 18, name: "Decontaminación, Limpieza, Desinfección y Esterilización", icon: "clean_hands", criterios: 17, progreso: 41 },
    { id: "MRS", number: 19, name: "Manejo de Riesgo Social", icon: "diversity_3", criterios: 6, progreso: 67 },
    { id: "NYD", number: 20, name: "Nutrición y Dietética", icon: "restaurant", criterios: 10, progreso: 30 },
    { id: "GIM", number: 21, name: "Gestión de Insumos y Materiales", icon: "inventory_2", criterios: 8, progreso: 25 },
    { id: "EIF", number: 22, name: "Gestión de Equipos e Infraestructura", icon: "construction", criterios: 12, progreso: 33 },
];

const TOTAL_CRITERIOS = 328;
const TOTAL_ESTANDARES = 67;
const TOTAL_MACROPROCESOS = 22;
const META_PCT = 0.9; // 90%

/* ── Progreso por Líder — datos ──────────────────────── */
type LiderRow = {
    mpId: string;
    lider: string;
    exigidos: number;
    recibidos: number;
    deadline: string; // YYYY-MM-DD
};

const LIDERES_DATA: LiderRow[] = [
    { mpId: "DIR", lider: "Dra. Carmen Rios", exigidos: 28, recibidos: 18, deadline: "2026-04-15" },
    { mpId: "GRH", lider: "Lic. Jorge Vega", exigidos: 22, recibidos: 10, deadline: "2026-03-20" },
    { mpId: "GCA", lider: "Paula Ponce de León", exigidos: 6, recibidos: 3, deadline: "2026-03-30" },
    { mpId: "MRA", lider: "Lic. Ana Flores", exigidos: 50, recibidos: 14, deadline: "2026-03-08" },
    { mpId: "GSD", lider: "Dr. Miguel Torres", exigidos: 30, recibidos: 11, deadline: "2026-03-12" },
    { mpId: "CGP", lider: "Lic. Patricia Mendez", exigidos: 24, recibidos: 15, deadline: "2026-04-02" },
    { mpId: "ATA", lider: "Dra. Silvia Castro", exigidos: 27, recibidos: 14, deadline: "2026-03-28" },
    { mpId: "AEX", lider: "Dr. Roberto Hurtado", exigidos: 18, recibidos: 4, deadline: "2026-03-07" },
    { mpId: "ATH", lider: "Lic. Karina Salas", exigidos: 32, recibidos: 13, deadline: "2026-03-18" },
    { mpId: "EMG", lider: "Dra. Monica Alva", exigidos: 22, recibidos: 16, deadline: "2026-04-10" },
    { mpId: "ATQ", lider: "Dr. Fernando Ruiz", exigidos: 40, recibidos: 18, deadline: "2026-03-25" },
    { mpId: "DIV", lider: "Lic. Claudia Nunez", exigidos: 20, recibidos: 4, deadline: "2026-03-06" },
    { mpId: "ADT", lider: "Dr. Cesar Moran", exigidos: 25, recibidos: 14, deadline: "2026-04-05" },
    { mpId: "ADA", lider: "Yovana Kina", exigidos: 4, recibidos: 0, deadline: "2026-03-25" },
    { mpId: "RCR", lider: "Dr. Pablo Suarez", exigidos: 20, recibidos: 6, deadline: "2026-03-10" },
    { mpId: "GMD", lider: "Lic. Isabel Chavez", exigidos: 28, recibidos: 13, deadline: "2026-03-27" },
    { mpId: "GIF", lider: "Dr. Andres Pena", exigidos: 24, recibidos: 14, deadline: "2026-04-08" },
    { mpId: "DLDE", lider: "Fiorella Chavez", exigidos: 6, recibidos: 1, deadline: "2026-03-25" },
    { mpId: "MRS", lider: "Dra. Elena Reyes", exigidos: 16, recibidos: 11, deadline: "2026-03-20" },
    { mpId: "NYD", lider: "Isel Zavala", exigidos: 4, recibidos: 0, deadline: "2026-03-26" },
    { mpId: "GIM", lider: "Pedro Ipanaque", exigidos: 5, recibidos: 1, deadline: "2026-03-30" },
    { mpId: "EIF", lider: "Carlos Grillo", exigidos: 4, recibidos: 0, deadline: "2026-03-24" },
];

const TODAY = new Date("2026-03-04");
function daysUntil(dateStr: string): number {
    const d = new Date(dateStr);
    return Math.round((d.getTime() - TODAY.getTime()) / 86400000);
}

function Semaforo({ faltantes, days }: { faltantes: number; days: number }) {
    let color = "bg-emerald-500", glow = "shadow-[0_0_8px_rgba(16,185,129,0.6)]";
    let label = "En tiempo";
    if (faltantes > 0) {
        if (days < 5) { color = "bg-red-500"; glow = "shadow-[0_0_8px_rgba(239,68,68,0.6)]"; label = "Urgente"; }
        else if (days <= 10) { color = "bg-amber-400"; glow = "shadow-[0_0_8px_rgba(251,191,36,0.6)]"; label = "Atención"; }
    }
    return <span className={`w-2.5 h-2.5 rounded-full ${color} ${glow} flex-shrink-0`} title={label} />;
}

/* ── Fechas data (6 specific macroprocesos) ────────────── */
type FechaRow = {
    mpId: string;
    lider: string;
    fechaAsignacion: string;
    fechaSeguimiento: string | null; // null = "No asignado"
    fechaEntrega: string;
    documentos: string;
};

const FECHAS_DATA: FechaRow[] = [
    { mpId: "GCA", lider: "Paula Ponce de León", fechaAsignacion: "2026-02-10", fechaSeguimiento: null, fechaEntrega: "2026-03-30", documentos: "6 / 3" },
    { mpId: "ADA", lider: "Yovana Kina", fechaAsignacion: "2026-02-25", fechaSeguimiento: null, fechaEntrega: "2026-03-25", documentos: "4 / 0" },
    { mpId: "DLDE", lider: "Fiorella Chavez", fechaAsignacion: "2026-02-25", fechaSeguimiento: null, fechaEntrega: "2026-03-25", documentos: "6 / 1" },
    { mpId: "NYD", lider: "Isel Zavala", fechaAsignacion: "2026-02-25", fechaSeguimiento: null, fechaEntrega: "2026-03-26", documentos: "4 / 0" },
    { mpId: "GIM", lider: "Pedro Ipanaque", fechaAsignacion: "2026-01-26", fechaSeguimiento: null, fechaEntrega: "2026-03-30", documentos: "5 / 1" },
    { mpId: "EIF", lider: "Carlos Grillo", fechaAsignacion: "2026-02-24", fechaSeguimiento: null, fechaEntrega: "2026-03-24", documentos: "4 / 0" },
];

const FECHAS_IDS = new Set(FECHAS_DATA.map(f => f.mpId));

function ProgresoLiderTable({ cardClass, glassMode }: { cardClass: string; glassMode: boolean }) {
    const allIds = MACROPROCESOS.map(mp => mp.id);
    const fechasIds = Array.from(FECHAS_IDS);
    const [liderView, setLiderView] = useState<"progreso" | "fechas">("progreso");
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(allIds));
    const [dropOpen, setDropOpen] = useState(false);
    const dropRef = useRef<HTMLDivElement>(null);
    const tm = glassMode ? "text-black" : "text-black/50";
    const ts = glassMode ? "text-black" : "text-black/35";

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const toggleOne = (id: string) => setSelectedIds(prev => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id); else next.add(id);
        return next;
    });
    const selectAll = () => setSelectedIds(new Set(allIds));
    const selectNone = () => setSelectedIds(new Set());
    const progresoRows = MACROPROCESOS.map((mp, i) => {
        const ld = LIDERES_DATA[i];
        const faltantes = ld.exigidos - ld.recibidos;
        const pct = Math.round((ld.recibidos / ld.exigidos) * 100);
        const days = daysUntil(ld.deadline);
        return { mp, ld, faltantes, pct, days };
    }).filter(({ mp }) => selectedIds.has(mp.id));

    // For Fechas view: filter by selectedIds too (scoped to FECHAS_IDS)
    const fechasRows = FECHAS_DATA
        .map(fd => ({ fd, mp: MACROPROCESOS.find(m => m.id === fd.mpId)! }))
        .filter(({ mp }) => selectedIds.has(mp.id));

    return (
        <div className={`${cardClass} mt-6`}>
            {/* Header */}
            <div className="px-5 pt-5 pb-3 border-b border-deep-blue/5 flex items-center justify-between gap-4">
                <div>
                    <h2 className="font-display font-bold text-deep-blue text-base flex items-center gap-2">
                        <span className="material-symbols-outlined text-accent-blue" style={{ fontSize: "18px" }}>manage_accounts</span>
                        Progreso por Líder
                    </h2>
                    <p className={`text-xs ${ts} mt-0.5`}>Seguimiento documental por responsable de macroproceso</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Progreso | Fechas toggle */}
                    <div className="flex items-center gap-1 bg-black/5 rounded-xl p-1">
                        <button
                            onClick={() => setLiderView("progreso")}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${liderView === "progreso" ? "bg-white text-deep-blue shadow-sm" : "text-black/40 hover:text-black/60"
                                }`}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: "13px" }}>bar_chart</span>
                            Progreso
                        </button>
                        <button
                            onClick={() => setLiderView("fechas")}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${liderView === "fechas" ? "bg-white text-deep-blue shadow-sm" : "text-black/40 hover:text-black/60"
                                }`}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: "13px" }}>calendar_month</span>
                            Fechas
                        </button>
                    </div>
                    {/* Excel-style filter dropdown */}
                    <div className="relative" ref={dropRef}>
                        <button
                            onClick={() => setDropOpen(v => !v)}
                            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold border rounded-lg transition-all ${dropOpen ? "bg-deep-blue text-white border-deep-blue" : "border-deep-blue/15 text-deep-blue/70 hover:border-accent-blue/50 bg-white/70"
                                }`}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: "15px" }}>filter_list</span>
                            Filtrar
                            {selectedIds.size < allIds.length && (
                                <span className="bg-accent-blue text-white rounded-full px-1.5 py-0.5 text-[9px] font-black">{selectedIds.size}</span>
                            )}
                            <span className="material-symbols-outlined" style={{ fontSize: "13px" }}>
                                {dropOpen ? "expand_less" : "expand_more"}
                            </span>
                        </button>

                        {dropOpen && (
                            <div className="absolute right-0 top-full mt-1 z-50 bg-white border border-deep-blue/10 rounded-xl shadow-xl w-64 py-1 max-h-80 overflow-y-auto custom-scrollbar">
                                {/* Seleccionar Todo */}
                                <button
                                    onClick={selectAll}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-deep-blue hover:bg-deep-blue/5 transition-colors"
                                >
                                    <span className={`w-3.5 h-3.5 rounded border-2 flex items-center justify-center flex-shrink-0 ${selectedIds.size === (liderView === "progreso" ? allIds.length : fechasIds.length) ? "bg-accent-blue border-accent-blue" : "border-black/20"
                                        }`}>
                                        {selectedIds.size === (liderView === "progreso" ? allIds.length : fechasIds.length) && <span className="material-symbols-outlined text-white" style={{ fontSize: "10px" }}>check</span>}
                                    </span>
                                    Seleccionar Todo
                                </button>
                                {/* Ninguno */}
                                <button
                                    onClick={selectNone}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-black/40 hover:bg-black/4 transition-colors border-b border-deep-blue/5"
                                >
                                    <span className="w-3.5 h-3.5 rounded border-2 border-black/20 flex-shrink-0" />
                                    (Ninguno)
                                </button>
                                {/* Individual macroprocesos (scoped to current view) */}
                                {(liderView === "progreso" ? MACROPROCESOS : MACROPROCESOS.filter(m => FECHAS_IDS.has(m.id))).map(mp => (
                                    <button
                                        key={mp.id}
                                        onClick={() => toggleOne(mp.id)}
                                        className="w-full flex items-center gap-2.5 px-4 py-1.5 text-xs hover:bg-deep-blue/4 transition-colors text-left"
                                    >
                                        <span className={`w-3.5 h-3.5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${selectedIds.has(mp.id) ? "bg-accent-blue border-accent-blue" : "border-black/20"
                                            }`}>
                                            {selectedIds.has(mp.id) && <span className="material-symbols-outlined text-white" style={{ fontSize: "10px" }}>check</span>}
                                        </span>
                                        <span className="text-black/30 font-bold w-5 flex-shrink-0">{mp.number}.</span>
                                        <span className="text-black/70 truncate">{mp.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Table — Progreso view */}
            {liderView === "progreso" ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="border-b border-deep-blue/5">
                                {["#", "Macroproceso", "Líder", "Exigidos", "Recibidos", "Faltantes", "Avance", "Deadline", "Días", ""].map(h => (
                                    <th key={h} className={`px-4 py-2.5 text-left font-bold uppercase tracking-wider text-[10px] ${tm} whitespace-nowrap`}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {progresoRows.map(({ mp, ld, faltantes, pct, days }) => (
                                <tr key={mp.id} className="border-b border-deep-blue/4 hover:bg-deep-blue/2 transition-colors">
                                    {/* # */}
                                    <td className={`px-4 py-3 font-bold ${tm}`}>{mp.number}.</td>
                                    {/* Macroproceso */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-accent-blue/60" style={{ fontSize: "14px" }}>{mp.icon}</span>
                                            <span className="font-semibold text-deep-blue truncate max-w-[180px]" title={mp.name}>{mp.name}</span>
                                        </div>
                                    </td>
                                    {/* Líder */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-5 h-5 rounded-full bg-accent-blue/10 flex items-center justify-center text-[9px] font-bold text-accent-blue flex-shrink-0">
                                                {ld.lider.split(" ").slice(-1)[0][0]}{ld.lider.split(" ").slice(-2)[0][0]}
                                            </span>
                                            <span className={`${ts} whitespace-nowrap`}>{ld.lider}</span>
                                        </div>
                                    </td>
                                    {/* Exigidos */}
                                    <td className="px-4 py-3 text-center font-mono font-bold text-deep-blue">{ld.exigidos}</td>
                                    {/* Recibidos */}
                                    <td className="px-4 py-3 text-center font-mono font-bold text-emerald-600">{ld.recibidos}</td>
                                    {/* Faltantes */}
                                    <td className="px-4 py-3 text-center">
                                        {faltantes > 0
                                            ? <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-red-50 text-red-600 font-bold">
                                                -{faltantes}
                                            </span>
                                            : <span className="inline-flex items-center gap-0.5 text-emerald-600 font-bold">
                                                <span className="material-symbols-outlined" style={{ fontSize: "13px" }}>check_circle</span>
                                            </span>
                                        }
                                    </td>
                                    {/* Avance */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2 min-w-[90px]">
                                            <div className="flex-1 h-1.5 bg-black/6 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all ${pct >= 90 ? "bg-emerald-500" : pct >= 60 ? "bg-amber-400" : pct >= 30 ? "bg-orange-400" : "bg-red-400"
                                                        }`}
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                            <span className={`font-bold whitespace-nowrap ${pct >= 90 ? "text-emerald-600" : pct >= 60 ? "text-amber-600" : pct >= 30 ? "text-orange-500" : "text-red-500"}`}>
                                                {pct}%
                                            </span>
                                        </div>
                                    </td>
                                    {/* Deadline */}
                                    <td className={`px-4 py-3 whitespace-nowrap font-mono ${ts}`}>
                                        {new Date(ld.deadline).toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" })}
                                    </td>
                                    {/* Días */}
                                    <td className="px-4 py-3 text-center">
                                        <span className={`font-bold ${days < 0 ? "text-red-600" : days < 5 ? "text-red-500" : days <= 10 ? "text-amber-500" : "text-emerald-600"
                                            }`}>
                                            {days < 0 ? `Vencido` : `${days}d`}
                                        </span>
                                    </td>
                                    {/* Semáforo */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-center">
                                            <Semaforo faltantes={faltantes} days={days} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {progresoRows.length === 0 && (
                        <div className="py-10 text-center">
                            <span className={`text-sm ${tm}`}>Sin macroprocesos seleccionados</span>
                        </div>
                    )}
                </div>
            ) : (
                /* —— Fechas view —— */
                <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="border-b border-deep-blue/5">
                                {["#", "Macroproceso", "Líder", "Fecha Asignación", "Fecha Seguimiento", "Fecha Entrega", "Documentos"].map(h => (
                                    <th key={h} className={`px-4 py-2.5 text-left font-bold uppercase tracking-wider text-[10px] ${tm} whitespace-nowrap`}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {fechasRows.map(({ fd, mp }) => (
                                <tr key={mp.id} className="border-b border-deep-blue/4 hover:bg-deep-blue/2 transition-colors">
                                    <td className={`px-4 py-3 font-bold ${tm}`}>{mp.number}.</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-accent-blue/60" style={{ fontSize: "14px" }}>{mp.icon}</span>
                                            <span className="font-semibold text-deep-blue truncate max-w-[180px]" title={mp.name}>{mp.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-5 h-5 rounded-full bg-accent-blue/10 flex items-center justify-center text-[9px] font-bold text-accent-blue flex-shrink-0">
                                                {fd.lider.split(" ").pop()![0]}{fd.lider.split(" ").slice(-2)[0][0]}
                                            </span>
                                            <span className={`${ts} whitespace-nowrap`}>{fd.lider}</span>
                                        </div>
                                    </td>
                                    <td className={`px-4 py-3 whitespace-nowrap font-mono text-deep-blue font-semibold`}>
                                        {new Date(fd.fechaAsignacion).toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" })}
                                    </td>
                                    <td className="px-4 py-3">
                                        {fd.fechaSeguimiento
                                            ? <span className="font-mono text-deep-blue">{new Date(fd.fechaSeguimiento).toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" })}</span>
                                            : <span className={`italic ${ts}`}>No asignado</span>
                                        }
                                    </td>
                                    <td className={`px-4 py-3 whitespace-nowrap font-mono`}>
                                        <span className={`font-bold ${daysUntil(fd.fechaEntrega) < 5 ? "text-red-500" : daysUntil(fd.fechaEntrega) <= 10 ? "text-amber-500" : "text-emerald-600"
                                            }`}>
                                            {new Date(fd.fechaEntrega).toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" })}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold bg-deep-blue/5 ${ts}`}>{fd.documentos}</span>
                                    </td>
                                </tr>
                            ))}
                            {fechasRows.length === 0 && (
                                <tr><td colSpan={7} className="py-10 text-center">
                                    <span className={`text-sm ${tm}`}>Sin macroprocesos seleccionados</span>
                                </td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Footer legend */}
            <div className={`px-5 py-3 border-t border-deep-blue/5 flex items-center gap-5 text-[10px] ${ts}`}>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" />En tiempo o completo</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" />5–10 días restantes</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" />Urgente (&lt;5 días con faltantes)</span>
            </div>
        </div>
    );
}

function getProgressColor(pct: number): { bar: string; text: string } {
    if (pct >= 90) return { bar: "bg-emerald-500", text: "text-emerald-600" };
    if (pct >= 60) return { bar: "bg-amber-400", text: "text-amber-600" };
    if (pct >= 30) return { bar: "bg-orange-400", text: "text-orange-600" };
    return { bar: "bg-red-400", text: "text-red-500" };
}

/* ── Pie Chart ──────────────────────────────────────── */
type PieSlice = { label: string; value: number; color: string };

function PieChart({ slices, meta }: { slices: PieSlice[]; meta: number }) {
    const r = 36;
    const cx = 44;
    const cy = 44;
    const circ = 2 * Math.PI * r;
    const total = slices.reduce((s, sl) => s + sl.value, 0);
    let offset = 0;
    const segments = slices.map((sl) => {
        const len = (sl.value / total) * circ;
        const seg = { ...sl, dasharray: `${len} ${circ - len}`, dashoffset: -offset };
        offset += len;
        return seg;
    });
    return (
        <div className="flex items-center gap-3">
            <svg width={88} height={88} viewBox="0 0 88 88" className="flex-shrink-0">
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth={14} />
                {segments.map((seg, i) => (
                    <circle key={i} cx={cx} cy={cy} r={r} fill="none" strokeWidth={14}
                        stroke={seg.color}
                        strokeDasharray={seg.dasharray}
                        strokeDashoffset={seg.dashoffset}
                        style={{ transform: "rotate(-90deg)", transformOrigin: `${cx}px ${cy}px` }}
                    />
                ))}
                {/* Center label */}
                <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle"
                    fontSize={20} fontWeight={800} fill="#004b73" fontFamily="inherit">
                    {meta}
                </text>
            </svg>
            <div className="flex flex-col gap-1.5">
                {slices.map((sl) => (
                    <div key={sl.label} className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: sl.color }} />
                        <span className="text-[10px] text-black/55 font-medium leading-none">{sl.label}</span>
                        <span className="text-[10px] font-bold text-black/70 ml-auto pl-2">{sl.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── KPI Card ───────────────────────────────────────── */
function KpiCard({
    icon, label, value, meta, unit = "", sublabel, pieSlices, metaLabel = "Meta (90%)", className = "", glassMode = false,
}: {
    icon: string; label: string; value: number; meta: number;
    unit?: string; sublabel?: string; pieSlices?: PieSlice[]; metaLabel?: string; className?: string; glassMode?: boolean;
}) {
    const [showPie, setShowPie] = useState(false);
    const pct = Math.round((value / meta) * 100);
    const { bar, text } = getProgressColor(pct);
    const tm = glassMode ? "text-black" : "text-black/40";
    const ts = glassMode ? "text-black" : "text-black/30";
    return (
        <div className={`${className || "rounded-2xl bg-white border border-deep-blue/10 shadow-sm"} p-5 flex flex-col gap-3`}>
            {/* Header row */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-accent-blue" style={{ fontSize: "20px" }}>{icon}</span>
                    <span className="text-xs font-bold text-black/50 uppercase tracking-wider">{label}</span>
                </div>
                {/* Toggle switch — only shown if pieSlices provided */}
                {pieSlices && (
                    <button
                        onClick={() => setShowPie(v => !v)}
                        title={showPie ? "Ver progreso" : "Ver distribución"}
                        className={`relative w-9 h-5 rounded-full transition-colors duration-200 flex-shrink-0 ${showPie ? "bg-accent-blue" : "bg-black/15"
                            }`}
                    >
                        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${showPie ? "translate-x-0" : "translate-x-4"
                            }`} />
                    </button>
                )}
            </div>

            {/* Body */}
            {showPie && pieSlices ? (
                <PieChart slices={pieSlices} meta={meta} />
            ) : (
                <>
                    <div className="flex items-end justify-between">
                        <div>
                            <span className="text-4xl font-display font-black text-deep-blue">{value}</span>
                            <span className={`text-sm font-semibold ${tm} ml-1`}>{unit}</span>
                        </div>
                        <div className="text-right">
                            <p className={`text-xs ${tm}`}>{metaLabel}</p>
                            <p className="text-lg font-bold text-deep-blue/60">{meta}</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <span className={`text-xs ${tm}`}>Progreso hacia meta</span>
                            <span className={`text-xs font-bold ${text}`}>{pct}%</span>
                        </div>
                        <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-500 ${bar}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                        </div>
                    </div>
                    {sublabel && <p className={`text-xs ${ts}`}>{sublabel}</p>}
                </>
            )}
        </div>
    );
}

/* ── Overall Ring ─────────────────────────────────── */
function OverallRing({ pct, glassMode, cardClass }: { pct: number; glassMode: boolean; cardClass: string }) {
    const r = 56;
    const circ = 2 * Math.PI * r;
    const filled = (pct / 100) * circ;
    const metaFilled = (META_PCT * 100 / 100) * circ;
    const { text } = getProgressColor(pct);
    const tm = glassMode ? "text-black" : "text-black/50";
    const tf = glassMode ? "text-black" : "text-black/30";
    const tg = glassMode ? "text-black" : "text-black/40";

    return (
        <div className={`${cardClass} p-5 flex flex-col items-center justify-center gap-3`}>
            <span className={`text-xs font-bold ${tm} uppercase tracking-wider`}>Progreso General</span>
            <div className="relative w-36 h-36">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
                    {/* Track */}
                    <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(0,75,115,0.08)" strokeWidth="10" />
                    {/* Meta line */}
                    <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(52,151,195,0.25)" strokeWidth="10"
                        strokeDasharray={`${metaFilled} ${circ - metaFilled}`} strokeLinecap="round" />
                    {/* Progress */}
                    <circle cx="64" cy="64" r={r} fill="none" strokeWidth="10" strokeLinecap="round"
                        className={pct >= 90 ? "stroke-emerald-500" : pct >= 60 ? "stroke-amber-400" : pct >= 30 ? "stroke-orange-400" : "stroke-red-400"}
                        strokeDasharray={`${filled} ${circ - filled}`} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-display font-black ${text}`}>{pct}%</span>
                    <span className={`text-[10px] ${tf} font-semibold`}>de 90% meta</span>
                </div>
            </div>
            <div className={`flex items-center gap-4 text-xs ${tg}`}>
                <span className="flex items-center gap-1"><span className="w-3 h-1 rounded-full bg-accent-blue/30 inline-block" /> Meta (90%)</span>
                <span className="flex items-center gap-1"><span className="w-3 h-1 rounded-full bg-amber-400 inline-block" /> Actual</span>
            </div>
        </div>
    );
}

/* ── Macroproceso Row ───────────────────────────────── */
function MacroprocesoRow({ mp }: { mp: Macroproceso }) {
    const meta = Math.round(mp.criterios * META_PCT);
    const actual = Math.round((mp.progreso / 100) * mp.criterios);
    const metaPct = META_PCT * 100;
    const { bar, text } = getProgressColor(mp.progreso);
    const atMeta = mp.progreso >= metaPct;

    return (
        <div className="py-3.5 border-b border-deep-blue/5 last:border-0">
            <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-md bg-deep-blue/8 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-deep-blue/50" style={{ fontSize: "13px" }}>{mp.icon}</span>
                </span>
                <span className="text-xs font-semibold text-black/70 flex-1 truncate">
                    <span className="text-black/30 mr-1 font-normal">{mp.number}.</span>{mp.name}
                </span>
                <span className={`text-xs font-bold flex-shrink-0 ${text}`}>{mp.progreso}%</span>
                {atMeta && <span className="material-symbols-outlined text-emerald-500 flex-shrink-0" style={{ fontSize: "14px" }}>check_circle</span>}
            </div>
            {/* Dual-bar */}
            <div className="pl-7 space-y-1">
                {/* Meta bar */}
                <div className="relative h-2 bg-black/5 rounded-full overflow-hidden">
                    <div className="absolute h-full rounded-full bg-accent-blue/20" style={{ width: `${metaPct}%` }} />
                    <div className="absolute h-full" style={{ left: `${metaPct}%`, width: "2px", background: "rgba(52,151,195,0.5)" }} />
                </div>
                {/* Progress bar */}
                <div className="relative h-2.5 bg-black/5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${bar}`} style={{ width: `${mp.progreso}%` }} />
                </div>
                <div className="flex justify-between text-[10px] text-black/30 font-medium">
                    <span>{actual} / {mp.criterios} criterios</span>
                    <span>Meta: {meta}</span>
                </div>
            </div>
        </div>
    );
}

/* ── General Row (criterios count bar) ────────────── */
const MAX_CRITERIOS = Math.max(...MACROPROCESOS.map(m => m.criterios));

function GeneralRow({ mp }: { mp: Macroproceso }) {
    const pct = (mp.criterios / MAX_CRITERIOS) * 100;
    const isMax = mp.criterios === MAX_CRITERIOS;
    return (
        <div className="flex items-center gap-3 py-2.5 border-b border-deep-blue/5 last:border-0 group">
            <span className="text-[10px] font-bold text-black/25 w-4 flex-shrink-0 text-right">{mp.number}</span>
            <span className="text-xs text-black/65 w-44 flex-shrink-0 truncate group-hover:text-deep-blue transition-colors">{mp.name}</span>
            <div className="flex-1 relative h-5 flex items-center">
                <div className="absolute inset-y-0 left-0 right-0 bg-black/4 rounded-sm" />
                <div
                    className={`absolute inset-y-0 left-0 rounded-sm transition-all duration-500 ${isMax ? "bg-accent-blue" : "bg-deep-blue/20"
                        }`}
                    style={{ width: `${pct}%` }}
                />
            </div>
            <span className={`text-xs font-bold flex-shrink-0 w-6 text-right ${isMax ? "text-accent-blue" : "text-black/40"
                }`}>{mp.criterios}</span>
        </div>
    );
}

export default function DashboardClient() {
    const [viewMode, setViewMode] = useState<"progreso" | "general">("progreso");
    const [glassMode, setGlassMode] = useState(false);
    const cardClass = glassMode
        ? "liquid-glass"
        : "rounded-2xl bg-white border border-deep-blue/10 shadow-sm";
    // In glass mode, muted grey text becomes black for legibility
    const tm = glassMode ? "text-black" : "text-black/50"; // muted
    const ts = glassMode ? "text-black" : "text-black/35"; // subtle
    const tf = glassMode ? "text-black" : "text-black/30"; // faint
    const th = glassMode ? "text-black" : "text-black/70"; // heavy muted

    const totalCriteriosActual = Math.round(
        MACROPROCESOS.reduce((sum, mp) => sum + (mp.progreso / 100) * mp.criterios, 0)
    );
    const totalCriteriosMeta = Math.round(TOTAL_CRITERIOS * META_PCT);
    const overallPct = Math.round((totalCriteriosActual / TOTAL_CRITERIOS) * 100);

    const estandaresActual = Math.round(TOTAL_ESTANDARES * (totalCriteriosActual / TOTAL_CRITERIOS));
    const estandaresMeta = Math.round(TOTAL_ESTANDARES * META_PCT);

    const macrosOnTrack = MACROPROCESOS.filter(m => m.progreso >= 90).length;
    const macrosAtRisk = MACROPROCESOS.filter(m => m.progreso < 30).length;

    // ── Real macroprocess states from localStorage ──────
    const [macroCardStates, setMacroCardStates] = useState<Record<string, { rojo: boolean; amarillo: boolean; verde: boolean }>>({});
    // ── Real verifier states from all macroproceso pages ──
    const [verifierCounts, setVerifierCounts] = useState({ ver1Cumplido: 0, ver2Cumplido: 0, totalCriterios: 0 });
    const [criterioCounts, setCriterioCounts] = useState({ cumplido: 0, parcial: 0, noCumplido: 0, noIniciado: 0 });
    const [estandarCounts, setEstandarCounts] = useState({ cumplido: 0, enProceso: 0, noCumplido: 0, noIniciado: 0 });

    useEffect(() => {
        try {
            const saved = localStorage.getItem("macro_card_states");
            if (saved) setMacroCardStates(JSON.parse(saved));
        } catch { /* noop */ }
        // Aggregate per-level verifier counts (ver1 and ver2 separately)
        try {
            const LS_KEYS = ["dlde_criteria_state", "nyc_criteria_state", "eif_criteria_state", "gim_criteria_state"];
            let ver1Cumplido = 0, ver2Cumplido = 0, totalCriterios = 0;
            for (const key of LS_KEYS) {
                const raw = localStorage.getItem(key);
                if (!raw) continue;
                const allState = JSON.parse(raw) as Record<string, { scores?: Record<string, { status: string }> }>;
                for (const cs of Object.values(allState)) {
                    totalCriterios++;
                    if (!cs?.scores) continue;
                    if (cs.scores["2"]?.status === "CUMPLIDO") { ver2Cumplido++; ver1Cumplido++; continue; }
                    if (cs.scores["1"]?.status === "CUMPLIDO") { ver1Cumplido++; }
                }
            }
            setVerifierCounts({ ver1Cumplido, ver2Cumplido, totalCriterios });
        } catch { /* noop */ }

        // Aggregate criterio-level statuses
        try {
            const LS_KEYS = ["dlde_criteria_state", "nyc_criteria_state", "eif_criteria_state", "gim_criteria_state"];
            let cCumplido = 0, cParcial = 0, cNoCumplido = 0, cNoIniciado = 0;
            for (const key of LS_KEYS) {
                const raw = localStorage.getItem(key);
                if (!raw) continue;
                const allState = JSON.parse(raw) as Record<string, { scores?: Record<string, { status: string }> }>;
                for (const cs of Object.values(allState)) {
                    if (!cs?.scores) { cNoIniciado++; continue; }
                    const scoresArr = Object.values(cs.scores);
                    const allNone = scoresArr.every(s => s.status === "NONE" || !s.status);
                    if (allNone) { cNoIniciado++; continue; }
                    if (cs.scores["2"]?.status === "CUMPLIDO") { cCumplido++; continue; }
                    if (cs.scores["0"]?.status === "NO_CUMPLIDO") { cNoCumplido++; continue; }
                    cParcial++;
                }
            }
            setCriterioCounts({ cumplido: cCumplido, parcial: cParcial, noCumplido: cNoCumplido, noIniciado: cNoIniciado });
        } catch { /* noop */ }

        // Aggregate estándar-level statuses (group criterios by ID prefix e.g. DLDE1-1 → DLDE1)
        try {
            const LS_KEYS = ["dlde_criteria_state", "nyc_criteria_state", "eif_criteria_state", "gim_criteria_state"];
            type CriterioSt = "CUMPLIDO" | "NO_CUMPLIDO" | "PARCIAL" | "NO_INICIADO";
            const grupoMap: Record<string, CriterioSt[]> = {};
            for (const key of LS_KEYS) {
                const raw = localStorage.getItem(key);
                if (!raw) continue;
                const allState = JSON.parse(raw) as Record<string, { scores?: Record<string, { status: string }> }>;
                for (const [criterioId, cs] of Object.entries(allState)) {
                    const grupo = criterioId.split("-")[0]; // DLDE1, NYC2, etc.
                    if (!grupoMap[grupo]) grupoMap[grupo] = [];
                    // Derive criterio status
                    let cSt: CriterioSt = "NO_INICIADO";
                    if (cs?.scores) {
                        const scoresArr = Object.values(cs.scores);
                        const allNone = scoresArr.every(s => s.status === "NONE" || !s.status);
                        if (!allNone) {
                            if (cs.scores["2"]?.status === "CUMPLIDO") cSt = "CUMPLIDO";
                            else if (cs.scores["0"]?.status === "NO_CUMPLIDO") cSt = "NO_CUMPLIDO";
                            else cSt = "PARCIAL";
                        }
                    }
                    grupoMap[grupo].push(cSt);
                }
            }
            let eCumplido = 0, eEnProceso = 0, eNoCumplido = 0, eNoIniciado = 0;
            for (const statuses of Object.values(grupoMap)) {
                if (statuses.every(s => s === "CUMPLIDO")) eCumplido++;
                else if (statuses.every(s => s === "NO_INICIADO")) eNoIniciado++;
                else if (statuses.every(s => s === "NO_CUMPLIDO")) eNoCumplido++;
                else eEnProceso++;
            }
            setEstandarCounts({ cumplido: eCumplido, enProceso: eEnProceso, noCumplido: eNoCumplido, noIniciado: eNoIniciado });
        } catch { /* noop */ }
    }, []);

    const allCards = Object.values(macroCardStates);
    const macrosVerde = allCards.filter(d => d.verde).length;
    const macrosAmerillo = allCards.filter(d => d.amarillo && !d.verde).length;
    const macrosRojo = allCards.filter(d => d.rojo && !d.amarillo && !d.verde).length;
    const macrosNone = TOTAL_MACROPROCESOS - macrosVerde - macrosAmerillo - macrosRojo;

    // ── Verificadores pie — 2-level puntaje system ──
    const TOTAL_VERIFICADORES = 656; // 328 criterios × 2 = max weighted score
    const puntaje2 = verifierCounts.ver2Cumplido;
    const puntaje1Genuino = verifierCounts.ver1Cumplido - verifierCounts.ver2Cumplido;
    const sinPuntaje = Math.max(0, verifierCounts.totalCriterios - verifierCounts.ver1Cumplido);
    const verificadorWeightedScore = puntaje1Genuino * 1 + puntaje2 * 2;
    const verificadoresPie = [
        { label: "Puntaje 2", value: puntaje2, color: "#10b981" },
        { label: "Puntaje 1", value: puntaje1Genuino, color: "#f59e0b" },
        { label: "Sin puntaje", value: sinPuntaje, color: "#d1d5db" },
    ];
    // ── Criterios pie — real data ──
    const TOTAL_CRITERIOS_META = 328;
    const criteriosPie = [
        { label: "Cumplidos", value: criterioCounts.cumplido, color: "#10b981" },
        { label: "Parciales", value: criterioCounts.parcial, color: "#f59e0b" },
        { label: "No Cumplidos", value: criterioCounts.noCumplido, color: "#ef4444" },
        { label: "No Iniciados", value: criterioCounts.noIniciado, color: "#d1d5db" },
    ];
    // ── Estándares pie — real data ──
    const TOTAL_ESTANDARES_META = 68;
    const estandaresPie = [
        { label: "Cumplidos", value: estandarCounts.cumplido, color: "#10b981" },
        { label: "En Proceso", value: estandarCounts.enProceso, color: "#f59e0b" },
        { label: "No Cumplidos", value: estandarCounts.noCumplido, color: "#ef4444" },
        { label: "No Iniciados", value: estandarCounts.noIniciado, color: "#d1d5db" },
    ];
    const macrosPie = [
        { label: "Cumplidos", value: macrosVerde, color: "#10b981" },
        { label: "En Progreso", value: macrosAmerillo, color: "#f59e0b" },
        { label: "No Cumplidos", value: macrosRojo, color: "#ef4444" },
        { label: "No Iniciados", value: macrosNone, color: "#d1d5db" },
    ];

    return (
        <div className="w-full">
            {/* ── Glass Toggle — right-aligned, mirrors disclaimer position ── */}
            <div className="flex justify-end -mt-16 mb-10 pointer-events-none">
                <div className="inline-flex items-center gap-1 bg-white border border-deep-blue/10 rounded-full px-1.5 py-1 shadow-sm pointer-events-auto">
                    <button
                        onClick={() => setGlassMode(false)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${!glassMode ? "bg-deep-blue text-white shadow" : "text-black/40 hover:text-black/70"}`}
                    >Regular</button>
                    <button
                        onClick={() => setGlassMode(true)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${glassMode ? "bg-deep-blue text-white shadow" : "text-black/40 hover:text-black/70"}`}
                    >Glass</button>
                </div>
            </div>

            {/* ── Summary Row ──────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <KpiCard icon="grid_view" label="Macroprocesos" value={macrosVerde} meta={TOTAL_MACROPROCESOS}
                    sublabel={`de ${TOTAL_MACROPROCESOS} totales`} pieSlices={macrosPie} metaLabel="Meta" className={cardClass} glassMode={glassMode} />
                <KpiCard icon="bookmark" label="Estándares" value={estandarCounts.cumplido} meta={TOTAL_ESTANDARES_META}
                    sublabel={`de ${TOTAL_ESTANDARES_META} totales`} pieSlices={estandaresPie} metaLabel="Meta" className={cardClass} glassMode={glassMode} />
                <KpiCard icon="library_books" label="Criterios" value={criterioCounts.cumplido} meta={TOTAL_CRITERIOS_META}
                    sublabel={`de ${TOTAL_CRITERIOS_META} totales`} pieSlices={criteriosPie} metaLabel="Meta" className={cardClass} glassMode={glassMode} />
                <KpiCard icon="rule" label="Verificadores" value={verificadorWeightedScore} meta={TOTAL_VERIFICADORES}
                    sublabel={`de ${TOTAL_VERIFICADORES} pts posibles`} pieSlices={verificadoresPie} metaLabel="Meta" className={cardClass} glassMode={glassMode} />
            </div>

            {/* ── Main Content ─────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left column: ring + alert cards */}
                <div className="flex flex-col gap-5">
                    <OverallRing pct={overallPct} glassMode={glassMode} cardClass={cardClass} />

                    {/* Highlight cards */}
                    <div className={`${cardClass} p-5`}>
                        <h3 className={`text-xs font-bold ${tm} uppercase tracking-wider mb-3 flex items-center gap-2`}>
                            <span className="material-symbols-outlined text-emerald-500" style={{ fontSize: "16px" }}>trending_up</span>
                            Más Avanzados
                        </h3>
                        {[...MACROPROCESOS].sort((a, b) => b.progreso - a.progreso).slice(0, 3).map(mp => (
                            <div key={mp.id} className="flex items-center gap-2 py-1.5">
                                <span className={`text-xs font-bold ${tf} w-4`}>{mp.number}.</span>
                                <span className={`flex-1 text-xs ${th} truncate`}>{mp.name}</span>
                                <span className="text-xs font-bold text-emerald-600">{mp.progreso}%</span>
                            </div>
                        ))}
                    </div>

                    <div className={`${cardClass} p-5`}>
                        <h3 className={`text-xs font-bold ${tm} uppercase tracking-wider mb-3 flex items-center gap-2`}>
                            <span className="material-symbols-outlined text-red-400" style={{ fontSize: "16px" }}>trending_down</span>
                            Más Rezagados
                        </h3>
                        {[...MACROPROCESOS].sort((a, b) => a.progreso - b.progreso).slice(0, 3).map(mp => (
                            <div key={mp.id} className="flex items-center gap-2 py-1.5">
                                <span className={`text-xs font-bold ${tf} w-4`}>{mp.number}.</span>
                                <span className={`flex-1 text-xs ${th} truncate`}>{mp.name}</span>
                                <span className="text-xs font-bold text-red-500">{mp.progreso}%</span>
                            </div>
                        ))}
                    </div>

                    {/* En Riesgo card — moved from KPI row */}
                    <div className={`${cardClass} p-5`}>
                        <h3 className={`text-xs font-bold ${tm} uppercase tracking-wider mb-3 flex items-center gap-2`}>
                            <span className="material-symbols-outlined text-red-400" style={{ fontSize: "16px" }}>report_problem</span>
                            En Riesgo
                        </h3>
                        <div className="flex items-end gap-2">
                            <span className="text-3xl font-display font-black text-deep-blue">{macrosAtRisk}</span>
                            <span className={`text-xs ${tm} mb-1 leading-tight`}>macroprocesos<br />bajo 30% de avance</span>
                        </div>
                    </div>
                </div>

                {/* Right column: all 22 macroprocesos */}
                <div className={`lg:col-span-2 ${cardClass}`}>
                    <div className="px-5 pt-5 pb-3 border-b border-deep-blue/5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <h2 className="font-display font-bold text-deep-blue text-base">Progreso por Macroproceso</h2>
                                <p className={`text-xs ${ts} mt-0.5`}>
                                    {viewMode === "progreso"
                                        ? "Barra superior = meta 90% · Barra inferior = progreso actual"
                                        : "Cantidad de criterios por macroproceso · ordenado de mayor a menor"}
                                </p>
                            </div>
                            {/* View toggle */}
                            <div className="flex items-center gap-1 bg-black/5 rounded-xl p-1 flex-shrink-0">
                                <button
                                    onClick={() => setViewMode("progreso")}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${viewMode === "progreso"
                                        ? "bg-white text-deep-blue shadow-sm"
                                        : "text-black/40 hover:text-black/60"
                                        }`}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: "13px" }}>show_chart</span>
                                    Progreso
                                </button>
                                <button
                                    onClick={() => setViewMode("general")}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${viewMode === "general"
                                        ? "bg-white text-deep-blue shadow-sm"
                                        : "text-black/40 hover:text-black/60"
                                        }`}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: "13px" }}>bar_chart</span>
                                    General
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="px-5 py-1 max-h-[680px] overflow-y-auto custom-scrollbar">
                        {viewMode === "progreso"
                            ? MACROPROCESOS.map(mp => <MacroprocesoRow key={mp.id} mp={mp} />)
                            : MACROPROCESOS.map(mp => <GeneralRow key={mp.id} mp={mp} />)
                        }
                    </div>
                </div>
            </div>

            {/* ── Progreso por Líder ───────────────────────────── */}
            <ProgresoLiderTable cardClass={cardClass} glassMode={glassMode} />
        </div>
    );
}
