export const content = {
  es: {
    nav: {
      about: 'Sobre mí', services: 'Servicios',
      projects: 'Proyectos', skills: 'Skills', contact: 'Contacto',
    },
    hero: {
      greeting: 'Hola, soy',
      name: 'David Geo',
      title: 'Full Stack Developer',
      subtitle: 'Landing Pages & Web Apps',
      description: 'Convierto ideas en sitios web que generan resultados.',
      cta1: 'Ver mi trabajo', cta2: 'Contáctame',
      badge: 'Disponible para proyectos',
    },
    about: {
      label: 'Sobre mí',
      title: 'Desarrollador apasionado\npor el diseño y los resultados',
      p1: 'Soy un desarrollador web freelance basado en Colombia, especializado en construir experiencias digitales rápidas, modernas y que convierten visitantes en clientes.',
      p2: 'Trabajo con emprendedores, startups y marcas que necesitan presencia digital de calidad sin pagar precios de agencia. Me enfoco en proyectos que se vean bien, funcionen bien y generen resultados reales.',
      p3: 'Utilizo las mejores herramientas del mercado — incluyendo IA — para entregar proyectos de alta calidad en tiempos cortos.',
    },
    services: {
      label: 'Servicios',
      title: 'Lo que ofrezco',
      items: [
        {
          title: 'Landing Pages',
          desc: 'Diseñadas para convertir visitas en clientes. Velocidad máxima, copy persuasivo y diseño que genera confianza desde el primer scroll.',
          tags: ['Diseño a medida', 'SEO técnico', 'Alta velocidad', 'Responsive'],
        },
        {
          title: 'Sitios & Portafolios',
          desc: 'Tu presencia digital con identidad propia. Un sitio que te diferencia, refleja lo que eres y atrae exactamente al cliente que buscas.',
          tags: ['Marca personal', 'CMS opcional', 'Multi-página', 'Dominio propio'],
        },
        {
          title: 'Web Apps',
          desc: 'Herramientas digitales que resuelven problemas reales. Dashboards, sistemas internos y aplicaciones hechas para tu flujo de trabajo exacto.',
          tags: ['React + Python', 'Base de datos', 'Autenticación', 'APIs'],
        },
        {
          title: 'Mantenimiento & Soporte',
          desc: 'Tu sitio en manos expertas después del lanzamiento. Actualizaciones, corrección de errores, mejoras de rendimiento y soporte continuo.',
          tags: ['Actualizaciones', 'Soporte rápido', 'Backups', 'Monitoreo'],
        },
      ],
    },
    projects: {
      label: 'Proyectos',
      title: 'Mi trabajo',
      viewProject: 'Ver proyecto →',
      wip: 'Próximamente',
      wipDesc: 'Proyecto en desarrollo.',
    },
    skills: {
      label: 'Stack tecnológico',
      title: 'Tecnologías',
      aiNote: 'Trabajo con herramientas de IA para entregar proyectos de alta calidad en la mitad del tiempo.',
    },
    contact: {
      label: 'Contacto',
      title: 'Hablemos',
      description: '¿Tienes un proyecto en mente? Escríbeme y lo hacemos realidad.',
      name: 'Nombre', email: 'Correo', message: '¿En qué puedo ayudarte?',
      send: 'Enviar mensaje',
      orAt: 'O escríbeme directamente:',
      successTitle: '¡Mensaje enviado!',
      successDesc: 'Te respondo en menos de 24 horas.',
    },
    footer: {
      copy: '© 2026 David Geo. Todos los derechos reservados.',
      made: 'Hecho con pasión desde Colombia 🇨🇴',
    },
  },

  en: {
    nav: {
      about: 'About', services: 'Services',
      projects: 'Projects', skills: 'Skills', contact: 'Contact',
    },
    hero: {
      greeting: "Hi, I'm",
      name: 'David Geo',
      title: 'Full Stack Developer',
      subtitle: 'Landing Pages & Web Apps',
      description: 'I turn ideas into websites that deliver real results.',
      cta1: 'See my work', cta2: 'Contact me',
      badge: 'Available for projects',
    },
    about: {
      label: 'About me',
      title: 'Developer passionate\nabout design and results',
      p1: "I'm a freelance web developer based in Colombia, specialized in building digital experiences that are fast, modern, and convert visitors into clients.",
      p2: 'I work with entrepreneurs, startups and brands that need quality digital presence without paying agency prices. I focus on projects that look great, work great and drive real results.',
      p3: 'I leverage the best tools on the market — including AI — to deliver high-quality projects in short timeframes.',
    },
    services: {
      label: 'Services',
      title: 'What I offer',
      items: [
        {
          title: 'Landing Pages',
          desc: 'Built to turn visitors into clients. Maximum speed, persuasive copy and design that builds trust from the very first scroll.',
          tags: ['Custom design', 'Technical SEO', 'High performance', 'Responsive'],
        },
        {
          title: 'Sites & Portfolios',
          desc: 'Your digital presence with its own identity. A site that sets you apart, reflects who you are, and attracts exactly the right clients.',
          tags: ['Personal brand', 'Optional CMS', 'Multi-page', 'Custom domain'],
        },
        {
          title: 'Web Apps',
          desc: 'Digital tools that solve real problems. Dashboards, internal systems and applications tailored to your exact workflow.',
          tags: ['React + Python', 'Database', 'Auth flows', 'API integrations'],
        },
        {
          title: 'Maintenance & Support',
          desc: 'Expert hands on your site after launch. Updates, bug fixes, performance improvements and ongoing support whenever you need it.',
          tags: ['Updates', 'Fast support', 'Backups', 'Monitoring'],
        },
      ],
    },
    projects: {
      label: 'Projects',
      title: 'My work',
      viewProject: 'View project →',
      wip: 'Coming soon',
      wipDesc: 'Project in development.',
    },
    skills: {
      label: 'Tech stack',
      title: 'Technologies',
      aiNote: 'I use AI tools to deliver high-quality projects in half the time.',
    },
    contact: {
      label: 'Contact',
      title: "Let's talk",
      description: 'Have a project in mind? Write to me and let\'s make it happen.',
      name: 'Name', email: 'Email', message: 'How can I help you?',
      send: 'Send message',
      orAt: 'Or reach me directly:',
      successTitle: 'Message sent!',
      successDesc: "I'll get back to you within 24 hours.",
    },
    footer: {
      copy: '© 2026 David Geo. All rights reserved.',
      made: 'Made with passion from Colombia 🇨🇴',
    },
  },
}

export const projects = [
  {
    name: 'La Milpa',
    desc: {
      es: 'Landing page para restaurante mexicano moderno. Hero animado, menú interactivo, galería con lightbox y formulario de reservación.',
      en: 'Landing page for a modern Mexican restaurant. Animated hero, interactive menu, lightbox gallery and reservation form.',
    },
    tech: ['React', 'Vite', 'Tailwind CSS'],
    url: 'https://la-milpa.vercel.app',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
  },
  {
    name: 'Estimador',
    desc: {
      es: 'Simulador de presupuesto para proyectos web freelance. El cliente configura tipo, alcance y plazo — el estimado se calcula en vivo. Estética blueprint editorial.',
      en: 'Freelance project budget simulator. The client configures type, scope and timeline — the estimate is calculated live. Editorial blueprint aesthetic.',
    },
    tech: ['React', 'Vite', 'Tailwind CSS'],
    url: 'https://simulador-presupuesto-freelance.vercel.app',
    image: 'https://image.thum.io/get/width/1200/crop/800/https://simulador-presupuesto-freelance.vercel.app',
  },
  { wip: true },
]

export const skills = [
  { name: 'HTML & CSS',   color: '#E34F26' },
  { name: 'JavaScript',  color: '#F7DF1E' },
  { name: 'React',       color: '#61DAFB' },
  { name: 'Python',      color: '#3776AB' },
  { name: 'Dart',        color: '#0175C2' },
  { name: 'Git & GitHub',color: '#F05032' },
  { name: 'Vite',        color: '#646CFF' },
  { name: 'Tailwind CSS',color: '#06B6D4' },
  { name: 'AI Tools',    color: '#6EE7B7' },
]
