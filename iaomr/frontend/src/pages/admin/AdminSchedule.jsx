import { useEffect, useState } from 'react'
import { AdminLayout } from './AdminLayout'
import api from '../../utils/api'
import toast from 'react-hot-toast'

// ── SCHEDULE ADMIN ──
export function AdminSchedule() {
  const [schedule, setSchedule] = useState({})
  const [loading, setLoading]   = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ day:1, date:'', startTime:'', endTime:'', title:'', type:'session', speaker:'', venue:'', description:'', order:0 })

  const fetch = () => {
    setLoading(true)
    api.get('/schedule').then(r => setSchedule(r.data.data)).finally(() => setLoading(false))
  }
  useEffect(() => { fetch() }, [])

  const handleAdd = async e => {
    e.preventDefault()
    try {
      await api.post('/schedule', form)
      toast.success('Schedule item added')
      setShowForm(false)
      fetch()
    } catch { toast.error('Failed') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return
    try { await api.delete(`/schedule/${id}`); toast.success('Deleted'); fetch() }
    catch { toast.error('Delete failed') }
  }

  const f = (k,v) => setForm(p=>({...p,[k]:v}))

  return (
    <AdminLayout title="Manage Schedule">
      <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:'1.5rem' }}>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Add Session'}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ padding:'1.8rem', marginBottom:'2rem' }}>
          <h4 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--card-box)', marginBottom:'1.2rem' }}>New Schedule Item</h4>
          <form onSubmit={handleAdd}>
            <div className="form-grid-3">
              <div className="form-group">
                <label className="form-label">Day *</label>
                <select className="form-select" value={form.day} onChange={e=>f('day',Number(e.target.value))}>
                  <option value={1}>Day 1 – Pre-Convention (6 Aug)</option>
                  <option value={2}>Day 2 – Convention (7 Aug)</option>
                  <option value={3}>Day 3 – Convention (8 Aug)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Start Time *</label>
                <input className="form-input" value={form.startTime} onChange={e=>f('startTime',e.target.value)} placeholder="9:00 am" required/>
              </div>
              <div className="form-group">
                <label className="form-label">End Time</label>
                <input className="form-input" value={form.endTime} onChange={e=>f('endTime',e.target.value)} placeholder="10:00 am"/>
              </div>
            </div>
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Title *</label>
                <input className="form-input" value={form.title} onChange={e=>f('title',e.target.value)} required placeholder="Session / Lecture title"/>
              </div>
              <div className="form-group">
                <label className="form-label">Type</label>
                <select className="form-select" value={form.type} onChange={e=>f('type',e.target.value)}>
                  {['session','lecture','break','social','inauguration','valedictory','registration'].map(t=><option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Speaker</label>
                <input className="form-input" value={form.speaker} onChange={e=>f('speaker',e.target.value)} placeholder="Speaker name (optional)"/>
              </div>
              <div className="form-group">
                <label className="form-label">Order</label>
                <input className="form-input" type="number" value={form.order} onChange={e=>f('order',Number(e.target.value))} min={0}/>
              </div>
            </div>
            <button className="btn btn-primary" type="submit">Add Item</button>
          </form>
        </div>
      )}

      {loading ? <div className="spinner"/> : (
        [1,2,3].map(day => (
          <div key={day} style={{ marginBottom:'2rem' }}>
            <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:'0.85rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--card-box)', marginBottom:'0.75rem' }}>
              Day {day} — {['Pre-Convention (6 Aug)','Convention (7 Aug)','Convention (8 Aug)'][day-1]}
            </h3>
            {(schedule[day]||[]).length === 0 ? (
              <div style={{ padding:'1rem', background:'rgba(88,131,163,0.06)', borderRadius:8, fontSize:'0.85rem', color:'var(--txt-light)' }}>No items. Add above to populate from DB, or use default schedule on frontend.</div>
            ) : (
              <div className="table-wrapper card">
                <table>
                  <thead><tr><th>Time</th><th>Title</th><th>Type</th><th>Speaker</th><th>Delete</th></tr></thead>
                  <tbody>
                    {(schedule[day]||[]).map(item => (
                      <tr key={item._id}>
                        <td style={{ whiteSpace:'nowrap', fontFamily:"'Barlow Condensed',sans-serif", color:'var(--card-box)' }}>{item.startTime}{item.endTime?` – ${item.endTime}`:''}</td>
                        <td style={{ fontWeight:500 }}>{item.title}</td>
                        <td><span className="badge badge-primary">{item.type}</span></td>
                        <td style={{ fontSize:'0.82rem', color:'var(--txt-light)' }}>{item.speaker||'—'}</td>
                        <td><button className="btn btn-danger btn-sm" onClick={()=>handleDelete(item._id)}>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))
      )}
    </AdminLayout>
  )
}

// ── ANNOUNCEMENTS ADMIN ──
export function AdminAnnouncements() {
  const [list, setList]       = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ title:'', content:'', type:'general', isPinned:false })
  const [showForm, setShowForm] = useState(false)
  const f = (k,v) => setForm(p=>({...p,[k]:v}))

  const fetch = () => {
    setLoading(true)
    api.get('/announcements').then(r=>setList(r.data.data)).finally(()=>setLoading(false))
  }
  useEffect(() => { fetch() }, [])

  const handleAdd = async e => {
    e.preventDefault()
    try { await api.post('/announcements', form); toast.success('Announcement posted'); setShowForm(false); setForm({title:'',content:'',type:'general',isPinned:false}); fetch() }
    catch { toast.error('Failed') }
  }
  const handleToggle = async (id, isActive) => {
    try { await api.put(`/announcements/${id}`, { isActive: !isActive }); fetch() }
    catch { toast.error('Failed') }
  }
  const handleDelete = async id => {
    if (!confirm('Delete?')) return
    try { await api.delete(`/announcements/${id}`); toast.success('Deleted'); fetch() }
    catch { toast.error('Delete failed') }
  }
  const typeColor = { general:'badge-info', important:'badge-danger', deadline:'badge-gold', update:'badge-success' }

  return (
    <AdminLayout title="Announcements">
      <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:'1.5rem' }}>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ New Announcement'}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ padding:'1.8rem', marginBottom:'2rem' }}>
          <form onSubmit={handleAdd}>
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Title *</label>
                <input className="form-input" value={form.title} onChange={e=>f('title',e.target.value)} required placeholder="Announcement title"/>
              </div>
              <div className="form-group">
                <label className="form-label">Type</label>
                <select className="form-select" value={form.type} onChange={e=>f('type',e.target.value)}>
                  <option value="general">General</option>
                  <option value="important">Important</option>
                  <option value="deadline">Deadline</option>
                  <option value="update">Update</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Content *</label>
              <textarea className="form-textarea" rows={4} value={form.content} onChange={e=>f('content',e.target.value)} required placeholder="Announcement content…"/>
            </div>
            <label style={{ display:'flex', alignItems:'center', gap:'0.5rem', cursor:'pointer', marginBottom:'1rem', fontSize:'0.88rem', color:'var(--txt-dark)' }}>
              <input type="checkbox" checked={form.isPinned} onChange={e=>f('isPinned',e.target.checked)} style={{ width:16, height:16 }}/>
              Pin this announcement
            </label>
            <button className="btn btn-primary" type="submit">Post Announcement</button>
          </form>
        </div>
      )}

      {loading ? <div className="spinner"/> : (
        <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
          {list.length === 0 && <div style={{ textAlign:'center', padding:'3rem', color:'var(--txt-light)' }}>No announcements yet</div>}
          {list.map(a => (
            <div key={a._id} className="card" style={{ padding:'1.2rem', display:'flex', gap:'1rem', alignItems:'flex-start', borderLeft:`4px solid ${a.isPinned?'#c9a84c':'rgba(88,131,163,0.3)'}` }}>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', gap:'0.5rem', alignItems:'center', marginBottom:'0.4rem' }}>
                  <span className={`badge ${typeColor[a.type]||'badge-info'}`}>{a.type}</span>
                  {a.isPinned && <span className="badge badge-gold">📌 Pinned</span>}
                  {!a.isActive && <span className="badge badge-danger">Hidden</span>}
                </div>
                <div style={{ fontWeight:600, fontSize:'0.95rem', color:'var(--txt-dark)', marginBottom:'0.3rem' }}>{a.title}</div>
                <div style={{ fontSize:'0.85rem', color:'var(--txt-mid)', lineHeight:1.65 }}>{a.content}</div>
                <div style={{ fontSize:'0.72rem', color:'var(--txt-light)', marginTop:'0.4rem' }}>{new Date(a.createdAt).toLocaleString('en-IN')}</div>
              </div>
              <div style={{ display:'flex', gap:'0.5rem', flexShrink:0 }}>
                <button className="btn btn-outline btn-sm" onClick={() => handleToggle(a._id, a.isActive)}>
                  {a.isActive ? 'Hide' : 'Show'}
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(a._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}

// ── MESSAGES ADMIN ──
export function AdminMessages() {
  const [msgs, setMsgs]   = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  const fetch = () => {
    setLoading(true)
    api.get('/contact').then(r=>setMsgs(r.data.data)).finally(()=>setLoading(false))
  }
  useEffect(() => { fetch() }, [])

  const updateStatus = async (id, status) => {
    try { await api.put(`/contact/${id}/status`, { status }); fetch() }
    catch { toast.error('Failed') }
  }

  const statusBadge = s => ({ new:'badge-danger', read:'badge-info', replied:'badge-success' }[s]||'badge-info')

  return (
    <AdminLayout title="Contact Messages">
      {loading ? <div className="spinner"/> : (
        <>
          <div style={{ marginBottom:'1rem', fontSize:'0.85rem', color:'var(--txt-light)' }}>{msgs.length} message{msgs.length!==1?'s':''}</div>
          <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
            {msgs.length === 0 && <div style={{ textAlign:'center', padding:'3rem', color:'var(--txt-light)' }}>No messages yet</div>}
            {msgs.map(m => (
              <div key={m._id} className="card" style={{ padding:'1.2rem', cursor:'pointer', borderLeft:`4px solid ${m.status==='new'?'#e74c3c':'rgba(88,131,163,0.3)'}` }}
                onClick={() => { setSelected(m); updateStatus(m._id, m.status==='new'?'read':m.status) }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                  <div>
                    <div style={{ fontWeight:600, fontSize:'0.92rem', color:'var(--txt-dark)' }}>{m.name}</div>
                    <div style={{ fontSize:'0.78rem', color:'var(--txt-light)' }}>{m.email}{m.phone?` · ${m.phone}`:''}</div>
                    {m.subject && <div style={{ fontSize:'0.82rem', color:'var(--card-box)', marginTop:'0.2rem', fontWeight:500 }}>{m.subject}</div>}
                  </div>
                  <div style={{ display:'flex', gap:'0.5rem', alignItems:'center' }}>
                    <span className={`badge ${statusBadge(m.status)}`}>{m.status}</span>
                    <span style={{ fontSize:'0.72rem', color:'var(--txt-light)' }}>{new Date(m.createdAt).toLocaleDateString('en-IN')}</span>
                  </div>
                </div>
                <p style={{ fontSize:'0.85rem', color:'var(--txt-mid)', marginTop:'0.5rem', lineHeight:1.6, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>{m.message}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h3>Message from {selected.name}</h3>
              <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            </div>
            <div className="modal-body">
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', marginBottom:'1rem' }}>
                {[['From',selected.name],['Email',selected.email],['Phone',selected.phone||'—'],['Date',new Date(selected.createdAt).toLocaleString('en-IN')]].map(([k,v])=>(
                  <div key={k} style={{ background:'rgba(88,131,163,0.06)', borderRadius:6, padding:'0.6rem 0.8rem' }}>
                    <div style={{ fontSize:'0.68rem', fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--txt-light)', marginBottom:'0.2rem' }}>{k}</div>
                    <div style={{ fontSize:'0.88rem', color:'var(--txt-dark)' }}>{v}</div>
                  </div>
                ))}
              </div>
              {selected.subject && <div style={{ fontWeight:600, color:'var(--card-box)', marginBottom:'0.5rem' }}>{selected.subject}</div>}
              <p style={{ background:'rgba(88,131,163,0.05)', borderRadius:8, padding:'1rem', fontSize:'0.92rem', color:'var(--txt-dark)', lineHeight:1.8 }}>{selected.message}</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setSelected(null)}>Close</button>
              <button className="btn btn-success" onClick={() => { updateStatus(selected._id,'replied'); setSelected(null) }}>Mark Replied</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

// ── USERS ADMIN ──
export function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [total, setTotal]   = useState(0)

  const fetch = () => {
    setLoading(true)
    const params = new URLSearchParams({ limit:50 })
    if (search) params.set('search', search)
    api.get(`/admin/users?${params}`).then(r=>{ setUsers(r.data.data); setTotal(r.data.total) }).finally(()=>setLoading(false))
  }
  useEffect(() => { fetch() }, [search])

  const toggleRole = async (id, role) => {
    const newRole = role === 'admin' ? 'user' : 'admin'
    if (!confirm(`Change role to ${newRole}?`)) return
    try { await api.put(`/admin/users/${id}/role`, { role:newRole }); toast.success('Role updated'); fetch() }
    catch { toast.error('Failed') }
  }

  return (
    <AdminLayout title="Users">
      <div style={{ display:'flex', gap:'0.75rem', marginBottom:'1.5rem', alignItems:'center' }}>
        <input className="form-input" style={{ maxWidth:280 }} placeholder="Search name or email…" value={search} onChange={e=>setSearch(e.target.value)}/>
        <span style={{ marginLeft:'auto', fontSize:'0.85rem', color:'var(--txt-light)' }}>{total} user{total!==1?'s':''}</span>
      </div>

      {loading ? <div className="spinner"/> : (
        <div className="table-wrapper card">
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Institution</th><th>Role</th><th>Joined</th><th>Action</th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td style={{ fontWeight:500 }}>{u.name}</td>
                  <td style={{ fontSize:'0.82rem' }}>{u.email}</td>
                  <td style={{ fontSize:'0.82rem', color:'var(--txt-light)' }}>{u.phone||'—'}</td>
                  <td style={{ fontSize:'0.82rem', color:'var(--txt-mid)' }}>{u.institution||'—'}</td>
                  <td><span className={`badge ${u.role==='admin'?'badge-danger':'badge-primary'}`}>{u.role}</span></td>
                  <td style={{ fontSize:'0.78rem', color:'var(--txt-light)' }}>{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
                  <td>
                    <button className={`btn btn-sm ${u.role==='admin'?'btn-outline':'btn-secondary'}`} onClick={()=>toggleRole(u._id, u.role)}>
                      {u.role==='admin'?'Remove Admin':'Make Admin'}
                    </button>
                  </td>
                </tr>
              ))}
              {users.length===0 && <tr><td colSpan={7} style={{ textAlign:'center', padding:'2rem', color:'var(--txt-light)' }}>No users found</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  )
}

export default AdminSchedule
