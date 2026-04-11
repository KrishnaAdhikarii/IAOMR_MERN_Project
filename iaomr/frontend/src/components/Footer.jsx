import { Link } from 'react-router-dom'
import { FiMapPin } from 'react-icons/fi'

export default function Footer() {
  const quickLinks = [
    { to: '/about', label: 'About Convention' },
    { to: '/schedule', label: 'Schedule' },
    { to: '/committee', label: 'Committee' },
    { to: '/venue', label: 'Venue & Tourism' },
    { to: '/register-delegate', label: 'Register Now' },
    { to: '/submit-abstract', label: 'Submit Abstract' },
    { to: '/contact', label: 'Contact Us' },
  ]

  const contacts = [
    {
      name: 'Dr. B. Badari Ramakrishna',
      role: 'Organizing Chairman',
      phone: '+91 9885426232'
    },
    {
      name: 'Dr. V. Rahul Marshal',
      role: 'Organizing Secretary',
      phone: '+91 9848720046'
    }
  ]

  return (
    <footer className="footer">
      <div className="footer_container">

        {/* BRAND */}
        <div className="footer_brand">
          <h2>IAOMR</h2>
          <p className="footer_tagline">
            24th National PG Convention · 2026
          </p>

          <p className="footer_desc">
            Dept. of Oral Medicine & Radiology,<br />
            ANIDS, Visakhapatnam, Andhra Pradesh
          </p>

          <span className="footer_quote">
            "Imagine · Innovate · Illuminate"
          </span>
        </div>

        {/* LINKS */}
        <div className="footer_links">
          <h4>Quick Links</h4>
          {quickLinks.map((l) => (
            <Link key={l.to} to={l.to} className="footer_link">
              {l.label}
            </Link>
          ))}
        </div>

        {/* CONTACT */}
        <div className="footer_contact">
          <h4>Contact</h4>

          {contacts.map((c) => (
            <div key={c.phone} className="footer_contact_card">
              <p className="name">{c.name}</p>
              <p className="role">{c.role}</p>
              <a href={`tel:${c.phone}`} className="phone">
                {c.phone}
              </a>
            </div>
          ))}

          <div className="footer_location">
            <FiMapPin size={14} />
            <span>Sangivalasa, Visakhapatnam</span>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer_bottom">
        © 2026 IAOMR PG Convention · All Rights Reserved
      </div>
    </footer>
  )
}