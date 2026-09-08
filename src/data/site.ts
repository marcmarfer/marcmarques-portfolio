// Datos personales. Se usan en toda la web — edita aquí.
export const site = {
  nombre: "Marc Marqués",
  // Nombre completo, por si lo quieres en algún sitio
  nombreCompleto: "Marc Marqués Fernández",
  rol: "Ingeniero de software",
  // Ciudad: se muestra en la barra superior y en "Sobre mí".
  ciudad: "Barcelona",
  // Frase del hero (se parte en dos: la primera en gris, el resto en negro).
  claimLead: "Ingeniero de software full-stack.",
  claimMain:
    "Construyo productos web y automatizaciones con IA, con código {limpio} y sostenible.",
  descripcion:
    "Marc Marqués, ingeniero de software full-stack. Desarrollo web de principio a fin y automatizaciones con IA, con foco en código limpio y sostenible.",
  disponible: true,
  email: "hola@marcmarques.com",
  redes: {
    github: "https://github.com/marcmarfer",
    linkedin: "https://www.linkedin.com/in/marc-marques-fernandez",
  },
};

export type Site = typeof site;
