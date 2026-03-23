// ─── Types ────────────────────────────────────────────────────────────────────

export type DocumentType =
  | "Manual"
  | "Procedimiento"
  | "Proceso"
  | "Consentimiento Informado"
  | "Politica"
  | "Reglamento"
  | "Plan"
  | "Protocolo"
  | "Informe";

export interface ServiceDocument {
  title: string;
  url: string;
}

export interface ServiceData {
  label: string;
  section: "upss" | "ups";
  image?: string;
  documents: Partial<Record<DocumentType, ServiceDocument[]>>;
}

// ─── UPSS – Unidades de Servicios de Salud ────────────────────────────────────

export const services: Record<string, ServiceData> = {
  "consulta-externa": {
    label: "Consulta Externa",
    section: "upss",
    documents: {
      Manual: [
        { title: "Manual de Organización y Funciones", url: "#" },
        { title: "Manual de Calidad", url: "#" },
      ],
      Procedimiento: [
        { title: "Procedimiento de Atención al Paciente", url: "#" },
      ],
      Proceso: [
        { title: "Proceso de Admisión y Triaje", url: "#" },
      ],
    },
  },
  "central-de-esterilizacion": {
    label: "Central de Esterilización",
    section: "upss",
    documents: {
      Manual: [
        { title: "Manual de Esterilización y Desinfección", url: "#" },
      ],
      Procedimiento: [
        { title: "Procedimiento de Esterilización por Autoclave", url: "#" },
        { title: "Procedimiento de Esterilización por Óxido de Etileno", url: "#" },
      ],
      Protocolo: [
        { title: "Protocolo de Control de Calidad en Esterilización", url: "#" },
      ],
    },
  },
  "centro-quirurgico": {
    label: "Centro Quirúrgico",
    section: "upss",
    image: "/cequ.webp",
    documents: {
      Manual: [
        { title: "Manual de Procedimientos Quirúrgicos", url: "#" },
        { title: "Manual de Uso de Equipos Quirúrgicos", url: "#" },
      ],
      Procedimiento: [
        { title: "Procedimiento de Preparación Preoperatoria", url: "#" },
        { title: "Procedimiento de Antisepsia del Campo Operatorio", url: "#" },
      ],
      Proceso: [
        { title: "Proceso de Gestión Quirúrgica", url: "#" },
      ],
      "Consentimiento Informado": [
        { title: "Consentimiento Informado General para Cirugía", url: "#" },
        { title: "Consentimiento Informado para Anestesia", url: "#" },
      ],
    },
  },
  "centro-obstetrico": {
    label: "Centro Obstétrico",
    section: "upss",
    documents: {
      Procedimiento: [
        { title: "Procedimiento de Atención del Parto Normal", url: "#" },
        { title: "Procedimiento de Atención del Parto por Cesárea", url: "#" },
      ],
      Protocolo: [
        { title: "Protocolo de Manejo de Hemorragia Postparto", url: "#" },
      ],
      "Consentimiento Informado": [
        { title: "Consentimiento Informado para Parto", url: "#" },
      ],
    },
  },
  "emergencia": {
    label: "Emergencia",
    section: "upss",
    documents: {
      Manual: [
        { title: "Manual de Atención en Emergencias", url: "#" },
      ],
      Procedimiento: [
        { title: "Procedimiento de Triage Hospitalario", url: "#" },
        { title: "Procedimiento de Reanimación Cardiopulmonar", url: "#" },
      ],
      Protocolo: [
        { title: "Protocolo de Código Azul", url: "#" },
        { title: "Protocolo de Código Rojo", url: "#" },
      ],
      Plan: [
        { title: "Plan de Contingencia ante Desastres", url: "#" },
      ],
    },
  },
  "hospitalizacion": {
    label: "Hospitalización",
    section: "upss",
    documents: {
      Manual: [
        { title: "Manual de Enfermería en Hospitalización", url: "#" },
      ],
      Procedimiento: [
        { title: "Procedimiento de Administración de Medicamentos", url: "#" },
        { title: "Procedimiento de Manejo de Vía Venosa Periférica", url: "#" },
      ],
      Plan: [
        { title: "Plan de Cuidados de Enfermería", url: "#" },
      ],
    },
  },
  "farmacia": {
    label: "Farmacia",
    section: "upss",
    documents: {
      Manual: [
        { title: "Manual de Buenas Prácticas de Almacenamiento", url: "#" },
        { title: "Manual de Dispensación de Medicamentos", url: "#" },
      ],
      Procedimiento: [
        { title: "Procedimiento de Dispensación de Medicamentos Controlados", url: "#" },
        { title: "Procedimiento de Gestión de Stock", url: "#" },
      ],
      Proceso: [
        { title: "Proceso de Adquisición de Medicamentos", url: "#" },
      ],
    },
  },
  "unidad-de-cuidados-intensivos": {
    label: "Unidad de Cuidados Intensivos",
    section: "upss",
    documents: {
      Manual: [
        { title: "Manual de Atención en UCI", url: "#" },
      ],
      Procedimiento: [
        { title: "Procedimiento de Intubación Orotraqueal", url: "#" },
        { title: "Procedimiento de Manejo de Ventilador Mecánico", url: "#" },
      ],
      Protocolo: [
        { title: "Protocolo de Prevención de IAAS", url: "#" },
        { title: "Protocolo de Sedoanalgesia", url: "#" },
      ],
    },
  },
  "nutricion-y-dietetica": {
    label: "Nutrición y Dietética",
    section: "upss",
    documents: {
      Manual: [
        { title: "Manual de Nutrición Clínica", url: "#" },
      ],
      Procedimiento: [
        { title: "Procedimiento de Evaluación Nutricional", url: "#" },
      ],
    },
  },
  "diagnostico-por-imagenes": {
    label: "Diagnóstico por Imágenes",
    section: "upss",
    image: "/imag.webp",
    documents: {
      Manual: [
        { title: "Manual de Procedimientos en Radiología", url: "#" },
        { title: "Manual de Radioprotección", url: "#" },
      ],
      Procedimiento: [
        { title: "Procedimiento de Tomografía Computarizada", url: "#" },
        { title: "Procedimiento de Resonancia Magnética", url: "#" },
        { title: "Procedimiento de Ecografía General", url: "#" },
      ],
    },
  },
  "laboratorio": {
    label: "Laboratorio (Patología Clínica)",
    section: "upss",
    documents: {
      Manual: [
        { title: "Manual de Procedimientos de Laboratorio", url: "#" },
        { title: "Manual de Bioseguridad en Laboratorio", url: "#" },
      ],
      Procedimiento: [
        { title: "Procedimiento de Toma de Muestra de Sangre", url: "#" },
        { title: "Procedimiento de Hemocultivo", url: "#" },
      ],
      Protocolo: [
        { title: "Protocolo de Control de Calidad Analítico", url: "#" },
      ],
    },
  },
  "anatomia-patologica": {
    label: "Anatomia Patologica",
    section: "upss",
    documents: {
      Manual: [
        { title: "Manual de Procedimientos en Anatomía Patológica", url: "#" },
      ],
      Procedimiento: [
        { title: "Procedimiento de Biopsia por Punción", url: "#" },
      ],
      Informe: [
        { title: "Modelo de Informe Anatomopatológico", url: "#" },
      ],
    },
  },
  "hemoterapia-y-banco-de-sangre": {
    label: "Hemoterapia y Banco de Sangre",
    section: "upss",
    documents: {
      Manual: [
        { title: "Manual de Banco de Sangre", url: "#" },
      ],
      Procedimiento: [
        { title: "Procedimiento de Donación de Sangre", url: "#" },
        { title: "Procedimiento de Transfusión Sanguínea", url: "#" },
      ],
      Protocolo: [
        { title: "Protocolo de Reacción Transfusional", url: "#" },
      ],
    },
  },
  "medicina-fisica-y-rehabilitacion": {
    label: "Medicina Física y Rehabilitación",
    section: "upss",
    documents: {
      Manual: [
        { title: "Manual de Rehabilitación Motora", url: "#" },
      ],
      Procedimiento: [
        { title: "Procedimiento de Electroterapia", url: "#" },
        { title: "Procedimiento de Kinesioterapia", url: "#" },
      ],
    },
  },

  // ─── UPS – Unidades de Servicios Generales ──────────────────────────────────

  "equipamiento-e-infraestructura": {
    label: "Equipamiento e Infraestructura",
    section: "ups",
    image: "/mant.webp",
    documents: {
      Manual: [
        { title: "Manual de Gestión de Equipos Biomédicos", url: "#" },
        { title: "Manual de Mantenimiento Preventivo", url: "#" },
      ],
      Procedimiento: [
        { title: "Procedimiento de Calibración de Equipos", url: "#" },
      ],
      Plan: [
        { title: "Plan de Mantenimiento Anual", url: "#" },
      ],
    },
  },
  "gestion-de-la-informacion": {
    label: "Gestión de la Información",
    section: "ups",
    documents: {
      Manual: [
        { title: "Manual de Gestión Documental", url: "#" },
      ],
      Procedimiento: [
        { title: "Procedimiento de Archivo de Historias Clínicas", url: "#" },
      ],
    },
  },
  "lavanderia-y-roperia": {
    label: "Lavandería y Ropería",
    section: "ups",
    documents: {
      Manual: [
        { title: "Manual de Lavandería Hospitalaria", url: "#" },
      ],
      Procedimiento: [
        { title: "Procedimiento de Clasificación de Ropa Sucia", url: "#" },
      ],
    },
  },
  "limpieza-y-desinfeccion": {
    label: "Limpieza y Desinfección",
    section: "ups",
    documents: {
      Manual: [
        { title: "Manual de Limpieza y Desinfección Hospitalaria", url: "#" },
      ],
      Procedimiento: [
        { title: "Procedimiento de Limpieza de Áreas Críticas", url: "#" },
        { title: "Procedimiento de Desinfección Terminal", url: "#" },
      ],
    },
  },
  "mantenimiento": {
    label: "Mantenimiento",
    section: "ups",
    documents: {
      Manual: [
        { title: "Manual de Mantenimiento de Infraestructura", url: "#" },
      ],
      Plan: [
        { title: "Plan de Mantenimiento Correctivo", url: "#" },
      ],
    },
  },
  "residuos-solidos": {
    label: "Residuos Sólidos",
    section: "ups",
    documents: {
      Manual: [
        { title: "Manual de Gestión de Residuos Sólidos", url: "#" },
      ],
      Procedimiento: [
        { title: "Procedimiento de Segregación de Residuos", url: "#" },
      ],
      Plan: [
        { title: "Plan de Manejo de Residuos", url: "#" },
      ],
    },
  },
  "salud-ambiental": {
    label: "Salud Ambiental",
    section: "ups",
    documents: {
      Manual: [
        { title: "Manual de Salud e Higiene Ambiental", url: "#" },
      ],
      Procedimiento: [
        { title: "Procedimiento de Desratización y Desinsectación", url: "#" },
      ],
    },
  },
  "seguridad-y-vigilancia": {
    label: "Seguridad y Vigilancia",
    section: "ups",
    documents: {
      Manual: [
        { title: "Manual de Seguridad Institucional", url: "#" },
      ],
      Plan: [
        { title: "Plan de Seguridad y Vigilancia", url: "#" },
      ],
      Reglamento: [
        { title: "Reglamento de Acceso a Instalaciones", url: "#" },
      ],
    },
  },
  "soporte-tecnologico": {
    label: "Soporte Tecnológico",
    section: "ups",
    documents: {
      Manual: [
        { title: "Manual de Soporte de TI", url: "#" },
      ],
      Procedimiento: [
        { title: "Procedimiento de Gestión de Incidentes Tecnológicos", url: "#" },
      ],
    },
  },
  "transporte": {
    label: "Transporte",
    section: "ups",
    documents: {
      Manual: [
        { title: "Manual de Uso del Vehículo Institucional", url: "#" },
      ],
      Procedimiento: [
        { title: "Procedimiento de Transporte de Pacientes", url: "#" },
      ],
    },
  },
  "admision": {
    label: "Admisión",
    section: "ups",
    documents: {
      Manual: [
        { title: "Manual de Admisión de Pacientes", url: "#" },
      ],
      Procedimiento: [
        { title: "Procedimiento de Registro de Paciente Nuevo", url: "#" },
      ],
    },
  },
  "archivo-clinico": {
    label: "Archivo Clínico",
    section: "ups",
    documents: {
      Manual: [
        { title: "Manual de Gestión de Historias Clínicas", url: "#" },
      ],
      Procedimiento: [
        { title: "Procedimiento de Archivo y Recuperación de HC", url: "#" },
      ],
      Reglamento: [
        { title: "Reglamento de Acceso a Historias Clínicas", url: "#" },
      ],
    },
  },
  "caja": {
    label: "Caja",
    section: "ups",
    documents: {
      Manual: [
        { title: "Manual de Caja y Cobranza", url: "#" },
      ],
      Procedimiento: [
        { title: "Procedimiento de Cobro y Facturación", url: "#" },
      ],
    },
  },
  "seguros": {
    label: "Seguros",
    section: "ups",
    documents: {
      Manual: [
        { title: "Manual de Gestión de Seguros Médicos", url: "#" },
      ],
      Procedimiento: [
        { title: "Procedimiento de Liquidación con Aseguradoras", url: "#" },
      ],
    },
  },
};
