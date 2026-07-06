import { useEffect, useRef, useState, useCallback } from 'react'
import './App.css'

/* ══════════════════════════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════════════════════════ */
const I = {
  Logo:   () => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M2 4h5M2 8h12M9 4h5M2 12h5M9 12h5"/></svg>,
  Search: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Arrow:  () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Play:   () => <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Check:  () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Star:   () => <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Dna:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-2 2.518-4 2.5-6"/><path d="M2 9c6.667-6 13.333 0 20-6"/><path d="M15 2c-1.798 2-2.518 4-2.5 6"/></svg>,
  Target: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Zap:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Shield: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Fb:     () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  Li:     () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>,
  Ig:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>,
  Yt:     () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#020304"/></svg>,
  Wa:     () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
  Phone:  () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l1.27-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Globe:  () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Mail:   () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Menu:   () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{width:22,height:22}}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Close:  () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{width:22,height:22}}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  ChevDown: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>,
  Users:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Dumbbell: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6.5 6.5h11M6.5 17.5h11"/><rect x="2" y="5" width="4" height="14" rx="1.5"/><rect x="18" y="5" width="4" height="14" rx="1.5"/><line x1="6" y1="12" x2="18" y2="12"/></svg>,
  Film:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="17" y1="7" x2="22" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/></svg>,
}

/* ══════════════════════════════════════════════════════════════════
   CIRCUIT CANVAS
══════════════════════════════════════════════════════════════════ */
function CircuitBg() {
  const canvasRef = useRef(null)
  const animRef   = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, lines, particles
    const COLORS = ['#00e5a0','#00c8ff','#00e5a0','#00bfff']

    function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; init() }
    function mkLine() {
      const h = Math.random() > 0.5
      return { x: Math.floor(Math.random()*W/40)*40, y: Math.floor(Math.random()*H/40)*40,
        len: (Math.floor(Math.random()*4)+2)*40, horizontal: h,
        col: COLORS[Math.floor(Math.random()*COLORS.length)],
        progress: 0, speed: 0.004+Math.random()*0.006, alpha: 0.14+Math.random()*0.22 }
    }
    function mkParticle(l) {
      return { x:l.x, y:l.y, tx: l.horizontal?l.x+l.len:l.x, ty: l.horizontal?l.y:l.y+l.len,
        col:l.col, t:0, speed:l.speed*1.2 }
    }
    function init() { lines = Array.from({length:26}, mkLine); particles = [] }
    function draw() {
      ctx.clearRect(0,0,W,H)
      ctx.strokeStyle='rgba(0,229,160,0.025)'; ctx.lineWidth=1
      for(let x=0;x<W;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke()}
      for(let y=0;y<H;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}
      lines.forEach((l,i)=>{
        l.progress=Math.min(l.progress+l.speed,1)
        const ex=l.horizontal?l.x+l.len*l.progress:l.x, ey=l.horizontal?l.y:l.y+l.len*l.progress
        ctx.shadowColor=l.col; ctx.shadowBlur=8; ctx.strokeStyle=l.col; ctx.globalAlpha=l.alpha; ctx.lineWidth=1.5
        ctx.beginPath(); ctx.moveTo(l.x,l.y); ctx.lineTo(ex,ey); ctx.stroke()
        if(l.progress>0.05){ctx.beginPath();ctx.arc(ex,ey,2.5,0,Math.PI*2);ctx.fillStyle=l.col;ctx.fill()}
        ctx.shadowBlur=0; ctx.globalAlpha=1
        if(l.progress>=1){particles.push(mkParticle(l)); lines[i]=mkLine()}
      })
      particles.forEach((p,i)=>{
        p.t=Math.min(p.t+p.speed,1)
        const px=p.x+(p.tx-p.x)*p.t, py=p.y+(p.ty-p.y)*p.t
        ctx.globalAlpha=(1-p.t)*0.8; ctx.shadowColor=p.col; ctx.shadowBlur=12
        ctx.beginPath(); ctx.arc(px,py,3,0,Math.PI*2); ctx.fillStyle=p.col; ctx.fill()
        ctx.shadowBlur=0; ctx.globalAlpha=1
        if(p.t>=1) particles.splice(i,1)
      })
      animRef.current=requestAnimationFrame(draw)
    }
    resize(); draw()
    window.addEventListener('resize',resize)
    return ()=>{cancelAnimationFrame(animRef.current); window.removeEventListener('resize',resize)}
  },[])

  return <canvas ref={canvasRef} className="circuit-bg" aria-hidden="true" style={{width:'100%',height:'100%',display:'block'}}/>
}

/* ══════════════════════════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════════════════════════ */
function useInView(threshold=0.01) {
  const ref=useRef(null), [v,setV]=useState(false)
  useEffect(()=>{
    const el=ref.current; if(!el) return
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);obs.disconnect()}},{threshold, rootMargin:'0px 0px 600px 0px'})
    obs.observe(el); return ()=>obs.disconnect()
  },[threshold])
  return [ref,v]
}
function FadeUp({children,delay=0,style={},className=''}) {
  const [ref,v]=useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: v?1:0,
        transform: v?'translateY(0)':'translateY(28px)',
        transition: `opacity .75s cubic-bezier(.16,1,.3,1) ${delay}s,transform .75s cubic-bezier(.16,1,.3,1) ${delay}s`,
        ...style
      }}
    >
      {children}
    </div>
  )
}
function Counter({to,suffix=''}) {
  const [n,setN]=useState(0), [ref,v]=useInView(0.4)
  useEffect(()=>{
    if(!v) return; let s=null; const dur=1800
    const tick=ts=>{if(!s)s=ts; const p=Math.min((ts-s)/dur,1),e=1-Math.pow(1-p,3); setN(Math.floor(e*to)); if(p<1)requestAnimationFrame(tick); else setN(to)}
    requestAnimationFrame(tick)
  },[v,to])
  return <span ref={ref}>{n}{suffix}</span>
}

/* ══════════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════════ */
const NAV_LINKS = ['Método','Ejercicios','Resultados','Planes','Contacto']
const NAV_IDS   = ['metodo','ejercicios','resultados','programas','contacto']

const METHODS = [
  {icon:<I.Target/>, num:'01', step:'Fase 01', title:'Protocolo Personalizado', desc:'Programación diseñada para ti. Fuerza, potencia, resistencia y trabajo específico para el combate — todo integrado.'},
  {icon:<I.Zap/>,    num:'02', step:'Fase 02', title:'Ejecución Guiada',         desc:'Seguimiento por WhatsApp, videos de referencia, retroalimentación constante. No entrenas solo — el sistema te sostiene.'},
  {icon:<I.Shield/>, num:'03', step:'Fase 03', title:'Evolución Continua',       desc:'Cada mes reviso cómo te fue y ajusto tu plan según eso. Nada de plantillas fijas, tu progreso manda.'},
]

const PLANS_ONLINE = [
  {
    badge:{text:'Online', cls:'g'},
    title:'Plan Base',
    price:'$70.000',
    period:'/mes',
    quarterly:'Trimestral: $189.000 · ahorra $21.000',
    feats:[
      'Planificación mensual personalizada',
      'Tu rutina paso a paso en el celular (app Harbiz)',
      'Biblioteca de ejercicios',
      'Seguimiento y ajustes continuos',
      'Revisión semanal',
      'Comunicación directa',
      'Material educativo',
      '17% de descuento en clases de Jiu Jitsu',
    ],
    featured:false,
    ctaText:'Pagar Plan Base',
    payLink:'https://mpago.la/1tXKAuD',
  },
  {
    badge:{text:'Recomendado', cls:'b'},
    title:'Plan Integral',
    price:'$150.000',
    period:'/mes',
    quarterly:'Trimestral: $405.000 · ahorra $45.000',
    feats:[
      'Todo lo del Plan Base',
      'Nutricionista especializada en deportes de combate',
      'Plan nutricional personalizado',
      'Seguimiento nutricional',
      'Coordinación nutrición + entrenamiento',
      '17% de descuento en clases de Jiu Jitsu',
    ],
    featured:true,
    ctaText:'Pagar Plan Integral',
    payLink:'https://mpago.la/19YPwML',
  },
]

const PLANS_JIU_JITSU = [
  {
    title:'Clase Particular',
    price:'$30.000',
    period:'/clase',
    desc:'Sesión individual personalizada según tu nivel y objetivos.',
    ctaText:'Agendar clase',
  },
  {
    title:'Pack 4 Clases',
    price:'$100.000',
    period:'/pack',
    desc:'Ahorra $20.000 y asegura 4 sesiones de trabajo técnico continuo.',
    ctaText:'Agendar pack',
    highlight: true,
  },
]

const PROCESS_STEPS = [
  { num:'01', title:'Conversación Inicial', desc:'Me escribes por WhatsApp. En menos de 24 horas coordinamos una llamada breve para entender tus objetivos, tu historial y si el programa es lo que necesitas.', tag:'~15 min' },
  { num:'02', title:'Diagnóstico',          desc:'Completas un formulario detallado: movilidad, historial de lesiones, horarios y acceso a equipamiento. Sin datos, no hay planificación real.', tag:'1-2 días' },
  { num:'03', title:'Empiezas Tu Plan',     desc:'Recibes tu rutina paso a paso en el celular a través de la app Harbiz, lista para entrenar. Primer check-in al final de la primera semana. A partir de ahí ajustamos cada mes con datos reales.', tag:'Día 1' },
]

const FAQ_ITEMS = [
  { q:'¿Necesito acceso a un gimnasio?',                         a:'No necesariamente. El programa se adapta a tu realidad: gimnasio completo, sala básica o entrenamiento en casa. Lo que importa es lo que tienes disponible, no lo que no tienes.' },
  { q:'¿Funciona si soy principiante o nunca he entrenado?',     a:'Sí. El diagnóstico inicial determina exactamente tu punto de partida. El programa se construye desde ahí, no desde un estándar imaginario.' },
  { q:'¿Qué pasa si me lesiono o tengo semanas difíciles?',      a:'El plan se ajusta. Lesión, viaje, semana de exámenes — todo eso forma parte del proceso real. La planificación se modifica con datos, no con plantillas fijas.' },
  { q:'¿El programa es solo para competidores de BJJ?',          a:'No. Trabajo con competidores amateurs, practicantes recreativos y personas que quieren mejorar su condición física general. El nivel de exigencia se calibra a tu objetivo.' },
{ q:'¿Qué es Harbiz y cómo veo mi rutina?',                    a:'Harbiz es la app donde recibes tu rutina paso a paso en el celular: ejercicios, series, videos de referencia y tu planificación completa. En la conversación inicial te muestro cómo funciona para que sepas exactamente qué vas a recibir antes de pagar.' },
  { q:'¿Qué pasa si no veo resultados?',                         a:'Tienes garantía de 30 días: si entrenando conmigo no sientes mejoras reales en el tatami, te devuelvo tu dinero.' },
]

const BELT = {
  negro:  { label:'Cinturón Negro', color:'#111', border:'#555',   text:'#ccc'   },
  azul:   { label:'Cinturón Azul',  color:'#1a4fa0', border:'#3a7bd5', text:'#fff' },
  blanco: { label:'Faixa Blanca',   color:'#c8cdd8', border:'#8a91a0', text:'#111' },
}

const TESTIMONIALS = [
  {text:'"Hoy avanzo a mi propio ritmo, acompañada por un gran profesional. La dedicación, seguimiento y capacidad para entender mis objetivos marcan la diferencia. Contar con alguien que realmente te guía, te desafía y se preocupa cambia completamente el proceso."', name:'Daniela Portus', role:'Cinturón Negro BJJ · 38 años', initials:'DP', photo:'/img/testimonio-daniela.jpg'},
  {text:'"7 meses entrenando y he podido ver los cambios físicos, pero sobre todo sentir la diferencia de fuerza y potencia en la lucha, mejorando mi performance en los entrenamientos. MichiLab 100% recomendado."', name:'Vicente Angel', role:'Cinturón Negro BJJ · 43 años', initials:'VA', photo:'/img/testimonio-vicente.jpg'},
  {text:'"9 meses entrenando de forma personalizada con Lizandro, me siento fuerte, estable y segura en muchos ejercicios. Viniendo del alto rendimiento como ex seleccionada nacional, noto claramente los avances y estoy totalmente satisfecha con su trabajo."', name:'Karina Guelet', role:'Cinturón Negro TKD · Cinturón Azul BJJ', initials:'KG', photo:'/img/testimonio-karina.jpg'},
  {text:'"Contraté el servicio después de un esguince de rodilla. Gracias a MichiLab, a mis 43 años estoy en la mejor forma física de mi vida por lejos. La diferencia en la lucha se siente brutal y no me he vuelto a lesionar."', name:'Sebastián Valladares', role:'Cinturón Azul BJJ · 43 años', initials:'SV', photo:'/img/testimonio-sebastian.jpg'},
  {text:'"Ya van 4 meses y estoy viendo cambios en mi cuerpo, pero lo más bacán es que me siento mucho más fuerte y ágil luchando."', name:'Laura Ruiz', role:'Cinturón Azul BJJ · 24 años', initials:'LR', photo:'/img/testimonio-laura.jpg'},
  {text:'"Empecé por falta de cardio: 2 luchas y ya no podía más. Hoy hago el doble de luchas consecutivas con más movilidad, lo que me permite enfocarme en la técnica y no depender tanto de la fuerza."', name:'Maximiliano Machuca', role:'Cinturón Azul BJJ', initials:'MM', photo:'/img/testimonio-maxi.jpg'},
  {text:'"Desde que entreno con Lizandro he visto un gran avance en mi fuerza y resistencia, vital para mis luchas y el día a día. Siempre al pendiente de tus necesidades y adaptado a cómo te vayas sintiendo. Un gran aporte."', name:'César Freitez', role:'Cinturón Blanco BJJ · 23 años', initials:'CF', photo:'/img/testimonio-cesar.jpg'},
  {text:'"Recomendado al 100%, es multifuncional y para todos los tipos de objetivos que se pueden alcanzar haciendo actividad física. Desde que empecé he sentido un cambio increíble en mi fuerza y resistencia en mis entrenamientos. Únanse a MichiLab, no se van a arrepentir."', name:'Sebastien Pinet', role:'Cinturón Azul BJJ', initials:'SP', photo:'/img/testimonio-sebastien.jpg'},
]

/* ══════════════════════════════════════════════════════════════════
   COACH REEL
══════════════════════════════════════════════════════════════════ */
function CoachReel() {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  return (
    <div className="coach-reel-wrap" onClick={toggle} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && toggle()}
      aria-label={muted ? 'Activar audio' : 'Silenciar'}>
      <video
        ref={videoRef}
        src="/videos/lizandro-coach-reel.mp4"
        autoPlay muted loop playsInline
        className="coach-reel-video"
      />
      <div className="coach-reel-badge">
        <span className="badge-dot" aria-hidden="true"/>
        En acción
      </div>
      <div className="coach-reel-sound" aria-hidden="true">
        {muted
          ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
          : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        }
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   FAQ ITEM
══════════════════════════════════════════════════════════════════ */
function FaqItem({ q, a, delay=0 }) {
  const [open, setOpen] = useState(false)
  return (
    <FadeUp delay={delay}>
      <div className={`faq-item ${open ? 'open' : ''}`}>
        <button className="faq-question" onClick={() => setOpen(o => !o)} aria-expanded={open}>
          <span>{q}</span>
          <div className="faq-icon" aria-hidden="true"><I.ChevDown/></div>
        </button>
        <div className="faq-answer-wrap" aria-hidden={!open} style={{maxHeight: open ? 300 : 0}}>
          <div className="faq-answer">{a}</div>
        </div>
      </div>
    </FadeUp>
  )
}

/* ══════════════════════════════════════════════════════════════════
   EXERCISE CARD
══════════════════════════════════════════════════════════════════ */
function ExerciseCard({src, thumb, label, tag}) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const toggle = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (playing) { v.pause(); setPlaying(false) }
    else { v.play(); setPlaying(true) }
  }, [playing])

  return (
    <article className="exercise-card" onClick={toggle} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && toggle()}
      aria-label={`${playing ? 'Pausar' : 'Reproducir'} ${label}`}>
      <video
        ref={videoRef}
        src={src}
        poster={thumb}
        muted
        loop
        playsInline
        preload="none"
        className="exercise-video"
      />
      <div className={`exercise-overlay ${playing ? 'playing' : ''}`}>
        <div className="exercise-play-btn" aria-hidden="true">
          {playing
            ? <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            : <I.Play/>
          }
        </div>
      </div>
      <div className="exercise-info">
        <span className="exercise-tag">{tag}</span>
        <span className="exercise-label">{label}</span>
      </div>
    </article>
  )
}

/* ══════════════════════════════════════════════════════════════════
   APP
══════════════════════════════════════════════════════════════════ */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const testRef = useRef(null)
  const scrollTest = dir => {
    const el = testRef.current
    if (!el) return
    const card = el.querySelector('.test-card')
    const step = card ? card.offsetWidth + 20 : 400
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }
  const goto = id => { document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); setMenuOpen(false) }
  const wa   = () => window.open('https://wa.me/56973744226?text=Hola%2C%20quiero%20aplicar%20a%20MichiLab','_blank')
  const ig   = () => window.open('https://www.instagram.com/ruiz.lizandroivan/','_blank')

  return (
    <>
      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav className="nav" role="navigation" aria-label="Navegación principal">
        <div className="nav-accent-bar" aria-hidden="true"/>
        <a href="#" className="nav-logo" aria-label="MichiLab inicio">
          <span className="nav-logo-mark"><I.Logo/></span>
          MICHI<span>LAB</span>
        </a>
        <ul className="nav-links">
          {NAV_LINKS.map((l,i)=>(
            <li key={l}><a onClick={()=>goto(NAV_IDS[i])} role="button" tabIndex={0}>{l}</a></li>
          ))}
        </ul>
        <div className="nav-right">
<button className="nav-cta" onClick={wa} aria-label="Inscríbete aquí">Inscríbete Aquí</button>
          <button className="nav-menu-btn" aria-label="Menú" onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? <I.Close/> : <I.Menu/>}
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ─────────────────────────────────────── */}
      {menuOpen && (
        <div className="mobile-overlay" onClick={() => setMenuOpen(false)} aria-modal="true" role="dialog">
          <nav className="mobile-drawer" onClick={e => e.stopPropagation()} aria-label="Menú móvil">
            <div className="mobile-drawer-header">
              <span className="nav-logo">MICHI<span>LAB</span></span>
              <button className="nav-menu-btn" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú"><I.Close/></button>
            </div>
            <ul className="mobile-drawer-links">
              {NAV_LINKS.map((l,i) => (
                <li key={l}>
                  <a onClick={() => goto(NAV_IDS[i])} role="button" tabIndex={0}>{l}</a>
                </li>
              ))}
            </ul>
            <button className="btn-primary mobile-drawer-cta" onClick={() => { wa(); setMenuOpen(false) }}>
              <I.Wa/> Aplicar por WhatsApp
            </button>
          </nav>
        </div>
      )}

      {/* ── HERO ────────────────────────────────────────────── */}
      <header className="hero" role="banner">
        <div className="hero-left">
          <div className="hero-badge anim-0">
            <span className="badge-dot" aria-hidden="true"/>
            Michi Submission Lab · Chile
          </div>

          <h1 className="hero-title">
            <span className="hero-title-line anim-1">FUERZA REAL PARA EL TATAMI.</span>
            <span className="hero-title-accent anim-2" data-text="SIN QUEDARTE SIN AIRE.">SIN QUEDARTE SIN AIRE.</span>
            <span className="hero-title-solid anim-2" style={{fontSize:'clamp(1.1rem,2.2vw,1.8rem)',fontWeight:600,letterSpacing:'0.06em',color:'var(--fg-muted)',marginTop:6}}>
              WORK UNDER DISCOMFORT
            </span>
          </h1>

          <p className="hero-desc anim-3">
            Sistema de preparación física para grappling: para que no te quedes sin cardio
            a mitad de la lucha, no te lesiones por falta de base física y llegues con la
            fuerza y la movilidad que el tatami exige.
          </p>

          <div className="hero-actions anim-4">
            <button className="btn-primary" onClick={wa}>
              <I.Play/> Aplicar Ahora
            </button>
            <button className="btn-ghost" onClick={()=>goto('programas')}>
              Ver Planes <I.Arrow/>
            </button>
          </div>

          <div className="hero-footer-row anim-4">
            <div className="hero-socials" aria-label="Redes sociales">
              <button className="hero-social-btn" aria-label="Instagram" onClick={ig}><I.Ig/></button>
              <button className="hero-social-btn" aria-label="WhatsApp" onClick={wa}><I.Wa/></button>
            </div>
            <span className="hero-year">8 años en BJJ</span>
          </div>
        </div>

        <div className="hero-right" aria-hidden="true">
          <CircuitBg/>
          <div className="hero-bjj-wrap">
            <img src="/img/lizandro-bjj-comp.jpg" className="hero-bjj-photo" alt=""/>
            <div className="hero-bjj-face-blur" aria-hidden="true"/>
            <div className="hero-bjj-glow"      aria-hidden="true"/>
            <div className="hero-bjj-accent"    aria-hidden="true"/>
          </div>
          <div className="hero-vignette"/>
        </div>
      </header>

      <hr className="divider"/>

      {/* ── MÉTODO ──────────────────────────────────────────── */}
      <section className="section metodo-section" id="metodo" aria-labelledby="metodo-h">
        <div className="metodo-video-col" aria-hidden="true">
          <video
            src="/videos/lizandro-combat.mp4#t=4"
            autoPlay muted loop playsInline
            className="metodo-video"
          />
          <div className="metodo-video-overlay"/>
          <div className="metodo-video-glow"/>
        </div>
        <div className="section-inner">
          <FadeUp>
            <div className="section-label">El Sistema</div>
            <h2 className="section-title" id="metodo-h">
              Ingeniería del<br/><span>Combate</span>
            </h2>
            <p className="section-desc">
              Fuerza, movilidad y cardio diseñados para el combate — para que no te quedes
              sin aire ni te lesiones a mitad de una lucha.
            </p>
          </FadeUp>
          <div className="method-grid" role="list">
            {METHODS.map((m,i)=>(
              <FadeUp key={m.num} delay={i*0.08}>
                <article className="method-card" role="listitem">
                  <div className="method-num" aria-hidden="true">{m.num}</div>
                  <div className="method-icon" aria-hidden="true">{m.icon}</div>
                  <div className="method-step">{m.step}</div>
                  <h3 className="method-title">{m.title}</h3>
                  <p className="method-desc">{m.desc}</p>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider"/>

      {/* ── COACH ───────────────────────────────────────────── */}
      <section className="section coach-section section-video-bg" id="coach" aria-labelledby="coach-h">
        <img className="section-bg-img" src="/img/lizandro-bjj-comp2.jpg" alt="" aria-hidden="true" style={{width:'50%', opacity:0.18, objectPosition:'40% 25%'}}/>
        <div className="section-bg-overlay" aria-hidden="true"/>
        <div className="section-inner">
          <div className="coach-grid">
            <FadeUp>
              <div className="coach-photo-col">
                <div className="coach-photo-frame">
                  <img src="/img/coach-cropped.jpg" alt="Lizandro Ruiz — Ganador en competencia de Jiu Jitsu"/>
                  <div className="coach-photo-badge">
                    <div className="coach-photo-badge-name">Lizandro Ruiz</div>
                    <div className="coach-photo-badge-role">Cinturón Marrón BJJ · Chile</div>
                  </div>
                </div>
                <div className="coach-credentials">
                  {[
                    {num:'Marrón', label:'Cinturón BJJ'},
                    {num:'Titulado', label:'Preparador Físico'},
                    {num:'+8 años', label:'En Jiu Jitsu'},
                  ].map(c=>(
                    <div key={c.label} className="coach-cred-item">
                      <div className="coach-cred-num">{c.num}</div>
                      <div className="coach-cred-label">{c.label}</div>
                    </div>
                  ))}
                </div>
                <CoachReel/>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="coach-content">
                <div className="section-label">El Entrenador</div>
                <h2 className="section-title" id="coach-h">
                  Construido<br/><span>Desde el Tatami</span>
                </h2>
                <blockquote className="coach-quote">
                  "La preparación física no es solo el desarrollo de cualidades físicas — es una herramienta para la recalibración de la voluntad humana."
                </blockquote>
                <p className="coach-bio">
                  Ocho años en el tatami me enseñaron una cosa: la mayoría de las personas no necesita
                  entrenar más duro, necesita entrenar con más dirección.
                </p>
                <p className="coach-bio">
                  Soy preparador físico, cinturón marrón de Jiu Jitsu y competidor activo. Construí
                  MichiLab para ayudar a otros practicantes a desarrollar las capacidades físicas
                  que realmente importan en combate.
                </p>
                <p className="coach-bio">
                  MichiLab es un ecosistema de aprendizaje para practicantes de Jiu Jitsu, donde la
                  preparación física, el contenido técnico y el seguimiento personalizado trabajan
                  juntos para acelerar tu progreso.
                </p>
                <p className="coach-bio">
                  No me interesa acumular ejercicios ni hacerte entrenar por entrenar. Me interesa
                  que entiendas qué estás haciendo, por qué lo estás haciendo y cómo cada parte
                  del proceso te ayuda a rendir mejor en el tatami.
                </p>
                <div className="coach-pillars coach-pillars--grid">
                  {[
                    {icon:<I.Shield/>, title:'Disciplina', desc:'El trabajo consistente construye más que cualquier motivación momentánea.'},
                    {icon:<I.Zap/>,    title:'Fuerza Útil', desc:'Fuerza que se transfiere al combate, no solo al gimnasio.'},
                    {icon:<I.Target/>, title:'Seguimiento Real', desc:'Revisión semanal, ajustes constantes, comunicación directa.'},
                  ].map(p=>(
                    <div key={p.title} className="coach-pillar coach-pillar--compact">
                      <div className="coach-pillar-icon">{p.icon}</div>
                      <div className="coach-pillar-title">{p.title}</div>
                      <div className="coach-pillar-desc">{p.desc}</div>
                    </div>
                  ))}
                </div>
                <div className="coach-footer-row">
                  <div className="coach-tags">
                    {['Cinturón Marrón BJJ','Preparador Físico Titulado','Grappling','Fuerza','Movilidad','Potencia','Acondicionamiento'].map(t=>(
                      <span key={t} className={`coach-tag ${t==='Cinturón Marrón BJJ'||t==='Preparador Físico Titulado'?'accent':''}`}>{t}</span>
                    ))}
                  </div>
                  <button className="btn-primary" style={{whiteSpace:'nowrap',flexShrink:0}} onClick={wa}>
                    <I.Play/> Trabajar con Lizandro
                  </button>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <hr className="divider"/>

      {/* ── EJERCICIOS ──────────────────────────────────────── */}
      <section className="section" id="ejercicios" aria-labelledby="ej-h">
        <div className="section-inner">
          <FadeUp>
            <div className="section-label">El Contenido</div>
            <h2 className="section-title" id="ej-h">
              Muestra del<br/><span>Método en Acción</span>
            </h2>
            <p className="section-desc">
              Cada ejercicio tiene razón de ser. Esto es una muestra de la biblioteca de contenido
              que reciben todos los alumnos.
            </p>
          </FadeUp>
          <div className="exercises-grid">
            {[
              {src:'/videos/braceo.mp4',   thumb:'/img/braceo con elastico.png',   label:'Braceo con Elástico',    tag:'Combate'},
              {src:'/videos/landmine.mp4', thumb:'/img/landmine rotation.png',     label:'Landmine Rotation',      tag:'Fuerza'},
              {src:'/videos/caminata.mp4', thumb:'/img/caminata+flexion.png',      label:'Caminata + Flexión',     tag:'Movilidad'},
              {src:'/videos/dumbe.mp4',    thumb:'/img/dumbe.png',                 label:'Dumbbell Complex',       tag:'Potencia'},
              {src:'/videos/estocada.mp4', thumb:'/img/step un con mancuerna.png', label:'Estocada con Mancuerna', tag:'Fuerza'},
            ].map((ex,i)=>(
              <FadeUp key={ex.label} delay={i*0.07}>
                <ExerciseCard {...ex}/>
              </FadeUp>
            ))}
            <FadeUp delay={0.35}>
              <div className="exercise-card exercise-card--more">
                <div className="exercise-more-inner">
                  <div className="exercise-more-num">+30</div>
                  <div className="exercise-more-text">ejercicios en la biblioteca</div>
                  <button className="btn-primary" style={{marginTop:20,fontSize:'0.85rem',padding:'10px 24px'}} onClick={wa}>
                    Ver todo al aplicar
                  </button>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <hr className="divider"/>

      {/* ── TESTIMONIOS (hero strip) ─────────────────────────── */}
      <section className="section hero-test-section" id="resultados" aria-labelledby="test-h2">
        <div className="section-inner">
          <FadeUp>
            <div className="section-label">Resultados Reales</div>
            <h2 className="section-title" id="test-h2">
              Lo Que Dicen<br/><span>Los Atletas</span>
            </h2>
            <p className="section-desc">
              Atletas reales, procesos reales. Cada testimonio es una historia de trabajo bajo incomodidad.
            </p>
          </FadeUp>
          <FadeUp>
            <div className="test-carousel-wrap">
              <button className="test-nav-btn prev" onClick={()=>scrollTest(-1)} aria-label="Testimonio anterior"><I.Arrow/></button>
              <div className="test-carousel" ref={testRef} role="list">
                <div className="test-track">
                  {TESTIMONIALS.map((t)=>(
                    <article className="test-card" role="listitem" key={t.name}>
                      <div className="test-stars" aria-label="5 de 5 estrellas">
                        {Array.from({length:5}).map((_,j)=><I.Star key={j}/>)}
                      </div>
                      <blockquote className="test-text">{t.text}</blockquote>
                      <div className="test-author">
                        {t.photo
                          ? <img src={t.photo} alt={t.name} className="test-avatar-photo"/>
                          : <div className="test-avatar" aria-hidden="true">{t.initials}</div>
                        }
                        <div>
                          <div className="test-name">{t.name}</div>
                          <div className="test-role">{t.role}</div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <button className="test-nav-btn next" onClick={()=>scrollTest(1)} aria-label="Siguiente testimonio"><I.Arrow/></button>
            </div>
          </FadeUp>
        </div>
      </section>

      <hr className="divider"/>

      {/* ── PLANES ──────────────────────────────────────────── */}
      <section className="section programs-bg" id="programas" aria-labelledby="prog-h">
        <div className="section-inner">
          <FadeUp>
            <div className="section-label">Planes</div>
            <h2 className="section-title" id="prog-h">
              Elige Tu<br/><span>Protocolo</span>
            </h2>
          </FadeUp>

          {/* Nota global destacada */}
          <FadeUp delay={0.1}>
            <div className="plans-app-banner">
              <div className="plans-app-banner-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/><path d="M9 7h6M9 11h4"/></svg>
              </div>
              <div className="plans-app-banner-content">
                <div className="plans-app-banner-title">Acceso a la app Harbiz incluido en todos los planes</div>
                <div className="plans-app-banner-desc">Tu rutina paso a paso en el celular, más biblioteca de Jiu Jitsu integrada — técnicas, posiciones y material actualizado semanalmente.</div>
              </div>
              <div className="plans-app-banner-badge">INCLUIDO</div>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="plans-app-banner">
              <div className="plans-app-banner-icon" aria-hidden="true">
                <I.Shield/>
              </div>
              <div className="plans-app-banner-content">
                <div className="plans-app-banner-title">Garantía de 30 días</div>
                <div className="plans-app-banner-desc">Si entrenando conmigo no sientes mejoras reales en el tatami, te devuelvo tu dinero.</div>
              </div>
            </div>
          </FadeUp>

          {/* ── Online ── */}
          <FadeUp delay={0.1}>
            <div className="plans-category-label">Online · en cualquier parte de Chile o el mundo</div>
          </FadeUp>
          <div className="programs-grid" role="list">
            {PLANS_ONLINE.map((p,i)=>(
              <FadeUp key={p.title} delay={i*0.1}>
                <article className={`program-card ${p.featured?'featured':''}`} role="listitem">
                  <span className={`prog-badge ${p.badge.cls}`}>{p.badge.text}</span>
                  <h3 className="prog-title">{p.title}</h3>
                  <div className="prog-price">
                    <span className="prog-price-amount">{p.price}</span>
                    <span className="prog-price-period">{p.period}</span>
                  </div>
                  <div className="prog-quarterly">{p.quarterly}</div>
                  <ul className="prog-features" aria-label={`Incluye en ${p.title}`}>
                    {p.feats.map(f=>(
                      <li key={f}><I.Check aria-hidden="true"/>{f}</li>
                    ))}
                  </ul>
                  <button className="prog-cta" onClick={()=>p.payLink?(window.location.href=p.payLink):wa()}>{p.ctaText}</button>
                </article>
              </FadeUp>
            ))}
          </div>

          {/* ── Jiu Jitsu Personalizado ── */}
          <FadeUp delay={0.1}>
            <div className="plans-category-label" style={{marginTop:48}}>Clases presenciales de Jiu Jitsu · en persona, Chile</div>
          </FadeUp>
          <div className="programs-grid programs-grid--jj" role="list">
            {PLANS_JIU_JITSU.map((p,i)=>(
              <FadeUp key={p.title} delay={i*0.1}>
                <article className={`program-card ${p.highlight?'featured':''}`} role="listitem">
                  <h3 className="prog-title">{p.title}</h3>
                  <div className="prog-price">
                    <span className="prog-price-amount">{p.price}</span>
                    <span className="prog-price-period">{p.period}</span>
                  </div>
                  <p style={{color:'var(--fg-muted)',fontSize:'0.9rem',margin:'12px 0 20px',lineHeight:1.5}}>{p.desc}</p>
                  <button className="prog-cta" onClick={wa}>{p.ctaText}</button>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider"/>

      {/* ── PROCESO ─────────────────────────────────────────── */}
      <section className="section" id="proceso" aria-labelledby="proceso-h">
        <div className="section-inner">
          <FadeUp>
            <div className="section-label">El Proceso</div>
            <h2 className="section-title" id="proceso-h">
              ¿Qué Pasa Después<br/><span>de Aplicar?</span>
            </h2>
            <p className="section-desc">
              Sin sorpresas. Esto es exactamente lo que ocurre desde que escribes hasta que empiezas a entrenar.
            </p>
          </FadeUp>
          <div className="process-grid" role="list">
            {PROCESS_STEPS.map((s,i) => (
              <FadeUp key={s.num} delay={i*0.1}>
                <div className="process-card" role="listitem">
                  <div className="process-top">
                    <span className="process-num">{s.num}</span>
                    <span className="process-tag">{s.tag}</span>
                  </div>
                  <h3 className="process-title">{s.title}</h3>
                  <p className="process-desc">{s.desc}</p>
                  {i < PROCESS_STEPS.length - 1 && <div className="process-arrow" aria-hidden="true"><I.Arrow/></div>}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider"/>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="section" id="faq" aria-labelledby="faq-h">
        <div className="section-inner">
          <FadeUp>
            <div className="section-label">Preguntas Frecuentes</div>
            <h2 className="section-title" id="faq-h">
              Lo Que Todos<br/><span>Preguntan</span>
            </h2>
          </FadeUp>
          <div className="faq-list" role="list">
            {FAQ_ITEMS.map((item,i) => (
              <FaqItem key={i} q={item.q} a={item.a} delay={i*0.05}/>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider"/>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="section cta-section section-video-bg" id="contacto" aria-labelledby="cta-h">
        <video className="section-bg-video" src="/videos/estocada.mp4" autoPlay muted loop playsInline aria-hidden="true"/>
        <div className="section-bg-overlay dark" aria-hidden="true"/>
        <div className="section-inner">
          <FadeUp>
            <div className="cta-box">
              <div className="section-label" style={{justifyContent:'center',marginBottom:20}}>
                Cupos Limitados
              </div>
              <h2 className="cta-title" id="cta-h">
                ¿Listo Para<br/><span>Recalibrar?</span>
              </h2>
              <p className="cta-desc">
                Solo trabajo con atletas que se toman el proceso en serio.
                Si estás dispuesto a trabajar bajo incomodidad — el sistema hace el resto.
              </p>
              <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
                <button className="btn-primary" style={{fontSize:'1rem',padding:'16px 40px'}} onClick={wa}>
                  <I.Wa/> Aplicar por WhatsApp
                </button>
                <button className="btn-ghost" style={{fontSize:'1rem',padding:'16px 32px'}} onClick={ig}>
                  <I.Ig/> Instagram
                </button>
              </div>
              <p className="cta-fine">Respuesta en menos de 24 horas · Sin compromiso</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="footer" role="contentinfo">
        <div className="footer-bar">
          <div className="footer-logo">MICHI<span>LAB</span></div>
          <div className="footer-contact">
            <div className="footer-contact-item" onClick={ig} style={{cursor:'pointer'}}><I.Ig/>@ruiz.lizandroivan</div>
            <div className="footer-contact-item" onClick={wa} style={{cursor:'pointer'}}><I.Wa/>+56 9 7374 4226</div>
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} MichiLab · Lizandro Ruiz · Chile</p>
        </div>
      </footer>
    </>
  )
}
