"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import {
  Stethoscope,
  Activity,
  HeartPulse,
  Baby,
  Ambulance,
  BedDouble,
  Pill,
  Utensils,
  Microscope,
  Dna,
  Droplets,
  Settings,
  FileText,
  Umbrella,
  Trash,
  Wrench,
  Shield,
  Monitor,
  Car,
  Users,
  CreditCard,
  ClipboardList
} from "lucide-react";

const upssData = [
  { title: "Consulta Externa", icon: Stethoscope },
  { title: "Central de Esterilización", icon: Activity },
  { title: "Centro Quirúrgico", icon: HeartPulse, image: "/cequ.webp" },
  { title: "Centro Obstétrico", icon: Baby },
  { title: "Emergencia", icon: Ambulance },
  { title: "Hospitalización", icon: BedDouble },
  { title: "Farmacia", icon: Pill },
  { title: "Unidad de Cuidados Intensivos", icon: HeartPulse },
  { title: "Nutrición y Dietética", icon: Utensils },
  { title: "Diagnóstico por Imágenes", icon: Activity, image: "/imag.webp" },
  { title: "Laboratorio (Patología Clínica)", icon: Microscope },
  { title: "Anatomia Patologica", icon: Dna },
  { title: "Hemoterapia y Banco de Sange", icon: Droplets },
  { title: "Medicina Física y Rehabilitación", icon: Activity },
];

const upsData = [
  { title: "Equipamiento e Infraestructura", icon: Settings, image: "/mant.webp" },
  { title: "Gestión de la Información", icon: FileText },
  { title: "Lavandería y Ropería", icon: Umbrella },
  { title: "Limpieza y Desinfección", icon: Trash },
  { title: "Mantenimiento", icon: Wrench },
  { title: "Residuos Sólidos", icon: Trash },
  { title: "Salud Ambiental", icon: Activity },
  { title: "Seguridad y Vigilancia", icon: Shield },
  { title: "Soporte Tecnológico", icon: Monitor },
  { title: "Transporte", icon: Car },
  { title: "Admisión", icon: Users },
  { title: "Archivo Clínico", icon: ClipboardList },
  { title: "Caja", icon: CreditCard },
  { title: "Seguros", icon: Shield },
];

export default function SedeLosOlivosPage() {
  const [activeTab, setActiveTab] = useState<"upss" | "ups">("upss");

  const activeData = activeTab === "upss" ? upssData : upsData;

  return (
    <>
      <Header />
      <main className="flex-grow relative z-10 py-20 lg:py-28 flex flex-col items-center bg-light-bg min-h-screen">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col items-center justify-center mb-16 text-center">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-accent-blue"></div>
              <span className="text-accent-blue text-sm font-bold tracking-[0.3em] uppercase">
                Sede Los Olivos
              </span>
              <div className="h-[1px] w-12 bg-accent-blue"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-deep-blue tracking-tight leading-tight">
              Unidades de <span className="text-accent-blue">Servicio</span>
            </h1>
          </div>

          <div className="flex justify-center mb-16">
            <div className="bg-white/50 backdrop-blur-md p-1.5 rounded-full inline-flex shadow-sm border border-brand-blue/10">
              <button
                onClick={() => setActiveTab("upss")}
                className={`px-8 py-3 rounded-full text-base font-bold transition-all duration-300 ${
                  activeTab === "upss"
                    ? "bg-gradient-to-r from-brand-teal to-brand-blue text-white shadow-md transform scale-105"
                    : "text-deep-blue/70 hover:text-brand-blue hover:bg-white/40"
                }`}
              >
                UPSS (Salud)
              </button>
              <button
                onClick={() => setActiveTab("ups")}
                className={`px-8 py-3 rounded-full text-base font-bold transition-all duration-300 ${
                  activeTab === "ups"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md transform scale-105"
                    : "text-deep-blue/70 hover:text-brand-blue hover:bg-white/40"
                }`}
              >
                UPS (Generales)
              </button>
            </div>
          </div>

          <div className="flex justify-center w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-12 justify-items-center w-full max-w-[1000px]">
              {activeData.map((item, idx) => (
                <ServiceCard
                  key={idx}
                  title={item.title}
                  icon={item.icon}
                  image={"image" in item ? ((item as any).image as string) : undefined}
                  colorTheme={activeTab}
                  onClick={() => console.log(`Clicked ${item.title}`)}
                />
              ))}
            </div>
          </div>

        </div>

        <div className="absolute top-1/4 right-0 hidden 2xl:block opacity-[0.03] pointer-events-none">
          <span className="text-vertical text-9xl font-display font-black text-deep-blue tracking-widest">
            {activeTab.toUpperCase()}
          </span>
        </div>
      </main>
      <Footer />
    </>
  );
}
