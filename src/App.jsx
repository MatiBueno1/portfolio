import { useState, useEffect, useRef } from "react";


// ─── EmailJS config (variables de entorno) ───────────────────────────────────
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// ─── Translations ─────────────────────────────────────────────────────────────
const t = {
  es: {
    nav: ["Sobre mí", "Proyectos", "Estudios", "Contacto"],
    navIds: ["about", "projects", "studies", "contact"],
    heroGreet: "Hola, soy",
    heroName: "Matias Bueno",
    heroRole: "Software Developer",
    heroSub: "Apasionado por construir soluciones reales.",
    heroLocation: "Rosario, Argentina",
    heroCta1: "Ver Proyectos",
    heroCta2: "Contactarme",
    openToWork: "● OPEN TO WORK",
    aboutTag: "SOBRE MÍ",
    aboutTitle: "Construyo APIs.\nPienso en el usuario.",
    aboutP1: "Llevo programando desde 2023, estudiando Desarrollo de Software en el Instituto Belgrano. Me apasiona la arquitectura limpia, las APIs y la lógica del servidor.",
    aboutP2: "Complementé mi formación con cursos en la UTN (Full Stack) y un curso de Python en Siemens. Me gusta resolver problemas reales que requieran profundidad técnica.",
    skillsTitle: "STACK TECNOLÓGICO",
    projectsTag: "PROYECTOS",
    viewRepo: "Ver repositorio",
    noRepo: "Repositorio privado",
    projects: [
      { num: "01", title: "Sistema de Control de Canchas", year: "2025", desc: "API REST para gestión de reservas de canchas de fútbol. Lista de espera, notificaciones por WhatsApp cuando se libera un turno y panel de estadísticas para el admin.", tags: [".NET 10", "SQL Server", "Docker", "Railway"], highlight: true, repo: "https://github.com/MatiBueno1/lamasia" },
      { num: "02", title: "Sistema de Control de Gastos", year: "2024", desc: "App full-stack de finanzas personales con dashboard de ingresos/gastos y filtrado mensual.", tags: [".NET Core", "React", "SQL Server", "Bootstrap"], repo: "https://github.com/MatiBueno1/Sistema-control-gastos" },
    ],
    studiesTag: "ESTUDIOS",
    timeline: [
      { year: "2023 –\nPresente", title: "Desarrollo de Software", org: "Instituto Belgrano", desc: "Carrera técnica enfocada en desarrollo full-stack, bases de datos y arquitectura de software." },
      { year: "2023 –\n2024", title: "Full Stack Web Development", org: "UTN", desc: "Certificado profesional universitario con enfoque en tecnologías web modernas." },
      { year: "2025", title: "Curso de Python", org: "Siemens SA", desc: "Programación aplicada en Python en contexto industrial." },
    ],
    contactTag: "CONTACTO",
    contactTitle: "Hablemos.",
    contactSub: "Busco mi primera experiencia profesional. Abierto a roles junior, trainee e internships.",
    formName: "Nombre", formEmail: "Email", formMsg: "Mensaje",
    formBtn: "Enviar mensaje",
    formSending: "Enviando...",
    formError: "Por favor completá todos los campos.",
    formSuccess: "¡Mensaje enviado! Te respondo pronto.",
    formFail: "Hubo un error. Intentá de nuevo.",
    labelEmail: "EMAIL", labelLocation: "UBICACIÓN", labelLinks: "LINKS",
    location: "Rosario, Santa Fe, Argentina",
    footerLeft: "© 2026 Matias Bueno",
  },
  en: {
    nav: ["About", "Projects", "Studies", "Contact"],
    navIds: ["about", "projects", "studies", "contact"],
    heroGreet: "Hi, I'm",
    heroName: "Matias Bueno",
    heroRole: "Software Developer",
    heroSub: "Passionate about building real solutions.",
    heroLocation: "Rosario, Argentina",
    heroCta1: "View Projects",
    heroCta2: "Get in touch",
    openToWork: "● OPEN TO WORK",
    aboutTag: "ABOUT",
    aboutTitle: "I build APIs.\nI think about the user.",
    aboutP1: "I've been building software since 2023, studying Software Development at Instituto Belgrano. I'm passionate about clean architecture, APIs, and server-side logic.",
    aboutP2: "Complemented my education with courses at UTN (Full Stack) and a Python course at Siemens. I enjoy working on real problems that require technical depth.",
    skillsTitle: "TECH STACK",
    projectsTag: "PROJECTS",
    viewRepo: "View repository",
    noRepo: "Private repository",
    projects: [
      { num: "01", title: "Court Management System", year: "2025", desc: "REST API for football court reservation management. Waitlist system, WhatsApp notifications when a slot opens, and admin stats dashboard.", tags: [".NET 10", "SQL Server", "Docker", "Railway"], highlight: true, repo: "https://github.com/MatiBueno1/lamasia" },
      { num: "02", title: "Expense Control System", year: "2024", desc: "Full-stack personal finance app with income/expense dashboard and monthly filtering.", tags: [".NET Core", "React", "SQL Server", "Bootstrap"], repo: "https://github.com/MatiBueno1/Sistema-control-gastos" },
    ],
    studiesTag: "STUDIES",
    timeline: [
      { year: "2023 –\nPresent", title: "Software Developer", org: "Instituto Belgrano", desc: "Technical degree covering full-stack development, databases, and software architecture." },
      { year: "2023 –\n2024", title: "Full Stack Web Development", org: "UTN", desc: "University professional certificate focused on modern web technologies." },
      { year: "2025", title: "Python Course", org: "Siemens SA", desc: "Applied Python programming in an industry context." },
    ],
    contactTag: "CONTACT",
    contactTitle: "Let's talk.",
    contactSub: "Looking for my first professional opportunity. Open to junior roles, trainee programs, and internships.",
    formName: "Name", formEmail: "Email", formMsg: "Message",
    formBtn: "Send message",
    formSending: "Sending...",
    formError: "Please fill all fields.",
    formSuccess: "Message sent! I'll get back to you soon.",
    formFail: "Something went wrong. Please try again.",
    labelEmail: "EMAIL", labelLocation: "LOCATION", labelLinks: "LINKS",
    location: "Rosario, Santa Fe, Argentina",
    footerLeft: "© 2026 Matias Bueno",
  },
  pt: {
    nav: ["Sobre mim", "Projetos", "Estudos", "Contato"],
    navIds: ["about", "projects", "studies", "contact"],
    heroGreet: "Olá, sou",
    heroName: "Matias Bueno",
    heroRole: "Software Developer",
    heroSub: "Apaixonado por construir soluções reais.",
    heroLocation: "Rosario, Argentina",
    heroCta1: "Ver Projetos",
    heroCta2: "Entrar em contato",
    openToWork: "● OPEN TO WORK",
    aboutTag: "SOBRE MIM",
    aboutTitle: "Construo APIs.\nPenso no usuário.",
    aboutP1: "Desenvolvo software desde 2023, estudando Desenvolvimento de Software no Instituto Belgrano. Sou apaixonado por arquitetura limpa, APIs e lógica de servidor.",
    aboutP2: "Complementei minha formação com cursos na UTN (Full Stack) e um curso de Python na Siemens. Gosto de resolver problemas reais que exigem profundidade técnica.",
    skillsTitle: "STACK TECNOLÓGICO",
    projectsTag: "PROJETOS",
    viewRepo: "Ver repositório",
    noRepo: "Repositório privado",
    projects: [
      { num: "01", title: "Sistema de Controle de Quadras", year: "2025", desc: "API REST para gestão de reservas de quadras de futebol. Lista de espera, notificações via WhatsApp e painel de estatísticas para o admin.", tags: [".NET 10", "SQL Server", "Docker", "Railway"], highlight: true, repo: "https://github.com/MatiBueno1/lamasia" },
      { num: "02", title: "Sistema de Controle de Gastos", year: "2024", desc: "App full-stack de finanças pessoais com dashboard de receitas/despesas e filtragem mensal.", tags: [".NET Core", "React", "SQL Server", "Bootstrap"], repo: "https://github.com/MatiBueno1/Sistema-control-gastos" },
    ],
    studiesTag: "ESTUDOS",
    timeline: [
      { year: "2023 –\nPresente", title: "Desenvolvimento de Software", org: "Instituto Belgrano", desc: "Curso técnico com foco em desenvolvimento full-stack, bancos de dados e arquitetura de software." },
      { year: "2023 –\n2024", title: "Full Stack Web Development", org: "UTN", desc: "Certificado profissional universitário focado em tecnologias web modernas." },
      { year: "2025", title: "Curso de Python", org: "Siemens SA", desc: "Programação Python aplicada em contexto industrial." },
    ],
    contactTag: "CONTATO",
    contactTitle: "Vamos conversar.",
    contactSub: "Procuro minha primeira experiência profissional. Aberto a vagas júnior, trainee e estágios.",
    formName: "Nome", formEmail: "Email", formMsg: "Mensagem",
    formBtn: "Enviar mensagem",
    formSending: "Enviando...",
    formError: "Por favor preencha todos os campos.",
    formSuccess: "Mensagem enviada! Responderei em breve.",
    formFail: "Algo deu errado. Tente novamente.",
    labelEmail: "EMAIL", labelLocation: "LOCALIZAÇÃO", labelLinks: "LINKS",
    location: "Rosario, Santa Fe, Argentina",
    footerLeft: "© 2026 Matias Bueno",
  }
};

// ─── Skills ───────────────────────────────────────────────────────────────────
const skills = [
  { name: "C#",         color: "#9B59D0", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M11.5 15.97l.41 2.44c-.26.14-.68.27-1.24.39-.57.13-1.24.2-2.01.2-2.21-.04-3.87-.7-4.98-1.96C2.56 15.77 2 14.16 2 12.21c.05-2.31.72-4.08 2-5.32C5.29 5.64 6.95 5 8.98 5c.75 0 1.4.07 1.94.19s.94.25 1.2.4l-.58 2.49-1.51-.38c-.44-.09-.9-.13-1.37-.13-1.03.02-1.86.36-2.49 1.04-.63.67-.96 1.68-.99 3.03.03 1.29.33 2.28.9 2.96.58.68 1.4 1.03 2.45 1.05.48 0 .96-.05 1.44-.16.47-.1.87-.24 1.53-.52zm.89-6.97H14l-.33 2H12l-.33-2zm3.72 0l.33 2h-1.67l-.33-2H16.11zm-3.39 3H14l-.33 2h-1.28L12.5 12zm3.72 0l.33 2h-1.67l-.33-2H16.22z"/></svg> },
  { name: ".NET",       color: "#512BD4", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.2 14.4H9.3L6.6 12.3v4.1H5.1V7.6h1.5l2.7 4.1V7.6h1.5v8.8zm4.2 0h-3V7.6h3c2.5 0 4.2 1.8 4.2 4.4 0 2.6-1.7 4.4-4.2 4.4zm.1-7.3h-1.6v5.8h1.6c1.6 0 2.6-1.1 2.6-2.9 0-1.8-1-2.9-2.6-2.9z"/></svg> },
  { name: "React",      color: "#61DAFB", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M12 13.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm7.5-1.5c0-.48-.32-1.05-.96-1.65-.6-.57-1.48-1.1-2.57-1.54.26-1.13.37-2.2.37-3.06C16.34 3.6 14.9 2 12 2S7.66 3.6 7.66 5.75c0 .86.11 1.93.37 3.06-1.09.44-1.97.97-2.57 1.54C4.82 10.95 4.5 11.52 4.5 12s.32 1.05.96 1.65c.6.57 1.48 1.1 2.57 1.54-.26 1.13-.37 2.2-.37 3.06C7.66 20.4 9.1 22 12 22s4.34-1.6 4.34-3.75c0-.86-.11-1.93-.37-3.06 1.09-.44 1.97-.97 2.57-1.54.64-.6.96-1.17.96-1.65z"/></svg> },
  { name: "SQL Server", color: "#CC2927", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M12 2C7.58 2 4 3.79 4 6v12c0 2.21 3.58 4 8 4s8-1.79 8-4V6c0-2.21-3.58-4-8-4zm6 14c0 .9-2.42 2-6 2s-6-1.1-6-2v-2.23C7.61 14.91 9.69 15.5 12 15.5s4.39-.59 6-1.73V16zm0-5c0 .9-2.42 2-6 2s-6-1.1-6-2v-2.23C7.61 9.91 9.69 10.5 12 10.5s4.39-.59 6-1.73V11zm-6-3C8.42 8 6 6.9 6 6s2.42-2 6-2 6 1.1 6 2-2.42 2-6 2z"/></svg> },
  { name: "Docker",     color: "#2496ED", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z"/></svg> },
  { name: "Python",     color: "#3776AB", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.963 3.403 5.963h2.031v-2.868s-.109-3.402 3.35-3.402h5.769s3.24.052 3.24-3.13V3.327S18.316 0 11.914 0zM8.708 1.927a1.051 1.051 0 011.052 1.051 1.051 1.051 0 01-1.052 1.052A1.051 1.051 0 017.656 2.98a1.051 1.051 0 011.052-1.053zm3.523 20.146c6.096 0 5.716-2.656 5.716-2.656l-.007-2.752H12.14v-.826h8.122S24 16.264 24 10.084c0-6.18-3.403-5.963-3.403-5.963h-2.031v2.868s.109 3.402-3.35 3.402H9.447s-3.24-.052-3.24 3.13v5.205s-.493 3.347 5.909 3.347zm3.206-1.927a1.051 1.051 0 01-1.052-1.051 1.051 1.051 0 011.052-1.052 1.051 1.051 0 011.052 1.052 1.051 1.051 0 01-1.052 1.051z"/></svg> },
  { name: "Git",        color: "#F05032", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M23.546 10.93L13.067.452a1.55 1.55 0 00-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 012.23 2.34l2.658 2.663a1.838 1.838 0 011.9 3.039 1.837 1.837 0 01-2.524-2.41l-2.527-2.52v6.33a1.836 1.836 0 11-1.503-.036V8.36a1.836 1.836 0 01-.997-2.41L8.084 3.2.454 10.83a1.55 1.55 0 000 2.187l10.48 10.48a1.55 1.55 0 002.186 0l10.426-10.43a1.55 1.55 0 000-2.136z"/></svg> },
  { name: "Tailwind",   color: "#06B6D4", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg> },
];

// ─── Utils ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const h = e => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return pos;
}

const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const FadeUp = ({ children, delay = 0, className }) => {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(30px)",
      transition: `opacity .8s ease ${delay}s, transform .8s ease ${delay}s`
    }}>{children}</div>
  );
};

// ─── Cursor glow ──────────────────────────────────────────────────────────────
const CursorGlow = () => {
  const { x, y } = useCursor();
  return (
    <div style={{
      position: "fixed", pointerEvents: "none", zIndex: 0,
      width: 500, height: 500, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
      transform: "translate(-50%,-50%)",
      left: x, top: y, transition: "left .12s ease, top .12s ease"
    }} />
  );
};

// ─── Nav ──────────────────────────────────────────────────────────────────────
const Nav = ({ lang, setLang, tx }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "0 24px", height: 60,
      background: scrolled ? "rgba(5,5,10,0.9)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "none",
      transition: "all .4s",
    }}>
      <button onClick={() => scrollTo("hero")} style={{
        background: "none", border: "none", cursor: "pointer",
        fontFamily: "monospace", fontSize: "13px", color: "#6366f1", letterSpacing: ".15em"
      }}>mb.dev</button>

      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <div className="nav-links" style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {tx.nav.map((label, i) => (
            <button key={label} onClick={() => scrollTo(tx.navIds[i])} style={{
              background: "none", border: "none", color: "#555", fontSize: "12px",
              cursor: "pointer", letterSpacing: ".06em", transition: "color .2s",
              textTransform: "uppercase", fontFamily: "monospace"
            }}
              onMouseEnter={e => e.target.style.color = "#e0e0e0"}
              onMouseLeave={e => e.target.style.color = "#555"}
            >{label}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 3, paddingLeft: 12, borderLeft: "1px solid #1a1a1a" }}>
          {["es","en","pt"].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              padding: "3px 8px", borderRadius: 4, fontSize: "11px",
              fontFamily: "monospace", fontWeight: 700, letterSpacing: ".06em",
              textTransform: "uppercase", cursor: "pointer", transition: "all .2s",
              background: lang === l ? "#6366f1" : "none",
              color: lang === l ? "#fff" : "#777",
              border: lang === l ? "none" : "1px solid #222",
            }}>{l}</button>
          ))}
        </div>
      </div>
    </nav>
  );
};

// ─── Code Symbols Background ─────────────────────────────────────────────────
const CODE_SYMBOLS = [
  { s: "</>",  top:"12%", right:"18%", size:52, delay:"0s",   dur:"8s",  op:0.18 },
  { s: "{ }",  top:"30%", right:"8%",  size:44, delay:"1s",   dur:"10s", op:0.14 },
  { s: "=>",   top:"55%", right:"22%", size:38, delay:"2s",   dur:"9s",  op:0.16 },
  { s: "<>",   top:"70%", right:"6%",  size:48, delay:"0.5s", dur:"11s", op:0.13 },
  { s: "//",   top:"20%", right:"38%", size:32, delay:"3s",   dur:"7s",  op:0.10 },
  { s: "[ ]",  top:"45%", right:"35%", size:36, delay:"1.5s", dur:"12s", op:0.11 },
  { s: "&&",   top:"80%", right:"32%", size:30, delay:"2.5s", dur:"8s",  op:0.09 },
  { s: "===",  top:"8%",  right:"42%", size:28, delay:"4s",   dur:"9s",  op:0.08 },
  { s: "( )",  top:"62%", right:"45%", size:34, delay:"0.8s", dur:"13s", op:0.10 },
  { s: "!=",   top:"38%", right:"50%", size:26, delay:"3.5s", dur:"10s", op:0.07 },
];

const CodeSymbols = () => (
  <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
    {CODE_SYMBOLS.map((s, i) => (
      <div key={i} style={{
        position:"absolute", top:s.top, right:s.right,
        fontFamily:"monospace", fontSize:s.size, fontWeight:700,
        color:"#6366f1", opacity:s.op, letterSpacing:"-0.05em",
        animation:`floatSym ${s.dur} ease-in-out ${s.delay} infinite, glowPulse ${s.dur} ease-in-out ${s.delay} infinite`,
        userSelect:"none", textShadow:"0 0 40px rgba(99,102,241,0.4)"
      }}>{s.s}</div>
    ))}
  </div>
);

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = ({ tx }) => {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    let i = 0;
    setTyped("");
    const iv = setInterval(() => {
      setTyped(tx.heroRole.slice(0, i));
      i++;
      if (i > tx.heroRole.length) clearInterval(iv);
    }, 120);
    return () => clearInterval(iv);
  }, [tx.heroRole]);

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "80px 24px 60px 10%", position: "relative", overflow: "hidden"
    }}>
      <CodeSymbols />

      <div style={{ maxWidth: 600, position: "relative", zIndex: 1 }}>
        {/* Open to work */}
        <div style={{ opacity: 0, animation: "fadeUp .8s ease .1s forwards", marginBottom: 28 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "5px 14px", borderRadius: 999,
            background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)",
            fontSize: "11px", color: "#6366f1", fontFamily: "monospace", letterSpacing: ".1em"
          }}>{tx.openToWork}</span>
        </div>

        {/* Greeting */}
        <div style={{ opacity: 0, animation: "fadeUp .8s ease .2s forwards", marginBottom: 4 }}>
          <span style={{ fontFamily: "monospace", fontSize: 14, color: "#555", letterSpacing: ".08em" }}>
            {tx.heroGreet}
          </span>
        </div>

        {/* Name */}
        <div style={{ opacity: 0, animation: "fadeUp .8s ease .3s forwards" }}>
          <h1 style={{
            fontSize: "clamp(52px, 8vw, 88px)", fontWeight: 800,
            color: "#f0f0f0", letterSpacing: "-0.04em", lineHeight: 1,
            fontFamily: "'Playfair Display', serif", marginBottom: 8
          }}>{tx.heroName}</h1>
        </div>

        {/* Role with typewriter */}
        <div style={{ opacity: 0, animation: "fadeUp .8s ease .4s forwards", marginBottom: 24, minHeight: 40 }}>
          <span style={{
            fontSize: "clamp(18px, 3vw, 26px)", color: "#6366f1",
            fontFamily: "monospace", letterSpacing: ".04em"
          }}>
            {typed}<span style={{ animation: "blink 1s step-end infinite" }}>|</span>
          </span>
        </div>

        {/* Sub */}
        <div style={{ opacity: 0, animation: "fadeUp .8s ease .5s forwards", marginBottom: 12 }}>
          <p style={{ fontSize: 17, color: "#555", lineHeight: 1.7 }}>{tx.heroSub}</p>
        </div>

        {/* Location */}
        <div style={{ opacity: 0, animation: "fadeUp .8s ease .55s forwards", marginBottom: 44 }}>
          <p style={{ fontFamily: "monospace", fontSize: 12, color: "#333", letterSpacing: ".08em" }}>
            ◎ {tx.heroLocation}
          </p>
        </div>

        {/* CTAs */}
        <div style={{ opacity: 0, animation: "fadeUp .8s ease .65s forwards", display: "flex", gap: 14, flexWrap: "wrap" }}>
          <button onClick={() => scrollTo("projects")} style={{
            padding: "13px 32px", background: "#6366f1", color: "#fff",
            border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600,
            cursor: "pointer", transition: "all .2s", letterSpacing: ".02em"
          }}
            onMouseEnter={e => { e.target.style.background = "#5254cc"; e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 24px rgba(99,102,241,0.3)"; }}
            onMouseLeave={e => { e.target.style.background = "#6366f1"; e.target.style.transform = "none"; e.target.style.boxShadow = "none"; }}
          >{tx.heroCta1}</button>
          <button onClick={() => scrollTo("contact")} style={{
            padding: "13px 32px", background: "none", border: "1px solid #222",
            color: "#666", borderRadius: 8, fontSize: 14, cursor: "pointer",
            transition: "all .2s", letterSpacing: ".02em"
          }}
            onMouseEnter={e => { e.target.style.borderColor = "#444"; e.target.style.color = "#d0d0d0"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.borderColor = "#222"; e.target.style.color = "#666"; e.target.style.transform = "none"; }}
          >{tx.heroCta2}</button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        opacity: 0, animation: "fadeUp .8s ease 1s forwards"
      }}>
        <div style={{
          width: 1, height: 60,
          background: "linear-gradient(to bottom, transparent, #6366f1, transparent)",
          animation: "scrollLine 2s ease-in-out infinite"
        }} />
      </div>
    </section>
  );
};

// ─── Section wrapper ──────────────────────────────────────────────────────────
const Section = ({ id, children }) => (
  <section id={id} style={{ padding: "80px 24px", maxWidth: 1000, margin: "0 auto" }}>
    {children}
  </section>
);

const SectionLabel = ({ children }) => (
  <p style={{
    fontFamily: "monospace", fontSize: "12px", color: "#818cf8",
    letterSpacing: ".18em", marginBottom: 20, textTransform: "uppercase", fontWeight: 700
  }}>{children}</p>
);

const SectionTitle = ({ children }) => (
  <h2 style={{
    fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800,
    color: "#ececec", letterSpacing: "-0.03em", lineHeight: 1.1,
    fontFamily: "'Playfair Display', serif", marginBottom: 56, whiteSpace: "pre-line"
  }}>{children}</h2>
);

// ─── About ────────────────────────────────────────────────────────────────────
const About = ({ tx }) => (
  <Section id="about">
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48, alignItems: "start" }}>
      <div>
        <FadeUp><SectionLabel>{tx.aboutTag}</SectionLabel></FadeUp>
        <FadeUp delay={.1}><SectionTitle>{tx.aboutTitle}</SectionTitle></FadeUp>
        <FadeUp delay={.15}><p style={{ color: "#555", lineHeight: 1.9, fontSize: 15, marginBottom: 20 }}>{tx.aboutP1}</p></FadeUp>
        <FadeUp delay={.2}><p style={{ color: "#484848", lineHeight: 1.9, fontSize: 15 }}>{tx.aboutP2}</p></FadeUp>
      </div>
      <FadeUp delay={.2}>
        <p style={{ fontFamily: "monospace", fontSize: "11px", color: "#818cf8", letterSpacing: ".14em", marginBottom: 24, fontWeight: 700 }}>{tx.skillsTitle}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {skills.map(s => (
            <div key={s.name} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "12px 14px", borderRadius: 8,
              background: "#0c0c0f", border: "1px solid #141418",
              transition: "all .2s", cursor: "default"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${s.color}33`; e.currentTarget.style.background = "#0f0f14"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#141418"; e.currentTarget.style.background = "#0c0c0f"; }}
            >
              <span style={{ color: s.color }}>{s.icon}</span>
              <span style={{ fontSize: 13, color: "#666", fontFamily: "monospace" }}>{s.name}</span>
            </div>
          ))}
        </div>
      </FadeUp>
    </div>
  </Section>
);

// ─── Projects ─────────────────────────────────────────────────────────────────
const Projects = ({ tx }) => (
  <Section id="projects">
    <FadeUp><SectionLabel>{tx.projectsTag}</SectionLabel></FadeUp>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
      {tx.projects.map((p, i) => {
        const [hov, setHov] = useState(false);
        return (
          <FadeUp key={p.num} delay={i * .1}>
            <div
              onMouseEnter={() => setHov(true)}
              onMouseLeave={() => setHov(false)}
              style={{
                padding: 32, borderRadius: 16,
                background: hov ? "#0d0d12" : "#090910",
                border: `1px solid ${hov ? "rgba(99,102,241,0.2)" : "#131318"}`,
                transition: "all .3s", position: "relative",
                display: "flex", flexDirection: "column",
                boxShadow: hov ? "0 0 40px rgba(99,102,241,0.05)" : "none"
              }}
            >

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#2a2a2a", letterSpacing: ".1em" }}>{p.num}</span>
                <span style={{ fontFamily: "monospace", fontSize: "11px", color: "#333" }}>{p.year}</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#ddd", marginBottom: 10, fontFamily: "'Playfair Display', serif", letterSpacing: "-.01em" }}>{p.title}</h3>
              <p style={{ color: "#444", fontSize: 14, lineHeight: 1.75, marginBottom: 20, flexGrow: 1 }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                {p.tags.map(tag => (
                  <span key={tag} style={{
                    padding: "3px 11px", borderRadius: 999, fontSize: "11px",
                    color: "#666", fontFamily: "monospace",
                    background: "#0f0f14", border: "1px solid #1a1a22"
                  }}>{tag}</span>
                ))}
              </div>
              {p.repo
                ? <a href={p.repo} target="_blank" rel="noreferrer" style={{
                    fontSize: 13, color: "#6366f1", textDecoration: "none",
                    fontFamily: "monospace", letterSpacing: ".04em",
                    borderTop: "1px solid #131318", paddingTop: 16, display: "flex",
                    alignItems: "center", gap: 6, transition: "gap .2s"
                  }}
                    onMouseEnter={e => e.currentTarget.style.gap = "10px"}
                    onMouseLeave={e => e.currentTarget.style.gap = "6px"}
                  >{tx.viewRepo} →</a>
                : <span style={{ fontSize: 12, color: "#252525", fontFamily: "monospace", borderTop: "1px solid #0f0f0f", paddingTop: 16, display: "block" }}>{tx.noRepo}</span>
              }
            </div>
          </FadeUp>
        );
      })}
    </div>
  </Section>
);

// ─── Studies ──────────────────────────────────────────────────────────────────
const Studies = ({ tx }) => (
  <Section id="studies">
    <FadeUp><SectionLabel>{tx.studiesTag}</SectionLabel></FadeUp>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
      {tx.timeline.map((item, i) => (
        <FadeUp key={i} delay={i * .1}>
          <div style={{
            padding: 28, borderRadius: 14,
            background: "#090910", border: "1px solid #131318",
            transition: "all .3s", height: "100%"
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.15)"; e.currentTarget.style.background = "#0c0c14"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#131318"; e.currentTarget.style.background = "#090910"; }}
          >
            <div style={{
              display: "inline-block", padding: "4px 12px", borderRadius: 6,
              background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.12)",
              fontFamily: "monospace", fontSize: "11px", color: "#6366f1",
              marginBottom: 18, whiteSpace: "pre-line", lineHeight: 1.4
            }}>{item.year}</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#d0d0d0", marginBottom: 6, fontFamily: "'Playfair Display', serif" }}>{item.title}</h3>
            <p style={{ fontSize: 12, color: "#6366f1", marginBottom: 12, fontFamily: "monospace", letterSpacing: ".04em" }}>{item.org}</p>
            <p style={{ fontSize: 13, color: "#444", lineHeight: 1.7 }}>{item.desc}</p>
          </div>
        </FadeUp>
      ))}
    </div>
  </Section>
);

// ─── Contact ──────────────────────────────────────────────────────────────────
const Contact = ({ tx }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | sending | success | error | fail

  const sendEmail = async () => {
    if (!form.name || !form.email || !form.message) { setStatus("error"); return; }
    setStatus("sending");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name: form.name,
            from_email: form.email,
            message: form.message,
            to_email: "matiasbueno0101@gmail.com"
          }
        })
      });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", message: "" }); }
      else setStatus("fail");
    } catch { setStatus("fail"); }
  };

  const inp = {
    width: "100%", padding: "12px 16px", background: "#0c0c0f",
    border: "1px solid #1a1a22", borderRadius: 8, color: "#d0d0d0",
    fontSize: 14, outline: "none", transition: "border-color .2s",
    boxSizing: "border-box", fontFamily: "inherit"
  };

  return (
    <Section id="contact">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48, alignItems: "start" }}>
        <div>
          <FadeUp><SectionLabel>{tx.contactTag}</SectionLabel></FadeUp>
          <FadeUp delay={.1}><SectionTitle>{tx.contactTitle}</SectionTitle></FadeUp>
          <FadeUp delay={.15}><p style={{ color: "#4a4a4a", fontSize: 15, lineHeight: 1.8, marginBottom: 36 }}>{tx.contactSub}</p></FadeUp>
          <FadeUp delay={.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: tx.labelEmail, val: <a href="mailto:matiasbueno0101@gmail.com" style={{ color: "#555", fontSize: 14, textDecoration: "none" }} onMouseEnter={e=>e.target.style.color="#ddd"} onMouseLeave={e=>e.target.style.color="#555"}>matiasbueno0101@gmail.com</a> },
                { label: tx.labelLocation, val: <span style={{ color: "#444", fontSize: 14 }}>{tx.location}</span> },
              ].map(({ label, val }) => (
                <div key={label} style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#818cf8", letterSpacing: ".12em", minWidth: 80, fontWeight: 700 }}>{label}</span>
                  {val}
                </div>
              ))}
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                {[
                  { label: "GitHub", href: "https://github.com/MatiBueno1" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/matias-daniel-bueno/" }
                ].map(l => (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{
                    padding: "8px 18px", border: "1px solid #1a1a22", borderRadius: 6,
                    color: "#555", fontSize: 13, textDecoration: "none",
                    fontFamily: "monospace", transition: "all .2s"
                  }}
                    onMouseEnter={e => { e.target.style.borderColor = "#6366f1"; e.target.style.color = "#6366f1"; }}
                    onMouseLeave={e => { e.target.style.borderColor = "#1a1a22"; e.target.style.color = "#555"; }}
                  >{l.label}</a>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={.2}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input placeholder={tx.formName} value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })} style={inp}
              onFocus={e => e.target.style.borderColor = "#6366f1"}
              onBlur={e => e.target.style.borderColor = "#1a1a22"} />
            <input placeholder={tx.formEmail} type="email" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} style={inp}
              onFocus={e => e.target.style.borderColor = "#6366f1"}
              onBlur={e => e.target.style.borderColor = "#1a1a22"} />
            <textarea placeholder={tx.formMsg} rows={5} value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              style={{ ...inp, resize: "vertical" }}
              onFocus={e => e.target.style.borderColor = "#6366f1"}
              onBlur={e => e.target.style.borderColor = "#1a1a22"} />

            {status === "error"   && <p style={{ fontSize: 12, color: "#ef4444", fontFamily: "monospace" }}>{tx.formError}</p>}
            {status === "success" && <p style={{ fontSize: 12, color: "#22c55e", fontFamily: "monospace" }}>{tx.formSuccess}</p>}
            {status === "fail"    && <p style={{ fontSize: 12, color: "#ef4444", fontFamily: "monospace" }}>{tx.formFail}</p>}

            <button onClick={sendEmail} disabled={status === "sending"} style={{
              padding: "13px 30px", background: "#6366f1", color: "#fff",
              border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600,
              cursor: status === "sending" ? "not-allowed" : "pointer",
              transition: "all .2s", alignSelf: "flex-start",
              opacity: status === "sending" ? .7 : 1
            }}
              onMouseEnter={e => { if (status !== "sending") { e.target.style.background = "#5254cc"; e.target.style.transform = "translateY(-1px)"; }}}
              onMouseLeave={e => { e.target.style.background = "#6366f1"; e.target.style.transform = "none"; }}
            >{status === "sending" ? tx.formSending : tx.formBtn}</button>
          </div>
        </FadeUp>
      </div>
    </Section>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = ({ tx }) => (
  <footer style={{
    borderTop: "1px solid #0f0f14", padding: "24px",
    display: "flex", justifyContent: "space-between", alignItems: "center",
    flexWrap: "wrap", gap: 12
  }}>
    <span style={{ fontFamily: "monospace", fontSize: "12px", color: "#222" }}>{tx.footerLeft}</span>
    <div style={{ display: "flex", gap: 20 }}>
      {[{ label: "GitHub", href: "https://github.com/MatiBueno1" }, { label: "LinkedIn", href: "https://www.linkedin.com/in/matias-daniel-bueno/" }].map(l => (
        <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{
          fontFamily: "monospace", fontSize: "12px", color: "#252525",
          textDecoration: "none", transition: "color .2s"
        }}
          onMouseEnter={e => e.target.style.color = "#555"}
          onMouseLeave={e => e.target.style.color = "#252525"}
        >{l.label}</a>
      ))}
    </div>
  </footer>
);

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("es");
  const tx = t[lang];
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #05050a; color: #e0e0e0; -webkit-font-smoothing: antialiased; font-family: 'DM Sans', sans-serif; }
        h1,h2,h3 { font-family: 'Playfair Display', serif; }
        ::selection { background: rgba(99,102,241,0.25); }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #05050a; }
        ::-webkit-scrollbar-thumb { background: #6366f1; border-radius: 2px; }
        input::placeholder, textarea::placeholder { color: #555; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatSym {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          33%      { transform: translateY(-18px) rotate(4deg); }
          66%      { transform: translateY(10px) rotate(-3deg); }
        }
        @keyframes glowPulse {
          0%,100% { opacity: 0.5; }
          50%      { opacity: 1; }
        }
        @keyframes blink {
          0%,100% { opacity: 1; } 50% { opacity: 0; }
        }
        @keyframes scrollLine {
          0%,100% { opacity: 0; transform: scaleY(0); transform-origin: top; }
          50%      { opacity: 1; transform: scaleY(1); }
        }
        @media (max-width: 640px) {
          .nav-links { display: none !important; }
        }
      `}</style>
      <Nav lang={lang} setLang={setLang} tx={tx} />
      <Hero tx={tx} />
      <About tx={tx} />
      <Projects tx={tx} />
      <Studies tx={tx} />
      <Contact tx={tx} />
      <Footer tx={tx} />
    </>
  );
}