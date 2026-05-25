import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'
import toast from 'react-hot-toast'

import {
  FiGrid,
  FiUsers,
  FiFileText,
  FiCalendar,
  FiMessageSquare,
  FiClipboard,
  FiLogOut,
  FiHome,
  FiMenu,
  FiX,
} from 'react-icons/fi'

const navItems = [
  {
    to: '/admin',
    icon: <FiGrid size={18} />,
    label: 'Dashboard',
  },
  {
    to: '/admin/registrations',
    icon: <FiClipboard size={18} />,
    label: 'Registrations',
  },
  {
    to: '/admin/abstracts',
    icon: <FiFileText size={18} />,
    label: 'Abstracts',
  },
  {
    to: '/admin/schedule',
    icon: <FiCalendar size={18} />,
    label: 'Schedule',
  },
  {
    to: '/admin/messages',
    icon: <FiMessageSquare size={18} />,
    label: 'Messages',
  },
  {
    to: '/admin/users',
    icon: <FiUsers size={18} />,
    label: 'Users',
  },
]

export function AdminLayout({ children, title }) {
  const { logout, user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    toast.success('Logged out')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-[rgb(27,46,87)] text-white px-4 py-4 flex items-center justify-between shadow-lg">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-blue-100">
            IAOMR Admin
          </p>

          <h1 className="font-bold text-lg">
            {title || 'Dashboard'}
          </h1>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center"
        >
          <FiMenu size={22} />
        </button>
      </div>

      <div className="flex">
        {/* Overlay */}
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 bottom-0 z-50 w-[280px] bg-[rgb(27,46,87)] text-white transform transition-transform duration-300 overflow-y-auto
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:w-[260px]`}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-start justify-between">
            <div>
              <p className="uppercase tracking-[0.2em] text-blue-100 text-xs font-semibold">
                IAOMR Admin
              </p>

              <h2 className="text-2xl font-bold mt-2">
                Control Panel
              </h2>

              <div className="mt-5 bg-white/10 rounded-2xl p-4">
                <p className="text-sm text-blue-100">
                  Logged in as
                </p>

                <p className="font-semibold mt-1">
                  {user?.name}
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="lg:hidden h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const active =
                item.to === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.to)

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all
                  ${
                    active
                      ? 'bg-white text-[rgb(27,46,87)] font-semibold'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.icon}

                  <span className="uppercase tracking-wide text-sm">
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* Bottom Buttons */}
          <div className="p-4 border-t border-white/10 space-y-3 mt-auto">
            <Link
              to="/"
              className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition"
            >
              <FiHome size={18} />

              <span className="uppercase tracking-wide text-sm">
                View Site
              </span>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-300 transition"
            >
              <FiLogOut size={18} />

              <span className="uppercase tracking-wide text-sm">
                Logout
              </span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-[260px] p-4 md:p-6 lg:p-10">
          {/* Desktop Header */}
          {/* {title && (
            // <div className="hidden lg:block bg-[rgb(27,46,87)] text-white rounded-3xl p-8 shadow-lg mb-8">
            //   <p className="uppercase tracking-[0.2em] text-blue-100 text-sm font-semibold">
            //     Admin Dashboard
            //   </p>

            //   <h1 className="text-4xl font-bold mt-3">
            //     {title}
            //   </h1>

            //   <p className="mt-4 text-blue-100 max-w-2xl">
            //     Manage registrations, abstracts, schedules,
            //     users, and convention activities.
            //   </p>
            // </div>
          )} */}

          {/* Content */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 md:p-6 lg:p-8 overflow-hidden">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}