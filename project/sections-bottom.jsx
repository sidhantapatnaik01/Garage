/* Gallery + Testimonials + Contact + Footer — v2 dynamic */

function Gallery() {
  const [lightbox, setLightbox] = React.useState(null);
  const [filter, setFilter] = React.useState('All');

  const items = [
    { title: 'Swift Bumper Restoration', cat: 'Bumper', color: '#e63946', img: CAR_MODELS[3].img },
    { title: 'WagonR Door Dent Fix', cat: 'Dent', color: '#3b82f6', img: CAR_MODELS[1].img },
    { title: 'Dzire Panel Scratch', cat: 'Scratch', color: '#f59e0b', img: CAR_MODELS[4].img },
    { title: 'Brezza Full Body Polish', cat: 'Polish', color: '#10b981', img: CAR_MODELS[6].img },
    { title: 'Alto Side Repaint', cat: 'Paint', color: '#8b5cf6', img: CAR_MODELS[0].img },
    { title: 'Ertiga Fender Repair', cat: 'Dent', color: '#ef4444', img: CAR_MODELS[5].img },
    { title: 'Celerio Hood Scratch', cat: 'Scratch', color: '#06b6d4', img: CAR_MODELS[2].img },
    { title: 'S-Presso Rear Bumper', cat: 'Bumper', color: '#f97316', img: CAR_MODELS[7].img },
  ];

  const cats = ['All', 'Bumper', 'Dent', 'Scratch', 'Polish', 'Paint'];
  const filtered = filter === 'All' ? items : items.filter(i => i.cat === filter);

  return (
    <section id="gallery" style={{
      padding: 'clamp(80px,10vw,140px) clamp(16px,4vw,48px)',
      background: '#050505', position: 'relative',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 12, color: '#e63946', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>Portfolio</div>
          <h2 style={{ fontSize: 'clamp(30px,4.5vw,54px)', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>Our Work Speaks</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, marginTop: 14 }}>Minor damage, major difference</p>
        </div>

        {/* Filter tabs */}
        <div className="scroll-reveal" style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 36, flexWrap: 'wrap' }}>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{
              background: filter === c ? 'rgba(230,57,70,0.12)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${filter === c ? 'rgba(230,57,70,0.3)' : 'rgba(255,255,255,0.05)'}`,
              color: filter === c ? '#e63946' : 'rgba(255,255,255,0.45)',
              padding: '8px 18px', borderRadius: 10, fontSize: 12, fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.3s', letterSpacing: '0.03em',
            }}>{c}</button>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(270px,100%),1fr))',
          gap: 14,
        }}>
          {filtered.map((item, i) => (
            <div key={item.title} className="scroll-reveal gallery-card" style={{
              position: 'relative', aspectRatio: '4/3',
              borderRadius: 18, overflow: 'hidden', cursor: 'pointer',
              animation: 'fadeScale 0.5s ease-out forwards',
              animationDelay: `${i * 0.06}s`,
              opacity: 0,
            }}
              onClick={() => setLightbox(items.indexOf(item))}
            >
              <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(135deg, ${item.color}12, #080808)`,
              }}>
                <img src={item.img} alt={item.title} loading="lazy" style={{
                  width: '100%', height: '100%', objectFit: 'contain',
                  transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1), filter 0.5s',
                  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
                  padding: '10%',
                }}
                  onMouseEnter={e => { e.target.style.transform = 'scale(1.08)'; e.target.style.filter = 'drop-shadow(0 10px 20px rgba(0,0,0,0.5)) brightness(1.1)'; }}
                  onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.filter = 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))'; }}
                />
              </div>
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
              }}>
                <div style={{
                  display: 'inline-block', padding: '3px 9px', borderRadius: 5,
                  background: `${item.color}20`, border: `1px solid ${item.color}35`,
                  fontSize: 10, color: item.color, fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6,
                }}>{item.cat}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{item.title}</div>
              </div>
              {/* Hover overlay */}
              <div className="gallery-overlay" style={{
                position: 'absolute', inset: 0,
                background: 'rgba(230,57,70,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 0, transition: 'opacity 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, color: '#fff',
                }}>⤢</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(30px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'fadeIn 0.3s ease-out',
        }} onClick={() => setLightbox(null)}>
          <div style={{
            width: '85vw', maxWidth: 800, aspectRatio: '16/10', borderRadius: 24,
            background: `linear-gradient(135deg, ${items[lightbox].color}10, #0a0a0a)`,
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
          }} onClick={e => e.stopPropagation()}>
            <img src={items[lightbox].img} alt={items[lightbox].title} style={{
              maxWidth: '75%', maxHeight: '80%', objectFit: 'contain',
              filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.6))',
            }} />
            <div style={{
              position: 'absolute', bottom: 24, left: 24, right: 24,
              display: 'flex', justifyContent: 'space-between', alignItems: 'end',
            }}>
              <div>
                <div style={{ fontSize: 11, color: items[lightbox].color, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{items[lightbox].cat}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{items[lightbox].title}</div>
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>{lightbox + 1} / {items.length}</div>
            </div>
          </div>
          <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', width: 48, height: 48, borderRadius: '50%', fontSize: 22, cursor: 'pointer', backdropFilter: 'blur(10px)' }}>✕</button>
          <button onClick={(e) => { e.stopPropagation(); setLightbox(Math.max(0, lightbox - 1)); }} style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.06)', border: 'none', color: '#fff', width: 48, height: 48, borderRadius: '50%', fontSize: 20, cursor: 'pointer', backdropFilter: 'blur(10px)' }}>←</button>
          <button onClick={(e) => { e.stopPropagation(); setLightbox(Math.min(items.length - 1, lightbox + 1)); }} style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.06)', border: 'none', color: '#fff', width: 48, height: 48, borderRadius: '50%', fontSize: 20, cursor: 'pointer', backdropFilter: 'blur(10px)' }}>→</button>
        </div>
      )}
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { name: 'Rajesh K.', car: 'Swift Owner', text: "Got my Swift's bumper fixed here. Looks brand new — can't even tell it was damaged. Very reasonable price.", rating: 5 },
    { name: 'Priya M.', car: 'WagonR Owner', text: "Door dent on my WagonR vanished completely. Quick service, friendly staff. Highly recommend!", rating: 5 },
    { name: 'Suresh D.', car: 'Dzire Owner', text: "Deep scratches on my Dzire — they did an incredible colour match. Showroom fresh again.", rating: 5 },
    { name: 'Anita S.', car: 'Brezza Owner', text: "Professional fender repair on my Brezza. Fair pricing, finished earlier than promised. Returning!", rating: 5 },
    { name: 'Mohan R.', car: 'Ertiga Owner', text: "Best garage in Nabarangapur for paint work. Full body polish on my Ertiga — stunning result.", rating: 5 },
    { name: 'Kavita P.', car: 'Alto K10 Owner', text: "Trustworthy and skilled. Parking damage all over my Alto — they restored every panel beautifully.", rating: 5 },
  ];

  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % reviews.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{
      padding: 'clamp(80px,10vw,120px) clamp(16px,4vw,48px)',
      background: '#080808', position: 'relative', overflow: 'hidden',
    }}>
      {/* Quote mark decoration */}
      <div style={{
        position: 'absolute', top: '10%', left: '5%', fontSize: 200,
        color: 'rgba(230,57,70,0.03)', fontWeight: 900, lineHeight: 1, pointerEvents: 'none',
        fontFamily: 'Georgia, serif',
      }}>"</div>

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 12, color: '#e63946', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>Testimonials</div>
          <h2 style={{ fontSize: 'clamp(30px,4.5vw,54px)', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>Trusted by 500+ Owners</h2>
        </div>

        {/* Featured review */}
        <div className="scroll-reveal" style={{
          textAlign: 'center', padding: 'clamp(32px,5vw,48px)',
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 24, position: 'relative', marginBottom: 32,
          minHeight: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
            {[...Array(5)].map((_, j) => (
              <span key={j} style={{ color: '#f59e0b', fontSize: 18, animation: `starPop 0.3s ease-out ${j * 0.1}s both` }}>★</span>
            ))}
          </div>
          <p style={{
            fontSize: 'clamp(16px,2.5vw,22px)', color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.7, margin: '0 0 28px', fontStyle: 'italic', maxWidth: 600,
            transition: 'opacity 0.4s', textWrap: 'pretty',
          }} key={active}>
            "{reviews[active].text}"
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'linear-gradient(135deg, #e63946, #c62828)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 800, color: '#fff',
            }}>{reviews[active].name[0]}</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{reviews[active].name}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{reviews[active].car}</div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          {reviews.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              width: active === i ? 28 : 8, height: 8, borderRadius: 4,
              background: active === i ? '#e63946' : 'rgba(255,255,255,0.1)',
              border: 'none', cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [formData, setFormData] = React.useState({ name: '', phone: '', model: '', message: '' });
  const [submitted, setSubmitted] = React.useState(false);
  const [focused, setFocused] = React.useState('');

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); setTimeout(() => setSubmitted(false), 3000); };

  const inputStyle = (field) => ({
    width: '100%', padding: '15px 18px', borderRadius: 12,
    background: 'rgba(255,255,255,0.03)',
    border: `1.5px solid ${focused === field ? 'rgba(230,57,70,0.4)' : 'rgba(255,255,255,0.06)'}`,
    color: '#fff', fontSize: 14, outline: 'none', fontFamily: 'inherit',
    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
    boxSizing: 'border-box',
    boxShadow: focused === field ? '0 0 0 3px rgba(230,57,70,0.08)' : 'none',
  });

  return (
    <section id="contact" style={{
      padding: 'clamp(80px,10vw,140px) clamp(16px,4vw,48px)',
      background: '#050505', position: 'relative',
    }}>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
        background: 'linear-gradient(to top, rgba(230,57,70,0.02), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
        <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 12, color: '#e63946', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>Contact</div>
          <h2 style={{ fontSize: 'clamp(30px,4.5vw,54px)', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>Get Your Free Estimate</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, marginTop: 14 }}>Send damage photos — we respond within 30 minutes</p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px,100%),1fr))',
          gap: 40,
        }}>
          <form onSubmit={handleSubmit} className="scroll-reveal">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input placeholder="Your Name" value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                style={inputStyle('name')} onFocus={() => setFocused('name')} onBlur={() => setFocused('')} />
              <input placeholder="Phone / WhatsApp Number" value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                style={inputStyle('phone')} onFocus={() => setFocused('phone')} onBlur={() => setFocused('')} />
              <select value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})}
                style={{...inputStyle('model'), appearance: 'none', cursor: 'pointer'}}
                onFocus={() => setFocused('model')} onBlur={() => setFocused('')}>
                <option value="" style={{background:'#111'}}>Select Your Car Model</option>
                {CAR_MODELS.map(c => <option key={c.name} value={c.name} style={{background:'#111'}}>{c.name}</option>)}
              </select>
              <textarea placeholder="Describe the damage (dent, scratch, bumper issue...)" rows={4}
                value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                style={{...inputStyle('msg'), resize: 'vertical'}}
                onFocus={() => setFocused('msg')} onBlur={() => setFocused('')} />

              <label className="upload-area" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                padding: '22px', borderRadius: 14, cursor: 'pointer',
                border: '2px dashed rgba(230,57,70,0.15)',
                background: 'rgba(230,57,70,0.02)',
                color: 'rgba(255,255,255,0.4)', fontSize: 14,
                transition: 'all 0.3s',
              }}>
                <span style={{ fontSize: 24 }}>📷</span>
                <div>
                  <div style={{ fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>Upload Damage Photos</div>
                  <div style={{ fontSize: 12, marginTop: 2 }}>JPG, PNG up to 10MB</div>
                </div>
                <input type="file" accept="image/*" multiple style={{ display: 'none' }} />
              </label>

              <button type="submit" className="submit-btn" style={{
                background: submitted ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #e63946, #c62828)',
                color: '#fff', padding: '17px', borderRadius: 14,
                fontSize: 16, fontWeight: 800, border: 'none', cursor: 'pointer',
                boxShadow: submitted ? '0 8px 32px rgba(16,185,129,0.3)' : '0 8px 32px rgba(230,57,70,0.25)',
                transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                position: 'relative', overflow: 'hidden',
              }}>
                {submitted ? '✓ Request Sent Successfully!' : 'Send Free Estimate Request →'}
              </button>
            </div>
          </form>

          <div className="scroll-reveal" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '📞', label: 'Call Us', value: '+91 98765 43210', sub: 'Mon–Sat, 9 AM – 7 PM', action: 'tel:+919876543210' },
              { icon: '💬', label: 'WhatsApp', value: 'Chat Instantly', sub: 'Send photos for quick estimate', action: 'https://wa.me/919876543210' },
              { icon: '📍', label: 'Visit Us', value: 'Main Road, Nabarangapur', sub: 'Odisha, 764059', action: '#' },
              { icon: '🕒', label: 'Working Hours', value: 'Mon–Sat: 9AM – 7PM', sub: 'Sunday: By appointment', action: '#' },
            ].map((c, i) => (
              <a key={i} href={c.action} target={c.action.startsWith('http') ? '_blank' : undefined}
                style={{ textDecoration: 'none' }}>
                <div className="contact-card" style={{
                  display: 'flex', gap: 16, padding: 22, borderRadius: 16,
                  background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)',
                  transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                    background: 'rgba(230,57,70,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                  }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>{c.label}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{c.value}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{c.sub}</div>
                  </div>
                </div>
              </a>
            ))}

            <a href="https://wa.me/919876543210" target="_blank" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              background: 'linear-gradient(135deg, #25d366, #128c7e)', color: '#fff',
              padding: '17px 24px', borderRadius: 14, fontSize: 16, fontWeight: 800,
              textDecoration: 'none', boxShadow: '0 8px 32px rgba(37,211,102,0.2)',
              transition: 'all 0.3s',
              position: 'relative', overflow: 'hidden',
            }}>
              <span style={{ fontSize: 20 }}>💬</span> Chat on WhatsApp Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      padding: '56px clamp(16px,4vw,48px) 28px',
      background: '#030303', borderTop: '1px solid rgba(255,255,255,0.03)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))',
          gap: 40, marginBottom: 40,
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 8,
                background: 'linear-gradient(135deg, #e63946, #ff6b6b)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 900, color: '#fff',
              }}>MC</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>Maruti Care</div>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', lineHeight: 1.8 }}>
              Nabarangapur's specialist garage for Maruti Suzuki Arena car repair, restoration, and cosmetic care. Trusted by 500+ car owners.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.5)', marginBottom: 16, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Services</h4>
            {['Dent Repair','Scratch Removal','Bumper Repair','Panel Paint','Body Polishing','Car Detailing'].map(s => (
              <a key={s} href="#services" className="footer-link" style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', padding: '5px 0', transition: 'all 0.3s' }}>{s}</a>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.5)', marginBottom: 16, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Quick Links</h4>
            {['Home','Services','Car Models','Gallery','Contact'].map(s => (
              <a key={s} href={`#${s.toLowerCase().replace(' ','')}`} className="footer-link" style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', padding: '5px 0', transition: 'all 0.3s' }}>{s}</a>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.5)', marginBottom: 16, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Contact</h4>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', lineHeight: 2 }}>
              Main Road, Nabarangapur<br/>Odisha, 764059<br/>+91 98765 43210<br/>maruti.care.nbr@gmail.com
            </p>
          </div>
        </div>
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, alignItems: 'center',
        }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>© 2026 Maruti Care Nabarangapur. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 16 }}>
            {['Facebook', 'Instagram', 'YouTube'].map(s => (
              <a key={s} href="#" className="footer-link" style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', textDecoration: 'none', transition: 'color 0.3s' }}>{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Gallery, Testimonials, Contact, Footer });
