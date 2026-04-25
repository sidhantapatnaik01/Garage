/* Before/After + Services + How It Works + Why Choose Us — v2 dynamic */

function BeforeAfter() {
  const [sliderPos, setSliderPos] = React.useState(50);
  const [activeModel, setActiveModel] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const containerRef = React.useRef(null);

  const models = [
    { name: 'Swift', damage: 'Door dent & deep scratch', img: CAR_MODELS[3].img, color: '#ef4444' },
    { name: 'Brezza', damage: 'Bumper scuff & paint chip', img: CAR_MODELS[6].img, color: '#f97316' },
    { name: 'WagonR', damage: 'Side panel scratch', img: CAR_MODELS[1].img, color: '#10b981' },
    { name: 'Dzire', damage: 'Fender dent restoration', img: CAR_MODELS[4].img, color: '#8b5cf6' },
  ];

  const handleMove = React.useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setSliderPos(Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  React.useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => handleMove(e.touches ? e.touches[0].clientX : e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onUp); };
  }, [dragging, handleMove]);

  // Auto-animate slider hint
  React.useEffect(() => {
    const t = setTimeout(() => {
      let start = performance.now();
      const anim = (now) => {
        const p = (now - start) / 2000;
        if (p > 1) return;
        setSliderPos(50 + Math.sin(p * Math.PI * 2) * 25);
        requestAnimationFrame(anim);
      };
      requestAnimationFrame(anim);
    }, 1500);
    return () => clearTimeout(t);
  }, [activeModel]);

  const m = models[activeModel];

  return (
    <section id="beforeafter" style={{
      padding: 'clamp(80px,10vw,140px) clamp(16px,4vw,48px)',
      background: '#050505', position: 'relative', overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '30%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(230,57,70,0.05), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 12, color: '#e63946', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>Before → After</div>
          <h2 style={{ fontSize: 'clamp(30px,4.5vw,54px)', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>
            See the Transformation
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, marginTop: 14 }}>Drag the slider to reveal the magic</p>
        </div>

        {/* Model tabs */}
        <div className="scroll-reveal" style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 32, flexWrap: 'wrap' }}>
          {models.map((mod, i) => (
            <button key={mod.name} onClick={() => { setActiveModel(i); setSliderPos(50); }} style={{
              background: activeModel === i ? `${mod.color}18` : 'rgba(255,255,255,0.03)',
              border: `1px solid ${activeModel === i ? `${mod.color}40` : 'rgba(255,255,255,0.06)'}`,
              color: activeModel === i ? mod.color : 'rgba(255,255,255,0.5)',
              padding: '10px 22px', borderRadius: 10, fontSize: 13, fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
              transform: activeModel === i ? 'scale(1.05)' : 'scale(1)',
            }}>{mod.name}</button>
          ))}
        </div>

        {/* Slider */}
        <div ref={containerRef} className="scroll-reveal" style={{
          position: 'relative', width: '100%', aspectRatio: '16/9',
          borderRadius: 24, overflow: 'hidden', cursor: 'ew-resize',
          border: '1px solid rgba(255,255,255,0.06)',
          userSelect: 'none', boxShadow: '0 20px 80px rgba(0,0,0,0.5)',
        }} onMouseDown={(e) => { setDragging(true); handleMove(e.clientX); }}
           onTouchStart={(e) => { setDragging(true); handleMove(e.touches[0].clientX); }}>

          {/* AFTER layer (green tint — restored) */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0a1a0f, #060606)' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={m.img} alt={`${m.name} After`} style={{
                maxWidth: '65%', maxHeight: '70%', objectFit: 'contain',
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6)) brightness(1.1) saturate(1.2)',
              }} />
            </div>
            {/* Sparkle effects */}
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: `${20 + Math.random() * 60}%`,
                top: `${15 + Math.random() * 60}%`,
                width: 4, height: 4, borderRadius: '50%',
                background: '#fff',
                animation: `sparkle ${1.5 + Math.random()}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: 0,
              }} />
            ))}
            <div style={{ position: 'absolute', bottom: 20, right: 20, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(40,180,80,0.12)', border: '1px solid rgba(40,180,80,0.3)', padding: '8px 16px', borderRadius: 10, backdropFilter: 'blur(10px)' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28b450', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#28b450' }}>AFTER — Restored</span>
            </div>
          </div>

          {/* BEFORE layer (red tint — damaged, clipped) */}
          <div style={{
            position: 'absolute', inset: 0,
            clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
            background: 'linear-gradient(135deg, #1a0808, #060606)',
            transition: dragging ? 'none' : 'clip-path 0.05s ease',
          }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={m.img} alt={`${m.name} Before`} style={{
                maxWidth: '65%', maxHeight: '70%', objectFit: 'contain',
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6)) brightness(0.7) saturate(0.4) sepia(0.3)',
              }} />
            </div>
            {/* Damage markers */}
            {[
              { top: '28%', left: '35%', label: 'Deep Dent', rot: -5 },
              { top: '50%', left: '55%', label: 'Scratch', rot: 8 },
              { top: '62%', left: '38%', label: 'Paint Chip', rot: -3 },
            ].map((d, i) => (
              <div key={i} style={{ position: 'absolute', top: d.top, left: d.left, transform: `rotate(${d.rot}deg)` }}>
                <div style={{
                  width: 12, height: 12, borderRadius: '50%', background: 'rgba(230,57,70,0.5)',
                  animation: 'damagePulse 2s ease-in-out infinite',
                  animationDelay: `${i * 0.4}s`, boxShadow: '0 0 20px rgba(230,57,70,0.3)',
                }} />
                <div style={{
                  position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)',
                  background: 'rgba(230,57,70,0.15)', border: '1px solid rgba(230,57,70,0.35)',
                  padding: '3px 10px', borderRadius: 6, fontSize: 10, color: '#e63946',
                  fontWeight: 700, whiteSpace: 'nowrap', backdropFilter: 'blur(8px)',
                  letterSpacing: '0.05em',
                }}>{d.label}</div>
              </div>
            ))}
            <div style={{ position: 'absolute', bottom: 20, left: 20, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(230,57,70,0.12)', border: '1px solid rgba(230,57,70,0.3)', padding: '8px 16px', borderRadius: 10, backdropFilter: 'blur(10px)' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#e63946', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#e63946' }}>BEFORE — Damaged</span>
            </div>
          </div>

          {/* Slider handle */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0,
            left: `${sliderPos}%`, width: 3, transform: 'translateX(-50%)',
            background: 'linear-gradient(to bottom, transparent, #fff, #fff, transparent)',
            boxShadow: '0 0 24px rgba(255,255,255,0.2)',
          }}>
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
              width: 52, height: 52, borderRadius: '50%',
              background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.2)',
              animation: dragging ? 'none' : 'handleGlow 2s ease-in-out infinite',
            }}>
              <span style={{ fontSize: 18, color: '#0a0a0a', fontWeight: 900, letterSpacing: 2 }}>⟨ ⟩</span>
            </div>
          </div>
        </div>

        {/* Info bar */}
        <div className="scroll-reveal" style={{
          display: 'flex', justifyContent: 'center', gap: 40, marginTop: 32, flexWrap: 'wrap',
        }}>
          {[
            { label: 'Model', value: m.name },
            { label: 'Damage', value: m.damage },
            { label: 'Repair Time', value: '2-4 Hours' },
            { label: 'Result', value: 'Factory Finish' },
          ].map(item => (
            <div key={item.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { icon: '⬡', title: 'Dent Repair', desc: 'Precision dent removal restoring panels to factory finish without repainting', gradient: 'linear-gradient(135deg, #e63946, #ff6b6b)' },
  { icon: '◇', title: 'Scratch Removal', desc: 'Deep and surface scratch repair with exact OEM colour matching', gradient: 'linear-gradient(135deg, #3b82f6, #60a5fa)' },
  { icon: '◎', title: 'Bumper Repair', desc: 'Scuffs, cracks, and full bumper repainting and structural restoration', gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
  { icon: '▣', title: 'Panel Paint', desc: 'Professional panel painting with OEM-grade colour match technology', gradient: 'linear-gradient(135deg, #10b981, #34d399)' },
  { icon: '◉', title: 'Body Polishing', desc: 'Machine polishing for showroom-quality shine and UV protection', gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' },
  { icon: '⚡', title: 'Accident Repair', desc: 'Minor collision damage restored quickly with insurance documentation', gradient: 'linear-gradient(135deg, #ef4444, #f87171)' },
  { icon: '◈', title: 'Exterior Restoration', desc: 'Full body makeover for aging, faded or weather-worn vehicles', gradient: 'linear-gradient(135deg, #06b6d4, #22d3ee)' },
  { icon: '✦', title: 'Car Detailing', desc: 'Interior and exterior deep clean with ceramic coating option', gradient: 'linear-gradient(135deg, #ec4899, #f472b6)' },
];

function Services() {
  const [hoveredIdx, setHoveredIdx] = React.useState(-1);
  const [expandedIdx, setExpandedIdx] = React.useState(-1);

  return (
    <section id="services" style={{
      padding: 'clamp(80px,10vw,140px) clamp(16px,4vw,48px)',
      background: '#080808', position: 'relative',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 12, color: '#e63946', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>What We Do</div>
          <h2 style={{ fontSize: 'clamp(30px,4.5vw,54px)', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>
            Expert Repair Services
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, marginTop: 14 }}>Precision repair for everyday cars</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(270px, 100%), 1fr))',
          gap: 14,
        }}>
          {SERVICES.map((s, i) => (
            <div key={s.title} className="scroll-reveal service-card" style={{
              background: hoveredIdx === i ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.015)',
              border: `1px solid ${hoveredIdx === i ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)'}`,
              borderRadius: 18, padding: 28, cursor: 'pointer',
              transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
              transform: hoveredIdx === i ? 'translateY(-8px) scale(1.01)' : 'none',
              position: 'relative', overflow: 'hidden',
            }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(-1)}
              onClick={() => setExpandedIdx(expandedIdx === i ? -1 : i)}
            >
              {/* Animated gradient border glow */}
              {hoveredIdx === i && <div style={{
                position: 'absolute', inset: -1, borderRadius: 18, padding: 1,
                background: s.gradient, opacity: 0.15, zIndex: 0,
                animation: 'borderGlow 2s ease-in-out infinite',
              }} />}

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: s.gradient, opacity: hoveredIdx === i ? 1 : 0.7,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, marginBottom: 20, transition: 'all 0.4s',
                  transform: hoveredIdx === i ? 'scale(1.1) rotate(5deg)' : 'none',
                  boxShadow: hoveredIdx === i ? '0 8px 24px rgba(0,0,0,0.3)' : 'none',
                  color: '#fff',
                }}>{s.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.01em' }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>

                {expandedIdx === i && (
                  <a href="#contact" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    marginTop: 16, background: 'rgba(230,57,70,0.1)',
                    color: '#e63946', padding: '8px 16px', borderRadius: 8,
                    fontSize: 13, fontWeight: 700, textDecoration: 'none',
                    border: '1px solid rgba(230,57,70,0.2)',
                    animation: 'slideDown 0.3s ease-out',
                  }}>Get Quote <span>→</span></a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = [
    { num: '01', title: 'Send a Photo', desc: 'Share damage photos via WhatsApp or our contact form — we respond within 30 minutes', icon: '📸' },
    { num: '02', title: 'Get Your Estimate', desc: 'Receive a transparent quote with repair options, timeline, and clear pricing', icon: '📋' },
    { num: '03', title: 'Repair & Deliver', desc: 'We restore your car to showroom condition and deliver it gleaming', icon: '✨' },
  ];

  React.useEffect(() => {
    const t = setInterval(() => setActiveStep(s => (s + 1) % 3), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{
      padding: 'clamp(80px,10vw,120px) clamp(16px,4vw,48px)',
      background: '#050505',
    }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 12, color: '#e63946', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>Simple Process</div>
          <h2 style={{ fontSize: 'clamp(30px,4.5vw,54px)', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>Three Steps to Perfect</h2>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24, position: 'relative',
        }}>
          {steps.map((s, i) => (
            <div key={s.num} className="scroll-reveal" onClick={() => setActiveStep(i)} style={{
              textAlign: 'center', padding: 32, borderRadius: 20, cursor: 'pointer',
              background: activeStep === i ? 'rgba(230,57,70,0.06)' : 'rgba(255,255,255,0.015)',
              border: `1px solid ${activeStep === i ? 'rgba(230,57,70,0.2)' : 'rgba(255,255,255,0.04)'}`,
              transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
              transform: activeStep === i ? 'translateY(-6px) scale(1.02)' : 'none',
            }}>
              <div style={{
                fontSize: 40, marginBottom: 16,
                transition: 'transform 0.4s',
                transform: activeStep === i ? 'scale(1.2)' : 'scale(1)',
              }}>{s.icon}</div>
              <div style={{
                width: 40, height: 40, borderRadius: '50%', margin: '0 auto 16px',
                background: activeStep === i ? 'linear-gradient(135deg, #e63946, #c62828)' : 'rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, fontWeight: 900, color: activeStep === i ? '#fff' : 'rgba(255,255,255,0.3)',
                transition: 'all 0.4s', boxShadow: activeStep === i ? '0 4px 20px rgba(230,57,70,0.3)' : 'none',
              }}>{s.num}</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: '0 0 10px' }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ maxWidth: 400, margin: '32px auto 0', height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.05)' }}>
          <div style={{
            height: '100%', borderRadius: 2,
            background: 'linear-gradient(90deg, #e63946, #ff6b6b)',
            width: `${((activeStep + 1) / 3) * 100}%`,
            transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
          }} />
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const reasons = [
    { icon: '⚡', title: 'Fast Turnaround', desc: 'Most repairs completed same-day or next-day delivery', num: '24h' },
    { icon: '★', title: 'Expert Workmanship', desc: 'Skilled technicians with years of Maruti-specific experience', num: '10+yr' },
    { icon: '◐', title: 'Before/After Proof', desc: 'See real transformations before you commit to any repair', num: '100%' },
    { icon: '₹', title: 'Affordable Pricing', desc: 'Fair, transparent pricing without hidden charges', num: '30%' },
    { icon: '♥', title: 'Daily-Driver Care', desc: 'We understand cars that work as hard as you do', num: '500+' },
    { icon: '✓', title: 'Local Trust', desc: "Nabarangapur's most recommended garage for Maruti owners", num: '#1' },
  ];

  return (
    <section style={{
      padding: 'clamp(80px,10vw,120px) clamp(16px,4vw,48px)',
      background: '#080808', position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 800, height: 800, borderRadius: '50%', border: '1px solid rgba(230,57,70,0.03)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 12, color: '#e63946', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>Why Us</div>
          <h2 style={{ fontSize: 'clamp(30px,4.5vw,54px)', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>Built on Trust & Results</h2>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: 14,
        }}>
          {reasons.map((r, i) => (
            <div key={r.title} className="scroll-reveal trust-card" style={{
              display: 'flex', gap: 18, padding: 24, borderRadius: 16,
              background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)',
              transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                background: 'rgba(230,57,70,0.06)', border: '1px solid rgba(230,57,70,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, transition: 'all 0.4s',
              }}>{r.icon}</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: 16, fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>{r.title}</h4>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, margin: 0 }}>{r.desc}</p>
              </div>
              <div style={{
                position: 'absolute', top: 12, right: 16,
                fontSize: 11, fontWeight: 800, color: 'rgba(230,57,70,0.3)',
                letterSpacing: '0.05em',
              }}>{r.num}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { BeforeAfter, Services, HowItWorks, WhyChooseUs });
