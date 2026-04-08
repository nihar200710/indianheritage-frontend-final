import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RoleSelection from './pages/RoleSelection';
import HeritageExplore from './pages/HeritageExplore';
import Bookings from './pages/Bookings';
import DiscussForum from './pages/DiscussForum';

// Fix: Import UserManagement from pages
import UserManagement from './pages/UserManagement';

// Import the 4 Dashboards
import AdminDashboard from './pages/AdminDashboard';
import EnthusiastDashboard from './pages/EnthusiastDashboard';
import CreatorDashboard from './pages/CreatorDashboard';
import GuideDashboard from './pages/GuideDashboard';

// Import the 3 Admin Sub-Pages
import VerifyGuides from './pages/VerifyGuides';
import ApproveContent from './pages/ApproveContent';
import UserReports from './pages/UserReports';

import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route Component: Added safety checks to prevent 'toLowerCase' crash
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // 🛡️ Safe check: ensure role exists before calling toLowerCase
  const userRole = user.role ? user.role.toLowerCase() : "";

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return (
      <div className="container" style={{textAlign: 'center', marginTop: '50px'}}>
        <h2 style={{color: 'red'}}>Access Denied 🚫</h2>
        <p>You do not have permission to view this page.</p>
        <p>Your Role: <strong>{user.role || "Unknown"}</strong></p>
      </div>
    );
  }

  return children;
};

// 🏠 Smart Home Redirect: Prevents the landing page from crashing if session is empty
const HomeRedirect = () => {
  const { user } = useAuth();
  
  if (!user) return <Home />;
  
  // Safe role check
  const role = user.role ? user.role.toLowerCase() : "";
  
  switch(role) {
    case 'admin': return <Navigate to="/admin-dashboard" />;
    case 'creator': return <Navigate to="/creator-dashboard" />;
    case 'guide': return <Navigate to="/guide-dashboard" />;
    case 'enthusiast': return <Navigate to="/enthusiast-dashboard" />;
    default: return <Home />;
  }
};

const Navigation = () => {
  const { user, logout } = useAuth();
  return <Navbar user={user} logout={logout} />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
          
          <Navigation />
          
          <div style={{ flex: 1, width: '100%' }}>
            <Routes>
              {/* --- Public Routes --- */}
              <Route path="/" element={<HomeRedirect />} />
              <Route path="/roles" element={<RoleSelection />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* --- Admin Routes --- */}
              <Route path="/admin-dashboard" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/verify-guides" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <VerifyGuides />
                </ProtectedRoute>
              } />
              <Route path="/approve-content" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ApproveContent />
                </ProtectedRoute>
              } />
              <Route path="/user-reports" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <UserReports />
                </ProtectedRoute>
              } />
              <Route path="/admin/manage-users" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <UserManagement />
                </ProtectedRoute>
              } />

              {/* --- Enthusiast Routes --- */}
              <Route path="/enthusiast-dashboard" element={
                <ProtectedRoute allowedRoles={['enthusiast', 'admin']}>
                  <EnthusiastDashboard />
                </ProtectedRoute>
              } />
              <Route path="/bookings" element={
                <ProtectedRoute allowedRoles={['enthusiast', 'admin']}>
                  <Bookings />
                </ProtectedRoute>
              } />

              {/* --- Shared & Other Roles --- */}
              <Route path="/explore" element={
                <ProtectedRoute allowedRoles={['enthusiast', 'admin', 'guide', 'creator']}>
                  <HeritageExplore />
                </ProtectedRoute>
              } />
              <Route path="/forum" element={
                <ProtectedRoute allowedRoles={['enthusiast', 'admin', 'guide', 'creator']}>
                  <DiscussForum />
                </ProtectedRoute>
              } />
              <Route path="/creator-dashboard" element={
                <ProtectedRoute allowedRoles={['creator', 'admin']}>
                  <CreatorDashboard />
                </ProtectedRoute>
              } />
              <Route path="/guide-dashboard" element={
                <ProtectedRoute allowedRoles={['guide', 'admin']}>
                  <GuideDashboard />
                </ProtectedRoute>
              } />
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" />} />

            </Routes>
          </div>
          
          <footer style={{ textAlign: 'center', padding: '20px', background: '#eee', width: '100%' }}>
            &copy; 2026 Indian Heritage Project | FSAD-P05
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;