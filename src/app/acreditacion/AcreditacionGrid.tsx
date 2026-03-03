"use client";

import { useState, useEffect } from "react";
import MacroCard, { MacroDotState } from "@/components/MacroCard";

type Macroproceso = {
    id: string;
    number: number;
    name: string;
    icon: string;
    href?: string;
};

const macroprocesos: Macroproceso[] = [
    { id: "DIR", number: 1, name: "1. Direccionamiento", icon: "settings_applications", href: "/acreditacion/direccionamiento" },
    { id: "GRH", number: 2, name: "2. Gestión de Recursos Humanos", icon: "group" },
    { id: "GCA", number: 3, name: "3. Gestión de la Calidad", icon: "verified" },
    { id: "MRA", number: 4, name: "4. Manejo del Riesgo de la Atención", icon: "warning" },
    { id: "GSD", number: 5, name: "5. Gestión de Seguridad ante Desastres", icon: "emergency" },
    { id: "CGP", number: 6, name: "6. Control de la Gestión y Prestación", icon: "analytics" },
    { id: "ATA", number: 7, name: "7. Atención Ambulatoria", icon: "medical_services" },
    { id: "AEX", number: 8, name: "8. Atención Extramural", icon: "local_hospital" },
    { id: "ATH", number: 9, name: "9. Atención de Hospitalización", icon: "bed" },
    { id: "EMG", number: 10, name: "10. Atención de Emergencia", icon: "hail" },
    { id: "ATQ", number: 11, name: "11. Atención Quirúrgica", icon: "masks" },
    { id: "DIV", number: 12, name: "12. Docencia e Investigación", icon: "school" },
    { id: "ADT", number: 13, name: "13. Atención de Apoyo Diagnóstico y Tratamiento", icon: "biotech" },
    { id: "ADA", number: 14, name: "14. Admisión y Alta", icon: "login" },
    { id: "RCR", number: 15, name: "15. Referencia y Contrarreferencia", icon: "sync_alt" },
    { id: "GMD", number: 16, name: "16. Gestión de Medicamentos", icon: "medication" },
    { id: "GIM", number: 17, name: "17. Gestión de la Información", icon: "info" },
    { id: "DLDE", number: 18, name: "18. Decontaminación, Limpieza, Desinfección y Esterilización", icon: "clean_hands", href: "/acreditacion/decontaminacion-limpieza" },
    { id: "MRS", number: 19, name: "19. Manejo de Riesgo Social", icon: "diversity_3" },
    { id: "NYD", number: 20, name: "20. Nutrición y Dietética", icon: "restaurant", href: "/acreditacion/nutricion-dietetica" },
    { id: "GIM2", number: 21, name: "21. Gestión de Insumos y Materiales", icon: "inventory_2", href: "/acreditacion/gestion-insumos" },
    { id: "EIF", number: 22, name: "22. Gestión de Equipos e Infraestructura", icon: "construction", href: "/acreditacion/equipos-infraestructura" },
];

export const MACRO_CARD_STATES_KEY = "macro_card_states";

const defaultDots = (): MacroDotState => ({ rojo: false, amarillo: false, verde: false });
const defaultState = (): Record<string, MacroDotState> =>
    Object.fromEntries(macroprocesos.map((m) => [`${m.id}-${m.number}`, defaultDots()]));

export default function AcreditacionGrid() {
    const [dots, setDots] = useState<Record<string, MacroDotState>>(() => {
        try {
            const saved = localStorage.getItem(MACRO_CARD_STATES_KEY);
            return saved ? JSON.parse(saved) : defaultState();
        } catch { return defaultState(); }
    });

    useEffect(() => {
        try { localStorage.setItem(MACRO_CARD_STATES_KEY, JSON.stringify(dots)); } catch { /* noop */ }
    }, [dots]);

    const handleDotToggle = (key: string, dot: keyof MacroDotState) => {
        setDots((prev) => ({
            ...prev,
            [key]: { ...prev[key], [dot]: !prev[key][dot] },
        }));
    };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-20 gap-x-12 justify-items-center">
            {macroprocesos.map((macro) => {
                const key = `${macro.id}-${macro.number}`;
                return (
                    <MacroCard
                        key={key}
                        {...macro}
                        dots={dots[key] ?? defaultDots()}
                        onDotToggle={(dot) => handleDotToggle(key, dot)}
                    />
                );
            })}
        </div>
    );
}
