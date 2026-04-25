/* ── Scroll-driven Video Hero + Stage System ── */

const VIDEO_STAGES = [
  { at: 0.0, label: 'Inspect', title: 'See the Damage', desc: 'Every repair starts with a careful inspection of your vehicle\'s exterior condition.' },
  { at: 0.2, label: 'Detach', title: 'Identify the Problem', desc: 'We isolate affected panels, bumpers, and surfaces to understand the full scope of work.' },
  { at: 0.4, label: 'Reveal', title: 'Expose Hidden Damage', desc: 'Beneath the surface, dents, stress fractures, and paint imperfections are revealed.' },
  { at: 0.6, label: 'Repair Focus', title: 'Precision Repair', desc: 'Expert technicians work on each component — dent pulling, filling, sanding, priming.' },
  { at: 0.8, label: 'Rebuild', title: 'Restore to Perfection', desc: 'Reassembly with OEM colour match, polish, and final quality inspection.' },
];

function VideoHero() {
  const sectionRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);
  const [videoDuration, setVideoDuration] = React.useState(0);
  const [videoReady, setVideoReady] = React.useState(false);
  const [currentStage, setCurrentStage] = React.useState(0);

  // Set video duration once loaded
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onMeta = () => { setVideoDuration(v.duration); setVideoReady(true); };
    v.addEventListener('loadedmetadata', onMeta);
    // Also try if already loaded
    if (v.readyState >= 1) onMeta();
    return () => v.removeEventListener('loadedmetadata', onMeta);
  }, []);

  // Scroll-driven video playback
  React.useEffect(() => {
    if (!videoDuration) return;
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrollableHeight = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      setProgress(p);

      // Seek video
      const v = videoRef.current;
      if (v && videoDuration) {
        const targetTime = p * videoDuration;
        if (Math.abs(v.currentTime - targetTime) > 0.05) {
          v.currentTime = targetTime;
        }
      }

      // Determine stage
      for (let i = VIDEO_STAGES.length - 1; i >= 0; i--) {
        if (p >= VIDEO_STAGES[i].at) { setCurrentStage(i); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [videoDuration]);

  const stage = VIDEO_STAGES[currentStage];

  return (
    <section ref={sectionRef} id="home" style={{
      height: '500vh', /* long scroll area for video control */
      position: 'relative',
    }}>
      {/* Sticky container */}
      <div style={{
        position: 'sticky', top: 0, height: '100vh', width: '100%',
        overflow: 'hidden', background: '#030303',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Video */}
        <video ref={videoRef} muted playsInline preload="auto"
          src="uploads/kling_20260425_VIDEO_Create_a_p_4114_0.mp4"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', opacity: videoReady ? 1 : 0,
            transition: 'opacity 1s ease',
          }}
        />

        {/* Loading state */}
        {!videoReady && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            background: '#030303',
          }}>
            <div style={{
              width: 48, height: 48, border: '2px solid rgba(230,57,70,0.2)',
              borderTopColor: '#e63946', borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }} />
          </div>
        )}

        {/* Dark overlay for readability */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to bottom, rgba(0,0,0,${0.3 + progress * 0.2}), rgba(0,0,0,0.15), rgba(0,0,0,${0.4 + progress * 0.2}))`,
          pointerEvents: 'none',
        }} />

        {/* ── Top: headline (fades out as user scrolls) ── */}
        <div style={{
          position: 'absolute', top: 'clamp(80px, 12vh, 120px)',
          left: 0, right: 0, textAlign: 'center',
          padding: '0 24px',
          opacity: Math.max(0, 1 - progress * 4),
          transform: `translateY(${-progress * 60}px)`,
          transition: 'opacity 0.1s, transform 0.1s',
          pointerEvents: progress > 0.15 ? 'none' : 'auto',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '7px 18px', borderRadius: 40,
            border: '1px solid rgba(230,57,70,0.25)', background: 'rgba(230,57,70,0.06)',
            color: '#e63946', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', marginBottom: 24, backdropFilter: 'blur(10px)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e63946', animation: 'pulse 2s infinite' }} />
            Scroll to Explore
          </div>
          <h1 style={{
            fontSize: 'clamp(36px, 7vw, 80px)', fontWeight: 900, color: '#fff',
            lineHeight: 1.0, margin: '0 0 20px', letterSpacing: '-0.04em',
            textShadow: '0 4px 40px rgba(0,0,0,0.5)',
          }}>
            See the Damage.<br/>
            <span style={{ color: '#e63946' }}>Understand the Repair.</span>
          </h1>
          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(255,255,255,0.6)',
            maxWidth: 520, margin: '0 auto 32px', lineHeight: 1.7,
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}>
            Scroll down to watch a car disassemble and discover how we repair every component with precision.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#services" style={{
              background: 'linear-gradient(135deg, #e63946, #c62828)', color: '#fff',
              padding: '14px 30px', borderRadius: 12, fontSize: 14, fontWeight: 700,
              textDecoration: 'none', boxShadow: '0 8px 32px rgba(230,57,70,0.35)',
            }}>View Services</a>
            <a href="#contact" style={{
              background: 'rgba(255,255,255,0.08)', color: '#fff',
              padding: '14px 30px', borderRadius: 12, fontSize: 14, fontWeight: 600,
              textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(10px)',
            }}>Request Estimate</a>
          </div>
        </div>

        {/* ── Stage label (appears as scrolling begins) ── */}
        <div style={{
          position: 'absolute', left: 'clamp(20px, 4vw, 48px)',
          bottom: 'clamp(80px, 12vh, 120px)',
          maxWidth: 420,
          opacity: progress > 0.05 ? Math.min(1, (progress - 0.05) * 8) : 0,
          transform: `translateY(${progress > 0.05 ? 0 : 20}px)`,
          transition: 'opacity 0.4s, transform 0.4s',
        }}>
          <div style={{
            display: 'inline-block', padding: '4px 12px', borderRadius: 6,
            background: 'rgba(230,57,70,0.12)', border: '1px solid rgba(230,57,70,0.25)',
            color: '#e63946', fontSize: 11, fontWeight: 800,
            letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14,
            backdropFilter: 'blur(10px)',
          }}>
            Stage {currentStage + 1} — {stage.label}
          </div>
          <h2 style={{
            fontSize: 'clamp(24px, 4vw, 44px)', fontWeight: 900, color: '#fff',
            margin: '0 0 10px', letterSpacing: '-0.03em', lineHeight: 1.1,
            textShadow: '0 4px 30px rgba(0,0,0,0.6)',
          }} key={stage.title}>
            {stage.title}
          </h2>
          <p style={{
            fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7,
            textShadow: '0 2px 16px rgba(0,0,0,0.5)',
          }} key={stage.desc}>
            {stage.desc}
          </p>
        </div>

        {/* ── Right side: progress timeline ── */}
        <div style={{
          position: 'absolute', right: 'clamp(20px, 3vw, 40px)',
          top: '50%', transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0,
          opacity: progress > 0.02 ? 1 : 0.3,
          transition: 'opacity 0.5s',
        }}>
          {VIDEO_STAGES.map((s, i) => (
            <React.Fragment key={i}>
              <button onClick={() => {
                const section = sectionRef.current;
                if (!section) return;
                const scrollableHeight = section.offsetHeight - window.innerHeight;
                const targetScroll = section.offsetTop + s.at * scrollableHeight;
                window.scrollTo({ top: targetScroll, behavior: 'smooth' });
              }} style={{
                width: currentStage === i ? 12 : 8,
                height: currentStage === i ? 12 : 8,
                borderRadius: '50%',
                background: currentStage >= i ? '#e63946' : 'rgba(255,255,255,0.15)',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                boxShadow: currentStage === i ? '0 0 12px rgba(230,57,70,0.5)' : 'none',
                position: 'relative',
              }}>
                {/* Label on hover/active */}
                <span style={{
                  position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)',
                  fontSize: 10, fontWeight: 700, color: currentStage === i ? '#e63946' : 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                  opacity: currentStage === i ? 1 : 0, transition: 'opacity 0.3s',
                }}>{s.label}</span>
              </button>
              {i < VIDEO_STAGES.length - 1 && (
                <div style={{
                  width: 1.5, height: 28,
                  background: `linear-gradient(to bottom, ${currentStage > i ? '#e63946' : 'rgba(255,255,255,0.08)'}, ${currentStage > i ? '#e63946' : 'rgba(255,255,255,0.08)'})`,
                  transition: 'background 0.4s',
                }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── Bottom: scroll progress bar ── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
          background: 'rgba(255,255,255,0.04)',
        }}>
          <div style={{
            height: '100%', width: `${progress * 100}%`,
            background: 'linear-gradient(90deg, #e63946, #ff6b6b)',
            transition: 'width 0.05s linear',
            boxShadow: '0 0 16px rgba(230,57,70,0.4)',
          }} />
        </div>

        {/* ── Scroll indicator (only at start) ── */}
        {progress < 0.03 && (
          <div style={{
            position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            animation: 'fadeIn 1s ease 1s both',
          }}>
            <div style={{
              width: 26, height: 42, borderRadius: 13, border: '1.5px solid rgba(255,255,255,0.2)',
              display: 'flex', justifyContent: 'center', paddingTop: 8,
            }}>
              <div style={{
                width: 3, height: 8, borderRadius: 2, background: '#e63946',
                animation: 'scrollDot 2s ease-in-out infinite',
              }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Service Floating Cards (appear synced to video stages) ── */
function ServiceHighlights() {
  const services = [
    { icon: '⬡', title: 'Bumper Repair', desc: 'Scuffs, cracks, and complete bumper repainting with OEM finish', color: '#e63946' },
    { icon: '◇', title: 'Dent Removal', desc: 'Precision dent pulling and panel restoration without repaint', color: '#3b82f6' },
    { icon: '▣', title: 'Paint Correction', desc: 'Scratch removal, colour match, and full panel respray', color: '#f59e0b' },
    { icon: '◎', title: 'Body Polishing', desc: 'Machine compound polish for showroom shine and UV protection', color: '#10b981' },
    { icon: '⚡', title: 'Accident Repair', desc: 'Minor collision damage — panels, fenders, doors restored', color: '#8b5cf6' },
    { icon: '◈', title: 'Full Restoration', desc: 'Complete exterior makeover for aging or damaged vehicles', color: '#f97316' },
  ];

  return (
    <section id="services" style={{
      padding: 'clamp(80px,10vw,140px) clamp(16px,4vw,48px)',
      background: '#060606', position: 'relative',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 12, color: '#e63946', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>Services</div>
          <h2 style={{ fontSize: 'clamp(30px,4.5vw,54px)', fontWeight: 900, color: '#fff', margin: '0 0 14px', letterSpacing: '-0.03em' }}>
            Every Part, Every Repair
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
            From minor scratches to full exterior restoration — precision work for every Maruti model.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px,100%),1fr))',
          gap: 16,
        }}>
          {services.map((s, i) => (
            <div key={s.title} className="scroll-reveal svc-card" style={{
              padding: 32, borderRadius: 20,
              background: 'rgba(255,255,255,0.015)',
              border: '1px solid rgba(255,255,255,0.04)',
              transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
              position: 'relative', overflow: 'hidden', cursor: 'pointer',
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: `linear-gradient(135deg, ${s.color}, ${s.color}88)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, color: '#fff', marginBottom: 20,
                transition: 'transform 0.4s',
              }}>{s.icon}</div>
              <h3 style={{ fontSize: 19, fontWeight: 800, color: '#fff', margin: '0 0 10px', letterSpacing: '-0.01em' }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              <a href="#contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                marginTop: 18, color: s.color, fontSize: 13, fontWeight: 700,
                textDecoration: 'none', opacity: 0.7, transition: 'opacity 0.3s',
              }}>Get Quote →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { VideoHero, ServiceHighlights, VIDEO_STAGES });
