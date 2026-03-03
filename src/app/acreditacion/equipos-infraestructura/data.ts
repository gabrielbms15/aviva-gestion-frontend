import type { CriterioItem } from "@/components/MacroprocesoManagementClient";

export const criteriosEif: CriterioItem[] = [
    {
        id: "EIF1-1",
        label: "EIF1-1",
        grupo: "EIF1",
        definition: "El establecimiento de salud cuenta con un plan de mantenimiento preventivo y de recuperación de la planta física y servicios básicos incorporado al plan operativo de actividades (POA).",
        scores: [
            { score: 0, description: "No se cuenta con plan de mantenimiento preventivo y recuperativo de la planta física y servicios básicos." },
            { score: 1, description: "Plan operativo institucional oficial no incorpora el plan de mantenimiento preventivo y recuperativo." },
            { score: 2, description: "Plan operativo institucional oficial incorpora el plan de mantenimiento preventivo y recuperativo." },
        ],
    },
    {
        id: "EIF1-2",
        label: "EIF1-2",
        grupo: "EIF1",
        definition: "El establecimiento de salud cuenta con un plan de reemplazo y mantenimiento preventivo y recuperativo de sus equipos incorporado al plan operativo de actividades (POA).",
        scores: [
            { score: 0, description: "No se cuenta con plan de reemplazo de equipos." },
            { score: 1, description: "Plan operativo institucional oficial no incorpora el plan de reemplazo de equipos." },
            { score: 2, description: "Plan operativo institucional oficial incorpora el plan de reemplazo de equipos." },
        ],
    },
    {
        id: "EIF1-3",
        label: "EIF1-3",
        grupo: "EIF1",
        definition: "Se cuenta con personal capacitado para la elaboración de proyectos de inversión y se elaboran proyectos.",
        scores: [
            { score: 0, description: "No se elaboran proyectos de inversión." },
            { score: 1, description: "Evidencia documentaria de que se cuenta con personal competente para la elaboración de proyectos de inversión." },
            { score: 2, description: "Se evidencia informes de proyectos de inversión elaborados por personal con competencias documentadas." },
        ],
    },
    {
        id: "EIF1-4",
        label: "EIF1-4",
        grupo: "EIF1",
        definition: "El personal que realiza el mantenimiento preventivo y de recuperación de la infraestructura y equipos está capacitado para ese fin durante el último año.",
        scores: [
            { score: 0, description: "No se cuenta con personal capacitado para realizar el mantenimiento preventivo y de recuperación de infraestructura." },
            { score: 1, description: "Evidencia documentaria de la capacitación del personal encargado del mantenimiento preventivo hace más de un año." },
            { score: 2, description: "Evidencia documentaria de la capacitación del personal encargado del mantenimiento preventivo en el último año." },
        ],
    },
    {
        id: "EIF1-5",
        label: "EIF1-5",
        grupo: "EIF1",
        definition: "Se cuenta con procedimientos documentados para la adquisición de equipos, mantenimiento; remodelación y/o ampliación de infraestructura física del establecimiento.",
        scores: [
            { score: 0, description: "No se cuenta con procedimientos para adquisición de equipos, mantenimiento, remodelación y/o ampliación de la infraestructura física." },
            { score: 1, description: "Documentos oficiales de los procedimientos para alguno(s) de los procesos (adquisición, mantenimiento, remodelación y/o ampliación)." },
            { score: 2, description: "Documentos oficiales de los procedimientos para todos los procesos (adquisición, mantenimiento, remodelación y/o ampliación)." },
        ],
    },
    {
        id: "EIF1-6",
        label: "EIF1-6",
        grupo: "EIF1",
        definition: "El establecimiento de salud cuenta con sistema de inventario y registro de operatividad de equipos e instrumentos.",
        scores: [
            { score: 0, description: "No se cuenta con sistema de inventario ni registro de operatividad." },
            { score: 1, description: "Documento oficial que registra el sistema de inventario y registro de operatividad." },
            { score: 2, description: "Informe del inventario y registro de operatividad de acuerdo a disposición oficial para el último trimestre o semestre." },
        ],
    },
    {
        id: "EIF1-7",
        label: "EIF1-7",
        grupo: "EIF1",
        definition: "Se cuenta y aplica los procedimientos del manual para el mantenimiento de instalaciones eléctricas, mecánicas y sanitarias.",
        scores: [
            { score: 0, description: "No se cuenta con manual de procedimientos para el mantenimiento de las instalaciones eléctricas, mecánicas y sanitarias." },
            { score: 1, description: "Cuenta con manual de procedimientos oficial para el mantenimiento de las instalaciones oficializado." },
            { score: 2, description: "Informe de la situación del mantenimiento de las instalaciones de acuerdo a manual de procedimientos oficial para el último semestre." },
        ],
    },
    {
        id: "EIF1-8",
        label: "EIF1-8",
        grupo: "EIF1",
        definition: "Cuenta con manual de mantenimiento de áreas críticas, control y seguimiento de obras y éste es aplicado.",
        scores: [
            { score: 0, description: "No cuenta con manual de mantenimiento, control y seguimiento de áreas críticas." },
            { score: 1, description: "Manual de mantenimiento, control y seguimiento de áreas críticas oficializado." },
            { score: 2, description: "Informe de la situación de las áreas críticas de acuerdo a manual oficial para el último semestre." },
        ],
    },
    {
        id: "EIF1-9",
        label: "EIF1-9",
        grupo: "EIF1",
        definition: "Cuenta con manual de medidas que permiten el buen uso y prevención de deterioros de los equipos y servicios básicos (agua, energía eléctrica) y éste es aplicado.",
        scores: [
            { score: 0, description: "No cuenta con manual de medidas de buen uso y prevención de deterioro de los equipos y servicios básicos (agua y energía eléctrica)." },
            { score: 1, description: "Cuenta con manual de buen uso y prevención de deterioro de los equipos y servicios básicos oficializado." },
            { score: 2, description: "Informe de la situación de los equipos y servicios básicos de acuerdo a manual oficial para el último semestre." },
        ],
    },
    {
        id: "EIF2-1",
        label: "EIF2-1",
        grupo: "EIF2",
        definition: "Existe un procedimiento de verificación de inventarios actualizado (equipos con rótulos visibles) y el informe de resultados (no concordancias, faltantes, etc.) se remite a los niveles directivos.",
        scores: [
            { score: 0, description: "No cuenta con procedimiento de verificación de inventarios." },
            { score: 1, description: "Documento oficial de procedimiento de verificación de inventarios." },
            { score: 2, description: "Informe a Dirección del establecimiento según disposiciones oficiales para la verificación del inventario en el último año." },
        ],
    },
    {
        id: "EIF2-2",
        label: "EIF2-2",
        grupo: "EIF2",
        definition: "Se realiza mantenimiento preventivo de los equipos de acuerdo a programación.",
        scores: [
            { score: 0, description: "No se realiza mantenimiento preventivo de los equipos." },
            { score: 1, description: "Se evidencia informe(s) oficial(es) de la realización de mantenimiento preventivo a los equipos sin patrón de periodicidad." },
            { score: 2, description: "Informes oficiales de la realización de mantenimiento preventivo a los equipos de acuerdo a cronograma oficial establecido." },
        ],
    },
    {
        id: "EIF2-3",
        label: "EIF2-3",
        grupo: "EIF2",
        definition: "Se cuantifica el porcentaje de soluciones oportunas ante el llamado de mantenimiento preventivo o reparativo de infraestructura y equipos.",
        scores: [
            { score: 0, description: "Se verifica el total de solicitudes recibidas en el trimestre y las que tuvieron respuesta donde el porcentaje de mantenimiento preventivo o reparativo es menor al 60%." },
            { score: 1, description: "El porcentaje de soluciones oportunas está entre el 60% y el 80% con similar mecanismo." },
            { score: 2, description: "El porcentaje de soluciones oportunas es mayor al 80% con similar mecanismo." },
        ],
    },
];

export const GRUPO_LABELS_EIF: Record<string, string> = {
    EIF1: "EIF1 — Planificación y Organización",
    EIF2: "EIF2 — Operación y Control",
};
