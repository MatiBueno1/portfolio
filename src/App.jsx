import { useState, useEffect } from "react";

const symbols = [
  { s: "</>",  top:"12%", right:"18%", size:52, delay:"0s",   dur:"8s",  op:0.18 },
  { s: "{ }",  top:"30%", right:"8%",  size:44, delay:"1s",   dur:"10s", op:0.13 },
  { s: "=>",   top:"55%", right:"22%", size:38, delay:"2s",   dur:"9s",  op:0.15 },
  { s: "<>",   top:"70%", right:"6%",  size:48, delay:"0.5s", dur:"11s", op:0.12 },
  { s: "//",   top:"20%", right:"38%", size:32, delay:"3s",   dur:"7s",  op:0.10 },
  { s: "[ ]",  top:"45%", right:"35%", size:36, delay:"1.5s", dur:"12s", op:0.11 },
  { s: "&&",   top:"80%", right:"32%", size:30, delay:"2.5s", dur:"8s",  op:0.09 },
  { s: "===",  top:"8%",  right:"42%", size:28, delay:"4s",   dur:"9s",  op:0.08 },
  { s: "( )",  top:"62%", right:"45%", size:34, delay:"0.8s", dur:"13s", op:0.10 },
  { s: "!=",   top:"38%", right:"50%", size:26, delay:"3.5s", dur:"10s", op:0.07 },
];

const CodeSymbols = () => (
  <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
    <style>{`
      @keyframes floatSym {
        0%,100% { transform: translateY(0px) rotate(0deg); }
        33%      { transform: translateY(-18px) rotate(4deg); }
        66%      { transform: translateY(10px) rotate(-3deg); }
      }
      @keyframes glowPulse {
        0%,100% { opacity: var(--op); }
        50%      { opacity: calc(var(--op) * 2.2); }
      }
    `}</style>
    {symbols.map((s, i) => (
      <div key={i} style={{
        position:"absolute", top: s.top, right: s.right,
        fontFamily:"monospace", fontSize: s.size,
        fontWeight: 700, color:"#6366f1",
        "--op": s.op,
        opacity: s.op,
        letterSpacing:"-0.05em",
        animation:`floatSym ${s.dur} ease-in-out ${s.delay} infinite, glowPulse ${s.dur} ease-in-out ${s.delay} infinite`,
        userSelect:"none",
        textShadow:`0 0 40px rgba(99,102,241,0.4)`
      }}>{s.s}</div>
    ))}
  </div>
);

export default function HeroPreview() {
  const [typed, setTyped] = useState("");
  const role = "Software Developer";
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => { setTyped(role.slice(0,i)); i++; if(i>role.length) clearInterval(iv); }, 80);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{
      minHeight:"100vh", background:"#05050a",
      display:"flex", alignItems:"center",
      padding:"0 0 0 10%", position:"relative", overflow:"hidden",
      fontFamily:"'DM Sans',sans-serif"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800;900&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>

      <CodeSymbols />

      <div style={{ maxWidth:600, position:"relative", zIndex:1 }}>
        <div style={{ opacity:0, animation:"fadeUp .8s ease .1s forwards", marginBottom:28 }}>
          <span style={{
            display:"inline-flex", alignItems:"center", gap:8,
            padding:"5px 14px", borderRadius:999,
            background:"rgba(99,102,241,0.08)", border:"1px solid rgba(99,102,241,0.2)",
            fontSize:"11px", color:"#6366f1", fontFamily:"monospace", letterSpacing:".1em"
          }}>● OPEN TO WORK</span>
        </div>

        <div style={{ opacity:0, animation:"fadeUp .8s ease .2s forwards", marginBottom:4 }}>
          <span style={{ fontFamily:"monospace", fontSize:14, color:"#666", letterSpacing:".08em" }}>Hola, soy</span>
        </div>

        <div style={{ opacity:0, animation:"fadeUp .8s ease .3s forwards" }}>
          <h1 style={{
            fontSize:"clamp(52px,8vw,88px)", fontWeight:800,
            color:"#f0f0f0", letterSpacing:"-0.04em", lineHeight:1,
            fontFamily:"'Playfair Display',serif", marginBottom:8
          }}>Matias Bueno</h1>
        </div>

        <div style={{ opacity:0, animation:"fadeUp .8s ease .4s forwards", marginBottom:24, minHeight:40 }}>
          <span style={{ fontSize:"clamp(18px,3vw,26px)", color:"#6366f1", fontFamily:"monospace", letterSpacing:".04em" }}>
            {typed}<span style={{ animation:"blink 1s step-end infinite" }}>|</span>
          </span>
        </div>

        <div style={{ opacity:0, animation:"fadeUp .8s ease .5s forwards", marginBottom:12 }}>
          <p style={{ fontSize:17, color:"#555", lineHeight:1.7 }}>Apasionado por construir soluciones reales.</p>
        </div>

        <div style={{ opacity:0, animation:"fadeUp .8s ease .55s forwards", marginBottom:44 }}>
          <p style={{ fontFamily:"monospace", fontSize:12, color:"#333", letterSpacing:".08em" }}>◎ Rosario, Argentina</p>
        </div>

        <div style={{ opacity:0, animation:"fadeUp .8s ease .65s forwards", display:"flex", gap:14, flexWrap:"wrap" }}>
          <button style={{
            padding:"13px 32px", background:"#6366f1", color:"#fff",
            border:"none", borderRadius:8, fontSize:14, fontWeight:600, cursor:"pointer"
          }}>Ver Proyectos</button>
          <button style={{
            padding:"13px 32px", background:"none", border:"1px solid #2a2a2a",
            color:"#777", borderRadius:8, fontSize:14, cursor:"pointer"
          }}>Contactarme</button>
        </div>
      </div>
    </div>
  );
}