import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AdminNavbar from './components/AdminNavbar';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import UsersPage from './pages/UsersPage';
import NotificationsPage from './pages/NotificationsPage';
import CleanupPage from './pages/CleanupPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50 flex flex-col">
                <AdminNavbar />
                <main className="flex-1 overflow-y-auto">
                  <AdminDashboard />
                </main>
              </div>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/users" 
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50 flex flex-col">
                <AdminNavbar />
                <main className="flex-1 overflow-y-auto">
                  <UsersPage />
                </main>
              </div>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/notifications" 
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50 flex flex-col">
                <AdminNavbar />
                <main className="flex-1 overflow-y-auto">
                  <NotificationsPage />
                </main>
              </div>
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/cleanup" 
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50 flex flex-col">
                <AdminNavbar />
                <main className="flex-1 overflow-y-auto">
                  <CleanupPage />
                </main>
              </div>
            </ProtectedRoute>
          } 
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
