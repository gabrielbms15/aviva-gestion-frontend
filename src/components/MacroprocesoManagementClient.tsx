"use client";

import { useState, useCallback, useEffect } from "react";

/* ── Shared Types (exported so data files can use them) ── */
export type ScoreLevel = {
    score: 0 | 1 | 2;
    description: string;
};

export type CriterioItem = {
    id: string;
    label: string;
    grupo: string;
    definition: string;
    scores: ScoreLevel[];
};

export type ScoreStatus = "NO_COMPLETADO" | "EN_PROGRESO" | "COMPLETADO";

// 4-state for individual verifiers (score entries 0, 1, 2)
export type VerifierStatus = "NONE" | "NO_CUMPLIDO" | "EN_PROGRESO" | "CUMPLIDO";

type DocRef = { name: string; source: string; link: string };
type ObsRow = { text: string };
type RequirementRow = { text: string };

/* Shared details per criterio (not per score anymore) */
type CriterioDetails = {
    requirements: RequirementRow[];
    docRefs: DocRef[];
    observations: ObsRow[];
};

type ScoreEntry = { status: VerifierStatus };

type CriterioState = {
    scores: { [scoreIdx: number]: ScoreEntry };
    details: CriterioDetails;
};

export type AllState = { [criterioId: string]: CriterioState };

export type LeaderInfo = {
    lider: string;
    correo: string;
    unidad: "UPSS" | "UPS" | "";
    servicio: string;
    fechaAsignacion: string;
    fechaSeguimiento: string;
    fechaEntrega: string;
};

/* ── Shared Constants ────────────────────────────────── */
const UPSS_OPTIONS = [
    "CENTRAL DE ESTERILIZACIÓN", "CENTRO OBSTÉTRICO", "CENTRO QUIRÚRGICO",
    "CONSULTA AMBULATORIA", "CUIDADOS INTENSIVOS ADULTO", "CUIDADOS INTENSIVOS NEONATALES",
    "IMAGENES Y RADIODIAGNOSTICO", "EMERGENCIA", "ENDOSCOPIA", "FARMACIA",
    "HEMOTERAPIA Y BANCO DE SANGRE", "HOSPITALIZACIÓN", "HEMODIÁLISIS", "LABORATORIO",
    "MEDICINA NUCLEAR", "MEDICINA FISICA Y REHABILITACIÓN", "NEONATOLOGIA",
    "NUTRICIÓN Y DIETÉTICA", "ODONTOLOGIA", "ANATOMIA PATOLOGICA", "RADIOTERAPIA",
];

const UPS_OPTIONS = [
    "ADMISION Y ALTA", "ARCHIVO", "AUDITORIA MÉDICA", "EQUIPAMIENTO BIOMEDICO",
    "CALIDAD, SEGURIDAD Y MEJORA CONTINUA", "CONTABILIDAD, TESORERIA Y FINANZAS",
    "CONTROL DE LA GESTION Y PRESTACION", "COMERCIAL Y MARKETING",
    "DIRECCIÓN Y ADMINISTRACIÓN", "DOCENCIA E INVESTIGACIÓN",
    "EPIDEMIOLOGÍA Y CONTROL DE INFECCIONES", "INFRAESTRUCTURA Y MANTENIMIENTO",
    "GESTION DEL DESARROLLO HUMANO", "LOGISTICA Y COMPRAS",
    "TECNOLOGIA DE LA INFORMACION", "SELECCIÓN DEL TALENTO MÉDICO",
    "SEGURIDAD Y SALUD EN EL TRABAJO", "REFERENCIA Y CONTRAREFERENCIA",
    "ATENCION Y EXPERIENCIA DEL PACIENTE", "SERVICIOS GENERALES", "PROYECTOS", "LEGAL",
];

export const STATUS_DOT: Record<ScoreStatus, { color: string; glow: string; label: string }> = {
    NO_COMPLETADO: { color: "bg-red-500", glow: "shadow-[0_0_6px_rgba(239,68,68,0.7)]", label: "No Completado" },
    EN_PROGRESO: { color: "bg-amber-400", glow: "shadow-[0_0_6px_rgba(251,191,36,0.7)]", label: "En Progreso" },
    COMPLETADO: { color: "bg-emerald-500", glow: "shadow-[0_0_6px_rgba(16,185,129,0.7)]", label: "Completado" },
};

// Verifier-level dot styles (4 states)
export const VERIFIER_DOT: Record<VerifierStatus, { color: string; glow: string; label: string; border: string }> = {
    NONE: { color: "bg-gray-300", glow: "", label: "No Iniciado", border: "border-gray-300" },
    NO_CUMPLIDO: { color: "bg-red-500", glow: "shadow-[0_0_6px_rgba(239,68,68,0.7)]", label: "No Cumplido", border: "border-red-500" },
    EN_PROGRESO: { color: "bg-amber-400", glow: "shadow-[0_0_6px_rgba(251,191,36,0.7)]", label: "En Progreso", border: "border-amber-400" },
    CUMPLIDO: { color: "bg-emerald-500", glow: "shadow-[0_0_6px_rgba(16,185,129,0.7)]", label: "Cumplido", border: "border-emerald-500" },
};

// 4-state for criterio-level cards
export type CriterioStatus = "NO_INICIADO" | "NO_CUMPLIDO" | "PARCIAL" | "CUMPLIDO";

export const CRITERIO_DOT: Record<CriterioStatus, { color: string; glow: string; label: string }> = {
    NO_INICIADO: { color: "bg-gray-300", glow: "", label: "No Iniciado" },
    NO_CUMPLIDO: { color: "bg-red-500", glow: "shadow-[0_0_6px_rgba(239,68,68,0.7)]", label: "No Cumplido" },
    PARCIAL: { color: "bg-amber-400", glow: "shadow-[0_0_6px_rgba(251,191,36,0.7)]", label: "Parcial" },
    CUMPLIDO: { color: "bg-emerald-500", glow: "shadow-[0_0_6px_rgba(16,185,129,0.7)]", label: "Cumplido" },
};

export function deriveCriterioStatus(
    criterioScores: ScoreLevel[],
    savedScores: { [idx: number]: { status: VerifierStatus } } | undefined
): CriterioStatus {
    const get = (i: number): VerifierStatus => savedScores?.[i]?.status ?? "NONE";
    const allNone = criterioScores.every((_, i) => get(i) === "NONE");
    if (allNone) return "NO_INICIADO";
    // Score 2 (highest) verde = Cumplido
    if (criterioScores.length >= 3 && get(2) === "CUMPLIDO") return "CUMPLIDO";
    // Score 0 rojo = No cumplido
    if (get(0) === "NO_CUMPLIDO") return "NO_CUMPLIDO";
    return "PARCIAL";
}
function initDetails(): CriterioDetails {
    return { requirements: [{ text: "" }], docRefs: [{ name: "", source: "", link: "" }], observations: [{ text: "" }] };
}
function initCriterioState(c: CriterioItem): CriterioState {
    const scores: CriterioState["scores"] = {};
    c.scores.forEach((_, i) => { scores[i] = { status: "NONE" }; });
    return { scores, details: initDetails() };
}
function deriveStatus(criterioIds: string[], state: AllState): ScoreStatus {
    let allDone = true, anyProgress = false;
    for (const id of criterioIds) {
        const cs = state[id]; if (!cs?.scores) { allDone = false; continue; }
        for (const k of Object.keys(cs.scores)) {
            const st = cs.scores[Number(k)].status;
            if (st !== "CUMPLIDO") allDone = false;
            if (st === "EN_PROGRESO" || st === "CUMPLIDO") anyProgress = true;
        }
    }
    return allDone ? "COMPLETADO" : anyProgress ? "EN_PROGRESO" : "NO_COMPLETADO";
}

/* ── Props ───────────────────────────────────────────── */
type Props = {
    criterios: CriterioItem[];
    grupoLabels: Record<string, string>;
    lsStateKey: string;
    lsLeaderKey: string;
};

/* ── Main Shared Component ───────────────────────────── */
export default function MacroprocesoManagementClient({ criterios, grupoLabels, lsStateKey, lsLeaderKey }: Props) {
    const defaultState: AllState = Object.fromEntries(criterios.map((c) => [c.id, initCriterioState(c)]));
    const defaultLeader: LeaderInfo = { lider: "", correo: "", unidad: "", servicio: "", fechaAsignacion: "", fechaSeguimiento: "", fechaEntrega: "" };

    const [state, setState] = useState<AllState>(defaultState);
    const [leader, setLeader] = useState<LeaderInfo>(defaultLeader);
    const [hydrated, setHydrated] = useState(false);

    // Load persisted data client-side only (avoids SSR hydration mismatch)
    useEffect(() => {
        try {
            const savedState = localStorage.getItem(lsStateKey);
            if (savedState) {
                const parsed = JSON.parse(savedState);
                // Validate new format: each entry must have .scores and .details
                // AND score statuses must be valid VerifierStatus values
                const VALID_STATUSES = new Set(["NONE", "NO_CUMPLIDO", "EN_PROGRESO", "CUMPLIDO"]);
                const isNewFormat = parsed && typeof parsed === "object" &&
                    Object.values(parsed).every((v) => {
                        if (!v || typeof v !== "object") return false;
                        if (!("scores" in (v as object)) || !("details" in (v as object))) return false;
                        const scores = (v as { scores?: Record<string, { status: string }> }).scores ?? {};
                        return Object.values(scores).every(s => VALID_STATUSES.has(s?.status));
                    });
                if (isNewFormat) setState(parsed as AllState);
                else localStorage.removeItem(lsStateKey); // wipe stale old-format data
            }
            const savedLeader = localStorage.getItem(lsLeaderKey);
            if (savedLeader) setLeader({ ...defaultLeader, ...JSON.parse(savedLeader) as LeaderInfo });
        } catch { /* noop */ }
        setHydrated(true);
    }, [lsStateKey, lsLeaderKey]);

    // Persist state to localStorage on change
    useEffect(() => {
        if (!hydrated) return;
        try { localStorage.setItem(lsStateKey, JSON.stringify(state)); } catch { /* storage full */ }
    }, [state, lsStateKey, hydrated]);

    useEffect(() => {
        if (!hydrated) return;
        try { localStorage.setItem(lsLeaderKey, JSON.stringify(leader)); } catch { /* storage full */ }
    }, [leader, lsLeaderKey, hydrated]);

    const [expandedCriterio, setExpandedCriterio] = useState<string | null>(null);
    const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({});

    const grupos = Array.from(new Set(criterios.map((c) => c.grupo)));

    const toggleDetails = useCallback((id: string) => {
        setExpandedDetails(prev => ({ ...prev, [id]: !prev[id] }));
    }, []);

    /* ── Score status — with cascade for CUMPLIDO ── */
    const setScoreStatus = (criterioId: string, scoreIdx: number, status: VerifierStatus) => {
        setState(prev => {
            const cs = prev[criterioId];
            const newScores = { ...cs.scores };
            // If setting CUMPLIDO, cascade down to all lower verifiers too
            if (status === "CUMPLIDO") {
                for (let i = 0; i <= scoreIdx; i++) {
                    newScores[i] = { status: "CUMPLIDO" };
                }
            } else {
                newScores[scoreIdx] = { status };
            }
            return { ...prev, [criterioId]: { ...cs, scores: newScores } };
        });
    };

    /* ── Helpers: get details safely ── */
    const getDetails = (cid: string): CriterioDetails =>
        state[cid]?.details ?? initDetails();

    const updateDetails = (cid: string, patch: Partial<CriterioDetails>) => {
        setState(prev => ({
            ...prev,
            [cid]: { ...prev[cid], details: { ...prev[cid].details, ...patch } },
        }));
    };

    /* ── Requirements ── */
    const addReq = (cid: string) => {
        const d = getDetails(cid);
        updateDetails(cid, { requirements: [...d.requirements, { text: "" }] });
    };
    const updateReq = (cid: string, ri: number, text: string) => {
        const reqs = [...getDetails(cid).requirements]; reqs[ri] = { text };
        updateDetails(cid, { requirements: reqs });
    };
    const removeReq = (cid: string, ri: number) => {
        const reqs = getDetails(cid).requirements.filter((_, i) => i !== ri);
        updateDetails(cid, { requirements: reqs.length ? reqs : [{ text: "" }] });
    };

    /* ── DocRefs ── */
    const addDocRef = (cid: string) => {
        const d = getDetails(cid);
        updateDetails(cid, { docRefs: [...d.docRefs, { name: "", source: "", link: "" }] });
    };
    const updateDocRef = (cid: string, di: number, field: keyof DocRef, value: string) => {
        const docs = [...getDetails(cid).docRefs]; docs[di] = { ...docs[di], [field]: value };
        updateDetails(cid, { docRefs: docs });
    };
    const removeDocRef = (cid: string, di: number) => {
        const docs = getDetails(cid).docRefs.filter((_, i) => i !== di);
        updateDetails(cid, { docRefs: docs.length ? docs : [{ name: "", source: "", link: "" }] });
    };

    /* ── Observations ── */
    const addObs = (cid: string) => {
        const d = getDetails(cid);
        updateDetails(cid, { observations: [...d.observations, { text: "" }] });
    };
    const updateObs = (cid: string, oi: number, text: string) => {
        const obs = [...getDetails(cid).observations]; obs[oi] = { text };
        updateDetails(cid, { observations: obs });
    };
    const removeObs = (cid: string, oi: number) => {
        const obs = getDetails(cid).observations.filter((_, i) => i !== oi);
        updateDetails(cid, { observations: obs.length ? obs : [{ text: "" }] });
    };

    const servicioOptions = leader.unidad === "UPSS" ? UPSS_OPTIONS : leader.unidad === "UPS" ? UPS_OPTIONS : [];
    const inputClass = "w-full text-sm px-3 py-2.5 rounded-lg border border-deep-blue/15 bg-white text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-accent-blue/25 focus:border-accent-blue/40 transition-all";

    return (
        <div className="w-full">
            {/* ── Leader Info ──────────────────────────────── */}
            <div className="liquid-glass mb-8">
                <h2 className="text-sm font-display font-bold text-deep-blue/60 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>person</span>
                    Información del Responsable
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-black/50 mb-1.5">Líder del Área</label>
                        <input type="text" value={leader.lider} onChange={(e) => setLeader(p => ({ ...p, lider: e.target.value }))} placeholder="Nombre del líder" className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-black/50 mb-1.5">Correo</label>
                        <input type="email" value={leader.correo} onChange={(e) => setLeader(p => ({ ...p, correo: e.target.value }))} placeholder="correo@ejemplo.com" className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-black/50 mb-1.5">Unidad</label>
                        <select value={leader.unidad} onChange={(e) => setLeader(p => ({ ...p, unidad: e.target.value as LeaderInfo["unidad"], servicio: "" }))} className={inputClass}>
                            <option value="">Seleccionar unidad...</option>
                            <option value="UPSS">UPSS</option>
                            <option value="UPS">UPS</option>
                        </select>
                    </div>
                    {leader.unidad && (
                        <div>
                            <label className="block text-xs font-semibold text-black/50 mb-1.5">Servicio</label>
                            <select value={leader.servicio} onChange={(e) => setLeader(p => ({ ...p, servicio: e.target.value }))} className={inputClass}>
                                <option value="">Seleccionar servicio...</option>
                                {servicioOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    )}
                </div>

                {/* ── Fechas ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/40">
                    <div>
                        <label className="block text-xs font-semibold text-black/50 mb-1.5">Fecha de Asignación</label>
                        <input type="date" value={leader.fechaAsignacion} onChange={(e) => setLeader(p => ({ ...p, fechaAsignacion: e.target.value }))} className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-black/50 mb-1.5">Fecha de Seguimiento</label>
                        <input type="date" value={leader.fechaSeguimiento} onChange={(e) => setLeader(p => ({ ...p, fechaSeguimiento: e.target.value }))} className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-black/50 mb-1.5">Fecha de Entrega</label>
                        <input type="date" value={leader.fechaEntrega} onChange={(e) => setLeader(p => ({ ...p, fechaEntrega: e.target.value }))} className={inputClass} />
                    </div>
                </div>
            </div>

            {/* ── Legend ───────────────────────────────────── */}
            <div className="flex flex-wrap items-center justify-center gap-5 mb-10 p-4 rounded-2xl bg-white/60 border border-deep-blue/8">
                <span className="text-xs font-bold text-deep-blue/40 uppercase tracking-wider mr-1">Estado:</span>
                {(["NO_COMPLETADO", "EN_PROGRESO", "COMPLETADO"] as ScoreStatus[]).map((s) => {
                    const d = STATUS_DOT[s];
                    return (
                        <span key={s} className="inline-flex items-center gap-2 text-xs font-semibold text-black/60">
                            <span className={`w-3 h-3 rounded-full ${d.color}`} />
                            {d.label}
                        </span>
                    );
                })}
                <div className="h-4 w-px bg-deep-blue/10 mx-1" />
                <span className="text-xs text-deep-blue/40">Clic en las bolitas para cambiar estado · Clic en criterio para expandir</span>
            </div>

            {/* ── Criteria Groups ──────────────────────────── */}
            {grupos.map((grupo) => {
                const items = criterios.filter((c) => c.grupo === grupo);
                const gs = deriveStatus(items.map((c) => c.id), state);
                const gsDot = STATUS_DOT[gs];

                return (
                    <div key={grupo} className="mb-10">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="h-px flex-1 bg-deep-blue/10" />
                            <div className="flex items-center gap-2">
                                <span className={`w-3 h-3 rounded-full ${gsDot.color} ${gsDot.glow}`} title={gsDot.label} />
                                <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-deep-blue/50">{grupoLabels[grupo] ?? grupo}</h2>
                            </div>
                            <div className="h-px flex-1 bg-deep-blue/10" />
                        </div>

                        <div className="flex flex-col gap-5">
                            {items.map((criterio) => {
                                const cs = state[criterio.id];
                                const criterioStatus = deriveCriterioStatus(criterio.scores, cs?.scores);
                                const cd = CRITERIO_DOT[criterioStatus];
                                // Group-level card status (for section header dot) uses criterio statuses
                                const isExpanded = expandedCriterio === criterio.id;
                                const isDetailsExpanded = !!expandedDetails[criterio.id];
                                const details = getDetails(criterio.id);

                                return (
                                    <div key={criterio.id} className="rounded-2xl bg-white border border-deep-blue/10 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                                        {/* Card header */}
                                        <div className="flex items-center bg-deep-blue hover:bg-brand-blue transition-colors">
                                            {/* Main expand button */}
                                            <button
                                                onClick={() => setExpandedCriterio(prev => prev === criterio.id ? null : criterio.id)}
                                                className="flex-1 flex items-center justify-between px-5 py-4 cursor-pointer group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className={`w-3.5 h-3.5 rounded-full border-2 border-white/30 ${cd.color} ${cd.glow}`} title={cd.label} />
                                                    <span className="font-display font-black text-base text-white tracking-tight">{criterio.label}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${criterioStatus === "CUMPLIDO" ? "bg-emerald-500/20 text-emerald-200" : criterioStatus === "NO_CUMPLIDO" ? "bg-red-500/20 text-red-200" : criterioStatus === "PARCIAL" ? "bg-amber-400/20 text-amber-200" : "bg-gray-400/20 text-gray-300"}`}>{cd.label}</span>
                                                    <span className={`material-symbols-outlined text-white/60 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} style={{ fontSize: "20px" }}>expand_more</span>
                                                </div>
                                            </button>
                                            {/* Details toggle button — always visible */}
                                            <button
                                                onClick={() => toggleDetails(criterio.id)}
                                                title={isDetailsExpanded ? "Ocultar gestión" : "Ver gestión"}
                                                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-4 border-l border-white/10 transition-colors cursor-pointer ${isDetailsExpanded ? "text-accent-blue bg-white/10" : "text-white/40 hover:text-white/80 hover:bg-white/5"}`}
                                            >
                                                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>assignment</span>
                                            </button>
                                        </div>

                                        {/* Definition bar — always visible */}
                                        <div className={`px-5 py-3 border-b ${isExpanded ? "bg-accent-blue/8 border-accent-blue/15" : "bg-light-bg/60 border-deep-blue/6"} transition-colors duration-200`}>
                                            <p className="text-sm text-black/70 leading-relaxed">
                                                <span className="material-symbols-outlined align-middle text-accent-blue mr-1" style={{ fontSize: "14px" }}>info</span>
                                                {criterio.definition}
                                            </p>
                                        </div>

                                        {/* Score rows */}
                                        {isExpanded && (
                                            <div className="divide-y divide-deep-blue/5">
                                                {criterio.scores.map((scoreLevel, idx) => {
                                                    const scoreEntry = cs?.scores[idx] ?? { status: "NONE" as VerifierStatus };
                                                    const dot = VERIFIER_DOT[scoreEntry.status] ?? VERIFIER_DOT["NONE"];

                                                    return (
                                                        <div key={idx} className="flex items-start gap-3 px-5 py-3.5">
                                                            <div className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-lg bg-deep-blue/10 flex items-center justify-center font-bold text-sm text-deep-blue">{scoreLevel.score}</div>
                                                            <p className="flex-1 text-sm text-black leading-relaxed pt-0.5">{scoreLevel.description}</p>
                                                            <div className="flex-shrink-0 flex items-center gap-1.5 ml-2 mt-1">
                                                                {(["NO_CUMPLIDO", "EN_PROGRESO", "CUMPLIDO"] as VerifierStatus[]).map((st) => {
                                                                    const d = VERIFIER_DOT[st]; const active = scoreEntry.status === st;
                                                                    return (
                                                                        <button key={st} title={d.label} onClick={() => setScoreStatus(criterio.id, idx, st)}
                                                                            className={`w-4 h-4 rounded-full border-2 transition-all duration-200 hover:scale-125 active:scale-95 ${active ? `${d.color} border-transparent ${d.glow}` : `${d.color} opacity-20 border-transparent hover:opacity-50`}`}
                                                                        />
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        {/* ── Details panel — per criterio ── */}
                                        {isDetailsExpanded && (
                                            <div className="px-5 pb-5 pt-4 bg-slate-50 border-t border-deep-blue/8">
                                                {/* Requerimientos */}
                                                <DetailSection icon="checklist" label="Requerimientos" onAdd={() => addReq(criterio.id)} addLabel="Añadir Requerimiento">
                                                    {details.requirements.map((r, ri) => (
                                                        <RowInput key={ri} value={r.text} placeholder={`Requerimiento ${ri + 1}...`}
                                                            onChange={(v) => updateReq(criterio.id, ri, v)}
                                                            onRemove={details.requirements.length > 1 ? () => removeReq(criterio.id, ri) : undefined}
                                                        />
                                                    ))}
                                                </DetailSection>

                                                {/* Documento de Referencia */}
                                                <DetailSection icon="description" label="Documento de Referencia" onAdd={() => addDocRef(criterio.id)} addLabel="Añadir Documento">
                                                    {details.docRefs.map((d, di) => (
                                                        <div key={di} className="flex items-center gap-2">
                                                            {/* Document Name - 1/2 */}
                                                            <div className="basis-1/2 flex-shrink-0">
                                                                <input type="text" value={d.name} onChange={(e) => updateDocRef(criterio.id, di, "name", e.target.value)} placeholder="Nombre del documento"
                                                                    className="w-full text-sm px-3 py-2 rounded-lg border border-deep-blue/12 bg-white text-black placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-accent-blue/25 focus:border-accent-blue/40 transition-all shadow-sm" />
                                                            </div>

                                                            {/* Second half: Select (1/3 of half) + URL (2/3 of half) */}
                                                            <div className="flex-1 flex items-center gap-2 overflow-hidden">
                                                                <select value={d.source} onChange={(e) => updateDocRef(criterio.id, di, "source", e.target.value)}
                                                                    className="basis-1/3 flex-shrink-0 text-sm px-2 py-2 rounded-lg border border-deep-blue/12 bg-white text-black focus:outline-none focus:ring-2 focus:ring-accent-blue/25 focus:border-accent-blue/40 transition-all shadow-sm cursor-pointer">
                                                                    <option value="">Plataforma...</option>
                                                                    <option value="Rankmi SLC">Rankmi SLC</option>
                                                                    <option value="Rankmi SLO">Rankmi SLO</option>
                                                                    <option value="SharePoint SLC">SharePoint SLC</option>
                                                                    <option value="SharePoint SLO">SharePoint SLO</option>
                                                                    <option value="Capacita">Capacita</option>
                                                                </select>
                                                                <div className="flex-1 flex items-center gap-1.5 overflow-hidden">
                                                                    <input type="url" value={d.link} onChange={(e) => updateDocRef(criterio.id, di, "link", e.target.value)} placeholder="https://..."
                                                                        className="flex-1 min-w-0 text-sm px-3 py-2 rounded-lg border border-deep-blue/12 bg-white text-black placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-accent-blue/25 focus:border-accent-blue/40 transition-all shadow-sm" />
                                                                    <a href={d.link || "#"} target={d.link ? "_blank" : undefined} rel="noopener noreferrer"
                                                                        className={`flex-shrink-0 p-1.5 rounded-lg transition-colors ${d.link ? "bg-accent-blue text-white hover:bg-brand-blue" : "bg-black/5 text-black/20 pointer-events-none"}`}
                                                                        title={d.link ? "Abrir" : "Sin enlace"}>
                                                                        <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>open_in_new</span>
                                                                    </a>
                                                                </div>
                                                                {details.docRefs.length > 1 && (
                                                                    <button onClick={() => removeDocRef(criterio.id, di)} className="flex-shrink-0 p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Eliminar">
                                                                        <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>close</span>
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </DetailSection>

                                                {/* Observaciones */}
                                                <DetailSection icon="chat_bubble" label="Observaciones" onAdd={() => addObs(criterio.id)} addLabel="Añadir Observación">
                                                    {details.observations.map((o, oi) => (
                                                        <RowInput key={oi} value={o.text} placeholder={`Observación ${oi + 1}...`}
                                                            onChange={(v) => updateObs(criterio.id, oi, v)}
                                                            onRemove={details.observations.length > 1 ? () => removeObs(criterio.id, oi) : undefined}
                                                        />
                                                    ))}
                                                </DetailSection>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/* ── Detail Section ──────────────────────────────────── */
function DetailSection({ icon, label, onAdd, addLabel, children }: {
    icon: string; label: string; onAdd: () => void; addLabel: string; children: React.ReactNode;
}) {
    return (
        <div className="mb-4 last:mb-0">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-accent-blue" style={{ fontSize: "14px" }}>{icon}</span>
                    <span className="text-xs font-bold text-black/50 uppercase tracking-wider">{label}</span>
                </div>
                <button onClick={onAdd} className="inline-flex items-center gap-1 text-xs font-semibold text-accent-blue hover:text-brand-blue transition-colors" title={addLabel}>
                    <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>add_circle</span>
                    <span className="hidden sm:inline">{addLabel}</span>
                </button>
            </div>
            <div className="space-y-2">{children}</div>
        </div>
    );
}

/* ── Row Input ───────────────────────────────────────── */
function RowInput({ value, placeholder, onChange, onRemove }: {
    value: string; placeholder: string; onChange: (v: string) => void; onRemove?: () => void;
}) {
    return (
        <div className="flex items-center gap-2">
            <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
                className="flex-1 text-sm px-3 py-2 rounded-lg border border-deep-blue/12 bg-white text-black placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-accent-blue/25 focus:border-accent-blue/40 transition-all shadow-sm"
            />
            {onRemove && (
                <button onClick={onRemove} className="flex-shrink-0 p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Eliminar">
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>close</span>
                </button>
            )}
        </div>
    );
}
