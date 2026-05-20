 import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminNavbar from './components/AdminNavbar';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import UsersPage from './pages/UsersPage';
import NotificationsPage from './pages/NotificationsPage';
import CleanupPage from './pages/CleanupPage';

// बाहर से फ़ाइल इम्पोर्ट करने के बजाय, हमने यहीं पर ProtectedRoute बना दिया ताकि एरर ख़त्म हो जाए
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('adminToken'); // या जो भी आपका टोकन का नाम है
  // अगर आप अभी टेस्टिंग के लिए बिना लॉगिन के सब देखना चाहते हैं, तो नीचे वाली लाइन को ऐसे ही रहने दें
  return <>{children}</>;
};

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
