// Genera src/data/stackIcons.ts a partir de SVGs de simple-icons.
//
//   1. Descarga los .svg que quieras (slug de https://simpleicons.org):
//        curl -sfL https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/react.svg -o icons-src/react.svg
//   2. Ajusta el mapa `slugToName` de abajo (slug de archivo -> nombre en src/data/stack.ts)
//   3. node gen-icons.mjs [carpeta]   (por defecto: ./icons-src)
import { readFileSync, writeFileSync } from "node:fs";

const slugToName = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  react: "React",
  vuedotjs: "Vue",
  astro: "Astro",
  nodedotjs: "Node.js",
  laravel: "Laravel",
  tailwindcss: "Tailwind CSS",
  supabase: "Supabase",
  mysql: "MySQL",
  docker: "Docker",
  vite: "Vite",
  git: "Git",
  figma: "Figma",
};

const dir = process.argv[2] || "./icons-src";
const out = {};
for (const [slug, name] of Object.entries(slugToName)) {
  const svg = readFileSync(`${dir}/${slug}.svg`, "utf8");
  const d = svg.match(/ d="([^"]+)"/)?.[1];
  if (!d) throw new Error(`sin <path d> en ${slug}.svg`);
  out[name] = d;
}

writeFileSync(
  "src/data/stackIcons.ts",
  "// Iconos de marca (simple-icons, CC0). viewBox 0 0 24 24, path único, fill currentColor.\n" +
    "// Generado por gen-icons.mjs — no editar a mano.\n" +
    `export const stackIconPaths: Record<string, string> = ${JSON.stringify(out, null, 2)};\n`,
);
console.log(`src/data/stackIcons.ts — ${Object.keys(out).length} iconos`);
