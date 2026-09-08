export interface Proyecto {
  titulo: string;
  descripcion: string;
  /** Tecnologías separadas visualmente por · */
  tags: string[];
  /** Año o periodo */
  periodo: string;
  /** Enlace (repo, caso de estudio, demo...). Vacío = fila sin enlace. */
  url?: string;
}

// PLANTILLA — sustituye por tus proyectos reales cuando los tengas.
export const proyectos: Proyecto[] = [
  {
    periodo: "2025",
    titulo: "Proyecto destacado",
    descripcion: "Una línea sobre qué resuelve el proyecto y cuál fue tu rol.",
    tags: ["Astro", "TypeScript", "Supabase"],
    url: "",
  },
  {
    periodo: "2025",
    titulo: "Segundo proyecto",
    descripcion: "Breve descripción del proyecto y del problema que aborda.",
    tags: ["React", "Node.js", "MySQL"],
    url: "",
  },
  {
    periodo: "2024",
    titulo: "Proyecto de cliente",
    descripcion: "Qué construiste, con qué stack y qué resultado tuvo.",
    tags: ["Vue", "Laravel", "Docker"],
    url: "",
  },
  {
    periodo: "2024",
    titulo: "Experimento personal",
    descripcion: "Una idea que exploraste y qué aprendiste por el camino.",
    tags: ["React", "Tailwind", "Vite"],
    url: "",
  },
];
