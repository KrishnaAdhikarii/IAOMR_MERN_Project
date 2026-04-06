import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import toast from 'react-hot-toast'

// ── DASHBOARD ──
export function DashboardPage() {
  const { user } = useAuth()
  const [regs, setRegs] = useState([])
  const [abs, setAbs]   = useState([])

  useEffect(() => {
    api.get('/registrations/my').then(r=>setRegs(r.data.data||[])).catch(()=>{})
    api.get('/abstracts/my').then(r=>setAbs(r.data.data||[])).catch(()=>{})
  }, [])

  const statusColor = s => ({ confirmed:'success', pending:'warning', cancelled:'danger' }[s] || 'info')

  return (
    <div className="light-section" style={{ minHeight:'100vh', padding:'3rem 0' }}>
      <div className="container">
        <div style={{ marginBottom:'2rem' }}>
          <span className="section-tag">My Account</span>
          <h1 className="section-title">Welcome, <em>{user?.name?.split(' ').slice(0,2).join(' ')}</em></h1>
          <div className="gold-rule"/>
        </div>

        {/* Stats */}
        <div className="grid-4" style={{ marginBottom:'2.5rem' }}>
          {[
            { num: regs.length,   label:'Registrations',    icon:'📋' },
            { num: regs.filter(r=>r.status==='confirmed').length, label:'Confirmed', icon:'✅' },
            { num: abs.length,    label:'Abstracts',        icon:'📄' },
            { num: abs.filter(a=>a.status==='accepted').length,   label:'Accepted',  icon:'🏆' },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <div style={{ fontSize:'1.8rem', marginBottom:'0.3rem' }}>{s.icon}</div>
              <div className="stat-number">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid-2" style={{ alignItems:'start', gap:'2rem' }}>
          {/* Recent registrations */}
          <div className="card" style={{ padding:0 }}>
            <div className="card-header" style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              My Registrations
              <Link to="/register-delegate" style={{ fontSize:'0.7rem', color:'rgba(255,255,255,0.8)', textDecoration:'none' }}>+ New</Link>
            </div>
            <div className="card-body">
              {regs.length === 0 ? (
                <div style={{ textAlign:'center', padding:'1.5rem', color:'var(--txt-light)', fontSize:'0.9rem' }}>
                  No registrations yet.<br/>
                  <Link to="/register-delegate" className="btn btn-primary btn-sm" style={{ marginTop:'0.8rem', display:'inline-flex' }}>Register Now</Link>
                </div>
              ) : regs.slice(0,3).map(r => (
                <div key={r._id} style={{ padding:'0.75rem 0', borderBottom:'1px solid rgba(88,131,163,0.1)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div>
                    <div style={{ fontSize:'0.88rem', fontWeight:600, color:'var(--txt-dark)' }}>{r.registrationId}</div>
                    <div style={{ fontSize:'0.75rem', color:'var(--txt-light)' }}>{r.category} · ₹{r.amount?.toLocaleString()}</div>
                  </div>
                  <span className={`badge badge-${statusColor(r.status)}`}>{r.status}</span>
                </div>
              ))}
              {regs.length > 0 && <Link to="/my-registrations" style={{ display:'block', textAlign:'center', padding:'0.6rem', fontSize:'0.82rem', color:'var(--card-box)' }}>View all →</Link>}
            </div>
          </div>

          {/* Quick actions */}
          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            {[
              { to:'/register-delegate', label:'Register as Delegate', icon:'📋', desc:'Submit your convention registration' },
              { to:'/submit-abstract',   label:'Submit Abstract',       icon:'📄', desc:'Submit paper/poster for presentation' },
              { to:'/schedule',          label:'View Schedule',         icon:'📅', desc:'Browse the full programme' },
              { to:'/venue',             label:'Venue & Tourism',       icon:'📍', desc:'Explore Visakhapatnam' },
            ].map(a => (
              <Link key={a.to} to={a.to} style={{ textDecoration:'none' }}>
                <div className="card" style={{ padding:'1.1rem', display:'flex', alignItems:'center', gap:'1rem' }}>
                  <span style={{ fontSize:'1.5rem' }}>{a.icon}</span>
                  <div>
                    <div style={{ fontWeight:600, fontSize:'0.9rem', color:'var(--txt-dark)' }}>{a.label}</div>
                    <div style={{ fontSize:'0.78rem', color:'var(--txt-light)' }}>{a.desc}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── MY REGISTRATIONS ──
export function MyRegistrationsPage() {
  const [regs, setRegs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/registrations/my')
      .then(r=>setRegs(r.data.data||[]))
      .finally(()=>setLoading(false))
  }, [])

  const statusBadge = s => ({ confirmed:'badge-success', pending:'badge-warning', cancelled:'badge-danger' }[s] || 'badge-info')
  const payBadge    = s => ({ verified:'badge-success',  pending:'badge-warning', rejected:'badge-danger'  }[s] || 'badge-info')

  return (
    <div className="light-section" style={{ minHeight:'100vh', padding:'3rem 0' }}>
      <div className="container">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'2rem' }}>
          <div>
            <span className="section-tag">My Account</span>
            <h1 className="section-title">My <em>Registrations</em></h1>
            <div className="gold-rule"/>
          </div>
          <Link to="/register-delegate" className="btn btn-primary">+ New Registration</Link>
        </div>
        {loading ? <div className="spinner"/> : regs.length === 0 ? (
          <div style={{ textAlign:'center', padding:'4rem', color:'var(--txt-light)' }}>
            <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>📋</div>
            <p>No registrations yet.</p>
            <Link to="/register-delegate" className="btn btn-primary" style={{ marginTop:'1rem' }}>Register Now</Link>
          </div>
        ) : (
          <div className="table-wrapper card">
            <table>
              <thead><tr>
                <th>Reg ID</th><th>Name</th><th>Category</th><th>Amount</th><th>Payment</th><th>Status</th><th>Date</th>
              </tr></thead>
              <tbody>
                {regs.map(r => (
                  <tr key={r._id}>
                    <td style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, color:'var(--card-box)' }}>{r.registrationId}</td>
                    <td style={{ fontWeight:500 }}>{r.name}</td>
                    <td><span className="badge badge-primary">{r.category}</span></td>
                    <td style={{ fontWeight:600, color:'var(--card-box)' }}>₹{r.amount?.toLocaleString()}</td>
                    <td><span className={`badge ${payBadge(r.paymentStatus)}`}>{r.paymentStatus}</span></td>
                    <td><span className={`badge ${statusBadge(r.status)}`}>{r.status}</span></td>
                    <td style={{ fontSize:'0.8rem', color:'var(--txt-light)' }}>{new Date(r.createdAt).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

// ── ABSTRACT SUBMISSION ──
export function AbstractPage() {
  const [form, setForm] = useState({
    presentingAuthor:'', institution:'', email:'', phone:'',
    title:'', category:'original_research', topic:'',
    keywords:'', abstract:'', presentationType:'paper',
    introduction:'', methodology:'', results:'', conclusion:'',
    awardCategory:'none',
  })
  const [loading, setLoading] = useState(false)
  const f = (k,v) => setForm(p=>({...p,[k]:v}))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = { ...form, keywords: form.keywords.split(',').map(k=>k.trim()).filter(Boolean) }
      await api.post('/abstracts', data)
      toast.success('Abstract submitted successfully!')
      setForm({ presentingAuthor:'', institution:'', email:'', phone:'', title:'', category:'original_research', topic:'', keywords:'', abstract:'', presentationType:'paper', introduction:'', methodology:'', results:'', conclusion:'', awardCategory:'none' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="light-section" style={{ minHeight:'100vh', padding:'3rem 0' }}>
      <div className="container" style={{ maxWidth:780 }}>
        <div className="section-head">
          <span className="section-tag">Academic Submissions</span>
          <h1 className="section-title">Submit <em>Abstract</em></h1>
          <div className="gold-rule"/>
        </div>
        <div className="card" style={{ padding:'2.5rem' }}>
          <form onSubmit={handleSubmit}>
            <h4 style={{ marginBottom:'1rem', color:'var(--card-box)' }}>Author Information</h4>
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Presenting Author *</label>
                <input className="form-input" value={form.presentingAuthor} onChange={e=>f('presentingAuthor',e.target.value)} required placeholder="Dr. Name"/>
              </div>
              <div className="form-group">
                <label className="form-label">Institution *</label>
                <input className="form-input" value={form.institution} onChange={e=>f('institution',e.target.value)} required placeholder="College / Hospital"/>
              </div>
            </div>
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input className="form-input" type="email" value={form.email} onChange={e=>f('email',e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Phone *</label>
                <input className="form-input" value={form.phone} onChange={e=>f('phone',e.target.value)} required />
              </div>
            </div>

            <h4 style={{ margin:'1.5rem 0 1rem', color:'var(--card-box)' }}>Abstract Details</h4>
            <div className="form-group">
              <label className="form-label">Title * (max 200 chars)</label>
              <input className="form-input" value={form.title} onChange={e=>f('title',e.target.value)} required maxLength={200} placeholder="Full title of your paper / poster"/>
            </div>
            <div className="form-grid-3">
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select className="form-select" value={form.category} onChange={e=>f('category',e.target.value)}>
                  <option value="original_research">Original Research</option>
                  <option value="case_report">Case Report</option>
                  <option value="review">Review Article</option>
                  <option value="poster">Poster</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Presentation Type</label>
                <select className="form-select" value={form.presentationType} onChange={e=>f('presentationType',e.target.value)}>
                  <option value="paper">Paper Presentation</option>
                  <option value="poster">Poster</option>
                  <option value="e-poster">E-Poster</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Award Category</label>
                <select className="form-select" value={form.awardCategory} onChange={e=>f('awardCategory',e.target.value)}>
                  <option value="none">No Award</option>
                  <option value="best_paper">Best Paper</option>
                  <option value="best_poster">Best Poster</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Topic / Theme</label>
              <input className="form-input" value={form.topic} onChange={e=>f('topic',e.target.value)} placeholder="e.g. Oral Cancer Screening, CBCT Applications"/>
            </div>
            <div className="form-group">
              <label className="form-label">Keywords (comma-separated)</label>
              <input className="form-input" value={form.keywords} onChange={e=>f('keywords',e.target.value)} placeholder="keyword1, keyword2, keyword3"/>
            </div>
            <div className="form-group">
              <label className="form-label">Abstract * (max 300 words)</label>
              <textarea className="form-textarea" value={form.abstract} onChange={e=>f('abstract',e.target.value)} required rows={5} maxLength={2000} placeholder="Structured abstract (max 300 words)..."/>
            </div>

            <h4 style={{ margin:'1.5rem 0 1rem', color:'var(--card-box)' }}>Full Sections (Optional)</h4>
            {[['introduction','Introduction'],['methodology','Methodology / Materials & Methods'],['results','Results'],['conclusion','Conclusion']].map(([k,l])=>(
              <div key={k} className="form-group">
                <label className="form-label">{l}</label>
                <textarea className="form-textarea" rows={3} value={form[k]} onChange={e=>f(k,e.target.value)} placeholder={`${l}...`}/>
              </div>
            ))}

            <button className="btn btn-primary" style={{ width:'100%', justifyContent:'center', marginTop:'0.5rem' }} disabled={loading}>
              {loading ? 'Submitting...' : '✓ Submit Abstract'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

// ── PROFILE ──
export function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [form, setForm] = useState({ name:'', phone:'', institution:'', designation:'' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) setForm({ name:user.name||'', phone:user.phone||'', institution:user.institution||'', designation:user.designation||'' })
  }, [user])

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateProfile(form)
      toast.success('Profile updated!')
    } catch { toast.error('Update failed') }
    finally { setLoading(false) }
  }

  return (
    <div className="light-section" style={{ minHeight:'100vh', padding:'3rem 0' }}>
      <div className="container" style={{ maxWidth:560 }}>
        <div className="section-head">
          <span className="section-tag">My Account</span>
          <h1 className="section-title">My <em>Profile</em></h1>
          <div className="gold-rule"/>
        </div>
        <div className="card" style={{ padding:'2.5rem' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))}/>
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" value={user?.email||''} disabled style={{ opacity:0.6, cursor:'not-allowed' }}/>
            </div>
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-input" value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))}/>
              </div>
              <div className="form-group">
                <label className="form-label">Designation</label>
                <input className="form-input" value={form.designation} onChange={e=>setForm(p=>({...p,designation:e.target.value}))}/>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Institution</label>
              <input className="form-input" value={form.institution} onChange={e=>setForm(p=>({...p,institution:e.target.value}))}/>
            </div>
            <button className="btn btn-primary" style={{ width:'100%', justifyContent:'center' }} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
