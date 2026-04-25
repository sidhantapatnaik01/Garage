/* v3: Car Models + Transformation + Trust + Gallery + Testimonials + Contact + Footer */

const CAR_MODELS_V3 = [
  { name: "Alto K10", tagline: "City Champion", img: "https://www.marutisuzuki.com/adobe/assets/urn:aaid:aem:5834d2dc-af8c-4d41-b1f7-84c537954546/as/alto.png?height=400&width=660" },
  { name: "WagonR", tagline: "Family Favourite", img: "https://www.marutisuzuki.com/adobe/assets/urn:aaid:aem:18f0b3ba-82b8-46ef-ae3a-cb3336612a83/as/wagon-r.png?height=400&width=660" },
  { name: "Celerio", tagline: "Urban Smart", img: "https://www.marutisuzuki.com/adobe/assets/urn:aaid:aem:5228dd06-2901-413b-88dc-c8635b0ad8a2/as/celerio.png?height=400&width=660" },
  { name: "Swift", tagline: "Sporty Icon", img: "https://www.marutisuzuki.com/adobe/assets/urn:aaid:aem:a0ea2bb5-dfd8-4569-a6bc-89b9928fc751/as/swift-banner-no-logo.png?height=400&width=660" },
  { name: "Dzire", tagline: "Elegant Sedan", img: "https://www.marutisuzuki.com/adobe/assets/urn:aaid:aem:834183c9-f40f-4d14-bc9b-18fe493302cd/as/Dzire-430X260.png?height=400&width=660" },
  { name: "Ertiga", tagline: "Family MPV", img: "https://www.marutisuzuki.com/adobe/assets/urn:aaid:aem:6247cdf4-2af5-443f-b054-761da87fd6ba/as/ertiga.png?height=400&width=660" },
  { name: "Brezza", tagline: "Bold SUV", img: "https://www.marutisuzuki.com/adobe/assets/urn:aaid:aem:7d047132-966e-47ce-83ae-7f7550b91054/as/brezza.png?height=400&width=660" },
  { name: "S-Presso", tagline: "Micro SUV", img: "https://www.marutisuzuki.com/adobe/assets/urn:aaid:aem:8f4f96e0-d5ae-4a4a-b3b9-93c36fdc3172/as/s-presso.png?height=400&width=660" },
  { name: "Eeco", tagline: "Workhorse", img: "https://www.marutisuzuki.com/adobe/assets/urn:aaid:aem:a80daf16-aa5e-42a5-b3cd-4a3b10da21b4/as/EECO.png?height=400&width=660" },
];

function CarModelsV3() {
  const scrollRef = React.useRef(null);
  return (
    <section id="models" style={{ padding: 'clamp(80px,10vw,140px) 0', background: '#050505' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(16px,4vw,48px)' }}>
        <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: 50 }}>
          <div style={{ fontSize: 12, color: '#e63946', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>Models We Service</div>
          <h2 style={{ fontSize: 'clamp(30px,4.5vw,54px)', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>All Maruti Arena Cars</h2>
        </div>
      </div>
      <div ref={scrollRef} className="hide-scrollbar" style={{
        display: 'flex', gap: 16, overflowX: 'auto', padding: '10px clamp(16px,4vw,48px) 40px',
        scrollSnapType: 'x mandatory',
      }}>
        {CAR_MODELS_V3.map((car, i) => (
          <div key={car.name} className="scroll-reveal" style={{
            flexShrink: 0, width: 'clamp(220px,26vw,280px)', scrollSnapAlign: 'center',
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
            borderRadius: 18, overflow: 'hidden', cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
          }}>
            <div style={{ height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.01)' }}>
              <img src={car.img} alt={car.name} loading="lazy" style={{
                maxWidth: '85%', maxHeight: '85%', objectFit: 'contain',
                filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.5))',
                transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
              }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
            </div>
            <div style={{ padding: '16px 20px 20px' }}>
              <div style={{ fontSize: 10, color: '#e63946', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{car.tagline}</div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: 0 }}>{car.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TransformationSection() {
  const phases = [
    { label: 'Before', desc: 'Intact vehicle with hidden damage — dents, scratches, paint wear', color: '#e63946', icon: '◯' },
    { label: 'During', desc: 'Parts isolated, damage exposed, precision repair underway', color: '#f59e0b', icon: '◐' },
    { label: 'After', desc: 'Fully restored, polished, and inspected — factory-fresh finish', color: '#10b981', icon: '●' },
  ];
  return (
    <section style={{ padding: 'clamp(80px,10vw,120px) clamp(16px,4vw,48px)', background: '#080808' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 12, color: '#e63946', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>The Process</div>
          <h2 style={{ fontSize: 'clamp(30px,4.5vw,54px)', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>Inspect → Repair → Restore</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 20 }}>
          {phases.map((p, i) => (
            <div key={p.label} className="scroll-reveal" style={{
              textAlign: 'center', padding: 36, borderRadius: 20,
              background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)',
            }}>
              <div style={{ fontSize: 48, marginBottom: 16, color: p.color, transition: 'transform 0.3s' }}>{p.icon}</div>
              <div style={{
                display: 'inline-block', padding: '4px 14px', borderRadius: 6,
                background: `${p.color}12`, border: `1px solid ${p.color}30`,
                fontSize: 11, fontWeight: 800, color: p.color,
                letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14,
              }}>{p.label}</div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const items = [
    { icon: '⚡', title: 'Same-Day Turnaround', desc: 'Most repairs finished within hours, not days' },
    { icon: '★', title: 'Expert Technicians', desc: 'Years of Maruti-specific repair experience' },
    { icon: '◐', title: 'Before/After Proof', desc: 'We show you results before you commit' },
    { icon: '₹', title: 'Transparent Pricing', desc: 'No hidden costs — clear quotes upfront' },
    { icon: '♥', title: 'Daily-Driver Specialists', desc: 'We care for the cars you depend on every day' },
    { icon: '✓', title: 'Local & Trusted', desc: 'Nabarangapur\'s #1 rated Maruti garage' },
  ];
  return (
    <section style={{ padding: 'clamp(80px,10vw,120px) clamp(16px,4vw,48px)', background: '#050505' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 12, color: '#e63946', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>Why Us</div>
          <h2 style={{ fontSize: 'clamp(30px,4.5vw,54px)', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>Built on Trust & Results</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px,1fr))', gap: 14 }}>
          {items.map(r => (
            <div key={r.title} className="scroll-reveal trust-card" style={{
              display: 'flex', gap: 16, padding: 24, borderRadius: 16,
              background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)',
              transition: 'all 0.4s',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: 'rgba(230,57,70,0.06)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: 20,
              }}>{r.icon}</div>
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>{r.title}</h4>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, margin: 0 }}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryV3() {
  const [lb, setLb] = React.useState(null);
  const items = [
    { title: 'Swift Bumper', cat: 'Bumper', color: '#e63946', img: CAR_MODELS_V3[3].img },
    { title: 'WagonR Dent Fix', cat: 'Dent', color: '#3b82f6', img: CAR_MODELS_V3[1].img },
    { title: 'Dzire Scratch', cat: 'Scratch', color: '#f59e0b', img: CAR_MODELS_V3[4].img },
    { title: 'Brezza Polish', cat: 'Polish', color: '#10b981', img: CAR_MODELS_V3[6].img },
    { title: 'Alto Repaint', cat: 'Paint', color: '#8b5cf6', img: CAR_MODELS_V3[0].img },
    { title: 'Ertiga Fender', cat: 'Dent', color: '#ef4444', img: CAR_MODELS_V3[5].img },
  ];
  return (
    <section id="gallery" style={{ padding: 'clamp(80px,10vw,140px) clamp(16px,4vw,48px)', background: '#080808' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: 50 }}>
          <div style={{ fontSize: 12, color: '#e63946', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>Portfolio</div>
          <h2 style={{ fontSize: 'clamp(30px,4.5vw,54px)', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>Recent Work</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px,100%),1fr))', gap: 14 }}>
          {items.map((it, i) => (
            <div key={i} className="scroll-reveal" style={{
              aspectRatio: '4/3', borderRadius: 18, overflow: 'hidden', cursor: 'pointer',
              position: 'relative', background: `linear-gradient(135deg, ${it.color}10, #080808)`,
            }} onClick={() => setLb(i)}>
              <img src={it.img} alt={it.title} loading="lazy" style={{
                width: '100%', height: '100%', objectFit: 'contain', padding: '8%',
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
                transition: 'transform 0.6s',
              }} onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                 onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, padding: 18,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
              }}>
                <div style={{ fontSize: 10, color: it.color, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>{it.cat}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{it.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {lb !== null && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(24px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setLb(null)}>
          <div style={{ width: '80vw', maxWidth: 700, aspectRatio: '16/10', borderRadius: 24, background: `linear-gradient(135deg, ${items[lb].color}10, #0a0a0a)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={e => e.stopPropagation()}>
            <img src={items[lb].img} alt={items[lb].title} style={{ maxWidth: '70%', maxHeight: '80%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))' }} />
          </div>
          <button onClick={() => setLb(null)} style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', width: 48, height: 48, borderRadius: '50%', fontSize: 22, cursor: 'pointer' }}>✕</button>
        </div>
      )}
    </section>
  );
}

function TestimonialsV3() {
  const reviews = [
    { name: 'Rajesh K.', car: 'Swift', text: "Bumper looks brand new — can't tell it was damaged. Very reasonable price." },
    { name: 'Priya M.', car: 'WagonR', text: "Door dent vanished. Quick service, friendly staff. Highly recommend!" },
    { name: 'Suresh D.', car: 'Dzire', text: "Incredible colour match on deep scratches. Showroom fresh again." },
    { name: 'Anita S.', car: 'Brezza', text: "Professional fender repair. Fair pricing, finished early. Returning!" },
  ];
  const [a, setA] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setA(x => (x+1) % reviews.length), 5000); return () => clearInterval(t); }, []);

  return (
    <section style={{ padding: 'clamp(80px,10vw,120px) clamp(16px,4vw,48px)', background: '#050505' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <div className="scroll-reveal" style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 12, color: '#e63946', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>Reviews</div>
          <h2 style={{ fontSize: 'clamp(30px,4.5vw,54px)', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>Trusted by 500+ Owners</h2>
        </div>
        <div className="scroll-reveal" style={{
          padding: 'clamp(32px,5vw,48px)', background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.04)', borderRadius: 24, minHeight: 180,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ display: 'flex', gap: 3, marginBottom: 18 }}>
            {[...Array(5)].map((_, j) => <span key={j} style={{ color: '#f59e0b', fontSize: 18 }}>★</span>)}
          </div>
          <p style={{ fontSize: 'clamp(17px,2.5vw,22px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, fontStyle: 'italic', margin: '0 0 24px', maxWidth: 520 }} key={a}>
            "{reviews[a].text}"
          </p>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{reviews[a].name}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{reviews[a].car} Owner</div>
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 24 }}>
          {reviews.map((_, i) => (
            <button key={i} onClick={() => setA(i)} style={{
              width: a === i ? 28 : 8, height: 8, borderRadius: 4,
              background: a === i ? '#e63946' : 'rgba(255,255,255,0.1)',
              border: 'none', cursor: 'pointer', transition: 'all 0.4s',
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactV3() {
  const [form, setForm] = React.useState({ name: '', phone: '', model: '', message: '' });
  const [sent, setSent] = React.useState(false);
  const [foc, setFoc] = React.useState('');
  const handleSubmit = e => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); };
  const inp = (f) => ({
    width: '100%', padding: '15px 18px', borderRadius: 12,
    background: 'rgba(255,255,255,0.03)',
    border: `1.5px solid ${foc === f ? 'rgba(230,57,70,0.4)' : 'rgba(255,255,255,0.06)'}`,
    color: '#fff', fontSize: 14, outline: 'none', fontFamily: 'inherit',
    transition: 'all 0.3s', boxSizing: 'border-box',
    boxShadow: foc === f ? '0 0 0 3px rgba(230,57,70,0.08)' : 'none',
  });

  return (
    <section id="contact" style={{ padding: 'clamp(80px,10vw,140px) clamp(16px,4vw,48px)', background: '#060606' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 12, color: '#e63946', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>Get Started</div>
          <h2 style={{ fontSize: 'clamp(30px,4.5vw,54px)', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>Request a Free Estimate</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, marginTop: 14 }}>Share damage photos — we respond within 30 minutes</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px,100%),1fr))', gap: 40 }}>
          <form onSubmit={handleSubmit} className="scroll-reveal">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={inp('n')} onFocus={() => setFoc('n')} onBlur={() => setFoc('')} />
              <input placeholder="Phone / WhatsApp" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={inp('p')} onFocus={() => setFoc('p')} onBlur={() => setFoc('')} />
              <select value={form.model} onChange={e => setForm({...form, model: e.target.value})} style={{...inp('m'), appearance: 'none', cursor: 'pointer'}} onFocus={() => setFoc('m')} onBlur={() => setFoc('')}>
                <option value="" style={{background:'#111'}}>Select Car Model</option>
                {CAR_MODELS_V3.map(c => <option key={c.name} value={c.name} style={{background:'#111'}}>{c.name}</option>)}
              </select>
              <textarea placeholder="Describe the damage..." rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} style={{...inp('msg'), resize: 'vertical'}} onFocus={() => setFoc('msg')} onBlur={() => setFoc('')} />
              <label style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                padding: 22, borderRadius: 14, cursor: 'pointer',
                border: '2px dashed rgba(230,57,70,0.15)', background: 'rgba(230,57,70,0.02)',
                color: 'rgba(255,255,255,0.5)', fontSize: 14, transition: 'all 0.3s',
              }}>
                <span style={{ fontSize: 24 }}>📷</span>
                <div><div style={{ fontWeight: 600 }}>Upload Damage Photos</div><div style={{ fontSize: 12, marginTop: 2, opacity: 0.6 }}>JPG, PNG up to 10MB</div></div>
                <input type="file" accept="image/*" multiple style={{ display: 'none' }} />
              </label>
              <button type="submit" style={{
                background: sent ? 'linear-gradient(135deg,#10b981,#059669)' : 'linear-gradient(135deg,#e63946,#c62828)',
                color: '#fff', padding: 17, borderRadius: 14, fontSize: 16, fontWeight: 800,
                border: 'none', cursor: 'pointer', transition: 'all 0.4s',
                boxShadow: sent ? '0 8px 32px rgba(16,185,129,0.3)' : '0 8px 32px rgba(230,57,70,0.25)',
              }}>{sent ? '✓ Request Sent!' : 'Send Free Estimate Request →'}</button>
            </div>
          </form>
          <div className="scroll-reveal" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '📞', label: 'Call', value: '+91 98765 43210', sub: 'Mon–Sat, 9AM – 7PM' },
              { icon: '💬', label: 'WhatsApp', value: 'Chat Instantly', sub: 'Photos for quick quote' },
              { icon: '📍', label: 'Location', value: 'Main Road, Nabarangapur', sub: 'Odisha 764059' },
              { icon: '🕒', label: 'Hours', value: 'Mon–Sat: 9AM – 7PM', sub: 'Sunday: By appointment' },
            ].map((c, i) => (
              <div key={i} className="contact-card" style={{
                display: 'flex', gap: 16, padding: 22, borderRadius: 16,
                background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)',
                transition: 'all 0.4s',
              }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, flexShrink: 0, background: 'rgba(230,57,70,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>{c.label}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{c.value}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{c.sub}</div>
                </div>
              </div>
            ))}
            <a href="https://wa.me/919876543210" target="_blank" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              background: 'linear-gradient(135deg,#25d366,#128c7e)', color: '#fff',
              padding: 17, borderRadius: 14, fontSize: 16, fontWeight: 800,
              textDecoration: 'none', boxShadow: '0 8px 32px rgba(37,211,102,0.2)',
            }}>💬 Chat on WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterV3() {
  return (
    <footer style={{ padding: '56px clamp(16px,4vw,48px) 28px', background: '#030303', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: 'linear-gradient(135deg,#e63946,#ff6b6b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: '#fff' }}>MC</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>Maruti Care</div>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', lineHeight: 1.8 }}>Nabarangapur's specialist garage for Maruti Suzuki Arena repair, restoration, and cosmetic care.</p>
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.5)', marginBottom: 16, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Services</h4>
            {['Dent Repair','Scratch Removal','Bumper Repair','Panel Paint','Body Polishing','Detailing'].map(s => (
              <a key={s} href="#services" style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', padding: '5px 0', transition: 'color 0.3s' }}
                onMouseEnter={e => e.target.style.color = '#e63946'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}>{s}</a>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.5)', marginBottom: 16, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Contact</h4>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', lineHeight: 2 }}>Main Road, Nabarangapur<br/>Odisha 764059<br/>+91 98765 43210</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>© 2026 Maruti Care Nabarangapur</div>
          <div style={{ display: 'flex', gap: 16 }}>
            {['Facebook','Instagram','YouTube'].map(s => (
              <a key={s} href="#" style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={e => e.target.style.color = '#e63946'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.2)'}>{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { CarModelsV3, TransformationSection, TrustSection, GalleryV3, TestimonialsV3, ContactV3, FooterV3, CAR_MODELS_V3 });
