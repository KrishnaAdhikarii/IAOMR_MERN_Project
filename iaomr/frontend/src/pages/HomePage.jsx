import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api'
import SchedulePage, { ContactPage } from './SchedulePage'
import { AboutPage } from './SchedulePage'
import CommitteePage from './CommitteePage'
import { VenuePage } from './SchedulePage'
import bg from '../images/sky.jpeg'

// Countdown
function Countdown() {
  const target = new Date('2026-08-06T09:00:00')
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const tick = () => {
      const diff = target - new Date()
      if (diff <= 0) return
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap', margin: '1.8rem 0' }}>
      {[['Days', t.d], ['Hours', t.h], ['Minutes', t.m], ['Seconds', t.s]].map(([l, v]) => (
        <div key={l} style={{ textAlign: 'center', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 10, padding: '1rem 1.4rem', minWidth: 80 }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.4rem', fontWeight: 700, color: '#c9a84c', lineHeight: 1 }}>
            {String(v).padStart(2, '0')}
          </div>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,244,248,0.5)', marginTop: '0.3rem' }}>
            {l}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function HomePage() {
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    api.get('/announcements').then(r => setAnnouncements(r.data.data || [])).catch(() => { })
  }, [])

  const stats = [
    { num: '3', label: 'Days' },
    { num: '24th', label: 'National Convention' },
    { num: 'Aug 6–8', label: '2026' },
    { num: 'Vizag', label: 'City of Destiny' },
  ]

  const highlights = [
    { icon: '🎤', title: 'Guest & Keynote Lectures', desc: 'Eminent national faculty across oral medicine & radiology' },
    { icon: '📄', title: 'Paper & Poster Presentations', desc: 'Present your research to a national audience' },
    { icon: '🏆', title: 'Best Paper / Poster Awards', desc: 'Compete for prestigious awards at national level' },
    { icon: '🎊', title: 'Gala Banquet', desc: 'An evening of celebration at the City of Destiny' },
    { icon: '🔬', title: 'Pre-Convention Courses', desc: 'Hands-on workshops on day 1 for in-depth learning' },
    { icon: '🤝', title: 'Professional Networking', desc: 'Connect with peers and stalwarts from across India' },
  ]

  return (
    <div>
      {/* ── HERO ── */}
      <section id='home' style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '7rem 2rem 5rem', position: 'relative', overflow: 'hidden',
        color: '#f0f4f8',
        backgroundImage: `url(${bg})`,
        // background:'linear-gradient(180deg,rgba(7,17,31,0.15) 0%,rgba(7,17,31,0.4) 50%,rgba(7,17,31,0.75) 85%,rgba(7,17,31,0.98) 100%), #07111f',
      }}>
        {/* Starfield dots */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {[...Array(60)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: i % 5 === 0 ? 2.5 : 1.5,
              height: i % 5 === 0 ? 2.5 : 1.5,
              borderRadius: '50%',
              background: `rgba(255,255,255,${0.3 + Math.random() * 0.5})`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 3}s`,
            }} />
          ))}
        </div>
        <style>{`@keyframes twinkle{from{opacity:.3}to{opacity:1}}`}</style>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: '#3aaf9a', marginBottom: '1.2rem', animation: 'fadeUp 0.8s 0.2s ease both' }}>
            Indian Academy of Oral Medicine & Radiology
          </div>

          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(4.5rem,16vw,12rem)', fontWeight: 700, lineHeight: 0.85, background: 'linear-gradient(135deg,#e8c96a 0%,#c9a84c 40%,#3aaf9a 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', animation: 'fadeUp 0.9s 0.4s ease both' }}>
            24<sup style={{ fontSize: '0.42em', verticalAlign: 'super', color: '#3aaf9a' }}>TH</sup>
          </div>

          <div style={{ margin: '0.8rem 0', animation: 'fadeUp 0.9s 0.6s ease both' }}>
            <span style={{ display: 'block', fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 300, fontSize: 'clamp(0.9rem,2.6vw,1.35rem)', letterSpacing: '0.52em', textTransform: 'uppercase', color: 'rgba(240,244,248,0.7)' }}>National</span>
            <span style={{ display: 'block', fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 'clamp(2.2rem,6.5vw,5rem)', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fff', lineHeight: 1 }}>IAOMR</span>
            <span style={{ display: 'block', fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 400, fontSize: 'clamp(0.9rem,2.6vw,1.45rem)', letterSpacing: '0.38em', textTransform: 'uppercase', color: '#3aaf9a' }}>PG Convention · Visakhapatnam</span>
          </div>

          <div style={{ margin: '1.6rem 0', animation: 'fadeUp 0.9s 0.8s ease both' }}>
            <span style={{
              fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 'clamp(1.1rem,2.6vw,1.8rem)', color: '#ffffff', textShadow: `0 0 2px #ffffff,
               0 0 5px #ffffff,
               0 0 20px #ffffff,
               0 0 50px #ffffff`,
            }}>
              "Imagine" – "Innovate" – "Illuminate"
            </span>
          </div>

          <div style={{ animation: 'fadeUp 0.9s 1s ease both' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.9rem', border: '1px solid rgba(201,168,76,0.4)', borderRadius: 50, padding: '0.7rem 1.8rem', background: 'rgba(201,168,76,0.08)' }}>
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: '1rem', letterSpacing: '0.15em', color: '#c9a84c' }}>6<sup>th</sup></span>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#3aaf9a', display: 'inline-block' }} />
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: '1rem', letterSpacing: '0.15em', color: '#c9a84c' }}>7<sup>th</sup></span>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#3aaf9a', display: 'inline-block' }} />
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: '1rem', letterSpacing: '0.15em', color: '#c9a84c' }}>8<sup>th</sup> August 2026</span>
            </div>
          </div>

          <div style={{ marginTop: '1.2rem', fontSize: '0.88rem', color: 'rgba(240,244,248,0.65)', lineHeight: 1.9, animation: 'fadeUp 0.9s 1.1s ease both' }}>
            Hosted by <strong style={{ color: '#fff' }}>Dept. of Oral Medicine & Radiology</strong><br />
            <strong style={{ color: '#fff' }}>Anil Neerukonda Institute of Dental Sciences</strong>, Visakhapatnam, Andhra Pradesh
          </div>

          <Countdown />

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', animation: 'fadeUp 0.9s 1.3s ease both' }}>
            <Link to="/register-delegate" className="btn btn-primary">Register Now</Link>
            <Link to="/submit-abstract" className="btn btn-gold">Submit Abstract</Link>
            <a  href="#schedule" className="btn btn-outline" style={{ color: 'rgba(240,244,248,0.8)', borderColor: 'rgba(240,244,248,0.3)' }}>View Schedule</a>
          </div>
        </div>
      </section>

      {/* ── ANNOUNCEMENTS ── */}
      {announcements.length > 0 && (
        <div style={{ background: 'linear-gradient(90deg,#071120,#0f2235,#071120)', padding: '1rem 0', borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
          <div className="container" style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto' }}>
            {announcements.slice(0, 4).map(a => (
              <div key={a._id} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
                <span style={{ background: a.type === 'important' ? '#e74c3c' : a.type === 'deadline' ? '#c9a84c' : '#2e8b7a', color: '#fff', padding: '0.18rem 0.6rem', borderRadius: 4, fontSize: '0.65rem', fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {a.type}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'rgba(240,244,248,0.8)' }}>{a.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <section id='about'>
        <AboutPage />
      </section>

      {/* ── STATS ── */}
      <section className="light-section section-pad-sm">
        <div className="container">
          <div className="grid-4">
            {stats.map(s => (
              <div key={s.label} className="stat-card">
                <div className="stat-number">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section className="light-section section-pad">
        <div className="container">
          <div className="section-head" style={{ textAlign: 'center' }}>
            <span className="section-tag">Convention Highlights</span>
            <h2 className="section-title">What to <em>Expect</em></h2>
            <div className="gold-rule" style={{ margin: '0 auto 0' }} />
          </div>
          <div className="grid-3" style={{ marginTop: '2rem' }}>
            {highlights.map(h => (
              <div key={h.title} className="card" style={{ padding: '1.8rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '0.8rem' }}>{h.icon}</div>
                <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--txt-dark)', marginBottom: '0.5rem' }}>{h.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--txt-mid)', lineHeight: 1.75 }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id='schedule'>
        <SchedulePage />
      </section>

      <section id='committee'>
        <CommitteePage />
      </section>

      <section id='venue'>
        <VenuePage />
      </section>

      {/* ── CTA BANNER ── */}
      <section className="dark-section" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(1.8rem,4vw,3rem)', color: '#fff', marginBottom: '0.5rem' }}>
            Ready to <em style={{ color: '#c9a84c' }}>Register</em>?
          </h2>
          <p style={{ color: 'rgba(240,244,248,0.65)', marginBottom: '2rem', fontSize: '1rem' }}>
            Early bird rates available till 15th March 2026. Don't miss out!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register-delegate" className="btn btn-primary">Register as Delegate</Link>
            <Link to="/submit-abstract" className="btn btn-gold">Submit Abstract</Link>
            <Link to="/contact" className="btn btn-outline" style={{ color: 'rgba(240,244,248,0.8)', borderColor: 'rgba(240,244,248,0.3)' }}>Contact Us</Link>
          </div>
        </div>
      </section>

      

      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  )
}
