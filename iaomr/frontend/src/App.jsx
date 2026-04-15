import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ScrollToTop } from "./components/ScrollToTop";

import RegistrationForm from './pages/REGISTER';


// Layout
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Public pages
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import SchedulePage from './pages/SchedulePage'
import CommitteePage from './pages/CommitteePage'
import VenuePage from './pages/VenuePage'
import ContactPage from './pages/ContactPage'
import ScientificPage from './pages/ScientificPage'

// Auth pages
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

// User pages
import DashboardPage from './pages/DashboardPage'
import RegistrationPage from './pages/RegistrationPage'
import AbstractPage from './pages/AbstractPage'
import MyRegistrationsPage from './pages/MyRegistrationsPage'
import ProfilePage from './pages/ProfilePage'

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminRegistrations from './pages/admin/AdminRegistrations'
import AdminAbstracts from './pages/admin/AdminAbstracts'
import AdminSchedule from './pages/admin/AdminSchedule'
import AdminAnnouncements from './pages/admin/AdminAnnouncements'
import AdminMessages from './pages/admin/AdminMessages'
import AdminUsers from './pages/admin/AdminUsers'

// Guards
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="page-loader"><div className="spinner" /></div>
  return user ? children : <Navigate to="/login" replace />
}
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="page-loader"><div className="spinner" /></div>
  return user?.role === 'admin' ? children : <Navigate to="/" replace />
}
const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="page-loader"><div className="spinner" /></div>
  return !user ? children : <Navigate to="/dashboard" replace />
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <div className="page-content">
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/scientific" element={<ScientificPage />} />
          <Route path="/committee" element={<CommitteePage />} />
          <Route path="/venue" element={<VenuePage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Auth */}
          <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
          {/* <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} /> */}

          {/* User */}
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/register-delegate" element={<RegistrationForm />} />
          <Route path="/submit-abstract" element={<PrivateRoute><AbstractPage /></PrivateRoute>} />
          <Route path="/my-registrations" element={<PrivateRoute><MyRegistrationsPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />

          {/* Admin */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/registrations" element={<AdminRoute><AdminRegistrations /></AdminRoute>} />
          <Route path="/admin/abstracts" element={<AdminRoute><AdminAbstracts /></AdminRoute>} />
          <Route path="/admin/schedule" element={<AdminRoute><AdminSchedule /></AdminRoute>} />
          {/* <Route path="/admin/announcements" element={<AdminRoute><AdminAnnouncements /></AdminRoute>} /> */}
          <Route path="/admin/messages" element={<AdminRoute><AdminMessages /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { fontFamily: "'Barlow', sans-serif", fontSize: '0.9rem' },
            success: { style: { borderLeft: '4px solid #27ae60' } },
            error: { style: { borderLeft: '4px solid #e74c3c' } },
          }}
        />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
