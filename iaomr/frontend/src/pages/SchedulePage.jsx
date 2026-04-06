import { useEffect, useState } from 'react'
import api from '../utils/api'
import toast from 'react-hot-toast'
import wave from '../images/wave.jpeg'

// ── SCHEDULE PAGE ──
export function SchedulePage() {
  const [activeDay, setActiveDay] = useState(0)
  const [schedule, setSchedule] = useState({})
  const [loading, setLoading] = useState(true)

  const defaultSchedule = {
    1: [
      { startTime: '9:00 am', endTime: '9:30 am', title: 'Inauguration of Pre-Conference Course', type: 'inauguration' },
      { startTime: '9:30 am', endTime: '1:00 pm', title: 'Pre-Conference Courses', type: 'session' },
      { startTime: '1:00 pm', endTime: '2:00 pm', title: 'Lunch', type: 'break' },
      { startTime: '2:00 pm', endTime: '4:00 pm', title: 'Scientific Sessions', type: 'session' },
    ],
    2: [
      { startTime: '8:00 am', endTime: '10:00 am', title: 'Registration / Breakfast / Scientific Sessions', type: 'registration' },
      { startTime: '10:00 am', endTime: '10:45 am', title: 'Guest Lecture', type: 'lecture' },
      { startTime: '10:45 am', endTime: '11:30 am', title: 'Keynote Lecture', type: 'lecture' },
      { startTime: '11:30 am', endTime: '12:30 pm', title: 'Inauguration Ceremony', type: 'inauguration' },
      { startTime: '12:30 pm', endTime: '1:30 pm', title: 'Lunch', type: 'break' },
      { startTime: '1:30 pm', endTime: '2:15 pm', title: 'Guest Lecture', type: 'lecture' },
      { startTime: '2:15 pm', endTime: '5:30 pm', title: 'Scientific Sessions – Papers / Posters', type: 'session' },
      { startTime: '7:00 pm', endTime: '', title: '🎊 Gala Banquet', type: 'social' },
    ],
    3: [
      { startTime: '8:00 am', endTime: '9:00 am', title: 'Breakfast / Scientific Sessions', type: 'session' },
      { startTime: '9:00 am', endTime: '10:00 am', title: 'Scientific Sessions – Papers / Posters', type: 'session' },
      { startTime: '10:00 am', endTime: '10:45 am', title: 'Guest Lecture', type: 'lecture' },
      { startTime: '10:45 am', endTime: '11:30 am', title: 'Guest Lecture', type: 'lecture' },
      { startTime: '11:30 am', endTime: '11:45 am', title: '☕ Tea Break', type: 'break' },
      { startTime: '11:45 am', endTime: '12:30 pm', title: 'Guest Lecture', type: 'lecture' },
      { startTime: '12:30 pm', endTime: '1:30 pm', title: 'Panel Discussion', type: 'session' },
      { startTime: '1:30 pm', endTime: '2:30 pm', title: 'Lunch', type: 'break' },
      { startTime: '2:30 pm', endTime: '', title: 'Valedictory Ceremony', type: 'valedictory' },
    ],
  }

  useEffect(() => {
    api.get('/schedule')
      .then(r => { const d = r.data.data; if (Object.values(d).some(a => a.length > 0)) setSchedule(d); else setSchedule(defaultSchedule) })
      .catch(() => setSchedule(defaultSchedule))
      .finally(() => setLoading(false))
  }, [])

  const days = [
    { label: 'Day 1', sub: 'Pre-Convention', date: '6th August 2026' },
    { label: 'Day 2', sub: 'Convention', date: '7th August 2026' },
    { label: 'Day 3', sub: 'Convention', date: '8th August 2026' },
  ]
  const typeColor = { session: 'var(--card-box)', lecture: '#2e8b7a', break: '#856404', inauguration: 'var(--gold)', social: '#8e44ad', valedictory: '#e74c3c', registration: '#2980b9' }

  return (
    <div className="light-section" style={{
      backgroundImage: `linear-gradient(rgba(255,255,255,0.2 ), rgba(255,255,255,0.2)),url(${wave})`,
      backgroundSize: "cover",
      backgroundPosition: "left bottom",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      padding: "4rem 0"
    }}>
      <div className="container">
        <div className="section-head" style={{ textAlign: 'center' }}>
          <span className="section-tag">Tentative Programme</span>
          <h1 className="section-title">Convention <em>Schedule</em></h1>
          <div className="gold-rule" style={{ margin: '0 auto 1rem' }} />
          <p style={{ color: 'var(--txt-mid)', fontSize: '0.85rem' }}>*Programme schedule is subject to change</p>
        </div>
        <div className="tabs">
          {days.map((d, i) => (
            <button key={i} className={`tab${activeDay === i ? ' active' : ''}`} onClick={() => setActiveDay(i)}>
              {d.label} – {d.sub}
              <span style={{ display: 'block', fontSize: '0.65rem', opacity: 0.75, fontWeight: 400 }}>{d.date}</span>
            </button>
          ))}
        </div>
        {loading ? <div className="spinner" /> : (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {(schedule[activeDay + 1] || []).map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '1.2rem', padding: '1rem 1.4rem', borderBottom: '1px solid rgba(88,131,163,0.1)', alignItems: 'flex-start', background: i % 2 === 0 ? 'rgba(255,255,255,0.7)' : 'rgba(88,131,163,0.04)', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(88,131,163,0.09)'}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'rgba(255,255,255,0.7)' : 'rgba(88,131,163,0.04)'}
              >
                <div style={{ minWidth: 130, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: '0.78rem', color: 'var(--card-box)', paddingTop: 2 }}>
                  {item.startTime}{item.endTime ? ` – ${item.endTime}` : ''}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, color: 'var(--txt-dark)', fontSize: '0.95rem' }}>{item.title}</div>
                  {item.speaker && <div style={{ fontSize: '0.8rem', color: 'var(--txt-light)', marginTop: 2 }}>🎤 {item.speaker}</div>}
                </div>
                {item.type && (
                  <span className="badge" style={{ background: `${typeColor[item.type]}22`, color: typeColor[item.type], border: `1px solid ${typeColor[item.type]}44`, flexShrink: 0 }}>
                    {item.type}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── ABOUT PAGE ──
export function AboutPage() {
  return (
    <div className="light-section" style={{ minHeight: '100vh', padding: '4rem 0' }}>
      <div className="container">
        <div className="section-head">
          <span className="section-tag">About the Convention</span>
          <h1 className="section-title">The City of <em>Destiny</em> Awaits</h1>
          <div className="gold-rule" />
        </div>
        <div className="grid-2" style={{ alignItems: 'start', gap: '3rem' }}>
          <div>
            <p style={{ color: 'var(--txt-dark)', lineHeight: 1.9, marginBottom: '1rem', fontSize: '1rem' }}>
              Visakhapatnam, popularly known as <strong>Vizag</strong>, is a picturesque coastal city on the eastern coast of Andhra Pradesh along the Bay of Bengal. Nestled between the Eastern Ghats and the sea, it blends natural beauty, cultural heritage, and modern urban development.
            </p>
            <p style={{ color: 'var(--txt-dark)', lineHeight: 1.9, marginBottom: '1rem', fontSize: '1rem' }}>
              The city is known for its pristine beaches, scenic hills, lush greenery, and pleasant climate. A major centre for education, industry, and healthcare, Visakhapatnam hosts premier institutions and advanced infrastructure.
            </p>
            <p style={{ color: 'var(--txt-dark)', lineHeight: 1.9, fontSize: '1rem' }}>
              The theme <strong style={{ color: 'var(--card-box)' }}>"Imagine, Innovate, Illuminate"</strong> reflects the spirit of Oral Medicine and Radiology — envisioning advanced diagnostic possibilities, fostering innovation through research and technology, and illuminating clinical practice with evidence-based knowledge.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {[
              { icon: '🏛️', title: 'Hosted By', desc: 'Dept. of Oral Medicine & Radiology, Anil Neerukonda Institute of Dental Sciences, Visakhapatnam' },
              { icon: '🎓', title: 'Aegis', desc: 'Indian Academy of Oral Medicine & Radiology (IAOMR)' },
              { icon: '📅', title: 'Dates', desc: '6th – 8th August 2026' },
              { icon: '📍', title: 'Venue', desc: 'Sangivalasa, Visakhapatnam, Andhra Pradesh' },
            ].map(item => (
              <div key={item.title} className="card" style={{ padding: '1.2rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--card-box)', marginBottom: '0.25rem' }}>{item.title}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--txt-dark)' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Organizing Chairman Message */}
        <div style={{ marginTop: '3.5rem' }}>
          <h2 className="section-title">Message from the <em>Organizing Chairman</em></h2>
          <div className="gold-rule" />
          <div className="card" style={{ padding: '2rem', borderLeft: '4px solid var(--gold)' }}>
            <p style={{ color: 'var(--txt-dark)', lineHeight: 1.9, fontStyle: 'italic', fontSize: '1.02rem', marginBottom: '1rem' }}>
              "It is my great pleasure and honor to welcome you to the National Convention of Oral Medicine and Radiology, themed 'Imagine, Innovate and Illuminate'. This year's convention offers a vibrant academic programme designed to enrich delegates' knowledge and promote collaborative research."
            </p>
            <p style={{ color: 'var(--txt-dark)', lineHeight: 1.9, marginBottom: '1.2rem' }}>
              "The convention provides an excellent forum to update your knowledge, explore recent research advances, innovations, and evolving treatment modalities, while enjoying meaningful professional networking. Your visit to the City of Destiny will be professionally rewarding and memorable."
            </p>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: '1rem', color: 'var(--card-box)', letterSpacing: '0.08em' }}>
              — Dr. B. Badari Ramakrishna
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--txt-light)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Organizing Chairman</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── COMMITTEE PAGE ──
export function CommitteePage() {
  const orgTeam = [
    { initials: 'BR', name: 'Dr. B. Badari Ramakrishna', role: 'Organizing Chairman', phone: '+91 9885426232' },
    { initials: 'RM', name: 'Dr. V. Rahul Marshal', role: 'Organizing Secretary', phone: '+91 9848720046' },
    { initials: 'NR', name: 'Dr. N. Rajesh', role: 'Scientific Chairman', phone: '+91 9885067499' },
    { initials: 'KL', name: 'Dr. K. V. Lokesh', role: 'Treasurer', phone: '+91 9885164196' },
    { initials: 'GU', name: 'Dr. G. Upendra', role: 'Joint Secretary' },
  ]
  const committees = [
    { title: 'Scientific Committee', members: ['Dr. Y. Samata', 'Dr. K. Jyothirmai', 'Dr. P. V. Sarat', 'Dr. M. Rakesh', 'Dr. M. Mary Sujatha', 'Dr. R. Sruthi'] },
    { title: 'Registration Committee', members: ['Dr. Y. Pavan Kumar', 'Dr. P. Suresh Kumar', 'Dr. Purna Chandar Rao', 'Dr. B. Swapana Sridevi', 'Dr. C. Vani', 'Dr. B. Anupama'] },
    { title: 'Pre-Convention Committee', members: ['Dr. K. Sridevi', 'Dr. T. Ramesh', 'Dr. G. Komali', 'Dr. Mallikamahalakshmi', 'Dr. N.S.V. Santhosh', 'Dr. E. Sumalatha'] },
    { title: 'Reception Committee', members: ['Dr. K. Ramya', 'Dr. B. Krishnaveni', 'Dr. Bharani Devi', 'Dr. Y. Alekya', 'Dr. Rupa Chandini', 'Dr. Sethu Manjusha'] },
    { title: 'Banquet Committee', members: ['Dr. R.C. Jagat Reddy', 'Dr. G. Ramlal', 'Dr. N. Mahesh', 'Dr. Sanjay Reddy', 'Dr. Kotya Naik Maloth', 'Dr. K. Sharon Leela'] },
    { title: 'Hospitality Committee', members: ['Dr. Ramesh', 'Dr. Santan Reddy', 'Dr. K. Aravind', 'Dr. D. Ajit', 'Dr. S. Sailaja', 'Dr. M. Jasmine'] },
    { title: 'Accommodation Committee', members: ['Dr. V. Sairam', 'Dr. M.P.V. Prabath', 'Dr. E. Shiva Prasad Reddy', 'Dr. M. Dayanand', 'Dr. A.D.N. Deepika', 'Dr. K.N.V. Sai Praveen'] },
    { title: 'Trade Fair Committee', members: ['Dr. K. Ramesh Kumar', 'Dr. T. Harsha Vardhan Reddy', 'Dr. B. Raj Kumar', 'Dr. B. Kalyan Chakravarthy', 'Dr. B. Mamatha', 'Dr. Reddy Lavanya'] },
    { title: 'E-Souvenir Committee', members: ['Dr. Ch. Lalitha', 'Dr. Faizal', 'Dr. Seema Ashwin Bhogte', 'Dr. Shefali Waghray', 'Dr. Praveen', 'Dr. Yehoshuva Reddy'] },
    { title: 'Food Committee', members: ['Dr. M. Srinivas Raju', 'Dr. Niranjan Reddy', 'Dr. Gautam Srivastava', 'Dr. Ch. Sai Kiran', 'Dr. P. Srinivasa Rao'] },
    { title: 'Fund Raising Committee', members: ['Dr. K. Aravinda', 'Dr. Shailender Reddy', 'Dr. Rajya Lakshmi', 'Dr. Bhuvaneswari', 'Dr. D. Naresh Naik', 'Dr. P. Bharathi'] },
    { title: 'Gifts & Mementos Committee', members: ['Dr. Chandrasekar Reddy', 'Dr. B. Vijay Kumar', 'Dr. B. Smita', 'Dr. B. Ramesh Kumar', 'Dr. K. Pavani', 'Dr. Madhulika Naidu'] },
  ]

  return (
    <div className="light-section" style={{ minHeight: '100vh', padding: '4rem 0' }}>
      <div className="container">
        <div className="section-head" style={{ textAlign: 'center' }}>
          <span className="section-tag">Organizing Committee</span>
          <h1 className="section-title">The Team Behind the <em>Convention</em></h1>
          <div className="gold-rule" style={{ margin: '0 auto 1.5rem' }} />
        </div>

        {/* Chief Patron */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-block', background: 'rgba(88,131,163,0.1)', border: '1px solid rgba(88,131,163,0.3)', borderRadius: 14, padding: '1.2rem 2.5rem' }}>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '0.72rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.3rem' }}>Chief Patron</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--txt-dark)' }}>Dr. L. Vamsi Krishna Reddy</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--txt-mid)' }}>Principal, Anil Neerukonda Institute of Dental Sciences</div>
          </div>
        </div>

        {/* Org team */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '1.2rem', marginBottom: '3rem' }}>
          {orgTeam.map(p => (
            <div key={p.name} className="card" style={{ padding: '1.4rem 1rem', textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', margin: '0 auto 0.6rem', background: 'linear-gradient(135deg,var(--card-box),#7494ba)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond',serif", fontSize: '1.3rem', fontWeight: 700, color: '#fff', border: '2px solid rgba(88,131,163,0.3)' }}>{p.initials}</div>
              <div style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--txt-dark)', lineHeight: 1.3, marginBottom: '0.25rem' }}>{p.name}</div>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--card-box)' }}>{p.role}</div>
              {p.phone && <div style={{ fontSize: '0.78rem', color: 'var(--teal)', marginTop: '0.3rem', fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600 }}>{p.phone}</div>}
            </div>
          ))}
        </div>

        {/* Other committees */}
        <h2 className="section-title" style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Sub-<em>Committees</em></h2>
        <div className="gold-rule" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.2rem', marginTop: '1rem' }}>
          {committees.map(c => (
            <div key={c.title} className="card" style={{ padding: 0 }}>
              <div className="card-header">{c.title}</div>
              <div className="card-body">
                <p style={{ fontSize: '0.82rem', color: 'var(--txt-dark)', lineHeight: 1.85 }}>
                  {c.members.join(' · ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── VENUE PAGE ──
export function VenuePage() {
  const attractions = [
    { icon: '🏖️', name: 'RK Beach', desc: 'Iconic beach on the Bay of Bengal' },
    { icon: '⛰️', name: 'Kailasagiri', desc: 'Hill park with panoramic sea views' },
    { icon: '🚡', name: 'Rope Way', desc: 'Cable car ride over the city' },
    { icon: '🦁', name: 'Indira Gandhi Zoo', desc: 'Tiger reserve and zoo park' },
    { icon: '✈️', name: 'TU-142 Aircraft Museum', desc: 'Decommissioned naval aircraft on display' },
    { icon: '🚢', name: 'Submarine Museum', desc: 'INS Kursura submarine museum' },
    { icon: '🌉', name: 'Glass Bridge', desc: 'Sky walk with glass floor' },
    { icon: '🛕', name: 'Simhachalam Temple', desc: 'Ancient Vaishnavite shrine' },
    { icon: '🌄', name: 'Araku Valley', desc: 'Scenic hill station with coffee estates' },
    { icon: '🦇', name: 'Borra Caves', desc: 'Million-year-old limestone caves' },
    { icon: '❄️', name: 'Lambasingi', desc: 'The "Kashmir of Andhra Pradesh"' },
    { icon: '💧', name: 'Devarapalli Falls', desc: 'Scenic waterfall near the city' },
  ]

  return (
    <div className="light-section" style={{ minHeight: '100vh', padding: '4rem 0' }}>
      <div className="container">
        <div className="section-head">
          <span className="section-tag">Venue & Tourism</span>
          <h1 className="section-title">Explore <em>Visakhapatnam</em></h1>
          <div className="gold-rule" />
        </div>
        <div className="grid-2" style={{ alignItems: 'start', gap: '3rem' }}>
          <div>
            <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div className="card-header" style={{ margin: '-1.5rem -1.5rem 1rem', padding: '0.7rem 1.5rem' }}>Convention Venue</div>
              <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--txt-dark)' }}>Anil Neerukonda Institute of Dental Sciences</p>
              <p style={{ color: 'var(--txt-mid)', marginTop: '0.3rem' }}>Sangivalasa, Visakhapatnam, Andhra Pradesh, India</p>
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem', color: 'var(--txt-mid)' }}>
                <span>✈️ Visakhapatnam International Airport</span>
                <span>🚆 Visakhapatnam Railway Station</span>
                <span>🚌 National Highway access by road</span>
              </div>
            </div>
            <p style={{ color: 'var(--txt-dark)', lineHeight: 1.9, fontSize: '0.98rem' }}>
              Nestled between the Eastern Ghats and the Bay of Bengal, Visakhapatnam (Vizag) offers delegates a perfect blend of academic enrichment and tourism. The city is well-connected and vibrant, with world-class attractions for the entire family.
            </p>
          </div>
          <div>
            <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--card-box)', marginBottom: '1rem' }}>Tourist Attractions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {attractions.map(a => (
                <div key={a.name} className="card" style={{ padding: '0.85rem', display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{a.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--txt-dark)' }}>{a.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--txt-light)', lineHeight: 1.5 }}>{a.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── CONTACT PAGE ──
export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/contact', form)
      toast.success('Message sent! We will get back to you soon.')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const contacts = [
    { name: 'Dr. B. Badari Ramakrishna', role: 'Organizing Chairman', phone: '+91 9885426232' },
    { name: 'Dr. V. Rahul Marshal', role: 'Organizing Secretary', phone: '+91 9848720046' },
    { name: 'Dr. N. Rajesh', role: 'Scientific Chairman', phone: '+91 9885067499' },
    { name: 'Dr. K. V. Lokesh', role: 'Treasurer', phone: '+91 9885164196' },
  ]
  const students = [
    { name: 'Dr. Samruth Unnisa', phone: '6304905152' },
    { name: 'Dr. K. Sharon', phone: '9502085963' },
    { name: 'Dr. Y. Madhusudhan Rao', phone: '9160743909' },
  ]

  return (
    <div className="light-section" style={{ minHeight: '100vh', padding: '4rem 0' }}>
      <div className="container">
        <div className="section-head">
          <span className="section-tag">Get in Touch</span>
          <h1 className="section-title"><em>Contact</em> Us</h1>
          <div className="gold-rule" />
        </div>
        <div className="grid-2" style={{ alignItems: 'start', gap: '3rem' }}>
          {/* Contact form */}
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: '1rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--card-box)', marginBottom: '1.5rem' }}>Send a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input className="form-input" value={form.name} onChange={e => f('name', e.target.value)} required placeholder="Dr. Your Name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input className="form-input" type="email" value={form.email} onChange={e => f('email', e.target.value)} required placeholder="you@email.com" />
                </div>
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input className="form-input" value={form.phone} onChange={e => f('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input className="form-input" value={form.subject} onChange={e => f('subject', e.target.value)} placeholder="Subject" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea className="form-textarea" value={form.message} onChange={e => f('message', e.target.value)} required rows={5} placeholder="Your message..." />
              </div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card" style={{ padding: 0 }}>
              <div className="card-header">Organizing Committee</div>
              <div className="card-body">
                {contacts.map(c => (
                  <div key={c.phone} style={{ paddingBottom: '0.9rem', marginBottom: '0.9rem', borderBottom: '1px solid rgba(88,131,163,0.1)' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--txt-dark)' }}>{c.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{c.role}</div>
                    <a href={`tel:${c.phone}`} style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: '0.98rem', color: 'var(--card-box)', textDecoration: 'none' }}>{c.phone}</a>
                  </div>
                ))}
              </div>
            </div>
            <div className="card" style={{ padding: 0 }}>
              <div className="card-header">Student Coordinators</div>
              <div className="card-body">
                {students.map(s => (
                  <div key={s.phone} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', marginBottom: '0.6rem', borderBottom: '1px solid rgba(88,131,163,0.08)' }}>
                    <span style={{ fontSize: '0.88rem', color: 'var(--txt-dark)' }}>{s.name}</span>
                    <a href={`tel:${s.phone}`} style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: '0.9rem', color: 'var(--teal)', textDecoration: 'none' }}>{s.phone}</a>
                  </div>
                ))}
              </div>
            </div>
            <div className="card" style={{ padding: '1.2rem', background: 'rgba(201,168,76,0.07)', borderColor: 'rgba(201,168,76,0.25)' }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem' }}>Convention Venue</div>
              <p style={{ fontSize: '0.88rem', color: 'var(--txt-dark)', lineHeight: 1.8 }}>
                Anil Neerukonda Institute of Dental Sciences<br />
                Sangivalasa, Visakhapatnam<br />
                Andhra Pradesh, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchedulePage
