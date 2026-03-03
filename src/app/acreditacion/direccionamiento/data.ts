export type ScoreLevel = {
    score: 0 | 1 | 2;
    description: string;
};

export type CriterioDir = {
    id: string;
    label: string;
    grupo: string;
    tag?: string;
    scores: ScoreLevel[];
};

export const criteriosDir: CriterioDir[] = [
    {
        id: "DIR1-1",
        label: "DIR1-1",
        grupo: "DIR1",
        scores: [
            { score: 0, description: "Documento oficial del Plan Estratégico Institucional - PEI, elaborado solamente por el Equipo de Gestión" },
            { score: 1, description: "Actas de reunión de formulación del PEI participativamente" },
            { score: 2, description: "Actas de reuniones y/o talleres de difusión del PEI" },
        ],
    },
    {
        id: "DIR1-2",
        label: "DIR1-2",
        grupo: "DIR1",
        scores: [
            { score: 0, description: "Planes de trabajo de las unidades elaborados en base a criterios de programación del Plan Operativo Institucional - POI" },
            { score: 1, description: "Muestra aleatoria del 50% de planes de trabajo de las unidades" },
            { score: 2, description: "Informes de monitoreo de avance de planes para los 2 últimos trimestres" },
        ],
    },
    {
        id: "DIR1-3",
        label: "DIR1-3",
        grupo: "DIR1",
        scores: [
            { score: 0, description: "PEI, POI y Plan de Contingencia. Procedimiento oficial documentado para elaboración, conservación y actualización de Planes" },
            { score: 1, description: "Se observa que los planes se conservan según procedimiento" },
            { score: 2, description: "Se observa los planes Institucionales actualizados" },
        ],
    },
    {
        id: "DIR1-4",
        label: "DIR1-4",
        grupo: "DIR1",
        tag: "Sector Público",
        scores: [
            { score: 0, description: "No cuenta con documentación oficial de identificación de necesidades de salud de usuarios por etapas de vida" },
            { score: 1, description: "Documentación oficial de identificación de necesidades de salud para algunas etapas de vida" },
            { score: 2, description: "Documentación oficial de identificación de necesidades de salud para todas las etapas de vida" },
        ],
    },
    {
        id: "DIR1-5",
        label: "DIR1-5",
        grupo: "DIR1",
        tag: "Sector Público",
        scores: [
            { score: 0, description: "No hay documento oficial de Análisis de la Situación de Salud - ASIS" },
            { score: 1, description: "Documento oficial de Análisis de la Situación de Salud elaborado solamente por el equipo de gestión" },
            { score: 2, description: "Actas de reunión para formulación participativa del ASIS con el listado de participantes" },
        ],
    },
    {
        id: "DIR1-6",
        label: "DIR1-6",
        grupo: "DIR1",
        tag: "Sector Público",
        scores: [
            { score: 0, description: "Resultados del software de evaluación de las funciones obstétricas neonatales menor al 50%" },
            { score: 1, description: "Resultados del software de evaluación entre el 50% y el 80%" },
            { score: 2, description: "Resultados del software de evaluación mayor al 80%" },
        ],
    },
    {
        id: "DIR1-7",
        label: "DIR1-7",
        grupo: "DIR1",
        scores: [
            { score: 0, description: "Guías de Práctica Clínica para atención de prioridades sanitarias oficializadas. Observación de una muestra aleatoria de personas durante la atención y menos de 5 aplican las Guías" },
            { score: 1, description: "Entre 5 a 8 personas aplican las Guías" },
            { score: 2, description: "Más de 8 personas aplican las Guías" },
        ],
    },
    {
        id: "DIR1-8",
        label: "DIR1-8",
        grupo: "DIR1",
        tag: "Sector Público",
        scores: [
            { score: 0, description: "POI oficial incluye criterios de programación para menos del 50% de Estrategias Sanitarias Nacionales - ESN" },
            { score: 1, description: "Incluye criterios de programación del 50% a 80% de ESN" },
            { score: 2, description: "Incluye criterios de programación para más del 80% de ESN" },
        ],
    },
    {
        id: "DIR2-1",
        label: "DIR2-1",
        grupo: "DIR2",
        scores: [
            { score: 0, description: "No hay documentos oficiales que muestren la asignación de actividades a responsables de unidades/área/servicio" },
            { score: 1, description: "Documento(s) oficial(es) de asignación de actividades a algunos responsables" },
            { score: 2, description: "Documento(s) oficial(es) de asignación de actividades a todos los responsables" },
        ],
    },
    {
        id: "DIR2-2",
        label: "DIR2-2",
        grupo: "DIR2",
        scores: [
            { score: 0, description: "No se tiene informes de resultados de actividades asignadas" },
            { score: 1, description: "Informes de resultados de algunos responsables o de todos al titular de la institución" },
            { score: 2, description: "Acta de reunión de presentación de informes de resultados de la organización en espacios de participación para el último año" },
        ],
    },
    {
        id: "DIR2-3",
        label: "DIR2-3",
        grupo: "DIR2",
        scores: [
            { score: 0, description: "Informe de Evaluación con promedio ponderado de avance menor al 60% de la meta correspondiente" },
            { score: 1, description: "Informe de avance entre el 60% y el 80%" },
            { score: 2, description: "Informe de avance mayor al 80%" },
        ],
    },
];
