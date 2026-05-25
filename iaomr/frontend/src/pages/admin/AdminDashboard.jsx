import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiUsers,
  FiFileText,
  FiDollarSign,
  FiClipboard,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiXCircle,
} from 'react-icons/fi'

import { AdminLayout } from './AdminLayout'
import api from '../../utils/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)

  const [recent, setRecent] = useState({
    recentRegistrations: [],
    recentAbstracts: [],
  })

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/admin/stats'),
      api.get('/admin/recent'),
    ])
      .then(([s, r]) => {
        setStats(s.data.stats)
        setRecent(r.data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const statCards = stats
    ? [
        {
          label: 'Registrations',
          value:
            stats.registrations.total,
          icon: <FiClipboard />,
          bg: 'bg-blue-500',
        },

        {
          label: 'Paid',
          value:
            stats.registrations
              .confirmed,
          icon: <FiCheckCircle />,
          bg: 'bg-green-500',
        },

        {
          label: 'Pending',
          value:
            stats.registrations.pending,
          icon: <FiClock />,
          bg: 'bg-yellow-500',
        },

        {
          label: 'Abstracts',
          value: stats.abstracts.total,
          icon: <FiFileText />,
          bg: 'bg-purple-500',
        },

        {
          label: 'Users',
          value: stats.users,
          icon: <FiUsers />,
          bg: 'bg-cyan-500',
        },

        {
          label: 'Revenue',
          value: `₹${(
            stats.revenue || 0
          ).toLocaleString()}`,
          icon: <FiDollarSign />,
          bg: 'bg-emerald-500',
        },
      ]
    : []

  const statusBadge = (status) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-700'

      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700'

      case 'FAILED':
        return 'bg-red-100 text-red-700'

      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <div className="flex justify-center py-24">
          <div className="h-14 w-14 border-4 border-slate-200 border-t-[rgb(27,46,87)] rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* HERO */}
          <div className="bg-[rgb(27,46,87)] rounded-3xl p-6 md:p-8 text-white mb-8 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="uppercase tracking-[0.25em] text-blue-100 text-xs font-semibold">
                  IAOMR 2026
                </p>

                <h1 className="text-3xl md:text-5xl font-bold mt-3">
                  Admin Dashboard
                </h1>

                <p className="mt-4 text-blue-100 max-w-2xl">
                  Manage registrations,
                  abstracts, users, revenue,
                  schedules, and convention
                  operations from a unified
                  control panel.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 min-w-[260px]">
                <div className="bg-white/10 backdrop-blur rounded-2xl p-5">
                  <p className="text-blue-100 text-sm">
                    Total Revenue
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    ₹
                    {(
                      stats?.revenue || 0
                    ).toLocaleString()}
                  </h2>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-2xl p-5">
                  <p className="text-blue-100 text-sm">
                    Total Users
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {stats?.users || 0}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-5 mb-8">
            {statCards.map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 hover:shadow-lg transition"
              >
                <div
                  className={`h-14 w-14 rounded-2xl ${card.bg} text-white flex items-center justify-center text-2xl`}
                >
                  {card.icon}
                </div>

                <h2 className="text-3xl font-bold mt-5 text-slate-800">
                  {card.value}
                </h2>

                <p className="text-slate-500 mt-2 text-sm uppercase tracking-wide">
                  {card.label}
                </p>
              </div>
            ))}
          </div>

          {/* CATEGORY BREAKDOWN */}
          {stats?.categoryBreakdown
            ?.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">
                  Registrations by
                  Category
                </h2>

                <div className="text-sm text-slate-500">
                  Total Categories:{' '}
                  {
                    stats.categoryBreakdown
                      .length
                  }
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {stats.categoryBreakdown.map(
                  (c) => (
                    <div
                      key={c._id}
                      className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-center"
                    >
                      <h3 className="text-4xl font-bold text-[rgb(27,46,87)]">
                        {c.count}
                      </h3>

                      <p className="mt-3 text-sm font-medium text-slate-600">
                        {c._id}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* TABLES */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* REGISTRATIONS */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Recent Registrations
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Latest convention
                    registrations
                  </p>
                </div>

                <Link
                  to="/admin/registrations"
                  className="flex items-center gap-2 text-[rgb(27,46,87)] font-semibold text-sm"
                >
                  View All
                  <FiArrowRight />
                </Link>
              </div>

              <div>
                {recent.recentRegistrations
                  .length > 0 ? (
                  recent.recentRegistrations.map(
                    (r) => (
                      <div
                        key={r._id}
                        className="px-6 py-5 border-b border-slate-100 flex items-center justify-between gap-4 hover:bg-slate-50 transition"
                      >
                        <div>
                          <h3 className="font-semibold text-slate-800">
                            {r.name}
                          </h3>

                          <p className="text-sm text-slate-500 mt-1">
                            {r.regNumber}{' '}
                            •{' '}
                            {
                              r.category
                            }
                          </p>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(
                            r.status
                          )}`}
                        >
                          {r.status}
                        </span>
                      </div>
                    )
                  )
                ) : (
                  <div className="p-10 text-center text-slate-500">
                    No registrations
                    found
                  </div>
                )}
              </div>
            </div>

            {/* ABSTRACTS */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Recent Abstracts
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Latest abstract
                    submissions
                  </p>
                </div>

                <Link
                  to="/admin/abstracts"
                  className="flex items-center gap-2 text-[rgb(27,46,87)] font-semibold text-sm"
                >
                  View All
                  <FiArrowRight />
                </Link>
              </div>

              <div>
                {recent.recentAbstracts
                  .length > 0 ? (
                  recent.recentAbstracts.map(
                    (a) => (
                      <div
                        key={a._id}
                        className="px-6 py-5 border-b border-slate-100 flex items-center justify-between gap-4 hover:bg-slate-50 transition"
                      >
                        <div className="min-w-0">
                          <h3 className="font-semibold text-slate-800 truncate">
                            {a.title}
                          </h3>

                          <p className="text-sm text-slate-500 mt-1">
                            {
                              a.abstractId
                            }{' '}
                            •{' '}
                            {
                              a.category
                            }
                          </p>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            a.status ===
                            'accepted'
                              ? 'bg-green-100 text-green-700'
                              : a.status ===
                                'rejected'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {a.status}
                        </span>
                      </div>
                    )
                  )
                ) : (
                  <div className="p-10 text-center text-slate-500">
                    No abstracts found
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-slate-800 mb-5">
              Quick Actions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {[
                {
                  to: '/admin/registrations',
                  label:
                    'Manage Registrations',
                },

                {
                  to: '/admin/abstracts',
                  label:
                    'Review Abstracts',
                },

                {
                  to: '/admin/schedule',
                  label:
                    'Edit Schedule',
                },

                {
                  to: '/admin/messages',
                  label:
                    'View Messages',
                },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 hover:shadow-lg hover:-translate-y-1 transition"
                >
                  <h3 className="font-bold text-slate-800 text-lg">
                    {item.label}
                  </h3>

                  <div className="mt-5 flex items-center text-[rgb(27,46,87)] font-semibold">
                    Open
                    <FiArrowRight className="ml-2" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  )
}