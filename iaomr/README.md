# 24th National IAOMR PG Convention 2026
## Full-Stack MERN Application

> **Visakhapatnam · 6–8 August 2026**
> *"Imagine · Innovate · Illuminate"*

---

## 🏗️ Project Structure

```
iaomr/
├── backend/                  # Express.js API
│   ├── models/
│   │   ├── User.js           # User schema (delegates, admins)
│   │   ├── Registration.js   # Delegate registration schema
│   │   ├── Abstract.js       # Abstract submission schema
│   │   └── Schedule.js       # Schedule, Announcement, Contact schemas
│   ├── routes/
│   │   ├── auth.js           # Login, register, profile
│   │   ├── registrations.js  # Delegate registration CRUD
│   │   ├── abstracts.js      # Abstract submission & review
│   │   ├── schedule.js       # Convention schedule management
│   │   ├── announcements.js  # News & announcements
│   │   ├── contact.js        # Contact form messages
│   │   └── admin.js          # Admin stats & user management
│   ├── middleware/
│   │   └── auth.js           # JWT protect & adminOnly guards
│   ├── server.js             # Express app entry point
│   ├── seed.js               # DB seeder (admin + schedule data)
│   ├── .env.example          # Environment variable template
│   └── package.json
│
├── frontend/                 # React + Vite SPA
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx    # Responsive navbar with auth menu
│   │   │   └── Footer.jsx    # Footer with contacts & quick links
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Global auth state (React Context)
│   │   ├── utils/
│   │   │   └── api.js        # Axios instance with JWT interceptors
│   │   ├── pages/
│   │   │   ├── HomePage.jsx         # Hero + Countdown + Highlights
│   │   │   ├── AboutPage.jsx        # Convention & city info
│   │   │   ├── SchedulePage.jsx     # 3-day tabbed schedule
│   │   │   ├── CommitteePage.jsx    # Organizing committee
│   │   │   ├── VenuePage.jsx        # Venue + tourist attractions
│   │   │   ├── ContactPage.jsx      # Contact form + details
│   │   │   ├── LoginPage.jsx        # Auth login
│   │   │   ├── RegisterPage.jsx     # Account creation
│   │   │   ├── DashboardPage.jsx    # User dashboard
│   │   │   ├── RegistrationPage.jsx # 4-step delegate registration
│   │   │   ├── AbstractPage.jsx     # Abstract submission form
│   │   │   ├── MyRegistrationsPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── admin/
│   │   │       ├── AdminLayout.jsx       # Sidebar + layout
│   │   │       ├── AdminDashboard.jsx    # Stats, recent activity
│   │   │       ├── AdminRegistrations.jsx# View, search, verify payments
│   │   │       ├── AdminAbstracts.jsx    # Review & accept/reject
│   │   │       ├── AdminSchedule.jsx     # Add/delete schedule items
│   │   │       ├── AdminAnnouncements.jsx# Post & manage announcements
│   │   │       ├── AdminMessages.jsx     # Contact message inbox
│   │   │       └── AdminUsers.jsx        # User management, role toggle
│   │   ├── App.jsx           # Router + route guards
│   │   ├── index.css         # Global styles + CSS variables
│   │   └── main.jsx          # React entry point
│   ├── index.html
│   ├── vite.config.js        # Vite + proxy to backend
│   └── package.json
│
├── package.json              # Root: concurrently dev script
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)
- npm >= 9

### 1. Clone & Install
```bash
git clone <repo-url>
cd iaomr
npm run install:all
```

### 2. Configure Environment
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, email config
```

### 3. Seed the Database
```bash
cd iaomr          # project root
node backend/seed.js
```
This creates the admin account and populates the schedule.

### 4. Run Development Servers
```bash
# From project root — starts backend (port 5000) + frontend (port 5173)
npm run dev
```

### 5. Open in Browser
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api/health
- **Admin Panel:** http://localhost:5173/admin

---

## 🔐 Default Admin Credentials
```
Email:    admin@iaomr2026.com
Password: Admin@2026
```
> ⚠️ Change these in production via `.env`

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login, receive JWT |
| GET  | `/api/auth/me` | Get current user (protected) |
| PUT  | `/api/auth/profile` | Update profile (protected) |
| PUT  | `/api/auth/change-password` | Change password (protected) |

### Registrations
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/registrations` | Submit registration |
| GET  | `/api/registrations/my` | My registrations (protected) |
| GET  | `/api/registrations` | All registrations (admin) |
| PUT  | `/api/registrations/:id/verify` | Verify payment (admin) |
| GET  | `/api/registrations/pricing/info` | Current pricing & deadlines |

### Abstracts
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/abstracts` | Submit abstract |
| GET  | `/api/abstracts/my` | My abstracts (protected) |
| GET  | `/api/abstracts` | All abstracts (admin) |
| PUT  | `/api/abstracts/:id/review` | Review abstract (admin) |

### Schedule
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET  | `/api/schedule` | Get full schedule (grouped by day) |
| POST | `/api/schedule` | Add item (admin) |
| PUT  | `/api/schedule/:id` | Update item (admin) |
| DELETE | `/api/schedule/:id` | Delete item (admin) |

### Announcements
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET  | `/api/announcements` | Get active announcements |
| POST | `/api/announcements` | Create (admin) |
| PUT  | `/api/announcements/:id` | Update (admin) |
| DELETE | `/api/announcements/:id` | Delete (admin) |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit message |
| GET  | `/api/contact` | All messages (admin) |
| PUT  | `/api/contact/:id/status` | Update status (admin) |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Dashboard stats |
| GET | `/api/admin/recent` | Recent activity |
| GET | `/api/admin/users` | All users |
| PUT | `/api/admin/users/:id/role` | Toggle admin role |

---

## 💰 Registration Pricing (INR)

| Category | Early (≤15 Mar) | Regular (≤30 Apr) | Late (≤10 Jul) | Spot |
|----------|-----------------|-------------------|----------------|------|
| Student Delegate | ₹7,080 | ₹7,670 | ₹8,850 | ₹9,440 |
| Faculty Delegate | ₹7,670 | ₹8,260 | ₹9,440 | ₹10,030 |
| Accompanying Person | ₹4,720 | ₹5,310 | ₹6,490 | ₹6,490 |
| Foreign Delegate | $200 | $200 | $225 | $225 |

*All fares inclusive of GST*

---

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, React Router v6 |
| State | React Context API |
| HTTP Client | Axios |
| Styling | Pure CSS with CSS Variables (brochure palette) |
| Icons | React Icons (Feather) |
| Notifications | React Hot Toast |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Security | Helmet, CORS, express-rate-limit |
| Validation | express-validator |
| Dev Tools | Nodemon, Concurrently |

---

## 🛡️ Security Features
- JWT authentication with 7-day expiry
- Bcrypt password hashing (12 rounds)
- Rate limiting on all API routes (100 req/15min)
- Stricter rate limiting on auth routes (20 req/15min)
- Helmet.js security headers
- CORS restricted to frontend origin
- Input validation via express-validator
- Role-based access control (user / admin)

---

## 📦 Production Deployment

### Build Frontend
```bash
cd frontend && npm run build
```

### Serve with PM2
```bash
npm install -g pm2
cd backend
pm2 start server.js --name iaomr-api
```

### Environment Variables (Production)
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/iaomr
JWT_SECRET=<very-long-random-string>
CLIENT_URL=https://your-domain.com
```

---

## 📞 Contact

| Role | Name | Phone |
|------|------|-------|
| Organizing Chairman | Dr. B. Badari Ramakrishna | +91 9885426232 |
| Scientific Chairman | Dr. N. Rajesh | +91 9885067499 |
| Treasurer | Dr. K. V. Lokesh | +91 9885164196 |
| Organizing Secretary | Dr. V. Rahul Marshal | +91 9848720046 |

**Hosted by:** Dept. of Oral Medicine & Radiology, Anil Neerukonda Institute of Dental Sciences, Visakhapatnam
**Under the Aegis of:** Indian Academy of Oral Medicine & Radiology (IAOMR)
