import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

// import Footer from '../../components/Footer'

import {
  FiGrid,
  FiFileText,
  FiCalendar,
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
    to: '/admin/topic-groups',
    icon: <FiCalendar size={18} />,
    label: 'Topic Groups',
  },
]

export function AdminLayout({
  children,
  title,
}) {
  const { logout, user } = useAuth()

  const location = useLocation()

  const navigate = useNavigate()

  const [open, setOpen] =
    useState(false)

  useEffect(() => {
  const footer =
    document.querySelector('footer')

  if (footer) {
    footer.style.display = 'none'
  }

  return () => {
    if (footer) {
      footer.style.display = 'block'
    }
  }
}, [])


  const handleLogout = () => {
    logout()

    toast.success('Logged out')

    navigate('/')
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* MOBILE OVERLAY */}
      {open && (
        <div
          onClick={() =>
            setOpen(false)
          }
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-[280px]
          bg-[rgb(27,46,87)]
          text-white
          flex flex-col
          transition-transform duration-300
          overflow-y-auto
          shadow-2xl

          ${
            open
              ? 'translate-x-0'
              : '-translate-x-full'
          }

          lg:translate-x-0
        `}
      >
        {/* LOGO */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-start justify-between">
            <div>
              <p className="uppercase tracking-[0.25em] text-blue-100 text-xs font-semibold">
                IAOMR 2026
              </p>

              <h2 className="text-3xl font-bold mt-2">
                Admin Panel
              </h2>

              <div className="mt-6 bg-white/10 rounded-2xl p-4 border border-white/10">
                <p className="text-sm text-blue-100">
                  Logged in as
                </p>

                <h3 className="font-semibold text-lg mt-1">
                  {user?.name}
                </h3>
              </div>
            </div>

            <button
              onClick={() =>
                setOpen(false)
              }
              className="lg:hidden h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const active =
              item.to === '/admin'
                ? location.pathname ===
                  '/admin'
                : location.pathname.startsWith(
                    item.to
                  )

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() =>
                  setOpen(false)
                }
                className={`
                  flex items-center gap-4
                  px-5 py-4
                  rounded-2xl
                  transition-all duration-200

                  ${
                    active
                      ? 'bg-white text-[rgb(27,46,87)] shadow-lg font-semibold'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                <div className="text-xl">
                  {item.icon}
                </div>

                <span className="uppercase tracking-wide text-sm">
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* FOOTER BUTTONS */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <Link
            to="/"
            className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition"
          >
            <FiHome size={18} />

            <span className="uppercase tracking-wide text-sm">
              View Website
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

          {/* SIDEBAR FOOTER */}
          <div className="pt-4 text-center text-xs text-blue-200/70 border-t border-white/10">
            © 2026 IAOMR Conference
          </div>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 lg:ml-[280px] flex flex-col min-h-screen">
        {/* MOBILE TOPBAR */}
        <header className="lg:hidden sticky top-0 z-30 bg-[rgb(27,46,87)] text-white px-4 py-4 flex items-center justify-between shadow-lg">
          <div>
            <p className="uppercase tracking-[0.2em] text-blue-100 text-xs">
              IAOMR Admin
            </p>

            <h1 className="font-bold text-lg">
              {title || 'Dashboard'}
            </h1>
          </div>

          <button
            onClick={() =>
              setOpen(true)
            }
            className="h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center"
          >
            <FiMenu size={22} />
          </button>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 md:p-6 lg:p-10">
          {/* DESKTOP HEADER */}
          {/* {title && (
            <div className="hidden lg:block mb-8">
              <div className="bg-[rgb(27,46,87)] rounded-3xl p-8 text-white shadow-xl">
                <p className="uppercase tracking-[0.25em] text-blue-100 text-xs font-semibold">
                  IAOMR 2026
                </p>

                <h1 className="text-5xl font-bold mt-3">
                  {title}
                </h1>

                <p className="mt-4 text-blue-100 max-w-2xl">
                  Manage registrations,
                  abstracts, topic groups,
                  and convention activities
                  from a centralized admin
                  dashboard.
                </p>
              </div>
            </div>
          )} */}

          {/* CONTENT CARD */}
          <div className="pb-10">
  {children}
</div>
        </main>

        {/* WEBSITE FOOTER */}
      </div>
    </div>
  )
}