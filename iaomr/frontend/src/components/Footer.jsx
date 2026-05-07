import { Link } from 'react-router-dom'
import {
  FiMapPin,
  FiPhone,
  FiMail,
} from 'react-icons/fi'

export default function Footer() {

  const quickLinks = [
    { to: '/about', label: 'About Convention' },
    { to: '/schedule', label: 'Scientific Schedule' },
    { to: '/committee', label: 'Committee' },
    { to: '/venue', label: 'Venue & Tourism' },
    { to: '/register-delegate', label: 'Register Now' },
    { to: '/submit-abstract', label: 'Submit Abstract' },
    { to: '/contact', label: 'Contact Us' },
  ]

  return (
    <footer className="footer">

      <div className="footer_container">

        {/* 1. BRAND */}
        <div className="footer_section">
          <h2>IAOMR 2026</h2>

          <p className="footer_tagline">
            24th National PG Convention
          </p>

          <p className="footer_desc">
            Department of Oral Medicine & Radiology,
            <br />
            ANIDS, Visakhapatnam, Andhra Pradesh
          </p>

          <div className="footer_quote">
            Imagine · Innovate · Illuminate
          </div>
        </div>

        {/* 2. QUICK LINKS */}
        <div className="footer_section">
          <h3>Quick Links</h3>

          {quickLinks.map((link) => (
            <Link key={link.to} to={link.to} className="footer_link">
              {link.label}
            </Link>
          ))}
        </div>

        {/* 3. STUDENT COORDINATORS */}
        <div className="footer_section">
          <h3>Student Coordinators</h3>

          <div className="student_contact">
            <span>Dr. Samruth Unnisa</span>
            <a href="tel:+916304905152">
              <FiPhone /> +91 6304905152
            </a>
          </div>

          <div className="student_contact">
            <span>Dr. K. Sharon</span>
            <a href="tel:+919502085963">
              <FiPhone /> +91 9502085963
            </a>
          </div>

          <div className="student_contact">
            <span>Dr. Y. Madhusudhan Rao</span>
            <a href="tel:+919160743909">
              <FiPhone /> +91 9160743909
            </a>
          </div>
        </div>

        {/* 4. CONTACT */}
        <div className="footer_section">
          <h3>Contact</h3>

          <div className="contact_card">
            <h4>Dr. B. Badari Ramakrishna</h4>
            <p>Organizing Chairman</p>
            <a href="tel:+919885426232">
              <FiPhone /> +91 9885426232
            </a>
          </div>

          <div className="contact_card">
            <h4>Dr. V. Rahul Marshal</h4>
            <p>Organizing Secretary</p>
            <a href="tel:+919848720046">
              <FiPhone /> +91 9848720046
            </a>
          </div>

          <div className="footer_location">
            <FiMapPin />
            <span>Sangivalasa, Visakhapatnam, Andhra Pradesh</span>
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