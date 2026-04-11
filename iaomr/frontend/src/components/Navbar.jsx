import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX, FiUser, FiLogOut, FiSettings, FiGrid, FiShield } from 'react-icons/fi';
import toast from 'react-hot-toast';

import logo2 from '../images/iAOMR.jpeg';
import logo4 from '../images/Anids.png';
import logo5 from '../images/logo4.jpeg';
import logo3 from '../images/meilLogo.png';
import logo1 from '../images/event.png';

// import './Navbar.css'; // ✅ REQUIRED

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const userRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
    setUserOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home', hash: 'home' },
    { to: '/', label: 'Registration', hash: 'registration-info' },
    { to: '/scientific', label: 'Scientific' },
    { to: '/', label: 'Office Bearers', hash: 'Office_Bearers' },
    { to: '/', label: 'Committee', hash: 'committee' },
    { to: '/', label: 'Hotels', hash: 'hotels' },
    { to: '/contact', label: 'Contact Us' },
  ];

  const logos = [logo1, logo2, logo3, logo4, logo5];

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">

        {/* Brand */}
        <Link to="/" className="navbar-brand">
          {logos.map((src, index) => (
            <div key={index} className="logo-circle">
              <img src={src} alt={`Logo ${index + 1}`} />
            </div>
          ))}
        </Link>

        {/* Desktop Nav */}
        <ul className="desktop-nav">
          {navLinks.map((l) => (
            <li key={`${l.to}-${l.hash || ''}`}>
              {l.hash ? (
                <HashLink
                  to={`/#${l.hash}`}
                  smooth
                  scroll={(el) => {
                    const yOffset = -70;
                    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }}
                  onClick={() => setMenuOpen(false)}
                  className="nav-link"
                >
                  {l.label}
                </HashLink>
              ) : (
                <Link to={l.to} onClick={() => setMenuOpen(false)} className="nav-link">
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="nav-right">
          <Link to="/register-delegate" className="nav-link-register-link">
            Register Now
          </Link>

          {user ? (
            <div className="user-menu" ref={userRef}>
              <button onClick={() => setUserOpen(!userOpen)} className="user-btn">
                <FiUser size={14} />
                {user.name?.split(' ')[0]}
              </button>

              {userOpen && (
                <div className="user-dropdown">
                  <div className="user-header">
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                  </div>

                  {[{ to: '/dashboard', icon: <FiGrid size={13} />, label: 'Dashboard' },
                  { to: '/profile', icon: <FiSettings size={13} />, label: 'Profile' },
                  ...(isAdmin ? [{ to: '/admin', icon: <FiShield size={13} />, label: 'Admin Panel' }] : []),
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setUserOpen(false)}
                      className="dropdown-item"
                    >
                      {item.icon} {item.label}
                    </Link>
                  ))}

                  <button onClick={handleLogout} className="logout-btn">
                    <FiLogOut size={13} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-outline btn-sm login-btn">
              Know Your Status
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            ref={menuRef}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setMenuOpen(false)}
              className="mobile-link"
            >
              {l.label}
            </NavLink>
          ))}

          {/* ✅ ADDED (no removal, only addition) */}
          <Link
            to="/register-delegate"
            className="mobile-link register-mobile"
            onClick={() => setMenuOpen(false)}
          >
            Register Now
          </Link>

          {!user && (
            <Link
              to="/login"
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              Know Your Status
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}