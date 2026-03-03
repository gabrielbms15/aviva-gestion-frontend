import { CriterioItem } from "@/components/MacroprocesoManagementClient";

export const criteriosNyc: CriterioItem[] = [
    {
        id: "NYC1-1",
        label: "NYC1-1",
        grupo: "NYC1",
        definition: "Se cuenta con un manual actualizado y disponible de normas y procedimientos técnico-administrativos de la atención nutricional y dietética.",
        scores: [
            { score: 0, description: "No se cuenta con manual actualizado de normas y procedimientos técnico-administrativos de la atención nutricional y dietética." },
            { score: 1, description: "Manual de normas y procedimientos para la atención nutricional es oficial." },
            { score: 2, description: "Manual de normas y procedimientos para la atención nutricional oficial está disponible al personal." },
        ],
    },
    {
        id: "NYC1-2",
        label: "NYC1-2",
        grupo: "NYC1",
        definition: "Se cuenta con personal de nutrición capacitado durante el último año.",
        scores: [
            { score: 0, description: "Evidencia documentaria de que menos del 50% del personal de nutrición ha sido capacitado durante el último año." },
            { score: 1, description: "Evidencia de capacitación entre el 50% a 80% del personal de nutrición durante el último año." },
            { score: 2, description: "Evidencia de capacitación a más del 80% del personal de nutrición durante el último año." },
        ],
    },
    {
        id: "NYC1-3",
        label: "NYC1-3",
        grupo: "NYC1",
        definition: "Se han determinado y se cumplen horarios para la distribución de las dietas a los servicios.",
        scores: [
            { score: 0, description: "No se han determinado horarios para la distribución de dietas." },
            { score: 1, description: "Documento oficial que establece los horarios de distribución de dietas." },
            { score: 2, description: "Se observa que la distribución de dietas se realiza de acuerdo a las disposiciones Oficiales según normatividad." },
        ],
    },
    {
        id: "NYC1-4",
        label: "NYC1-4",
        grupo: "NYC1",
        definition: "El establecimiento cuenta normas de manipulación de alimentos y éstas se aplican.",
        scores: [
            { score: 0, description: "No se cuenta con normas para manipulación de alimentos." },
            { score: 1, description: "Documento oficial que establece las normas para manipulación de alimentos." },
            { score: 2, description: "Se observa la manipulación de alimentos cumple todas las disposiciones oficiales." },
        ],
    },
    {
        id: "NYC1-5",
        label: "NYC1-5",
        grupo: "NYC1",
        definition: "El establecimiento aplica buenas prácticas de almacenamiento de víveres perecibles y no perecibles.",
        scores: [
            { score: 0, description: "No se aplican buenas prácticas de almacenamiento de víveres." },
            { score: 1, description: "Se observa in situ la aplicación de buenas prácticas de almacenamiento solamente para algunos víveres." },
            { score: 2, description: "Se observa in situ la aplicación de buenas prácticas de almacenamiento para todos los víveres." },
        ],
    },
    {
        id: "NYC1-6",
        label: "NYC1-6",
        grupo: "NYC1",
        definition: "El establecimiento cuenta con mecanismos de información y educación a los usuarios y familiares sobre los requerimientos nutricionales de acuerdo con sus necesidades y éstos se aplican.",
        scores: [
            { score: 0, description: "No se cuenta con mecanismos de información y educación a los usuarios y familiares sobre los requerimientos nutricionales." },
            { score: 1, description: "Documentación oficial de mecanismos oficiales para la información y educación a los usuarios y familiares sobre los requerimientos nutricionales." },
            { score: 2, description: "Se obtiene respuesta afirmativa sobre información a pacientes y familiares respecto a requerimientos nutricionales con preguntas realizadas a una muestra aleatoria de 10 individuos." },
        ],
    },
    {
        id: "NYC2-1",
        label: "NYC2-1",
        grupo: "NYC2",
        definition: "El servicio de nutrición cuenta con un listado de regímenes estándar por patologías prevalentes que se encuentran detallados con composición de nutrientes, prescripciones dietéticas y menús diarios.",
        scores: [
            { score: 0, description: "No se cuenta con listado oficial de regímenes estándar por patologías prevalentes detallado por composición de nutrientes." },
            { score: 1, description: "Documento oficial de listado de regímenes estándar por patologías prevalentes." },
            { score: 2, description: "Documento oficial de listado de regímenes estándar por patologías prevalentes detallado por composición de nutrientes." },
        ],
    },
    {
        id: "NYC2-2",
        label: "NYC2-2",
        grupo: "NYC2",
        definition: "El personal de enfermería/obstetricia verifica y registra la concordancia entre los menús del día y las distintas indicaciones dietéticas.",
        scores: [
            { score: 0, description: "Se observa que el personal de enfermería / obstetricia desconoce como verificar la concordancia entre el menú del día y las indicaciones dietéticas en una muestra aleatoria de 10 pacientes." },
            { score: 1, description: "Se observa que el personal de enfermería / obstetricia verificar la concordancia entre el menú del día y las indicaciones dietéticas en una muestra aleatoria de 10 pacientes." },
            { score: 2, description: "Se observa que el personal de enfermería / obstetricia verifica y registra la concordancia entre el menú del día y las indicaciones dietéticas en una muestra aleatoria de 10 pacientes." },
        ],
    },
    {
        id: "NYC2-3",
        label: "NYC2-3",
        grupo: "NYC2",
        definition: "El profesional de nutrición efectúa la visita diaria a los pacientes con dietas especiales.",
        scores: [
            { score: 0, description: "El personal de nutrición no realiza visitas a los pacientes con dietas especiales." },
            { score: 1, description: "Evidencia documentaria de visitas a pacientes con dietas especiales por parte del personal de nutrición." },
            { score: 2, description: "Evidencia documentaria de visitas diarias a pacientes con dietas especiales por parte del personal de nutrición." },
        ],
    },
    {
        id: "NYC2-4",
        label: "NYC2-4",
        grupo: "NYC2",
        definition: "Se lleva registro del porcentaje de quejas y reclamos de los usuarios y se adoptan medidas correctivas.",
        scores: [
            { score: 0, description: "No se registra el porcentaje de quejas y reclamos de los usuarios respecto a los regímenes dietéticos." },
            { score: 1, description: "Evidencia documentaria del registro oficial del porcentaje de quejas y reclamos de los usuarios." },
            { score: 2, description: "Evidencia documentaria de la implementación de medidas acordes al registro de quejas o reclamos de los usuarios." },
        ],
    },
];

export const GRUPO_LABELS_NYC: Record<string, string> = {
    NYC1: "NYC1 — Organización y Funcionamiento",
    NYC2: "NYC2 — Atención Nutricional",
};
