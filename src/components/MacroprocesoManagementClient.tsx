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

type DocRef = { name: string; source: string; link: string };
type ObsRow = { text: string };
type RequirementRow = { text: string };

type ScoreData = {
    status: ScoreStatus;
    requirements: RequirementRow[];
    docRefs: DocRef[];
    observations: ObsRow[];
};

type CriterioState = { [scoreIdx: number]: ScoreData };
export type AllState = { [criterioId: string]: CriterioState };

export type LeaderInfo = {
    lider: string;
    correo: string;
    unidad: "UPSS" | "UPS" | "";
    servicio: string;
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

/* ── Helpers ─────────────────────────────────────────── */
function initScoreData(): ScoreData {
    return { status: "NO_COMPLETADO", requirements: [{ text: "" }], docRefs: [{ name: "", source: "", link: "" }], observations: [{ text: "" }] };
}
function initCriterioState(c: CriterioItem): CriterioState {
    const s: CriterioState = {};
    c.scores.forEach((_, i) => { s[i] = initScoreData(); });
    return s;
}
function deriveStatus(criterioIds: string[], state: AllState): ScoreStatus {
    let allDone = true, anyProgress = false;
    for (const id of criterioIds) {
        const cs = state[id]; if (!cs) { allDone = false; continue; }
        for (const k of Object.keys(cs)) {
            const st = cs[Number(k)].status;
            if (st !== "COMPLETADO") allDone = false;
            if (st === "EN_PROGRESO") anyProgress = true;
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
    const defaultLeader: LeaderInfo = { lider: "", correo: "", unidad: "", servicio: "" };

    const [state, setState] = useState<AllState>(defaultState);
    const [leader, setLeader] = useState<LeaderInfo>(defaultLeader);
    const [hydrated, setHydrated] = useState(false);

    // Load persisted data client-side only (avoids SSR hydration mismatch)
    useEffect(() => {
        try {
            const savedState = localStorage.getItem(lsStateKey);
            if (savedState) setState(JSON.parse(savedState) as AllState);
            const savedLeader = localStorage.getItem(lsLeaderKey);
            if (savedLeader) setLeader(JSON.parse(savedLeader) as LeaderInfo);
        } catch { /* noop */ }
        setHydrated(true);
    }, [lsStateKey, lsLeaderKey]);

    // Persist state to localStorage on change (client-side only — hydrated guard prevents write-on-mount)
    useEffect(() => {
        if (!hydrated) return;
        try { localStorage.setItem(lsStateKey, JSON.stringify(state)); } catch { /* storage full */ }
    }, [state, lsStateKey, hydrated]);

    useEffect(() => {
        if (!hydrated) return;
        try { localStorage.setItem(lsLeaderKey, JSON.stringify(leader)); } catch { /* storage full */ }
    }, [leader, lsLeaderKey, hydrated]);

    const [expandedCriterio, setExpandedCriterio] = useState<string | null>(null);
    const [expandedScores, setExpandedScores] = useState<Record<string, boolean>>({});

    const grupos = Array.from(new Set(criterios.map((c) => c.grupo)));

    const toggleScoreExpand = useCallback((key: string) => {
        setExpandedScores(prev => ({ ...prev, [key]: !prev[key] }));
    }, []);

    const setScoreStatus = (criterioId: string, scoreIdx: number, status: ScoreStatus) => {
        setState(prev => ({ ...prev, [criterioId]: { ...prev[criterioId], [scoreIdx]: { ...prev[criterioId][scoreIdx], status } } }));
    };

    const addReq = (cid: string, si: number) => setState(prev => {
        const sd = prev[cid][si];
        return { ...prev, [cid]: { ...prev[cid], [si]: { ...sd, requirements: [...sd.requirements, { text: "" }] } } };
    });
    const updateReq = (cid: string, si: number, ri: number, text: string) => setState(prev => {
        const reqs = [...prev[cid][si].requirements]; reqs[ri] = { text };
        return { ...prev, [cid]: { ...prev[cid], [si]: { ...prev[cid][si], requirements: reqs } } };
    });
    const removeReq = (cid: string, si: number, ri: number) => setState(prev => {
        const reqs = prev[cid][si].requirements.filter((_, i) => i !== ri);
        if (reqs.length === 0) reqs.push({ text: "" });
        return { ...prev, [cid]: { ...prev[cid], [si]: { ...prev[cid][si], requirements: reqs } } };
    });

    const addDocRef = (cid: string, si: number) => setState(prev => {
        const sd = prev[cid][si];
        return { ...prev, [cid]: { ...prev[cid], [si]: { ...sd, docRefs: [...sd.docRefs, { name: "", source: "", link: "" }] } } };
    });
    const updateDocRef = (cid: string, si: number, di: number, field: keyof DocRef, value: string) => setState(prev => {
        const docs = [...prev[cid][si].docRefs]; docs[di] = { ...docs[di], [field]: value };
        return { ...prev, [cid]: { ...prev[cid], [si]: { ...prev[cid][si], docRefs: docs } } };
    });
    const removeDocRef = (cid: string, si: number, di: number) => setState(prev => {
        const docs = prev[cid][si].docRefs.filter((_, i) => i !== di);
        if (docs.length === 0) docs.push({ name: "", source: "", link: "" });
        return { ...prev, [cid]: { ...prev[cid], [si]: { ...prev[cid][si], docRefs: docs } } };
    });

    const addObs = (cid: string, si: number) => setState(prev => {
        const sd = prev[cid][si];
        return { ...prev, [cid]: { ...prev[cid], [si]: { ...sd, observations: [...sd.observations, { text: "" }] } } };
    });
    const updateObs = (cid: string, si: number, oi: number, text: string) => setState(prev => {
        const obs = [...prev[cid][si].observations]; obs[oi] = { text };
        return { ...prev, [cid]: { ...prev[cid], [si]: { ...prev[cid][si], observations: obs } } };
    });
    const removeObs = (cid: string, si: number, oi: number) => setState(prev => {
        const obs = prev[cid][si].observations.filter((_, i) => i !== oi);
        if (obs.length === 0) obs.push({ text: "" });
        return { ...prev, [cid]: { ...prev[cid], [si]: { ...prev[cid][si], observations: obs } } };
    });

    const servicioOptions = leader.unidad === "UPSS" ? UPSS_OPTIONS : leader.unidad === "UPS" ? UPS_OPTIONS : [];
    const inputClass = "w-full text-sm px-3 py-2.5 rounded-lg border border-deep-blue/15 bg-white text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-accent-blue/25 focus:border-accent-blue/40 transition-all";

    return (
        <div className="w-full">
            {/* ── Leader Info ──────────────────────────────── */}
            <div className="mb-8">
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
                <span className="text-xs text-deep-blue/40">Clic en las bolitas para cambiar estado · Clic en fila para expandir</span>
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
                                const allDone = criterio.scores.every((_, i) => state[criterio.id]?.[i]?.status === "COMPLETADO");
                                const anyProg = criterio.scores.some((_, i) => state[criterio.id]?.[i]?.status === "EN_PROGRESO");
                                const cardStatus: ScoreStatus = allDone ? "COMPLETADO" : anyProg ? "EN_PROGRESO" : "NO_COMPLETADO";
                                const cd = STATUS_DOT[cardStatus];
                                const isExpanded = expandedCriterio === criterio.id;

                                return (
                                    <div key={criterio.id} className="rounded-2xl bg-white border border-deep-blue/10 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                                        {/* Card header */}
                                        <button
                                            onClick={() => setExpandedCriterio(prev => prev === criterio.id ? null : criterio.id)}
                                            className="w-full flex items-center justify-between px-5 py-4 bg-deep-blue cursor-pointer group transition-colors hover:bg-brand-blue"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className={`w-3.5 h-3.5 rounded-full border-2 border-white/30 ${cd.color} ${cd.glow}`} title={cd.label} />
                                                <span className="font-display font-black text-base text-white tracking-tight">{criterio.label}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${cardStatus === "COMPLETADO" ? "bg-emerald-500/20 text-emerald-200" : cardStatus === "EN_PROGRESO" ? "bg-amber-400/20 text-amber-200" : "bg-red-500/20 text-red-200"}`}>{cd.label}</span>
                                                <span className={`material-symbols-outlined text-white/60 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} style={{ fontSize: "20px" }}>expand_more</span>
                                            </div>
                                        </button>

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
                                                    const sd = state[criterio.id]?.[idx] ?? initScoreData();
                                                    const dot = STATUS_DOT[sd.status];
                                                    const scoreKey = `${criterio.id}-${idx}`;
                                                    const isScoreExpanded = !!expandedScores[scoreKey];

                                                    return (
                                                        <div key={idx}>
                                                            <div
                                                                className="flex items-start gap-3 px-5 py-3.5 cursor-pointer hover:bg-light-bg/40 transition-colors"
                                                                onClick={() => toggleScoreExpand(scoreKey)}
                                                            >
                                                                <div className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-lg bg-deep-blue/10 flex items-center justify-center font-bold text-sm text-deep-blue">{scoreLevel.score}</div>
                                                                <p className="flex-1 text-sm text-black leading-relaxed pt-0.5">{scoreLevel.description}</p>
                                                                <div className="flex-shrink-0 flex items-center gap-1.5 ml-2 mt-1" onClick={(e) => e.stopPropagation()}>
                                                                    {(["NO_COMPLETADO", "EN_PROGRESO", "COMPLETADO"] as ScoreStatus[]).map((st) => {
                                                                        const d = STATUS_DOT[st]; const active = sd.status === st;
                                                                        return (
                                                                            <button key={st} title={d.label} onClick={() => setScoreStatus(criterio.id, idx, st)}
                                                                                className={`w-4 h-4 rounded-full border-2 transition-all duration-200 hover:scale-125 active:scale-95 ${active ? `${d.color} border-transparent ${d.glow}` : `${d.color} opacity-25 border-transparent hover:opacity-50`}`}
                                                                            />
                                                                        );
                                                                    })}
                                                                </div>
                                                                <span className={`material-symbols-outlined text-deep-blue/30 ml-1 mt-0.5 transition-transform duration-200 ${isScoreExpanded ? "rotate-180" : ""}`} style={{ fontSize: "18px" }}>expand_more</span>
                                                            </div>

                                                            {isScoreExpanded && (
                                                                <div className="px-5 pb-5 pt-3 bg-slate-50 border-t border-deep-blue/5">
                                                                    {/* Requerimientos */}
                                                                    <DetailSection icon="checklist" label="Requerimientos" onAdd={() => addReq(criterio.id, idx)} addLabel="Añadir Requerimiento">
                                                                        {sd.requirements.map((r, ri) => (
                                                                            <RowInput key={ri} value={r.text} placeholder={`Requerimiento ${ri + 1}...`}
                                                                                onChange={(v) => updateReq(criterio.id, idx, ri, v)}
                                                                                onRemove={sd.requirements.length > 1 ? () => removeReq(criterio.id, idx, ri) : undefined}
                                                                            />
                                                                        ))}
                                                                    </DetailSection>

                                                                    {/* Documento de Referencia */}
                                                                    <DetailSection icon="description" label="Documento de Referencia" onAdd={() => addDocRef(criterio.id, idx)} addLabel="Añadir Documento">
                                                                        {sd.docRefs.map((d, di) => (
                                                                            <div key={di} className="flex items-center gap-2">
                                                                                {/* Document Name - 1/2 of total width */}
                                                                                <div className="basis-1/2 flex-shrink-0">
                                                                                    <input type="text" value={d.name} onChange={(e) => updateDocRef(criterio.id, idx, di, "name", e.target.value)} placeholder="Nombre del documento"
                                                                                        className="w-full text-sm px-3 py-2 rounded-lg border border-deep-blue/12 bg-white text-black placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-accent-blue/25 focus:border-accent-blue/40 transition-all shadow-sm" />
                                                                                </div>

                                                                                {/* Second Half - Split between Select (Narrower) and URL (Wider) */}
                                                                                <div className="flex-1 flex items-center gap-2 overflow-hidden">
                                                                                    {/* Platform Select - 1/3 of this container (~1/6 of total) */}
                                                                                    <select value={d.source} onChange={(e) => updateDocRef(criterio.id, idx, di, "source", e.target.value)}
                                                                                        className="basis-1/3 flex-shrink-0 text-sm px-2 py-2 rounded-lg border border-deep-blue/12 bg-white text-black focus:outline-none focus:ring-2 focus:ring-accent-blue/25 focus:border-accent-blue/40 transition-all shadow-sm cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis">
                                                                                        <option value="">Plataforma...</option>
                                                                                        <option value="Rankmi SLC">Rankmi SLC</option>
                                                                                        <option value="Rankmi SLO">Rankmi SLO</option>
                                                                                        <option value="SharePoint SLC">SharePoint SLC</option>
                                                                                        <option value="SharePoint SLO">SharePoint SLO</option>
                                                                                        <option value="Capacita">Capacita</option>
                                                                                    </select>

                                                                                    {/* URL and Open Link Button - Remaining 2/3 (~1/3 of total) */}
                                                                                    <div className="flex-1 flex items-center gap-1.5 overflow-hidden">
                                                                                        <input type="url" value={d.link} onChange={(e) => updateDocRef(criterio.id, idx, di, "link", e.target.value)} placeholder="https://..."
                                                                                            className="flex-1 min-w-0 text-sm px-3 py-2 rounded-lg border border-deep-blue/12 bg-white text-black placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-accent-blue/25 focus:border-accent-blue/40 transition-all shadow-sm" />

                                                                                        <a href={d.link || "#"} target={d.link ? "_blank" : undefined} rel="noopener noreferrer"
                                                                                            className={`flex-shrink-0 p-1.5 rounded-lg transition-colors ${d.link ? "bg-accent-blue text-white hover:bg-brand-blue" : "bg-black/5 text-black/20 pointer-events-none"}`}
                                                                                            title={d.link ? "Abrir" : "Sin enlace"}>
                                                                                            <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>open_in_new</span>
                                                                                        </a>
                                                                                    </div>

                                                                                    {/* Delete button (only if more than 1) */}
                                                                                    {sd.docRefs.length > 1 && (
                                                                                        <button onClick={() => removeDocRef(criterio.id, idx, di)} className="flex-shrink-0 p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Eliminar">
                                                                                            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>close</span>
                                                                                        </button>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </DetailSection>

                                                                    {/* Observaciones */}
                                                                    <DetailSection icon="chat_bubble" label="Observaciones" onAdd={() => addObs(criterio.id, idx)} addLabel="Añadir Observación">
                                                                        {sd.observations.map((o, oi) => (
                                                                            <RowInput key={oi} value={o.text} placeholder={`Observación ${oi + 1}...`}
                                                                                onChange={(v) => updateObs(criterio.id, idx, oi, v)}
                                                                                onRemove={sd.observations.length > 1 ? () => removeObs(criterio.id, idx, oi) : undefined}
                                                                            />
                                                                        ))}
                                                                    </DetailSection>
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
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
