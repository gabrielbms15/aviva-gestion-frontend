"use client";

import { useState, useEffect } from "react";

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
    icon, label, value, meta, unit = "", sublabel, pieSlices, metaLabel = "Meta (90%)",
}: {
    icon: string; label: string; value: number; meta: number;
    unit?: string; sublabel?: string; pieSlices?: PieSlice[]; metaLabel?: string;
}) {
    const [showPie, setShowPie] = useState(false);
    const pct = Math.round((value / meta) * 100);
    const { bar, text } = getProgressColor(pct);
    return (
        <div className="rounded-2xl bg-white border border-deep-blue/10 shadow-sm p-5 flex flex-col gap-3">
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
                            <span className="text-sm font-semibold text-black/40 ml-1">{unit}</span>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-black/40">{metaLabel}</p>
                            <p className="text-lg font-bold text-deep-blue/60">{meta}</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-black/40">Progreso hacia meta</span>
                            <span className={`text-xs font-bold ${text}`}>{pct}%</span>
                        </div>
                        <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-500 ${bar}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                        </div>
                    </div>
                    {sublabel && <p className="text-xs text-black/30">{sublabel}</p>}
                </>
            )}
        </div>
    );
}

/* ── Overall Ring ───────────────────────────────────── */
function OverallRing({ pct }: { pct: number }) {
    const r = 56;
    const circ = 2 * Math.PI * r;
    const filled = (pct / 100) * circ;
    const metaFilled = (META_PCT * 100 / 100) * circ;
    const { text } = getProgressColor(pct);

    return (
        <div className="rounded-2xl bg-white border border-deep-blue/10 shadow-sm p-5 flex flex-col items-center justify-center gap-3">
            <span className="text-xs font-bold text-black/50 uppercase tracking-wider">Progreso General</span>
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
                    <span className="text-[10px] text-black/30 font-semibold">de 90% meta</span>
                </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-black/40">
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
    useEffect(() => {
        try {
            const saved = localStorage.getItem("macro_card_states");
            if (saved) setMacroCardStates(JSON.parse(saved));
        } catch { /* noop */ }
    }, []);

    const allCards = Object.values(macroCardStates);
    const macrosVerde = allCards.filter(d => d.verde).length;
    const macrosAmerillo = allCards.filter(d => d.amarillo && !d.verde).length;
    const macrosRojo = allCards.filter(d => d.rojo && !d.amarillo && !d.verde).length;
    const macrosNone = TOTAL_MACROPROCESOS - macrosVerde - macrosAmerillo - macrosRojo;

    // ── Simulated pie distributions (replace with real data later) ──
    const verificadoresPie = [
        { label: "Cumplidos", value: totalCriteriosActual, color: "#10b981" },
        { label: "En Progreso", value: Math.round(TOTAL_CRITERIOS * 0.18), color: "#f59e0b" },
        { label: "No Cumplidos", value: Math.round(TOTAL_CRITERIOS * 0.12), color: "#ef4444" },
        { label: "No Iniciados", value: TOTAL_CRITERIOS - totalCriteriosActual - Math.round(TOTAL_CRITERIOS * 0.18) - Math.round(TOTAL_CRITERIOS * 0.12), color: "#d1d5db" },
    ];
    const criteriosPie = [
        { label: "Cumplidos", value: estandaresActual, color: "#10b981" },
        { label: "En Progreso", value: Math.round(TOTAL_ESTANDARES * 0.18), color: "#f59e0b" },
        { label: "No Cumplidos", value: Math.round(TOTAL_ESTANDARES * 0.10), color: "#ef4444" },
        { label: "No Iniciados", value: TOTAL_ESTANDARES - estandaresActual - Math.round(TOTAL_ESTANDARES * 0.18) - Math.round(TOTAL_ESTANDARES * 0.10), color: "#d1d5db" },
    ];
    const macrosPie = [
        { label: "Cumplidos", value: macrosVerde, color: "#10b981" },
        { label: "En Progreso", value: macrosAmerillo, color: "#f59e0b" },
        { label: "No Cumplidos", value: macrosRojo, color: "#ef4444" },
        { label: "No Iniciados", value: macrosNone, color: "#d1d5db" },
    ];

    return (
        <div className="w-full">
            {/* ── Summary Row ──────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <KpiCard icon="rule" label="Verificadores" value={totalCriteriosActual} meta={totalCriteriosMeta}
                    sublabel={`de ${TOTAL_CRITERIOS} totales`} pieSlices={verificadoresPie} />
                <KpiCard icon="library_books" label="Criterios" value={estandaresActual} meta={estandaresMeta}
                    sublabel={`de ${TOTAL_ESTANDARES} totales`} pieSlices={criteriosPie} />
                <KpiCard icon="grid_view" label="Macroprocesos" value={macrosVerde} meta={TOTAL_MACROPROCESOS}
                    sublabel={`de ${TOTAL_MACROPROCESOS} totales`} pieSlices={macrosPie} metaLabel="Meta" />
                <KpiCard icon="report_problem" label="En Riesgo" value={macrosAtRisk} meta={0}
                    unit="macroprocesos" sublabel="por debajo del 30% de avance" />
            </div>

            {/* ── Main Content ─────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left column: ring + alert cards */}
                <div className="flex flex-col gap-5">
                    <OverallRing pct={overallPct} />

                    {/* Highlight cards */}
                    <div className="rounded-2xl bg-white border border-deep-blue/10 shadow-sm p-5">
                        <h3 className="text-xs font-bold text-black/50 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-emerald-500" style={{ fontSize: "16px" }}>trending_up</span>
                            Más Avanzados
                        </h3>
                        {[...MACROPROCESOS].sort((a, b) => b.progreso - a.progreso).slice(0, 3).map(mp => (
                            <div key={mp.id} className="flex items-center gap-2 py-1.5">
                                <span className="text-xs font-bold text-black/30 w-4">{mp.number}.</span>
                                <span className="flex-1 text-xs text-black/70 truncate">{mp.name}</span>
                                <span className="text-xs font-bold text-emerald-600">{mp.progreso}%</span>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-2xl bg-white border border-red-100 shadow-sm p-5">
                        <h3 className="text-xs font-bold text-black/50 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-red-400" style={{ fontSize: "16px" }}>trending_down</span>
                            Más Rezagados
                        </h3>
                        {[...MACROPROCESOS].sort((a, b) => a.progreso - b.progreso).slice(0, 3).map(mp => (
                            <div key={mp.id} className="flex items-center gap-2 py-1.5">
                                <span className="text-xs font-bold text-black/30 w-4">{mp.number}.</span>
                                <span className="flex-1 text-xs text-black/70 truncate">{mp.name}</span>
                                <span className="text-xs font-bold text-red-500">{mp.progreso}%</span>
                            </div>
                        ))}
                    </div>

                    {/* Empty slot for future widget */}
                    <div className="rounded-2xl border-2 border-dashed border-deep-blue/10 p-5 flex flex-col items-center justify-center gap-2 min-h-[120px] text-center">
                        <span className="material-symbols-outlined text-deep-blue/20" style={{ fontSize: "28px" }}>add_chart</span>
                        <span className="text-xs text-black/25 font-medium">Espacio para widget</span>
                    </div>
                </div>

                {/* Right column: all 22 macroprocesos */}
                <div className="lg:col-span-2 rounded-2xl bg-white border border-deep-blue/10 shadow-sm">
                    <div className="px-5 pt-5 pb-3 border-b border-deep-blue/5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <h2 className="font-display font-bold text-deep-blue text-base">Progreso por Macroproceso</h2>
                                <p className="text-xs text-black/35 mt-0.5">
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
        </div>
    );
}
