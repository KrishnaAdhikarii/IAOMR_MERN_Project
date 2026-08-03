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
// import SubmitAbstractPage from './pages/AbstractSubmisssion'
import CommitteePage from './pages/CommitteePage'
import {
  SubmitAbstractPage,
  SubmitPosterPage,
  SubmitPPTPage
} from './components/SubmissionPage'

import VenuePage from './pages/VenuePage'
import ContactPage from './pages/ContactPage'
import OrganizingCommittee from './pages/Commitee'
import OfficeCommittee from './pages/IAOMROfficeBearers';
import ScientificPage from './pages/ScientificPage'


import Pagedown from './Pagedown.jsx'



import ScientificSession from './components/ScientificSession';

import AbstractPage from './pages/AbstractPage'


// Auth pages
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PaymentSuccess from "./pages/PaymentSuccess";


// User pages
import DashboardPage from './pages/DashboardPage'
import RegistrationIdStatus from "./pages/RegistrationIdStatus";
import AbstractStatus from "./pages/AbstractStatus";
import EditAbstract from "./pages/EditAbstract";

// import RegistrationPage from './pages/RegistrationPage'
import MyRegistrationsPage from './pages/MyRegistrationsPage'
import ProfilePage from './pages/ProfilePage'

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminRegistrations from './pages/admin/AdminRegistrations'
import AdminAbstracts from './pages/admin/AdminAbstracts'
// import AdminSchedule from './pages/admin/AdminSchedule'
import AdminTopicGroups from './pages/admin/AdminTopicGroups';
// import AdminAnnouncements from './pages/admin/AdminAnnouncements'
// import AdminMessages from './pages/admin/AdminMessages'
import AdminLogin from './pages/admin/AdminLogin'
// import AdminUsers from './pages/admin/AdminUsers'

// Guards
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="page-loader"><div className="spinner" /></div>
  return user ? children : <Navigate to="/login" replace />
}
// const AdminRoute = ({ children }) => {
//   const { user, loading } = useAuth()
//   console.log(user);
//   if (loading) return <div className="page-loader"><div className="spinner" /></div>
//   return user?.role === 'admin' ? children : <Navigate to="/" replace />
// }
const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="page-loader"><div className="spinner" /></div>
  return !user ? children : <Navigate to="/dashboard" replace />
}
const AdminRoute = ({ children }) => {

  const isAdmin =
    localStorage.getItem(
      "iaomr_admin"
    );

  return isAdmin === "true"
    ? children
    : <Navigate to="/admin-login" replace />;
};

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
          <Route path="/schedule" element={<ScientificSession />} />
          <Route path="/abstract" element={<SubmitAbstractPage />} />
          <Route path="/submit-poster" element={<SubmitPosterPage />} />
          <Route path="/submit-ppt" element={<SubmitPPTPage />} />
          <Route path="/scientific" element={<ScientificPage />} />
          <Route path="/committee" element={<CommitteePage />} />
          <Route path="/committee-details" element={<OrganizingCommittee />} />
          <Route path="/office-committee" element={<OfficeCommittee />} />
          <Route path="/venue" element={<VenuePage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* <Route path="/submit-abstract" element={<AbstractPage />} /> */}


          {/* Auth */}
          <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
          <Route path="/register-delegate" element={<Pagedown />} />
          <Route path="/payment-success/:regNumber" element={<PaymentSuccess />} />
          {/* <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} /> */}

          {/* User */}
          <Route
            path="/status/registration-id"
            element={<RegistrationIdStatus />}
          />
          <Route
            path="/status/abstract"
            element={<AbstractStatus />}
          />

          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/my-registrations" element={<PrivateRoute><MyRegistrationsPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />

          {/* Admin */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/registrations" element={<AdminRoute><AdminRegistrations /></AdminRoute>} />
          <Route
            path="/admin/abstracts"
            element={
              <AdminRoute>
                <AdminAbstracts />
              </AdminRoute>
            }/>   

            <Route path="/abstract/edit/:id" element={<EditAbstract />} />


            {/* <Route path="/admin/schedule" element={<AdminRoute><AdminSchedule /></AdminRoute>} /> */}
            <Route path="/admin/topic-groups" element={<AdminRoute><AdminTopicGroups /></AdminRoute>} />
          {/* <Route path="/admin/announcements" element={<AdminRoute><AdminAnnouncements /></AdminRoute>} /> */}
          {/* <Route path="/admin/messages" element={<AdminRoute><AdminMessages /></AdminRoute>} /> */}
          {/* <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} /> */}
          <Route path="/admin-login" element={<AdminLogin />} />

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
