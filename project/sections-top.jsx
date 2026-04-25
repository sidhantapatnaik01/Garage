/* Header + Hero + Car Models — v2 with real images & heavy animation */

const CAR_MODELS = [
  { name: "Alto K10", tagline: "City Champion", color: "#3b82f6", desc: "Scratch & dent repair for India's favourite city car", img: "https://www.marutisuzuki.com/adobe/assets/urn:aaid:aem:5834d2dc-af8c-4d41-b1f7-84c537954546/as/alto.png?height=400&width=660" },
  { name: "WagonR", tagline: "Family Favourite", color: "#10b981", desc: "Bumper and side panel restoration for the tall-boy icon", img: "https://www.marutisuzuki.com/adobe/assets/urn:aaid:aem:18f0b3ba-82b8-46ef-ae3a-cb3336612a83/as/wagon-r.png?height=400&width=660" },
  { name: "Celerio", tagline: "Urban Smart", color: "#f59e0b", desc: "Paint touch-up and polish for the smart commuter", img: "https://www.marutisuzuki.com/adobe/assets/urn:aaid:aem:5228dd06-2901-413b-88dc-c8635b0ad8a2/as/celerio.png?height=400&width=660" },
  { name: "Swift", tagline: "Sporty Icon", color: "#ef4444", desc: "Full exterior restoration for India's sportiest hatch", img: "https://www.marutisuzuki.com/adobe/assets/urn:aaid:aem:a0ea2bb5-dfd8-4569-a6bc-89b9928fc751/as/swift-banner-no-logo.png?height=400&width=660" },
  { name: "Dzire", tagline: "Elegant Sedan", color: "#8b5cf6", desc: "Premium panel painting and scratch removal", img: "https://www.marutisuzuki.com/adobe/assets/urn:aaid:aem:834183c9-f40f-4d14-bc9b-18fe493302cd/as/Dzire-430X260.png?height=400&width=660" },
  { name: "Ertiga", tagline: "Family MPV", color: "#06b6d4", desc: "Large panel repair and bumper refinishing", img: "https://www.marutisuzuki.com/adobe/assets/urn:aaid:aem:6247cdf4-2af5-443f-b054-761da87fd6ba/as/ertiga.png?height=400&width=660" },
  { name: "Brezza", tagline: "Bold SUV", color: "#f97316", desc: "SUV body polishing and accident damage repair", img: "https://www.marutisuzuki.com/adobe/assets/urn:aaid:aem:7d047132-966e-47ce-83ae-7f7550b91054/as/brezza.png?height=400&width=660" },
  { name: "S-Presso", tagline: "Micro SUV", color: "#ec4899", desc: "Minor dent and cosmetic refresh specialist", img: "https://www.marutisuzuki.com/adobe/assets/urn:aaid:aem:8f4f96e0-d5ae-4a4a-b3b9-93c36fdc3172/as/s-presso.png?height=400&width=660" },
  { name: "Eeco", tagline: "Workhorse Van", color: "#14b8a6", desc: "Commercial vehicle exterior restoration", img: "https://www.marutisuzuki.com/adobe/assets/urn:aaid:aem:a80daf16-aa5e-42a5-b3cd-4a3b10da21b4/as/EECO.png?height=400&width=660" },
];

/* ── Animated counter hook ── */
function useCounter(target, duration = 2000, startOnView = true) {
  const [count, setCount] = React.useState(0);
  const [started, setStarted] = React.useState(!startOnView);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!startOnView) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [startOnView]);

  React.useEffect(() => {
    if (!started) return;
    let start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);

  return { count, ref };
}

/* ── Typing text effect ── */
function TypingText({ texts, speed = 80, pause = 2000 }) {
  const [idx, setIdx] = React.useState(0);
  const [charIdx, setCharIdx] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    const text = texts[idx];
    if (!deleting && charIdx < text.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), speed);
      return () => clearTimeout(t);
    } else if (!deleting && charIdx === text.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    } else if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
      return () => clearTimeout(t);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setIdx(i => (i + 1) % texts.length);
    }
  }, [charIdx, deleting, idx, texts, speed, pause]);

  return (
    <span style={{ color: '#e63946' }}>
      {texts[idx].slice(0, charIdx)}
      <span style={{ animation: 'blink 0.7s step-end infinite', borderRight: '2px solid #e63946', marginLeft: 2 }}></span>
    </span>
  );
}

/* ── Particle system for hero ── */
function Particles({ count = 40 }) {
  const particles = React.useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2.5,
    dur: 15 + Math.random() * 25,
    delay: Math.random() * -20,
    opacity: 0.1 + Math.random() * 0.3,
  })), [count]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size, borderRadius: '50%',
          background: '#e63946', opacity: p.opacity,
          animation: `particleFloat ${p.dur}s linear infinite`,
          animationDelay: `${p.delay}s`,
        }} />
      ))}
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = ['Home','Services','Models','Gallery','Contact'];

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px) saturate(1.4)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
      transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
      padding: '0 clamp(16px, 4vw, 48px)',
    }}>
      <div style={{
        maxWidth: 1400, margin: '0 auto', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
        height: scrolled ? 60 : 76, transition: 'height 0.5s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'linear-gradient(135deg, #e63946, #ff6b6b)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 17, fontWeight: 900, color: '#fff',
            boxShadow: '0 4px 16px rgba(230,57,70,0.4)',
            animation: 'logoPulse 3s ease-in-out infinite',
          }}>MC</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Maruti Care</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Nabarangapur</div>
          </div>
        </a>

        <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="desktop-nav">
          {navItems.map((item, i) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link" style={{
              color: 'rgba(255,255,255,0.65)', textDecoration: 'none',
              fontSize: 13, fontWeight: 500, letterSpacing: '0.03em',
              position: 'relative', padding: '4px 0',
            }}>{item}</a>
          ))}
          <a href="#contact" className="nav-cta-btn" style={{
            background: 'linear-gradient(135deg, #e63946, #c62828)',
            color: '#fff', padding: '10px 24px', borderRadius: 10,
            fontSize: 13, fontWeight: 700, textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(230,57,70,0.3)',
            position: 'relative', overflow: 'hidden',
          }}>
            <span style={{ position: 'relative', zIndex: 1 }}>Free Estimate</span>
          </a>
        </nav>

        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{
          background: 'none', border: 'none', color: '#fff', fontSize: 26, cursor: 'pointer',
          display: 'none', transition: 'transform 0.3s',
          transform: menuOpen ? 'rotate(90deg)' : 'none',
        }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`} style={{
        position: 'absolute', top: '100%', left: 0, right: 0,
        background: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(24px)',
        padding: menuOpen ? '16px 24px 24px' : '0 24px',
        maxHeight: menuOpen ? 400 : 0, overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        borderBottom: menuOpen ? '1px solid rgba(255,255,255,0.05)' : 'none',
      }}>
        {navItems.map((item, i) => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{
            display: 'block', color: '#fff', textDecoration: 'none',
            padding: '14px 0', fontSize: 16, fontWeight: 500,
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateX(0)' : 'translateX(-20px)',
            transition: `all 0.4s cubic-bezier(0.4,0,0.2,1) ${i * 0.06}s`,
          }}>{item}</a>
        ))}
      </div>
    </header>
  );
}

function Hero() {
  const [mouse, setMouse] = React.useState({ x: 0.5, y: 0.5 });
  const [loaded, setLoaded] = React.useState(true);
  const c1 = useCounter(500, 2200);
  const c2 = useCounter(9, 1200);

  return (
    <section id="home" style={{
      minHeight: '100vh', position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#060606',
    }} onMouseMove={e => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })}>

      <Particles count={50} />

      {/* Dynamic radial glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(800px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(230,57,70,0.08) 0%, transparent 50%)`,
        transition: 'background 0.3s ease',
      }} />

      {/* Animated mesh gradient */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.4,
        background: 'conic-gradient(from 180deg at 50% 50%, #0a0a0a 0deg, #1a0a0a 60deg, #0a0a0a 120deg, #0a1018 180deg, #0a0a0a 240deg, #180a0a 300deg, #0a0a0a 360deg)',
        animation: 'meshRotate 20s linear infinite',
      }} />

      {/* Perspective grid */}
      <div style={{
        position: 'absolute', bottom: 0, left: '-20%', right: '-20%', height: '50%',
        opacity: 0.06,
        backgroundImage: 'linear-gradient(rgba(230,57,70,1) 1px, transparent 1px), linear-gradient(90deg, rgba(230,57,70,1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        transform: `perspective(400px) rotateX(60deg) translateY(${(mouse.y - 0.5) * -20}px)`,
        transformOrigin: 'bottom center',
        transition: 'transform 0.8s ease-out',
        maskImage: 'linear-gradient(to top, black, transparent)',
        WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
      }} />

      {/* Hero content */}
      <div style={{
        position: 'relative', zIndex: 2, textAlign: 'center',
        maxWidth: 900, padding: '100px 24px 60px',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '7px 18px', borderRadius: 40,
          border: '1px solid rgba(230,57,70,0.25)', background: 'rgba(230,57,70,0.06)',
          color: '#e63946', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em',
          textTransform: 'uppercase', marginBottom: 32,
          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1) 0.2s',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e63946', animation: 'pulse 2s infinite' }} />
          Nabarangapur's Trusted Garage
        </div>

        <h1 style={{
          fontSize: 'clamp(34px, 6.5vw, 76px)', fontWeight: 900, color: '#fff',
          lineHeight: 1.02, margin: '0 0 10px', letterSpacing: '-0.04em',
          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1) 0.35s',
        }}>
          Restore Your Car.
        </h1>
        <h1 style={{
          fontSize: 'clamp(34px, 6.5vw, 76px)', fontWeight: 900,
          lineHeight: 1.02, margin: '0 0 10px', letterSpacing: '-0.04em',
          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1) 0.5s',
        }}>
          <TypingText texts={['Refresh Its Look.', 'Remove Every Dent.', 'Fix Every Scratch.', 'Polish to Perfection.']} />
        </h1>
        <h1 style={{
          fontSize: 'clamp(34px, 6.5vw, 76px)', fontWeight: 900, color: '#fff',
          lineHeight: 1.02, margin: '0 0 28px', letterSpacing: '-0.04em',
          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1) 0.65s',
        }}>
          Drive With Confidence.
        </h1>

        <p style={{
          fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.75, maxWidth: 560, margin: '0 auto 40px', textWrap: 'pretty',
          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1) 0.8s',
        }}>
          Expert dent repair, scratch removal, bumper restoration, and showroom-quality polishing for every Maruti Suzuki Arena model.
        </p>

        <div style={{
          display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap',
          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1) 0.95s',
        }}>
          <a href="#contact" className="hero-btn-primary" style={{
            background: 'linear-gradient(135deg, #e63946, #c62828)',
            color: '#fff', padding: '15px 34px', borderRadius: 12,
            fontSize: 15, fontWeight: 700, textDecoration: 'none',
            boxShadow: '0 8px 40px rgba(230,57,70,0.35)',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            position: 'relative', overflow: 'hidden',
          }}>
            <span style={{ position: 'relative', zIndex: 1 }}>Get a Free Estimate</span>
            <span style={{ position: 'relative', zIndex: 1, fontSize: 18, transition: 'transform 0.3s' }}>→</span>
          </a>
          <a href="#beforeafter" className="hero-btn-secondary" style={{
            background: 'rgba(255,255,255,0.04)', color: '#fff',
            padding: '15px 34px', borderRadius: 12, fontSize: 15, fontWeight: 600,
            textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
          }}>View Transformations</a>
        </div>

        {/* Animated stats */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 'clamp(32px, 6vw, 72px)',
          marginTop: 72, flexWrap: 'wrap',
          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1) 1.1s',
        }}>
          <div ref={c1.ref} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(32px, 5vw, 50px)', fontWeight: 900, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{c1.count}+</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 6 }}>Cars Restored</div>
          </div>
          <div ref={c2.ref} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(32px, 5vw, 50px)', fontWeight: 900, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{c2.count}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 6 }}>Models Served</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(32px, 5vw, 50px)', fontWeight: 900, color: '#e63946' }}>4.9<span style={{ fontSize: '0.6em' }}>★</span></div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 6 }}>Rating</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      }}>
        <div style={{
          width: 24, height: 40, borderRadius: 12, border: '1.5px solid rgba(255,255,255,0.15)',
          display: 'flex', justifyContent: 'center', paddingTop: 8,
        }}>
          <div style={{
            width: 3, height: 8, borderRadius: 2, background: '#e63946',
            animation: 'scrollDot 2s ease-in-out infinite',
          }} />
        </div>
      </div>
    </section>
  );
}

/* ── 3D Tilt Card ── */
function TiltCard({ children, style, ...props }) {
  const ref = React.useRef(null);
  const [transform, setTransform] = React.useState('perspective(800px) rotateX(0) rotateY(0)');

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`);
  };
  const onLeave = () => setTransform('perspective(800px) rotateX(0) rotateY(0) scale(1)');

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ ...style, transform, transition: 'transform 0.3s ease-out', transformStyle: 'preserve-3d' }} {...props}>
      {children}
    </div>
  );
}

function CarModels() {
  const [selectedCar, setSelectedCar] = React.useState(null);
  const scrollerRef = React.useRef(null);
  const [autoScroll, setAutoScroll] = React.useState(true);

  // Auto-scroll carousel
  React.useEffect(() => {
    if (!autoScroll || !scrollerRef.current) return;
    const el = scrollerRef.current;
    let raf;
    const scroll = () => {
      el.scrollLeft += 0.5;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) el.scrollLeft = 0;
      raf = requestAnimationFrame(scroll);
    };
    raf = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(raf);
  }, [autoScroll]);

  return (
    <section id="models" style={{
      padding: 'clamp(80px, 10vw, 140px) 0',
      background: '#080808', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background accent */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(230,57,70,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)' }}>
        <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: 50 }}>
          <div style={{ fontSize: 12, color: '#e63946', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>Maruti Suzuki Arena</div>
          <h2 style={{ fontSize: 'clamp(30px, 4.5vw, 54px)', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>
            Choose Your Model
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, marginTop: 14, maxWidth: 480, margin: '14px auto 0' }}>
            Tap any car for repair details and booking
          </p>
        </div>
      </div>

      {/* Horizontal scroller */}
      <div ref={scrollerRef}
        onMouseEnter={() => setAutoScroll(false)}
        onMouseLeave={() => setAutoScroll(true)}
        style={{
          display: 'flex', gap: 20, overflowX: 'auto', overflowY: 'visible',
          padding: '20px clamp(16px, 4vw, 48px) 40px',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none', msOverflowStyle: 'none',
        }}
        className="hide-scrollbar"
      >
        {CAR_MODELS.map((car, i) => (
          <TiltCard key={car.name} style={{
            flexShrink: 0, width: 'clamp(260px, 30vw, 320px)',
            background: selectedCar === i ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
            border: `1px solid ${selectedCar === i ? `${car.color}40` : 'rgba(255,255,255,0.05)'}`,
            borderRadius: 20, cursor: 'pointer',
            scrollSnapAlign: 'center',
            overflow: 'hidden',
          }} onClick={() => setSelectedCar(selectedCar === i ? null : i)}>
            {/* Car image */}
            <div style={{
              width: '100%', height: 180, position: 'relative', overflow: 'hidden',
              background: `linear-gradient(135deg, ${car.color}08, #0a0a0a)`,
            }}>
              <img src={car.img} alt={car.name} loading="lazy" style={{
                width: '100%', height: '100%', objectFit: 'contain',
                transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
                filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))',
              }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.08) translateY(-4px)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
              {/* Shine sweep on hover */}
              <div className="shine-sweep" style={{
                position: 'absolute', top: 0, left: '-100%', width: '60%', height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
                transform: 'skewX(-15deg)',
              }} />
            </div>

            <div style={{ padding: '20px 24px 24px' }}>
              <div style={{
                display: 'inline-block', padding: '3px 10px', borderRadius: 6,
                background: `${car.color}12`, border: `1px solid ${car.color}25`,
                fontSize: 10, fontWeight: 700, color: car.color,
                letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10,
              }}>{car.tagline}</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.02em' }}>{car.name}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, margin: 0 }}>{car.desc}</p>

              {selectedCar === i && (
                <div style={{
                  marginTop: 18, paddingTop: 18,
                  borderTop: `1px solid rgba(255,255,255,0.06)`,
                  animation: 'slideDown 0.3s ease-out',
                }}>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 14 }}>
                    <strong style={{ color: '#fff' }}>Common repairs:</strong> Bumper scuffs, door dents, parking scratches, paint fading, body polishing
                  </div>
                  <a href="#contact" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: `${car.color}15`, color: car.color,
                    padding: '10px 20px', borderRadius: 10, fontSize: 13,
                    fontWeight: 700, textDecoration: 'none',
                    border: `1px solid ${car.color}30`,
                    transition: 'all 0.3s',
                  }}>Book Repair <span>→</span></a>
                </div>
              )}
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Header, Hero, CarModels, CAR_MODELS, TiltCard, useCounter });
