"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ServiceData, DocumentType } from "@/data/los-olivos";
import { ArrowLeft, FileText, ExternalLink, Filter } from "lucide-react";

const typeColors: Record<DocumentType, string> = {
  Manual:                 "bg-blue-100 text-blue-700 border-blue-200",
  Procedimiento:          "bg-teal-100 text-teal-700 border-teal-200",
  Proceso:                "bg-cyan-100 text-cyan-700 border-cyan-200",
  "Consentimiento Informado": "bg-rose-100 text-rose-700 border-rose-200",
  Politica:               "bg-amber-100 text-amber-700 border-amber-200",
  Reglamento:             "bg-orange-100 text-orange-700 border-orange-200",
  Plan:                   "bg-violet-100 text-violet-700 border-violet-200",
  Protocolo:              "bg-green-100 text-green-700 border-green-200",
  Informe:                "bg-slate-100 text-slate-700 border-slate-200",
};

interface Props {
  service: string;
  data: ServiceData;
}

export default function DocumentViewer({ service, data }: Props) {
  const availableTypes = Object.keys(data.documents) as DocumentType[];
  const [activeFilter, setActiveFilter] = useState<DocumentType | "Todos">("Todos");

  const filteredDocs = useMemo(() => {
    if (activeFilter === "Todos") return data.documents;
    return { [activeFilter]: data.documents[activeFilter] ?? [] };
  }, [activeFilter, data.documents]);

  const totalDocs = Object.values(data.documents).reduce((acc, docs) => acc + docs.length, 0);

  const sectionColor = "from-black/80 to-black/75";

  return (
    <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

      {/* Back link */}
      <Link
        href="/sede-los-olivos"
        className="inline-flex items-center gap-2 text-accent-blue font-semibold mb-10 hover:gap-3 transition-all duration-200 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Volver a Sede Los Olivos
      </Link>

      {/* Hero header */}
      <div className="relative rounded-2xl overflow-hidden mb-10 shadow-card-hover">
        <div className={`absolute inset-0 bg-gradient-to-r ${sectionColor} opacity-90`} />
        {data.image && (
          <Image
            src={data.image}
            alt={data.label}
            fill
            className="object-cover mix-blend-overlay opacity-40"
          />
        )}
        <div className="relative z-10 p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-white/70 text-sm font-bold uppercase tracking-widest block mb-2">
              {data.section === "upss" ? "UPSS — Unidad de Servicios de Salud" : "UPS — Unidad de Servicios Generales"}
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-extrabold text-white leading-tight">
              {data.label}
            </h1>
          </div>
          <div className="shrink-0 bg-white/20 backdrop-blur-sm rounded-xl px-5 py-3 text-center border border-white/30">
            <span className="text-3xl font-display font-black text-white">{totalDocs}</span>
            <p className="text-white/80 text-xs uppercase tracking-widest mt-0.5">documentos</p>
          </div>
        </div>
      </div>

      {/* Filter pill bar */}
      <div className="flex flex-wrap gap-2 mb-10 items-center">
        <span className="inline-flex items-center gap-1.5 text-deep-blue/60 text-sm font-semibold mr-2">
          <Filter size={14} />
          Filtrar:
        </span>
        <button
          onClick={() => setActiveFilter("Todos")}
          className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-all duration-200 ${
            activeFilter === "Todos"
              ? "bg-deep-blue text-white border-deep-blue"
              : "bg-white text-deep-blue/70 border-deep-blue/20 hover:border-deep-blue/50"
          }`}
        >
          Todos ({totalDocs})
        </button>
        {availableTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveFilter(type)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-all duration-200 ${
              activeFilter === type
                ? typeColors[type] + " !border-current scale-105"
                : "bg-white text-deep-blue/70 border-deep-blue/20 hover:border-deep-blue/50"
            }`}
          >
            {type} ({data.documents[type]?.length ?? 0})
          </button>
        ))}
      </div>

      {/* Document sections */}
      <div className="space-y-10">
        {(Object.entries(filteredDocs) as [DocumentType, typeof filteredDocs[DocumentType]][]).map(
          ([type, docs]) =>
            docs && docs.length > 0 ? (
              <section key={type}>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border ${typeColors[type]}`}>
                    {type}
                  </span>
                  <div className="flex-1 h-[1px] bg-deep-blue/10" />
                  <span className="text-deep-blue/40 text-xs font-semibold">{docs.length} doc{docs.length > 1 ? "s" : ""}</span>
                </div>
                <div className="grid gap-3">
                  {docs.map((doc, idx) => (
                    <a
                      key={idx}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between bg-white rounded-xl px-5 py-4 shadow-sm border border-deep-blue/5 hover:border-accent-blue/40 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <FileText size={18} className="shrink-0 text-accent-blue/70 group-hover:text-accent-blue transition-colors" />
                        <span className="text-deep-blue font-medium text-sm truncate group-hover:text-brand-blue transition-colors">
                          {doc.title}
                        </span>
                      </div>
                      <ExternalLink
                        size={15}
                        className="shrink-0 ml-4 text-deep-blue/30 group-hover:text-accent-blue transition-colors"
                      />
                    </a>
                  ))}
                </div>
              </section>
            ) : null
        )}
      </div>

    </div>
  );
}
