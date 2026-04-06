import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AdminLayout } from './AdminLayout'
import api from '../../utils/api'

export default function AdminDashboard() {
  const [stats, setStats]   = useState(null)
  const [recent, setRecent] = useState({ recentRegistrations: [], recentAbstracts: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([api.get('/admin/stats'), api.get('/admin/recent')])
      .then(([s, r]) => { setStats(s.data.stats); setRecent(r.data) })
      .finally(() => setLoading(false))
  }, [])

  const statCards = stats ? [
    { label: 'Total Registrations', value: stats.registrations.total,     color: '#5883a3', icon: '📋' },
    { label: 'Confirmed',           value: stats.registrations.confirmed,  color: '#27ae60', icon: '✅' },
    { label: 'Pending',             value: stats.registrations.pending,    color: '#f39c12', icon: '⏳' },
    { label: 'Total Abstracts',     value: stats.abstracts.total,          color: '#8e44ad', icon: '📄' },
    { label: 'Accepted Abstracts',  value: stats.abstracts.accepted,       color: '#2e8b7a', icon: '🏆' },
    { label: 'Registered Users',    value: stats.users,                    color: '#2980b9', icon: '👥' },
    { label: 'Revenue Collected',   value: `₹${(stats.revenue||0).toLocaleString()}`, color: '#c9a84c', icon: '💰' },
    { label: 'New Messages',        value: stats.newMessages,              color: '#e74c3c', icon: '✉️' },
  ] : []

  const statusBadge = s => ({ confirmed:'badge-success', pending:'badge-warning', cancelled:'badge-danger' }[s] || 'badge-info')

  return (
    <AdminLayout title="Dashboard">
      {loading ? <div className="spinner"/> : (
        <>
          {/* Stat grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.2rem', marginBottom: '2.5rem' }}>
            {statCards.map(c => (
              <div key={c.label} style={{
                background: '#fff', border: '1px solid rgba(88,131,163,0.18)',
                borderRadius: 12, padding: '1.3rem', transition: 'all 0.3s',
                borderLeft: `4px solid ${c.color}`,
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{c.icon}</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', fontWeight: 700, color: c.color, lineHeight: 1 }}>{c.value}</div>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--txt-light)', marginTop: '0.3rem' }}>{c.label}</div>
              </div>
            ))}
          </div>

          {/* Category breakdown */}
          {stats?.categoryBreakdown?.length > 0 && (
            <div style={{ background: '#fff', border: '1px solid rgba(88,131,163,0.18)', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
              <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--card-box)', marginBottom: '1.2rem' }}>Registrations by Category</h3>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {stats.categoryBreakdown.map(c => (
                  <div key={c._id} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', fontWeight: 700, color: 'var(--card-box)' }}>{c.count}</div>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--txt-light)' }}>{c._id}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {/* Recent Registrations */}
            <div style={{ background: '#fff', border: '1px solid rgba(88,131,163,0.18)', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ background: 'var(--card-box)', color: '#fff', padding: '0.8rem 1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Recent Registrations</span>
                <Link to="/admin/registrations" style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>View All →</Link>
              </div>
              {recent.recentRegistrations.map(r => (
                <div key={r._id} style={{ padding: '0.9rem 1.2rem', borderBottom: '1px solid rgba(88,131,163,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--txt-dark)' }}>{r.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--txt-light)' }}>{r.registrationId} · {r.category}</div>
                  </div>
                  <span className={`badge ${statusBadge(r.status)}`}>{r.status}</span>
                </div>
              ))}
              {recent.recentRegistrations.length === 0 && <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--txt-light)', fontSize: '0.88rem' }}>No registrations yet</div>}
            </div>

            {/* Recent Abstracts */}
            <div style={{ background: '#fff', border: '1px solid rgba(88,131,163,0.18)', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ background: 'var(--card-box)', color: '#fff', padding: '0.8rem 1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Recent Abstracts</span>
                <Link to="/admin/abstracts" style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>View All →</Link>
              </div>
              {recent.recentAbstracts.map(a => (
                <div key={a._id} style={{ padding: '0.9rem 1.2rem', borderBottom: '1px solid rgba(88,131,163,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--txt-dark)', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--txt-light)' }}>{a.abstractId} · {a.category}</div>
                  </div>
                  <span className={`badge badge-${a.status === 'accepted' ? 'success' : a.status === 'rejected' ? 'danger' : 'warning'}`}>{a.status}</span>
                </div>
              ))}
              {recent.recentAbstracts.length === 0 && <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--txt-light)', fontSize: '0.88rem' }}>No abstracts yet</div>}
            </div>
          </div>

          {/* Quick links */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { to: '/admin/registrations', label: 'Manage Registrations' },
              { to: '/admin/abstracts',     label: 'Review Abstracts' },
              { to: '/admin/announcements', label: 'Post Announcement' },
              { to: '/admin/schedule',      label: 'Edit Schedule' },
            ].map(l => (
              <Link key={l.to} to={l.to} className="btn btn-secondary btn-sm">{l.label}</Link>
            ))}
          </div>
        </>
      )}
    </AdminLayout>
  )
}
