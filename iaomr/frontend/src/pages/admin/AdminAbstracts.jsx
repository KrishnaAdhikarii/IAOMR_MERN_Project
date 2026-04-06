import { useEffect, useState } from 'react'
import { AdminLayout } from './AdminLayout'
import api from '../../utils/api'
import toast from 'react-hot-toast'

export default function AdminAbstracts() {
  const [data, setData]       = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [statusFilter, setStatus] = useState('')
  const [review, setReview]   = useState({ status: 'accepted', reviewComments: '', awardCategory: 'none' })

  const fetch = () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (statusFilter) params.set('status', statusFilter)
    api.get(`/abstracts?${params}`)
      .then(r => setData(r.data.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetch() }, [statusFilter])

  const openReview = (abs) => {
    setSelected(abs)
    setReview({ status: abs.status === 'submitted' ? 'accepted' : abs.status, reviewComments: abs.reviewComments || '', awardCategory: abs.awardCategory || 'none' })
  }

  const handleReview = async () => {
    try {
      await api.put(`/abstracts/${selected._id}/review`, review)
      toast.success('Abstract review saved')
      setSelected(null)
      fetch()
    } catch { toast.error('Review failed') }
  }

  const statusColor = { submitted:'badge-info', under_review:'badge-warning', accepted:'badge-success', rejected:'badge-danger', revision:'badge-gold' }

  return (
    <AdminLayout title="Abstract Submissions">
      <div style={{ display:'flex', gap:'0.75rem', marginBottom:'1.5rem', alignItems:'center' }}>
        <select className="form-select" style={{ maxWidth:180 }} value={statusFilter} onChange={e => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="submitted">Submitted</option>
          <option value="under_review">Under Review</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="revision">Needs Revision</option>
        </select>
        <span style={{ marginLeft:'auto', fontSize:'0.85rem', color:'var(--txt-light)' }}>{data.length} abstract{data.length!==1?'s':''}</span>
      </div>

      {loading ? <div className="spinner"/> : (
        <div className="table-wrapper card">
          <table>
            <thead>
              <tr><th>ID</th><th>Title</th><th>Author</th><th>Category</th><th>Type</th><th>Award</th><th>Status</th><th>Date</th><th>Action</th></tr>
            </thead>
            <tbody>
              {data.map(a => (
                <tr key={a._id}>
                  <td style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, color:'var(--card-box)', whiteSpace:'nowrap' }}>{a.abstractId}</td>
                  <td style={{ maxWidth:200 }}><div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontSize:'0.88rem', fontWeight:500 }} title={a.title}>{a.title}</div></td>
                  <td style={{ fontSize:'0.82rem' }}><div>{a.presentingAuthor}</div><div style={{ color:'var(--txt-light)', fontSize:'0.75rem' }}>{a.institution}</div></td>
                  <td><span className="badge badge-primary">{a.category?.replace('_',' ')}</span></td>
                  <td style={{ fontSize:'0.8rem', color:'var(--txt-mid)' }}>{a.presentationType}</td>
                  <td>{a.awardCategory!=='none' && <span className="badge badge-gold">{a.awardCategory?.replace('_',' ')}</span>}</td>
                  <td><span className={`badge ${statusColor[a.status]||'badge-info'}`}>{a.status?.replace('_',' ')}</span></td>
                  <td style={{ fontSize:'0.78rem', color:'var(--txt-light)' }}>{new Date(a.createdAt).toLocaleDateString('en-IN')}</td>
                  <td><button className="btn btn-outline btn-sm" onClick={() => openReview(a)}>Review</button></td>
                </tr>
              ))}
              {data.length===0 && <tr><td colSpan={9} style={{ textAlign:'center', padding:'2rem', color:'var(--txt-light)' }}>No abstracts found</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* Review Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" style={{ maxWidth:640 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Review Abstract</h3>
              <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            </div>
            <div className="modal-body">
              <div style={{ background:'rgba(88,131,163,0.07)', borderRadius:8, padding:'1rem', marginBottom:'1.2rem' }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'0.7rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--txt-light)', marginBottom:'0.3rem' }}>{selected.abstractId} · {selected.category}</div>
                <div style={{ fontWeight:700, color:'var(--txt-dark)', marginBottom:'0.4rem' }}>{selected.title}</div>
                <div style={{ fontSize:'0.82rem', color:'var(--txt-mid)' }}>By {selected.presentingAuthor}, {selected.institution}</div>
              </div>
              <div style={{ marginBottom:'1rem' }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'0.72rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--card-box)', marginBottom:'0.4rem' }}>Abstract</div>
                <p style={{ fontSize:'0.88rem', color:'var(--txt-dark)', lineHeight:1.75, background:'rgba(88,131,163,0.05)', borderRadius:6, padding:'0.8rem' }}>{selected.abstract}</p>
              </div>
              <div className="form-grid-3" style={{ marginBottom:'1rem' }}>
                <div className="form-group">
                  <label className="form-label">Decision</label>
                  <select className="form-select" value={review.status} onChange={e => setReview(p=>({...p, status:e.target.value}))}>
                    <option value="accepted">Accept ✅</option>
                    <option value="rejected">Reject ❌</option>
                    <option value="revision">Needs Revision</option>
                    <option value="under_review">Under Review</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Award</label>
                  <select className="form-select" value={review.awardCategory} onChange={e => setReview(p=>({...p, awardCategory:e.target.value}))}>
                    <option value="none">None</option>
                    <option value="best_paper">Best Paper</option>
                    <option value="best_poster">Best Poster</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Presentation</label>
                  <div style={{ padding:'0.7rem', fontSize:'0.88rem', color:'var(--txt-mid)' }}>{selected.presentationType}</div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Review Comments</label>
                <textarea className="form-textarea" rows={4} value={review.reviewComments} onChange={e => setReview(p=>({...p, reviewComments:e.target.value}))} placeholder="Comments for the author (optional)…"/>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setSelected(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleReview}>Save Review</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
