import type { CriterioItem } from "@/components/MacroprocesoManagementClient";

// Re-export type alias for backward compat
export type { CriterioItem as CriterioGim };
export type { ScoreLevel } from "@/components/MacroprocesoManagementClient";

export const GRUPO_LABELS_GIM: Record<string, string> = {
    GIM1: "GIM1 — Planificación y Requerimiento",
    GIM2: "GIM2 — Selección y Adquisición",
};

export const criteriosGim: CriterioItem[] = [
    {
        id: "GIM1-1",
        label: "GIM1-1",
        grupo: "GIM1",
        definition: "Se cuenta con líneas de acción para planificar el requerimiento y la adquisición de insumos y materiales conforme a las normas vigentes.",
        scores: [
            { score: 0, description: "No se cuenta con lineamiento de acción para el requerimiento o adquisición de insumos o materiales." },
            { score: 1, description: "Documento oficial que establece los lineamientos de acción para el requerimiento o adquisición de insumos o materiales." },
            { score: 2, description: "Lineamientos de acción oficiales para el requerimiento o adquisición de insumos o materiales de acuerdo a normatividad vigente." },
        ],
    },
    {
        id: "GIM1-2",
        label: "GIM1-2",
        grupo: "GIM1",
        definition: "El establecimiento de salud cuenta con plan anual de necesidades de bienes estratégicos por servicios inmerso en plan de adquisiciones que garantiza calidad de insumos y materiales requeridos (especificaciones técnicas, comité de evaluación de bienes estratégicos).",
        scores: [
            { score: 0, description: "No se cuenta con plan anual de necesidades de bienes estratégicos por servicios." },
            { score: 1, description: "Plan anual de necesidades de bienes estratégicos por servicios oficializado." },
            { score: 2, description: "Documento oficial que contiene las disposiciones que garantizan la calidad de los bienes estratégicos contenidas en el plan anual de necesidades por servicios." },
        ],
    },
    {
        id: "GIM1-3",
        label: "GIM1-3",
        grupo: "GIM1",
        definition: "Se tienen establecidas y se aplican medidas de protección de insumos y materiales por el personal de almacén central.",
        scores: [
            { score: 0, description: "No se cuenta con medidas de protección de insumos y materiales." },
            { score: 1, description: "Documento oficial que registra las medidas para la protección de insumos y materiales por parte del personal." },
            { score: 2, description: "Evidencia documentaria del cumplimiento de las medidas establecidas oficialmente para la protección de insumos y materiales por parte del personal." },
        ],
    },
    {
        id: "GIM1-4",
        label: "GIM1-4",
        grupo: "GIM1",
        definition: "Se tiene establecido y se aplican procedimientos para el control de insumos y materiales en el área de distribución (almacén).",
        scores: [
            { score: 0, description: "No se cuenta con procedimientos para el control de insumos y materiales." },
            { score: 1, description: "Documento oficial que registra los procedimientos para el control de insumos y materiales." },
            { score: 2, description: "Evidencia documentaria del cumplimiento de las medidas establecidas oficialmente para el control de insumos y materiales." },
        ],
    },
    {
        id: "GIM2-1",
        label: "GIM2-1",
        grupo: "GIM2",
        definition: "Se realiza el requerimiento de bienes estratégicos de acuerdo al cronograma del plan anual de adquisiciones y se cumple los procedimientos.",
        scores: [
            { score: 0, description: "No se realiza el requerimiento de bienes estratégicos de acuerdo al plan de adquisiciones." },
            { score: 1, description: "Documento oficial de requerimiento de bienes estratégicos conforme al plan." },
            { score: 2, description: "Evidencia documentaria del cumplimiento de los procedimientos para el requerimiento de bienes estratégicos según el plan de adquisiciones." },
        ],
    },
    {
        id: "GIM2-2",
        label: "GIM2-2",
        grupo: "GIM2",
        definition: "En el establecimiento se llevan a cabo los procesos de adquisición según los procedimientos correspondientes.",
        scores: [
            { score: 0, description: "No cuenta con procedimientos para la adquisición de insumos y materiales." },
            { score: 1, description: "No válido" },
            { score: 2, description: "Documento oficial del procedimiento para la adquisición de insumos y materiales." },
        ],
    },
    {
        id: "GIM2-3",
        label: "GIM2-3",
        grupo: "GIM2",
        definition: "Se cuantifica el porcentaje de entregas de insumos y materiales de acuerdo con una programación.",
        scores: [
            { score: 0, description: "Evidencia de que menos del 50% de las entregas de insumos y materiales se realizan de acuerdo a la programación de requerimientos." },
            { score: 1, description: "Evidencia de entrega entre el 50% y el 80% según requerimientos programados." },
            { score: 2, description: "Evidencia de entrega de más del 80% según requerimientos programados." },
        ],
    },
    {
        id: "GIM2-4",
        label: "GIM2-4",
        grupo: "GIM2",
        definition: "Se registra la opinión de los técnicos en el proceso de adquisición en insumos y materiales.",
        scores: [
            { score: 0, description: "Registro oficial de la opinión de los técnicos en el proceso de adquisición de insumos y materiales en menos del 60% de procesos." },
            { score: 1, description: "Evidencia de registro de la opinión de los técnicos entre el 60% a 80% de los procesos." },
            { score: 2, description: "Evidencia de registro de la opinión de los técnicos en más del 80% de los procesos." },
        ],
    },
];
