import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import {
  FiGrid, FiUsers, FiFileText, FiCalendar,
  FiBell, FiMessageSquare, FiClipboard, FiLogOut, FiHome
} from 'react-icons/fi'

const navItems = [
  { to: '/admin',                icon: <FiGrid size={16}/>,        label: 'Dashboard' },
  { to: '/admin/registrations',  icon: <FiClipboard size={16}/>,   label: 'Registrations' },
  { to: '/admin/abstracts',      icon: <FiFileText size={16}/>,    label: 'Abstracts' },
  { to: '/admin/schedule',       icon: <FiCalendar size={16}/>,    label: 'Schedule' },
  { to: '/admin/announcements',  icon: <FiBell size={16}/>,        label: 'Announcements' },
  { to: '/admin/messages',       icon: <FiMessageSquare size={16}/>,label: 'Messages' },
  { to: '/admin/users',          icon: <FiUsers size={16}/>,       label: 'Users' },
]

export function AdminLayout({ children, title }) {
  const { logout, user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out')
    navigate('/')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f6fb' }}>
      {/* Sidebar */}
      <aside style={{
        width: 230, flexShrink: 0, position: 'fixed', top: 70, bottom: 0,
        background: 'linear-gradient(180deg, #0f2235 0%, #071120 100%)',
        borderRight: '1px solid rgba(88,131,163,0.2)',
        display: 'flex', flexDirection: 'column', overflowY: 'auto', zIndex: 100,
      }}>
        {/* Admin brand */}
        <div style={{ padding: '1.5rem 1.2rem 1rem', borderBottom: '1px solid rgba(88,131,163,0.15)' }}>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a84c' }}>Admin Panel</div>
          <div style={{ fontSize: '0.8rem', color: 'rgba(240,244,248,0.5)', marginTop: '0.2rem' }}>{user?.name}</div>
        </div>

        <nav style={{ padding: '0.75rem 0', flex: 1 }}>
          {navItems.map(item => {
            const active = item.to === '/admin'
              ? location.pathname === '/admin'
              : location.pathname.startsWith(item.to)
            return (
              <Link key={item.to} to={item.to} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.7rem 1.2rem', textDecoration: 'none',
                background: active ? 'rgba(88,131,163,0.25)' : 'transparent',
                borderLeft: active ? '3px solid #c9a84c' : '3px solid transparent',
                color: active ? '#c9a84c' : 'rgba(240,244,248,0.65)',
                fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600,
                fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(88,131,163,0.12)'; e.currentTarget.style.color = 'rgba(240,244,248,0.9)' }}}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(240,244,248,0.65)' }}}
              >
                {item.icon}{item.label}
              </Link>
            )
          })}
        </nav>

        <div style={{ padding: '0.75rem 0', borderTop: '1px solid rgba(88,131,163,0.15)' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 1.2rem', color: 'rgba(240,244,248,0.55)', textDecoration: 'none', fontSize: '0.82rem', fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            <FiHome size={15}/> View Site
          </Link>
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            width: '100%', padding: '0.65rem 1.2rem', background: 'none', border: 'none',
            color: 'rgba(231,76,60,0.75)', cursor: 'pointer',
            fontFamily: "'Barlow Condensed',sans-serif", fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            <FiLogOut size={15}/> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, marginLeft: 230, padding: '2.5rem', minHeight: 'calc(100vh - 70px)' }}>
        {title && (
          <div style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(88,131,163,0.15)' }}>
            <h1 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: '1.5rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--txt-dark)' }}>{title}</h1>
          </div>
        )}
        {children}
      </main>
    </div>
  )
}
