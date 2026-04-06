import { Link } from 'react-router-dom'
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  const contacts = [
    { name: 'Dr. B. Badari Ramakrishna', role: 'Organizing Chairman', phone: '+91 9885426232' },
    { name: 'Dr. N. Rajesh',             role: 'Scientific Chairman',   phone: '+91 9885067499' },
    { name: 'Dr. K. V. Lokesh',          role: 'Treasurer',             phone: '+91 9885164196' },
    { name: 'Dr. V. Rahul Marshal',      role: 'Organizing Secretary',  phone: '+91 9848720046' },
  ]

  return (
    <footer style={{ background: 'linear-gradient(180deg,#0f2235,#071120)', color: 'rgba(240,244,248,0.8)', paddingTop: '3.5rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '3rem', paddingBottom: '2.5rem', borderBottom: '1px solid rgba(88,131,163,0.2)' }}>

          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', fontWeight: 700, color: '#c9a84c', marginBottom: '0.3rem' }}>IAOMR</div>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: '0.28em', textTransform: 'uppercase', fontSize: '0.72rem', color: '#3aaf9a', marginBottom: '1rem' }}>
              24th National PG Convention · 2026
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.8, maxWidth: '320px', color: 'rgba(240,244,248,0.6)' }}>
              Hosted by Dept. of Oral Medicine & Radiology,<br/>
              Anil Neerukonda Institute of Dental Sciences,<br/>
              Visakhapatnam, Andhra Pradesh.
            </p>
            <div style={{ marginTop: '1rem', fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: '1rem', color: 'rgba(201,168,76,0.6)' }}>
              "Imagine · Innovate · Illuminate"
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#c9a84c', marginBottom: '1rem', fontSize: '0.78rem', letterSpacing: '0.2em' }}>Quick Links</h4>
            {[
              { to: '/about',               label: 'About Convention' },
              { to: '/schedule',            label: 'Schedule' },
              { to: '/committee',           label: 'Committee' },
              { to: '/venue',               label: 'Venue & Tourism' },
              { to: '/register-delegate',   label: 'Register Now' },
              { to: '/submit-abstract',     label: 'Submit Abstract' },
              { to: '/contact',             label: 'Contact Us' },
            ].map(l => (
              <Link key={l.to} to={l.to} style={{
                display: 'block', marginBottom: '0.45rem', fontSize: '0.85rem',
                color: 'rgba(240,244,248,0.6)', textDecoration: 'none', transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,244,248,0.6)'}
              >{l.label}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#c9a84c', marginBottom: '1rem', fontSize: '0.78rem', letterSpacing: '0.2em' }}>Contact</h4>
            {contacts.slice(0,2).map(c => (
              <div key={c.phone} style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(240,244,248,0.85)' }}>{c.name}</div>
                <div style={{ fontSize: '0.7rem', color: '#c9a84c', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{c.role}</div>
                <a href={`tel:${c.phone}`} style={{ fontSize: '0.9rem', color: '#3aaf9a', fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, textDecoration: 'none' }}>{c.phone}</a>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: 'rgba(240,244,248,0.55)', marginTop: '0.5rem' }}>
              <FiMapPin size={14} style={{ marginTop: 2, flexShrink: 0, color: '#3aaf9a' }}/>
              Sangivalasa, Visakhapatnam, AP
            </div>
          </div>
        </div>

        <div style={{ padding: '1.5rem 0', textAlign: 'center', fontSize: '0.76rem', color: 'rgba(240,244,248,0.3)' }}>
          © 2026 24th National IAOMR PG Convention, Visakhapatnam. Under the Aegis of Indian Academy of Oral Medicine & Radiology.
        </div>
      </div>
    </footer>
  )
}
