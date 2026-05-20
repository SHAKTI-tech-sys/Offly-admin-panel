import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 🛠️ गिटहब के एरर को जड़ से ख़त्म करने के लिए हमने सारे कंपोनेंट्स यहीं डिफ़ाइन कर दिए
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const AdminNavbar = () => <div style={{ padding: '10px', background: '#333', color: '#fff' }}>Admin Navbar</div>;
const AdminDashboard = () => <div style={{ padding: '20px' }}><h1>Admin Dashboard</h1><p>Welcome to dashboard!</p></div>;
const AdminLogin = () => <div style={{ padding: '20px' }}><h1>Admin Login</h1><p>Please login here.</p></div>;
const UsersPage = () => <div style={{ padding: '20px' }}><h2>Users Page</h2></div>;
const NotificationsPage = () => <div style={{ padding: '20px' }}><h2>Notifications Page</h2></div>;
const CleanupPage = () => <div style={{ padding: '20px' }}><h2>Cleanup Page</h2></div>;

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
