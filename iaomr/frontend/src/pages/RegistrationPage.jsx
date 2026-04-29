// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import api from '../utils/api'
// import toast from 'react-hot-toast'

// const PRICING = {
//   student:      { early:7080, regular:7670, late:8850, spot:9440 },
//   faculty:      { early:7670, regular:8260, late:9440, spot:10030 },
//   accompanying: { early:4720, regular:5310, late:6490, spot:6490 },
//   foreign:      { early:200,  regular:200,  late:225,  spot:225 },
// }
// const getType = () => {
//   const now = new Date()
//   if (now <= new Date('2026-03-15')) return 'early'
//   if (now <= new Date('2026-04-30')) return 'regular'
//   if (now <= new Date('2026-07-10')) return 'late'
//   return 'spot'
// }

// export default function RegistrationPage() {
//   const navigate = useNavigate()
//   const regType  = getType()
//   const [step, setStep]     = useState(1)
//   const [loading, setLoading] = useState(false)
//   const [form, setForm] = useState({
//     title:'Dr.', name:'', email:'', phone:'',
//     designation:'', institution:'', city:'', state:'',
//     iaomrMemberId:'', category:'student',
//     paymentMethod:'upi', transactionId:'',
//     preConference:false, accommodation:false,
//     dietaryPreference:'veg', remarks:'',
//   })

//   const f = (k,v) => setForm(p => ({...p,[k]:v}))
//   const price = PRICING[form.category]?.[regType] || 0
//   const currency = form.category === 'foreign' ? '$' : '₹'

//   const handleSubmit = async () => {
//     setLoading(true)
//     try {
//       const res = await api.post('/registrations', form)
//       toast.success('Registration submitted successfully!')
//       navigate('/my-registrations')
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Submission failed')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const steps = ['Personal Info', 'Professional Info', 'Payment', 'Review']

//   return (
//     <div className="light-section" style={{ minHeight:'100vh', padding:'3rem 0' }}>
//       <div className="container" style={{ maxWidth:780 }}>
//         <div className="section-head" style={{ textAlign:'center' }}>
//           <span className="section-tag">Convention 2026</span>
//           <h1 className="section-title">Delegate <em>Registration</em></h1>
//           <div className="gold-rule" style={{ margin:'0 auto 1rem' }}/>
//         </div>

//         {/* Step indicator */}
//         <div style={{ display:'flex', alignItems:'center', marginBottom:'2.5rem', justifyContent:'center' }}>
//           {steps.map((s,i) => (
//             <div key={s} style={{ display:'flex', alignItems:'center' }}>
//               <div style={{
//                 width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
//                 background: i+1 <= step ? 'var(--card-box)' : 'rgba(88,131,163,0.15)',
//                 color: i+1 <= step ? '#fff' : 'var(--txt-mid)',
//                 fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:'0.85rem',
//                 border: i+1 === step ? '2px solid var(--gold)' : 'none',
//                 transition:'all 0.3s',
//               }}>{i+1}</div>
//               <div style={{ marginLeft:'0.4rem', fontSize:'0.78rem', fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:'0.1em', textTransform:'uppercase', color: i+1 === step ? 'var(--card-box)' : 'var(--txt-light)' }}>{s}</div>
//               {i < steps.length-1 && <div style={{ width:40, height:2, background:'rgba(88,131,163,0.25)', margin:'0 0.6rem' }}/>}
//             </div>
//           ))}
//         </div>

//         <div className="card" style={{ padding:'2.5rem' }}>

//           {/* Step 1 – Personal */}
//           {step === 1 && (
//             <div className="fade-up">
//               <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--card-box)', marginBottom:'1.5rem', fontSize:'1rem' }}>Personal Information</h3>
//               <div style={{ display:'flex', gap:'1rem', marginBottom:'1rem' }}>
//                 <div className="form-group" style={{ minWidth:100 }}>
//                   <label className="form-label">Title</label>
//                   <select className="form-select" value={form.title} onChange={e=>f('title',e.target.value)}>
//                     {['Dr.','Prof.','Mr.','Ms.','Mrs.'].map(t=><option key={t}>{t}</option>)}
//                   </select>
//                 </div>
//                 <div className="form-group" style={{ flex:1 }}>
//                   <label className="form-label">Full Name *</label>
//                   <input className="form-input" value={form.name} onChange={e=>f('name',e.target.value)} placeholder="Your full name" required />
//                 </div>
//               </div>
//               <div className="form-grid-2">
//                 <div className="form-group">
//                   <label className="form-label">Email *</label>
//                   <input className="form-input" type="email" value={form.email} onChange={e=>f('email',e.target.value)} placeholder="email@example.com" />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Phone *</label>
//                   <input className="form-input" value={form.phone} onChange={e=>f('phone',e.target.value)} placeholder="+91 XXXXX XXXXX" />
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Delegate Category *</label>
//                 <select className="form-select" value={form.category} onChange={e=>f('category',e.target.value)}>
//                   <option value="student">Student Delegate (PG / Intern)</option>
//                   <option value="faculty">Faculty Delegate</option>
//                   <option value="accompanying">Accompanying Person</option>
//                   <option value="foreign">Foreign Delegate</option>
//                 </select>
//               </div>
//               <div style={{ background:'rgba(88,131,163,0.1)', borderRadius:8, padding:'1rem', marginTop:'0.5rem', border:'1px solid rgba(88,131,163,0.2)' }}>
//                 <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'0.72rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--card-box)', marginBottom:'0.3rem' }}>Registration Fee ({regType.toUpperCase()} rate)</div>
//                 <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2rem', fontWeight:700, color:'var(--card-box)' }}>{currency}{price.toLocaleString()}</div>
//                 <div style={{ fontSize:'0.78rem', color:'var(--txt-light)' }}>Inclusive of GST · Includes 2 breakfasts, 2 lunches, gala banquet, kit & certificate</div>
//               </div>
//             </div>
//           )}

//           {/* Step 2 – Professional */}
//           {step === 2 && (
//             <div className="fade-up">
//               <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--card-box)', marginBottom:'1.5rem', fontSize:'1rem' }}>Professional Information</h3>
//               <div className="form-grid-2">
//                 <div className="form-group">
//                   <label className="form-label">Designation *</label>
//                   <input className="form-input" value={form.designation} onChange={e=>f('designation',e.target.value)} placeholder="PG Student / Professor" />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">IAOMR Member ID</label>
//                   <input className="form-input" value={form.iaomrMemberId} onChange={e=>f('iaomrMemberId',e.target.value)} placeholder="If member" />
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Institution / Hospital *</label>
//                 <input className="form-input" value={form.institution} onChange={e=>f('institution',e.target.value)} placeholder="Full name of institution" />
//               </div>
//               <div className="form-grid-2">
//                 <div className="form-group">
//                   <label className="form-label">City *</label>
//                   <input className="form-input" value={form.city} onChange={e=>f('city',e.target.value)} placeholder="City" />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">State *</label>
//                   <input className="form-input" value={form.state} onChange={e=>f('state',e.target.value)} placeholder="State" />
//                 </div>
//               </div>
//               <div className="form-grid-2">
//                 <div className="form-group">
//                   <label className="form-label">Dietary Preference</label>
//                   <select className="form-select" value={form.dietaryPreference} onChange={e=>f('dietaryPreference',e.target.value)}>
//                     <option value="veg">Vegetarian</option>
//                     <option value="non-veg">Non-Vegetarian</option>
//                     <option value="vegan">Vegan</option>
//                     <option value="jain">Jain</option>
//                   </select>
//                 </div>
//                 <div className="form-group" style={{ display:'flex', flexDirection:'column', justifyContent:'flex-end', gap:'0.6rem' }}>
//                   <label style={{ display:'flex', alignItems:'center', gap:'0.5rem', cursor:'pointer', fontSize:'0.88rem', color:'var(--txt-dark)' }}>
//                     <input type="checkbox" checked={form.preConference} onChange={e=>f('preConference',e.target.checked)} style={{ width:16, height:16 }}/>
//                     Pre-Convention Course (6th Aug)
//                   </label>
//                   <label style={{ display:'flex', alignItems:'center', gap:'0.5rem', cursor:'pointer', fontSize:'0.88rem', color:'var(--txt-dark)' }}>
//                     <input type="checkbox" checked={form.accommodation} onChange={e=>f('accommodation',e.target.checked)} style={{ width:16, height:16 }}/>
//                     Need Accommodation Help
//                   </label>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 3 – Payment */}
//           {step === 3 && (
//             <div className="fade-up">
//               <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--card-box)', marginBottom:'1.5rem', fontSize:'1rem' }}>Payment Details</h3>
//               <div style={{ background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.3)', borderRadius:8, padding:'1.2rem', marginBottom:'1.5rem' }}>
//                 <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'0.72rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'0.5rem' }}>Amount to Pay</div>
//                 <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2.5rem', fontWeight:700, color:'var(--card-box)' }}>{currency}{price.toLocaleString()}</div>
//                 <div style={{ fontSize:'0.8rem', color:'var(--txt-mid)', marginTop:'0.5rem' }}>
//                   <strong>Bank:</strong> Punjab National Bank &nbsp;|&nbsp;
//                   <strong>A/C:</strong> 2144102100000733 &nbsp;|&nbsp;
//                   <strong>IFSC:</strong> PUNB0214410
//                 </div>
//                 <div style={{ fontSize:'0.8rem', color:'var(--txt-mid)' }}>
//                   <strong>Beneficiary:</strong> 24th National IAOMR PG Convention 2026 – Visakhapatnam
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Payment Method</label>
//                 <select className="form-select" value={form.paymentMethod} onChange={e=>f('paymentMethod',e.target.value)}>
//                   <option value="upi">UPI (BHIM / PhonePe / Google Pay)</option>
//                   <option value="neft">NEFT</option>
//                   <option value="internet_banking">Internet Banking</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Transaction ID / UTR Number *</label>
//                 <input className="form-input" value={form.transactionId} onChange={e=>f('transactionId',e.target.value)} placeholder="Enter your transaction reference number" />
//                 <div style={{ fontSize:'0.75rem', color:'var(--txt-light)', marginTop:'0.3rem' }}>Complete payment first, then enter the transaction ID here</div>
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Any Remarks</label>
//                 <textarea className="form-textarea" value={form.remarks} onChange={e=>f('remarks',e.target.value)} placeholder="Optional remarks..." rows={3}/>
//               </div>
//             </div>
//           )}

//           {/* Step 4 – Review */}
//           {step === 4 && (
//             <div className="fade-up">
//               <h3 style={{ fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--card-box)', marginBottom:'1.5rem', fontSize:'1rem' }}>Review & Submit</h3>
//               {[
//                 ['Name', `${form.title} ${form.name}`],
//                 ['Email', form.email],
//                 ['Phone', form.phone],
//                 ['Category', form.category],
//                 ['Institution', form.institution],
//                 ['City / State', `${form.city}, ${form.state}`],
//                 ['Payment Method', form.paymentMethod],
//                 ['Transaction ID', form.transactionId],
//                 ['Amount', `${currency}${price.toLocaleString()}`],
//                 ['Pre-Convention Course', form.preConference ? 'Yes' : 'No'],
//                 ['Dietary Preference', form.dietaryPreference],
//               ].map(([k,v]) => (
//                 <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'0.6rem 0', borderBottom:'1px solid rgba(88,131,163,0.1)', fontSize:'0.88rem' }}>
//                   <span style={{ color:'var(--txt-mid)', fontWeight:600, minWidth:160 }}>{k}</span>
//                   <span style={{ color:'var(--txt-dark)', textAlign:'right' }}>{v || '–'}</span>
//                 </div>
//               ))}
//               <div className="alert alert-info" style={{ marginTop:'1.2rem' }}>
//                 Your registration will be confirmed after payment verification by the organizing team.
//               </div>
//             </div>
//           )}

//           {/* Navigation buttons */}
//           <div style={{ display:'flex', justifyContent:'space-between', marginTop:'2rem' }}>
//             <button className="btn btn-outline" onClick={() => setStep(s=>s-1)} style={{ visibility: step===1?'hidden':'visible' }}>
//               ← Previous
//             </button>
//             {step < 4 ? (
//               <button className="btn btn-secondary" onClick={() => setStep(s=>s+1)}>
//                 Next →
//               </button>
//             ) : (
//               <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
//                 {loading ? 'Submitting...' : '✓ Submit Registration'}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
