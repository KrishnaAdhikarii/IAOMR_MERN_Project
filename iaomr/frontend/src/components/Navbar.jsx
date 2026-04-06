import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiMenu, FiX, FiUser, FiLogOut, FiSettings, FiGrid, FiShield } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { HashLink } from 'react-router-hash-link'

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const userRef = useRef(null)
  const menuRef = useRef(null)

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false)
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
    setUserOpen(false)
  }

  // Styles for links
  const linkStyle = {
    fontFamily: "'Barlow Condensed',sans-serif",
    fontWeight: 600,
    fontSize: '0.82rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: 'rgba(240,244,248,0.75)',
    paddingBottom: '2px',
    transition: 'all 0.3s',
  }

  const navLinks = [
    { to: '/', label: 'Home', hash: 'home' },
    { to: '/', label: 'About', hash: 'about' },
    { to: '/', label: 'Schedule', hash: 'schedule' },
    { to: '/', label: 'Committee', hash: 'committee' },
    { to: '/', label: 'Venue', hash: 'venue' },
    { to: '/contact', label: 'Contact' }, // normal page link
  ]

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        background: scrolled ? 'rgba(7,17,31,0.98)' : 'rgba(7,17,31,0.92)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(201,168,76,0.2)',
        transition: 'all 0.3s',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {/* Brand */}
        <Link
          to="/"
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'rgba(0,162,255,0.1)',
              // background: 'linear-gradient(135deg,#2e8b7a,#1a3460)',
              border: '2px solid #c9a84c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Barlow Condensed',sans-serif",
              fontWeight: 800,
              fontSize: '0.62rem',
              color: '#66bee4',
              letterSpacing: '0.03em',
              lineHeight: 1.1,
              textAlign: 'center',
            }}
          >
            IAOMR
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 700,
                fontSize: '0.9rem',
                color: '#c9a84c',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              IAOMR 2026
            </div>
            <div
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 300,
                fontSize: '0.65rem',
                color: 'rgba(240,244,248,0.55)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Visakhapatnam
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul
          style={{ display: 'flex', gap: '1.6rem', listStyle: 'none', margin: 0, padding: 0 }}
          className="desktop-nav"
        >
          {navLinks.map((l) => (
            <li key={`${l.to}-${l.hash || ''}`}>
              {l.hash ? (
                <HashLink
                  to={`/#${l.hash}`}
                  smooth
                  scroll={el => {
                    const yOffset = -70; // height of your navbar
                    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

                    window.scrollTo({
                      top: y,
                      behavior: 'smooth', // smooth scrolling
                    });
                  }}
                  onClick={() => setMenuOpen(false)}
                  style={linkStyle}
                >
                  {l.label}
                </HashLink>
              ) : (
                <Link to={l.to} onClick={() => setMenuOpen(false)} style={linkStyle}>
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link to="/register-delegate" className="btn btn-gold btn-sm">
            Register Now
          </Link>

          {user ? (
            <div style={{ position: 'relative' }} ref={userRef} className="user-menu">
              <button
                onClick={() => setUserOpen(!userOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(88,131,163,0.2)',
                  border: '1px solid rgba(88,131,163,0.4)',
                  borderRadius: '6px',
                  padding: '0.45rem 0.9rem',
                  cursor: 'pointer',
                  color: '#f0f4f8',
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontSize: '0.82rem',
                  letterSpacing: '0.08em',
                }}
                aria-label="User menu"
              >
                <FiUser size={14} />
                {user.name?.split(' ')[0]}
              </button>
              {userOpen && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 8px)',
                    background: '#fff',
                    borderRadius: '10px',
                    minWidth: '180px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                    border: '1px solid rgba(88,131,163,0.2)',
                    overflow: 'hidden',
                    zIndex: 600,
                  }}
                >
                  <div
                    style={{
                      padding: '0.75rem 1rem',
                      borderBottom: '1px solid rgba(88,131,163,0.1)',
                      background: 'rgba(88,131,163,0.05)',
                    }}
                  >
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--txt-dark)' }}>
                      {user.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--txt-light)' }}>{user.email}</div>
                  </div>
                  {[
                    { to: '/dashboard', icon: <FiGrid size={13} />, label: 'Dashboard' },
                    { to: '/profile', icon: <FiSettings size={13} />, label: 'Profile' },
                    ...(isAdmin
                      ? [{ to: '/admin', icon: <FiShield size={13} />, label: 'Admin Panel' }]
                      : []),
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setUserOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.65rem 1rem',
                        fontSize: '0.85rem',
                        color: 'var(--txt-dark)',
                        textDecoration: 'none',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(88,131,163,0.08)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      width: '100%',
                      padding: '0.65rem 1rem',
                      fontSize: '0.85rem',
                      color: '#e74c3c',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      borderTop: '1px solid rgba(88,131,163,0.1)',
                      fontFamily: "'Barlow',sans-serif",
                    }}
                  >
                    <FiLogOut size={13} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-outline btn-sm"
              style={{ color: 'rgba(240,244,248,0.8)', borderColor: 'rgba(240,244,248,0.3)' }}
            >
              Know Your Status 
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(240,244,248,0.8)',
              padding: '0.25rem',
              display: 'none',
            }}
            aria-label="Toggle menu"
            ref={menuRef}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            right: 0,
            background: 'rgba(7,17,31,0.98)',
            borderBottom: '1px solid rgba(201,168,76,0.2)',
            padding: '1rem 4vw',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            zIndex: 400,
          }}
        >
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 600,
                fontSize: '1rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: isActive ? '#c9a84c' : 'rgba(240,244,248,0.8)',
                padding: '0.5rem 0',
                textDecoration: 'none',
                display: 'block',
                borderBottom: '1px solid rgba(88,131,163,0.1)',
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}

      <style>{`
        @media(max-width:900px){
          .desktop-nav{display:none!important}
          .mobile-menu-btn{display:block!important}
        }
      `}</style>
    </nav>
  )
}