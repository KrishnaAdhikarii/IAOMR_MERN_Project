import { useEffect, useState } from 'react'
import { AdminLayout } from './AdminLayout'
import api from '../../utils/api'
import toast from 'react-hot-toast'

export default function AdminRegistrations() {
  const [data, setData]         = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')
  const [statusFilter, setStatus] = useState('')
  const [catFilter, setCat]     = useState('')
  const [page, setPage]         = useState(1)
  const [total, setTotal]       = useState(0)
  const [selected, setSelected] = useState(null)
  const [verifyStatus, setVerifyStatus] = useState('verified')
  const LIMIT = 15

  const fetchData = () => {
    setLoading(true)
    const params = new URLSearchParams({ page, limit: LIMIT })
    if (search) params.set('search', search)
    if (statusFilter) params.set('status', statusFilter)
    if (catFilter) params.set('category', catFilter)
    api.get(`/registrations?${params}`)
      .then(r => { setData(r.data.data); setTotal(r.data.total) })
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchData() }, [page, search, statusFilter, catFilter])

  const handleVerify = async (id) => {
    try {
      await api.put(`/registrations/${id}/verify`, { paymentStatus: verifyStatus })
      toast.success(`Registration ${verifyStatus}`)
      setSelected(null)
      fetchData()
    } catch { toast.error('Action failed') }
  }

  const statusBadge = s => ({ confirmed:'badge-success', pending:'badge-warning', cancelled:'badge-danger' }[s]||'badge-info')
  const payBadge    = s => ({ verified:'badge-success',  pending:'badge-warning', rejected:'badge-danger'  }[s]||'badge-info')

  return (
    <AdminLayout title="Registrations">
      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input className="form-input" style={{ maxWidth: 240 }} placeholder="Search name, email, ID…" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
        <select className="form-select" style={{ maxWidth: 160 }} value={statusFilter} onChange={e => { setStatus(e.target.value); setPage(1) }}>
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select className="form-select" style={{ maxWidth: 160 }} value={catFilter} onChange={e => { setCat(e.target.value); setPage(1) }}>
          <option value="">All Categories</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="accompanying">Accompanying</option>
          <option value="foreign">Foreign</option>
        </select>
        <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: 'var(--txt-light)' }}>
          {total} total registration{total !== 1 ? 's' : ''}
        </span>
      </div>

      {loading ? <div className="spinner"/> : (
        <>
          <div className="table-wrapper card">
            <table>
              <thead>
                <tr>
                  <th>Reg ID</th><th>Name</th><th>Email</th><th>Category</th>
                  <th>Amount</th><th>Txn ID</th><th>Payment</th><th>Status</th><th>Date</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map(r => (
                  <tr key={r._id}>
                    <td style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, color:'var(--card-box)' }}>{r.registrationId}</td>
                    <td style={{ fontWeight:500 }}><div>{r.name}</div><div style={{ fontSize:'0.75rem',color:'var(--txt-light)' }}>{r.institution}</div></td>
                    <td style={{ fontSize:'0.82rem' }}>{r.email}</td>
                    <td><span className="badge badge-primary">{r.category}</span></td>
                    <td style={{ fontWeight:600, color:'var(--card-box)' }}>₹{r.amount?.toLocaleString()}</td>
                    <td style={{ fontSize:'0.78rem', fontFamily:"'Barlow Condensed',sans-serif" }}>{r.transactionId||'—'}</td>
                    <td><span className={`badge ${payBadge(r.paymentStatus)}`}>{r.paymentStatus}</span></td>
                    <td><span className={`badge ${statusBadge(r.status)}`}>{r.status}</span></td>
                    <td style={{ fontSize:'0.78rem', color:'var(--txt-light)', whiteSpace:'nowrap' }}>{new Date(r.createdAt).toLocaleDateString('en-IN')}</td>
                    <td>
                      <button className="btn btn-outline btn-sm" onClick={() => setSelected(r)}>Review</button>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && <tr><td colSpan={10} style={{ textAlign:'center', padding:'2rem', color:'var(--txt-light)' }}>No records found</td></tr>}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {total > LIMIT && (
            <div style={{ display:'flex', justifyContent:'center', gap:'0.5rem', marginTop:'1.5rem' }}>
              <button className="btn btn-outline btn-sm" onClick={() => setPage(p=>p-1)} disabled={page===1}>← Prev</button>
              <span style={{ padding:'0.5rem 1rem', fontSize:'0.85rem', color:'var(--txt-mid)' }}>
                Page {page} of {Math.ceil(total/LIMIT)}
              </span>
              <button className="btn btn-outline btn-sm" onClick={() => setPage(p=>p+1)} disabled={page>=Math.ceil(total/LIMIT)}>Next →</button>
            </div>
          )}
        </>
      )}

      {/* Review Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" style={{ maxWidth: 580 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Review Registration</h3>
              <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {[
                  ['Reg ID', selected.registrationId],
                  ['Name', selected.name],
                  ['Email', selected.email],
                  ['Phone', selected.phone],
                  ['Category', selected.category],
                  ['Designation', selected.designation],
                  ['Institution', selected.institution],
                  ['City / State', `${selected.city}, ${selected.state}`],
                  ['Amount', `₹${selected.amount?.toLocaleString()}`],
                  ['Transaction ID', selected.transactionId || '—'],
                  ['Pre-Conference', selected.preConference ? 'Yes' : 'No'],
                  ['Dietary', selected.dietaryPreference],
                ].map(([k,v]) => (
                  <div key={k} style={{ background:'rgba(88,131,163,0.06)', borderRadius:6, padding:'0.6rem 0.8rem' }}>
                    <div style={{ fontSize:'0.7rem', fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--txt-light)', marginBottom:'0.2rem' }}>{k}</div>
                    <div style={{ fontSize:'0.88rem', fontWeight:500, color:'var(--txt-dark)' }}>{v}</div>
                  </div>
                ))}
              </div>
              <div className="form-group">
                <label className="form-label">Update Payment Status</label>
                <select className="form-select" value={verifyStatus} onChange={e => setVerifyStatus(e.target.value)}>
                  <option value="verified">Verified ✅</option>
                  <option value="pending">Keep Pending ⏳</option>
                  <option value="rejected">Reject ❌</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setSelected(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => handleVerify(selected._id)}>Save Status</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
