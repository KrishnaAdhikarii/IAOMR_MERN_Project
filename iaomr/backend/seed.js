/**
 * IAOMR Convention – Database Seed Script
 * Run: node backend/seed.js
 */
require('dotenv').config({ path: './backend/.env' })
const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/iaomr_convention')
  console.log('✅ Connected to MongoDB')

  // Models (inline to avoid circular deps)
  const UserSchema = new mongoose.Schema({
    name:{ type:String,required:true }, email:{ type:String,required:true,unique:true },
    password:{ type:String,required:true,select:false }, role:{ type:String,default:'user' },
    phone:String, institution:String, designation:String,
  },{ timestamps:true })
  UserSchema.pre('save', async function(next){ if(this.isModified('password')) this.password=await bcrypt.hash(this.password,12); next() })
  const User = mongoose.models.User || mongoose.model('User', UserSchema)

  const ScheduleSchema = new mongoose.Schema({
    day:Number, date:String, startTime:String, endTime:String,
    title:String, type:String, speaker:String, venue:String, description:String, order:Number,
  },{ timestamps:true })
  const Schedule = mongoose.models.Schedule || mongoose.model('Schedule', ScheduleSchema)

  const AnnSchema = new mongoose.Schema({
    title:String, content:String, type:{type:String,default:'general'},
    isActive:{type:Boolean,default:true}, isPinned:{type:Boolean,default:false},
  },{ timestamps:true })
  const Announcement = mongoose.models.Announcement || mongoose.model('Announcement', AnnSchema)

  // ── Create Admin User ──
  const existing = await User.findOne({ email: process.env.ADMIN_EMAIL || 'admin@iaomr2026.com' })
  if (!existing) {
    await User.create({
      name: 'IAOMR Admin',
      email: process.env.ADMIN_EMAIL || 'admin@iaomr2026.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@2026',
      role: 'admin',
      institution: 'ANIDS Visakhapatnam',
      designation: 'Admin',
    })
    console.log('✅ Admin user created:', process.env.ADMIN_EMAIL || 'admin@iaomr2026.com')
  } else {
    console.log('ℹ️  Admin already exists')
  }

  // ── Seed Schedule ──
  const count = await Schedule.countDocuments()
  if (count === 0) {
    const scheduleData = [
      // Day 1
      { day:1, date:'6th August 2026', startTime:'9:00 am',  endTime:'9:30 am',  title:'Inauguration of Pre-Conference Course', type:'inauguration', order:1 },
      { day:1, date:'6th August 2026', startTime:'9:30 am',  endTime:'1:00 pm',  title:'Pre-Conference Courses',                type:'session',      order:2 },
      { day:1, date:'6th August 2026', startTime:'1:00 pm',  endTime:'2:00 pm',  title:'Lunch',                                type:'break',        order:3 },
      { day:1, date:'6th August 2026', startTime:'2:00 pm',  endTime:'4:00 pm',  title:'Scientific Sessions',                  type:'session',      order:4 },
      // Day 2
      { day:2, date:'7th August 2026', startTime:'8:00 am',  endTime:'10:00 am', title:'Registration / Breakfast / Scientific Sessions', type:'registration', order:1 },
      { day:2, date:'7th August 2026', startTime:'10:00 am', endTime:'10:45 am', title:'Guest Lecture',                        type:'lecture',      order:2 },
      { day:2, date:'7th August 2026', startTime:'10:45 am', endTime:'11:30 am', title:'Keynote Lecture',                      type:'lecture',      order:3 },
      { day:2, date:'7th August 2026', startTime:'11:30 am', endTime:'12:30 pm', title:'Inauguration Ceremony',                type:'inauguration', order:4 },
      { day:2, date:'7th August 2026', startTime:'12:30 pm', endTime:'1:30 pm',  title:'Lunch',                               type:'break',        order:5 },
      { day:2, date:'7th August 2026', startTime:'1:30 pm',  endTime:'2:15 pm',  title:'Guest Lecture',                       type:'lecture',      order:6 },
      { day:2, date:'7th August 2026', startTime:'2:15 pm',  endTime:'5:30 pm',  title:'Scientific Sessions – Papers / Posters', type:'session',   order:7 },
      { day:2, date:'7th August 2026', startTime:'7:00 pm',  endTime:'',         title:'Gala Banquet',                        type:'social',       order:8 },
      // Day 3
      { day:3, date:'8th August 2026', startTime:'8:00 am',  endTime:'9:00 am',  title:'Breakfast / Scientific Sessions', type:'session',      order:1 },
      { day:3, date:'8th August 2026', startTime:'9:00 am',  endTime:'10:00 am', title:'Scientific Sessions – Papers / Posters', type:'session', order:2 },
      { day:3, date:'8th August 2026', startTime:'10:00 am', endTime:'10:45 am', title:'Guest Lecture',               type:'lecture',      order:3 },
      { day:3, date:'8th August 2026', startTime:'10:45 am', endTime:'11:30 am', title:'Guest Lecture',               type:'lecture',      order:4 },
      { day:3, date:'8th August 2026', startTime:'11:30 am', endTime:'11:45 am', title:'Tea Break',                   type:'break',        order:5 },
      { day:3, date:'8th August 2026', startTime:'11:45 am', endTime:'12:30 pm', title:'Guest Lecture',               type:'lecture',      order:6 },
      { day:3, date:'8th August 2026', startTime:'12:30 pm', endTime:'1:30 pm',  title:'Panel Discussion',            type:'session',      order:7 },
      { day:3, date:'8th August 2026', startTime:'1:30 pm',  endTime:'2:30 pm',  title:'Lunch',                      type:'break',        order:8 },
      { day:3, date:'8th August 2026', startTime:'2:30 pm',  endTime:'',         title:'Valedictory Ceremony',        type:'valedictory',  order:9 },
    ]
    await Schedule.insertMany(scheduleData)
    console.log(`✅ Seeded ${scheduleData.length} schedule items`)
  } else {
    console.log('ℹ️  Schedule already seeded')
  }

  // ── Seed Announcements ──
  const annCount = await Announcement.countDocuments()
  if (annCount === 0) {
    await Announcement.insertMany([
      { title:'Registration Open!', content:'Early bird registration for the 24th National IAOMR PG Convention 2026 is now open. Register before 15th March 2026 to avail early bird rates.', type:'important', isPinned:true },
      { title:'Abstract Submission Open', content:'Submit your papers and posters for the 24th IAOMR National PG Convention. Last date for submission will be announced shortly.', type:'general' },
      { title:'Early Bird Deadline – 15th March 2026', content:'Register before 15th March 2026 to avail the early bird registration rates. Don\'t miss out!', type:'deadline', isPinned:true },
    ])
    console.log('✅ Seeded announcements')
  } else {
    console.log('ℹ️  Announcements already seeded')
  }

  console.log('\n🎉 Seed complete!')
  console.log('─────────────────────────────')
  console.log('Admin Login:')
  console.log('  Email:    ', process.env.ADMIN_EMAIL || 'admin@iaomr2026.com')
  console.log('  Password: ', process.env.ADMIN_PASSWORD || 'Admin@2026')
  console.log('─────────────────────────────')

  await mongoose.disconnect()
  process.exit(0)
}

seed().catch(err => { console.error('Seed error:', err); process.exit(1) })
