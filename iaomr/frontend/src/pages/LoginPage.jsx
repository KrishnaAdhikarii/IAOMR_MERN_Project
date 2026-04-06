import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export function LoginPage() {
  const { login } = useAuth()
  const navigate   = useNavigate()
  const [form, setForm] = useState({ email:'', password:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await login(form.email, form.password)
      toast.success(`Welcome back, ${user.name.split(' ')[0]}!`)
      navigate(user.role === 'admin' ? '/admin' : '/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="light-section" style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem' }}>
      <div style={{ width:'100%', maxWidth:440 }}>
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2.2rem', fontWeight:800, color:'var(--card-box)' }}>Welcome Back</div>
          <p style={{ color:'var(--txt-mid)', fontSize:'0.9rem' }}>Sign in to your IAOMR 2026 account</p>
        </div>
        <div className="card" style={{ padding:'2.2rem' }}>
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" type="email" placeholder="your@email.com" value={form.email}
                onChange={e => setForm({...form, email:e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="••••••••" value={form.password}
                onChange={e => setForm({...form, password:e.target.value})} required />
            </div>
            <button className="btn btn-primary" style={{ width:'100%', justifyContent:'center' }} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p style={{ textAlign:'center', marginTop:'1.2rem', fontSize:'0.88rem', color:'var(--txt-mid)' }}>
            Don't have an account? <Link to="/register" style={{ color:'var(--card-box)', fontWeight:600 }}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export function RegisterPage() {
  const { register } = useAuth()
  const navigate      = useNavigate()
  const [form, setForm] = useState({ name:'', email:'', password:'', confirmPassword:'', phone:'', institution:'', designation:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return }
    setLoading(true)
    try {
      await register(form)
      toast.success('Account created successfully!')
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const f = (k, v) => setForm({...form, [k]:v})

  return (
    <div className="light-section" style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem' }}>
      <div style={{ width:'100%', maxWidth:560 }}>
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2.2rem', fontWeight:700, color:'var(--card-box)' }}>Create Account</div>
          <p style={{ color:'var(--txt-mid)', fontSize:'0.9rem' }}>Join IAOMR 2026 – Visakhapatnam</p>
        </div>
        <div className="card" style={{ padding:'2.2rem' }}>
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input className="form-input" placeholder="Dr. Your Name" value={form.name} onChange={e=>f('name',e.target.value)} required />
            </div>
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input className="form-input" type="email" placeholder="email@example.com" value={form.email} onChange={e=>f('email',e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-input" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e=>f('phone',e.target.value)} />
              </div>
            </div>
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Institution</label>
                <input className="form-input" placeholder="Your college / hospital" value={form.institution} onChange={e=>f('institution',e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Designation</label>
                <input className="form-input" placeholder="PG Student / Faculty" value={form.designation} onChange={e=>f('designation',e.target.value)} />
              </div>
            </div>
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Password *</label>
                <input className="form-input" type="password" placeholder="Min 6 characters" value={form.password} onChange={e=>f('password',e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password *</label>
                <input className="form-input" type="password" placeholder="Repeat password" value={form.confirmPassword} onChange={e=>f('confirmPassword',e.target.value)} required />
              </div>
            </div>
            <button className="btn btn-primary" style={{ width:'100%', justifyContent:'center', marginTop:'0.5rem' }} disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <p style={{ textAlign:'center', marginTop:'1.2rem', fontSize:'0.88rem', color:'var(--txt-mid)' }}>
            Already have an account? <Link to="/login" style={{ color:'var(--card-box)', fontWeight:600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
