"use client";

import { useState } from "react";
import { criteriosDir, CriterioDir } from "./data";

type Status = "SIN INICIAR" | "EN PROCESO" | "COMPLETADO";

type DocumentEntry = {
    link: string;
    comment: string;
};

type DocumentState = {
    [criterioId: string]: {
        [score: number]: DocumentEntry;
    };
};

type OpenPanel = {
    criterioId: string;
    score: number;
} | null;

const STATUS_CONFIG: Record<
    Status,
    { label: string; color: string; bg: string; icon: string; next: Status }
> = {
    "SIN INICIAR": {
        label: "Sin Iniciar",
        color: "text-slate-500",
        bg: "bg-slate-100 border-slate-200",
        icon: "radio_button_unchecked",
        next: "EN PROCESO",
    },
    "EN PROCESO": {
        label: "En Proceso",
        color: "text-amber-600",
        bg: "bg-amber-50 border-amber-200",
        icon: "pending",
        next: "COMPLETADO",
    },
    COMPLETADO: {
        label: "Completado",
        color: "text-emerald-600",
        bg: "bg-emerald-50 border-emerald-200",
        icon: "check_circle",
        next: "SIN INICIAR",
    },
};

const SCORE_COLORS = [
    { ring: "ring-slate-300", badge: "bg-slate-100 text-slate-600", dot: "bg-slate-400" },
    { ring: "ring-accent-blue/40", badge: "bg-blue-50 text-accent-blue", dot: "bg-accent-blue" },
    { ring: "ring-emerald-300", badge: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
];

const GRUPO_LABELS: Record<string, string> = {
    DIR1: "Grupo DIR1 — Planificación Estratégica",
    DIR2: "Grupo DIR2 — Organización y Control",
};

export default function DireccionamientoClient() {
    const [statuses, setStatuses] = useState<Record<string, Status>>(
        () =>
            Object.fromEntries(criteriosDir.map((c) => [c.id, "SIN INICIAR" as Status]))
    );
    const [documents, setDocuments] = useState<DocumentState>({});
    const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
    const [filter, setFilter] = useState<Status | "TODOS">("TODOS");

    const grupos = Array.from(new Set(criteriosDir.map((c) => c.grupo)));

    const toggleStatus = (id: string) => {
        setStatuses((prev) => {
            const current = prev[id];
            return { ...prev, [id]: STATUS_CONFIG[current].next };
        });
    };

    const togglePanel = (criterioId: string, score: number) => {
        setOpenPanel((prev) =>
            prev?.criterioId === criterioId && prev?.score === score
                ? null
                : { criterioId, score }
        );
    };

    const updateDocument = (
        criterioId: string,
        score: number,
        field: keyof DocumentEntry,
        value: string
    ) => {
        setDocuments((prev) => ({
            ...prev,
            [criterioId]: {
                ...prev[criterioId],
                [score]: {
                    link: prev[criterioId]?.[score]?.link ?? "",
                    comment: prev[criterioId]?.[score]?.comment ?? "",
                    [field]: value,
                },
            },
        }));
    };

    const hasDoc = (criterioId: string, score: number) =>
        !!(
            documents[criterioId]?.[score]?.link ||
            documents[criterioId]?.[score]?.comment
        );

    const filteredCriterios = (grupo: string) =>
        criteriosDir.filter(
            (c) =>
                c.grupo === grupo &&
                (filter === "TODOS" || statuses[c.id] === filter)
        );

    const totalByStatus = (s: Status) =>
        criteriosDir.filter((c) => statuses[c.id] === s).length;

    return (
        <div className="w-full">
            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-4 mb-10">
                {(["SIN INICIAR", "EN PROCESO", "COMPLETADO"] as Status[]).map((s) => {
                    const cfg = STATUS_CONFIG[s];
                    const count = totalByStatus(s);
                    return (
                        <button
                            key={s}
                            onClick={() => setFilter((prev) => (prev === s ? "TODOS" : s))}
                            className={`group flex flex-col items-center gap-1 rounded-2xl border-2 px-4 py-5 transition-all duration-200 cursor-pointer
                ${filter === s ? "border-deep-blue/40 shadow-md scale-[1.02]" : "border-transparent hover:border-deep-blue/20"}
                ${cfg.bg}`}
                        >
                            <span className={`material-symbols-outlined text-2xl ${cfg.color}`}>
                                {cfg.icon}
                            </span>
                            <span className={`text-3xl font-display font-black ${cfg.color}`}>
                                {count}
                            </span>
                            <span className={`text-xs font-bold uppercase tracking-wider ${cfg.color} opacity-80`}>
                                {cfg.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Filter pill */}
            {filter !== "TODOS" && (
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-sm text-deep-blue/60">Filtrando por:</span>
                    <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${STATUS_CONFIG[filter].bg} ${STATUS_CONFIG[filter].color}`}
                    >
                        <span className="material-symbols-outlined text-sm">{STATUS_CONFIG[filter].icon}</span>
                        {STATUS_CONFIG[filter].label}
                    </span>
                    <button
                        onClick={() => setFilter("TODOS")}
                        className="text-xs text-deep-blue/50 hover:text-deep-blue underline transition-colors"
                    >
                        Mostrar todos
                    </button>
                </div>
            )}

            {/* Criteria by group */}
            {grupos.map((grupo) => {
                const items = filteredCriterios(grupo);
                if (items.length === 0) return null;
                return (
                    <div key={grupo} className="mb-12">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="h-px flex-1 bg-deep-blue/10" />
                            <h2 className="text-xs font-bold tracking-[0.25em] uppercase text-deep-blue/40">
                                {GRUPO_LABELS[grupo] ?? grupo}
                            </h2>
                            <div className="h-px flex-1 bg-deep-blue/10" />
                        </div>

                        <div className="flex flex-col gap-5">
                            {items.map((criterio) => (
                                <CriterioCard
                                    key={criterio.id}
                                    criterio={criterio}
                                    status={statuses[criterio.id]}
                                    onToggleStatus={() => toggleStatus(criterio.id)}
                                    openPanel={openPanel}
                                    onTogglePanel={togglePanel}
                                    documents={documents[criterio.id] ?? {}}
                                    onUpdateDocument={updateDocument}
                                    hasDoc={hasDoc}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/* ── Criterio Card ─────────────────────────────────── */
function CriterioCard({
    criterio,
    status,
    onToggleStatus,
    openPanel,
    onTogglePanel,
    documents,
    onUpdateDocument,
    hasDoc,
}: {
    criterio: CriterioDir;
    status: Status;
    onToggleStatus: () => void;
    openPanel: OpenPanel;
    onTogglePanel: (criterioId: string, score: number) => void;
    documents: Record<number, DocumentEntry>;
    onUpdateDocument: (id: string, score: number, field: keyof DocumentEntry, value: string) => void;
    hasDoc: (criterioId: string, score: number) => boolean;
}) {
    const cfg = STATUS_CONFIG[status];

    return (
        <div className="rounded-2xl bg-white border border-deep-blue/10 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
            {/* Card header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-light-bg to-white border-b border-deep-blue/8">
                <div className="flex items-center gap-3">
                    <span className="font-display font-black text-base text-deep-blue tracking-tight">
                        {criterio.label}
                    </span>
                    {criterio.tag && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-teal/10 text-brand-teal border border-brand-teal/20">
                            {criterio.tag}
                        </span>
                    )}
                </div>

                {/* Status badge — click to cycle */}
                <button
                    onClick={onToggleStatus}
                    title="Clic para cambiar estado"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer select-none ${cfg.bg} ${cfg.color}`}
                >
                    <span className="material-symbols-outlined text-sm" style={{ fontSize: "14px" }}>
                        {cfg.icon}
                    </span>
                    {cfg.label}
                    <span className="material-symbols-outlined text-[10px] opacity-50" style={{ fontSize: "10px" }}>
                        swap_horiz
                    </span>
                </button>
            </div>

            {/* Score rows */}
            <div className="divide-y divide-deep-blue/5">
                {criterio.scores.map((scoreLevel) => {
                    const sc = SCORE_COLORS[scoreLevel.score];
                    const isPanelOpen =
                        openPanel?.criterioId === criterio.id &&
                        openPanel?.score === scoreLevel.score;
                    const docExists = hasDoc(criterio.id, scoreLevel.score);

                    return (
                        <div key={scoreLevel.score}>
                            <div className="flex items-start gap-3 px-5 py-3.5 group hover:bg-light-bg/60 transition-colors duration-150">
                                {/* Score badge */}
                                <div
                                    className={`flex-shrink-0 mt-0.5 w-7 h-7 rounded-full ring-2 flex items-center justify-center font-bold text-sm ${sc.ring} ${sc.badge}`}
                                >
                                    {scoreLevel.score}
                                </div>

                                {/* Description */}
                                <p className="flex-1 text-sm text-deep-blue/75 leading-relaxed pt-0.5">
                                    {scoreLevel.description}
                                </p>

                                {/* Doc button */}
                                <button
                                    onClick={() => onTogglePanel(criterio.id, scoreLevel.score)}
                                    className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 border
                    ${isPanelOpen
                                            ? "bg-deep-blue text-white border-deep-blue shadow-sm"
                                            : docExists
                                                ? "bg-brand-teal/10 text-brand-teal border-brand-teal/30 hover:bg-brand-teal hover:text-white"
                                                : "bg-white text-deep-blue/60 border-deep-blue/15 hover:bg-light-bg hover:border-accent-blue/30 hover:text-accent-blue"
                                        }`}
                                >
                                    <span
                                        className="material-symbols-outlined"
                                        style={{ fontSize: "14px" }}
                                    >
                                        {docExists ? "folder_open" : "attach_file"}
                                    </span>
                                    Documentos
                                    {docExists && (
                                        <span
                                            className={`w-1.5 h-1.5 rounded-full ${sc.dot} ${isPanelOpen ? "bg-white" : ""}`}
                                        />
                                    )}
                                </button>
                            </div>

                            {/* Document Panel */}
                            {isPanelOpen && (
                                <DocumentPanel
                                    criterioId={criterio.id}
                                    score={scoreLevel.score}
                                    entry={documents[scoreLevel.score] ?? { link: "", comment: "" }}
                                    onUpdate={(field, value) =>
                                        onUpdateDocument(criterio.id, scoreLevel.score, field, value)
                                    }
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ── Document Panel ─────────────────────────────────── */
function DocumentPanel({
    criterioId,
    score,
    entry,
    onUpdate,
}: {
    criterioId: string;
    score: number;
    entry: DocumentEntry;
    onUpdate: (field: keyof DocumentEntry, value: string) => void;
}) {
    return (
        <div className="px-5 pb-5 pt-3 bg-gradient-to-br from-light-bg/80 to-white border-t border-deep-blue/8 animate-in slide-in-from-top-1 fade-in duration-200">
            <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-accent-blue" style={{ fontSize: "16px" }}>
                    folder_open
                </span>
                <span className="text-xs font-bold text-deep-blue/50 uppercase tracking-wider">
                    Documentación — Puntaje {score}
                </span>
            </div>

            <div className="space-y-3">
                {/* SharePoint link */}
                <div>
                    <label className="block text-xs font-semibold text-deep-blue/60 mb-1.5">
                        <span className="material-symbols-outlined align-middle mr-1" style={{ fontSize: "13px" }}>link</span>
                        Enlace al documento (SharePoint)
                    </label>
                    <div className="flex items-center gap-2">
                        <input
                            type="url"
                            value={entry.link}
                            onChange={(e) => onUpdate("link", e.target.value)}
                            placeholder="https://tu-org.sharepoint.com/..."
                            className="flex-1 text-sm px-3 py-2 rounded-lg border border-deep-blue/15 bg-white text-deep-blue placeholder:text-deep-blue/30 focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue/50 transition-all"
                        />
                        {entry.link && (
                            <a
                                href={entry.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0 p-2 rounded-lg bg-accent-blue text-white hover:bg-brand-blue transition-colors"
                                title="Abrir enlace"
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>open_in_new</span>
                            </a>
                        )}
                    </div>
                </div>

                {/* Comments */}
                <div>
                    <label className="block text-xs font-semibold text-deep-blue/60 mb-1.5">
                        <span className="material-symbols-outlined align-middle mr-1" style={{ fontSize: "13px" }}>chat_bubble</span>
                        Comentarios
                    </label>
                    <textarea
                        value={entry.comment}
                        onChange={(e) => onUpdate("comment", e.target.value)}
                        placeholder="Agrega observaciones, contexto o notas sobre este documento..."
                        rows={3}
                        className="w-full text-sm px-3 py-2 rounded-lg border border-deep-blue/15 bg-white text-deep-blue placeholder:text-deep-blue/30 focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue/50 transition-all resize-none"
                    />
                </div>
            </div>
        </div>
    );
}
