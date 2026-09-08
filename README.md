# Portafolio — Marc Marqués

Sitio web personal construido con [Astro](https://astro.build) y
[Tailwind CSS v4](https://tailwindcss.com). Diseño minimalista editorial, una sola
página, con modo claro/oscuro conmutable.

## Puesta en marcha

```bash
npm install
npm run dev      # http://localhost:4321
```

| Comando           | Acción                                    |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Servidor de desarrollo                     |
| `npm run build`   | Build de producción en `dist/`            |
| `npm run preview` | Sirve el build para revisarlo             |
| `npm run check`   | Comprobación de tipos de Astro            |

## Cómo personalizar

| Qué                                                   | Dónde                          |
| ----------------------------------------------------- | ------------------------------ |
| Nombre, rol, ciudad, frase del hero, email, redes      | `src/data/site.ts`             |
| Proyectos (plantilla — sustituir por los reales)       | `src/data/proyectos.ts`        |
| Tecnologías del carrusel                               | `src/data/stack.ts`            |
| Iconos del carrusel                                    | `src/data/stackIcons.ts` (paths de simple-icons; regenerar con `gen-icons.mjs`) |
| Texto de "Sobre mí"                                    | `src/components/Sobre.astro`   |
| Colores del tema (claro y oscuro)                      | `src/styles/global.css` (`:root` y `:root.dark`) |
| Favicon                                               | `public/favicon.svg`           |
| Dominio (SEO / canonical)                              | `astro.config.mjs` → `site`    |

### Notas

- **Ciudad:** ahora mismo es `[Ciudad]` en `src/data/site.ts`. Se muestra en la
  barra superior (junto al reloj) y en "Sobre mí".
- **Frase del hero:** en `site.ts`, `claimMain` usa `{llaves}` para marcar la
  palabra que va en cursiva serif. Ej.: `código {limpio} y sostenible.`
- **Proyectos:** cada entrada acepta `periodo`, `titulo`, `descripcion`, `tags[]`
  y `url` opcional. Si `url` está vacío, la fila se muestra sin enlace ni flecha.
- Los iconos del stack son los oficiales de [simple-icons](https://simpleicons.org)
  (licencia CC0), monocromos con `fill: currentColor`. Para añadir/quitar: edita el
  mapa `map` de `gen-icons.mjs`, deja los `.svg` en una carpeta y ejecútalo.

## Estructura

```
src/
├── components/   Header · ThemeToggle · Hero · Sobre · Stack · Proyectos · Footer
├── data/         site.ts · proyectos.ts · stack.ts
├── layouts/      Base.astro (head, SEO, script de tema, reloj)
├── pages/        index.astro
└── styles/       global.css (tokens, base, carrusel)
```

## Despliegue

`npm run build` genera un sitio estático en `dist/`, desplegable tal cual en
Netlify, Vercel, Cloudflare Pages o GitHub Pages.
