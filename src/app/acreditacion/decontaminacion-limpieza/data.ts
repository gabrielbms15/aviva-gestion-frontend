import type { CriterioItem } from "@/components/MacroprocesoManagementClient";

export const criteriosDlde: CriterioItem[] = [
    {
        id: "DLDE1-1",
        label: "DLDE1-1",
        grupo: "DLDE1",
        definition: "Se cuenta con un manual de desinfección y esterilización acorde a su categoría y es conocido por el personal de todas las áreas responsables de este proceso.",
        scores: [
            { score: 0, description: "No se cuenta con manual de desinfección y esterilización acorde a la categoría del establecimiento." },
            { score: 1, description: "Existe manual de desinfección y esterilización oficial acorde a la categoría del establecimiento." },
            { score: 2, description: "Se verifica que el personal conoce las disposiciones contenidas en el manual oficializado sobre una muestra aleatoria de 10 trabajadores del área." },
        ],
    },
    {
        id: "DLDE1-2",
        label: "DLDE1-2",
        grupo: "DLDE1",
        definition: "El establecimiento cuenta con guía actualizada que describe los procedimientos de limpieza y desinfección de los ambientes físicos destinados al paciente, los enseres de cama, la ropa de pacientes y del personal de áreas de riesgo y es conocido por todo el personal.",
        scores: [
            { score: 0, description: "No se cuenta con guía actualizada sobre los procedimientos de limpieza." },
            { score: 1, description: "Existe guía oficial de procedimientos de limpieza." },
            { score: 2, description: "Se verifica que el personal conoce las disposiciones contenidas en la guía oficial sobre una muestra del 50% de trabajadores del área." },
        ],
    },
    {
        id: "DLDE1-3",
        label: "DLDE1-3",
        grupo: "DLDE1",
        definition: "El establecimiento tiene centralizado los procesos de limpieza, desinfección y esterilización de materiales y equipos.",
        scores: [
            { score: 0, description: "No se tiene centralizado los procesos de limpieza, desinfección y esterilización de materiales y equipos." },
            { score: 1, description: "No válido." },
            { score: 2, description: "Se verifica documentos que muestran que el proceso de limpieza, desinfección y esterilización está centralizado." },
        ],
    },
    {
        id: "DLDE2-1",
        label: "DLDE2-1",
        grupo: "DLDE2",
        definition: "El personal que manipula equipos y material usado se encuentra protegido según medidas establecidas.",
        scores: [
            { score: 0, description: "Se observa menos del 50% del personal que manipula equipos y material se encuentra protegido sobre una muestra aleatoria del 50% de trabajadores." },
            { score: 1, description: "Se observa entre el 50% y 90% del personal protegido sobre la misma muestra." },
            { score: 2, description: "Se observa más del 90% del personal protegido sobre la misma muestra." },
        ],
    },
    {
        id: "DLDE2-2",
        label: "DLDE2-2",
        grupo: "DLDE2",
        definition: "El personal en cada servicio clasifica y realiza la descontaminación y/o limpieza de los materiales, equipos usados de acuerdo con lo establecido en el manual de desinfección, esterilización y la norma de salud ocupacional.",
        scores: [
            { score: 0, description: "No se realiza la clasificación y decontaminación del material y equipos usados." },
            { score: 1, description: "Se observa la clasificación y decontaminación del material por parte del personal pero no de acuerdo al manual (uso de lista de chequeo)." },
            { score: 2, description: "Se observa la clasificación y decontaminación del material por parte del personal de acuerdo al manual (uso de lista de chequeo)." },
        ],
    },
    {
        id: "DLDE2-3",
        label: "DLDE2-3",
        grupo: "DLDE2",
        definition: "Se empaca y esteriliza el material/equipo de acuerdo con los procedimientos establecidos.",
        scores: [
            { score: 0, description: "No se cuenta con procedimientos de empaque del material / equipo o este es oficial solamente para el empaque." },
            { score: 1, description: "Se observa el empaque y esterilización del material / equipo sin relación a algún procedimiento oficial (con lista de chequeo)." },
            { score: 2, description: "Se observa el empaque y esterilización del material / equipo de acuerdo a procedimiento oficial (con lista de chequeo)." },
        ],
    },
    {
        id: "DLDE2-4",
        label: "DLDE2-4",
        grupo: "DLDE2",
        definition: "El establecimiento aplica controles físicos, químicos y biológicos en la esterilización de materiales y equipos.",
        scores: [
            { score: 0, description: "Se observa la aplicación de por lo menos un control (físico, químico o biológico) en la esterilización de materiales y equipos." },
            { score: 1, description: "Se observa la aplicación de por lo menos dos controles (físicos, químicos o biológicos) en la esterilización de materiales y equipos." },
            { score: 2, description: "Se observa la aplicación de los tres controles (físicos, químicos o biológicos) en la esterilización de materiales y equipos." },
        ],
    },
    {
        id: "DLDE2-5",
        label: "DLDE2-5",
        grupo: "DLDE2",
        definition: "Se establece un sistema de control de daños, pérdidas de materiales y equipos en cada área de esterilización y se registra en cada procedimiento de esterilización.",
        scores: [
            { score: 0, description: "No se cuenta con sistema de control de daños, pérdidas de materiales y equipos en cada área de esterilización." },
            { score: 1, description: "Documento oficial del sistema de control de daños, pérdidas de materiales y equipos presente en cada área de esterilización." },
            { score: 2, description: "Se lleva el control por escrito en cada área de esterilización en relación a los daños, pérdidas de materiales y equipos de acuerdo al sistema oficial." },
        ],
    },
    {
        id: "DLDE2-6",
        label: "DLDE2-6",
        grupo: "DLDE2",
        definition: "Se establece un sistema de control de pérdidas y deterioros innecesarios de enseres de cama y ropa y se aplica en cada procedimiento.",
        scores: [
            { score: 0, description: "No hay un sistema de control de pérdidas y deterioros innecesarios de enseres de cama y ropa." },
            { score: 1, description: "Documento oficial del sistema de control de pérdidas y deterioros." },
            { score: 2, description: "Se observa la implementación de disposiciones para el control de pérdidas y deterioros de enseres de cama y ropa." },
        ],
    },
    {
        id: "DLDE3-1",
        label: "DLDE3-1",
        grupo: "DLDE3",
        definition: "El personal que realiza la recolección y lavado de la ropa y enseres está debidamente protegido de acuerdo con la norma de salud ocupacional.",
        scores: [
            { score: 0, description: "Se observa menos del 60% de personal que realiza la recolección y lavado de la ropa debidamente protegido según normas de salud ocupacional sobre una muestra del 50% de trabajadores." },
            { score: 1, description: "Se observa entre el 60% y el 90% del personal debidamente protegido sobre la misma muestra." },
            { score: 2, description: "Se observa más del 90% del personal debidamente protegido sobre la misma muestra." },
        ],
    },
    {
        id: "DLDE3-2",
        label: "DLDE3-2",
        grupo: "DLDE3",
        definition: "Existe un procedimiento especial para el tratamiento de la ropa contaminada que es de conocimiento del personal de lavandería.",
        scores: [
            { score: 0, description: "No existe procedimiento especial para el tratamiento de ropa contaminada." },
            { score: 1, description: "Documento oficial del procedimiento especial para el tratamiento de ropa contaminada." },
            { score: 2, description: "Se verifica el conocimiento del personal del procedimiento oficial para el tratamiento de ropa contaminada sobre una muestra aleatoria del 50% de trabajadores." },
        ],
    },
    {
        id: "DLDE3-3",
        label: "DLDE3-3",
        grupo: "DLDE3",
        definition: "Se cuantifica el porcentaje de reclamos y quejas sobre el servicio de lavandería por problemas en la entrega, oportunidad (entre otros atributos) de los enseres de cama y ropa y se toman acciones correctivas.",
        scores: [
            { score: 0, description: "No se cuantifica el porcentaje de quejas y reclamos sobre el servicio de lavandería." },
            { score: 1, description: "Existe un Informe / Reporte del porcentaje de quejas y reclamos sobre el servicio de lavandería." },
            { score: 2, description: "Se observa la implementación de disposiciones orientadas a mejorar el servicio de lavandería sobre la base de las quejas y reclamos." },
        ],
    },
    {
        id: "DLDE3-4",
        label: "DLDE3-4",
        grupo: "DLDE3",
        definition: "Se realiza el almacenamiento de los enseres de cama y ropa de acuerdo con las normas vigentes.",
        scores: [
            { score: 0, description: "No se realiza el almacenamiento de los enseres y ropa de cama según normas." },
            { score: 1, description: "Se verifica que el personal conoce las normas para el almacenamiento de enseres y ropa de cama en una muestra aleatoria del 50% de trabajadores." },
            { score: 2, description: "Se observa el almacenamiento de los enseres y la ropa de cama según normas." },
        ],
    },
    {
        id: "DLDE4-1",
        label: "DLDE4-1",
        grupo: "DLDE4",
        definition: "El personal de limpieza está debidamente vestido y protegido según las medidas de bioseguridad y la norma de residuos sólidos.",
        scores: [
            { score: 0, description: "Se observa que menos del 60% del personal está debidamente vestido y protegido según normas de bioseguridad sobre una muestra aleatoria del 50% de trabajadores." },
            { score: 1, description: "Se observa protección del personal entre un 60% y un 90%, sobre igual muestra." },
            { score: 2, description: "Se observa que más del 90% del personal está debidamente vestido y protegido según normas de bioseguridad sobre igual muestra." },
        ],
    },
    {
        id: "DLDE4-2",
        label: "DLDE4-2",
        grupo: "DLDE4",
        definition: "El establecimiento cuenta y aplica procedimientos establecidos de segregación, acopio y disposición final de residuos sólidos.",
        scores: [
            { score: 0, description: "No se cuenta con procedimientos para la eliminación de residuos sólidos." },
            { score: 1, description: "Se verifica el procedimiento oficializado para la eliminación de residuos sólidos y se observa su implementación parcial (lista de chequeo)." },
            { score: 2, description: "Se observa la implementación del procedimiento oficial para la eliminación de residuos sólidos en todo el establecimiento (lista de chequeo)." },
        ],
    },
    {
        id: "DLDE4-3",
        label: "DLDE4-3",
        grupo: "DLDE4",
        definition: "La unidad de epidemiología y saneamiento ambiental y/o comité de infecciones intrahospitalarias y/o personal de enfermería participa(n) activamente en la elaboración y supervisión de aplicación de las normas de limpieza.",
        scores: [
            { score: 0, description: "La unidad de epidemiología y saneamiento ambiental no participan en la elaboración de normas de limpieza." },
            { score: 1, description: "Actas de reunión del personal de epidemiología y saneamiento ambiental para la elaboración de normas de limpieza." },
            { score: 2, description: "Informes de supervisión del cumplimiento de las normas de limpieza elaboradas de manera participativa." },
        ],
    },
    {
        id: "DLDE4-4",
        label: "DLDE4-4",
        grupo: "DLDE4",
        definition: "Se cuantifica la percepción de los usuarios (interno y externo) respecto a la limpieza del establecimiento de salud y se implementan acciones para su mejora.",
        scores: [
            { score: 0, description: "No se cuantifica la percepción de los usuarios (interno y externo) respecto a la limpieza del establecimiento." },
            { score: 1, description: "Evidencia documentaria de que se cuantifica la percepción de los usuarios respecto a la limpieza del establecimiento." },
            { score: 2, description: "Se verifica que se han implementado disposiciones dirigidas a mejorar la limpieza del establecimiento con base a los resultados de la percepción de los usuarios." },
        ],
    },
];

export const GRUPO_LABELS_DLDE: Record<string, string> = {
    DLDE1: "DLDE1 — Organización y Documentación",
    DLDE2: "DLDE2 — Operación y Control",
    DLDE3: "DLDE3 — Lavandería y Manejo de Ropa",
    DLDE4: "DLDE4 — Limpieza, Residuos y Saneamiento",
};
