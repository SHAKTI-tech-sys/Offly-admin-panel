import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { Lock, AlertCircle, Chrome } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const stateError = (location.state as any)?.error;

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.code === 'auth/operation-not-allowed') {
        setError('Login method not enabled. Please use Google Login or enable Email/Password in Firebase Console.');
      } else {
        setError(err.message || 'Authentication failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-slate-900">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
            <Lock className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Offly Admin</h1>
          <p className="text-gray-500 text-sm mt-1">Authorized personnel only</p>
        </div>

        {(error || stateError) && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error || stateError}</p>
          </div>
        )}

        <div className="space-y-6">
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 mb-4">
            <p className="text-xs text-blue-700 leading-relaxed font-medium">
              Note: Login is only permitted for users with the <span className="font-bold">admin</span> role in Firestore. 
              If you haven't set up an admin user yet, you must manually add the <span className="font-bold">role: "admin"</span> field to your user document in the Firebase Console.
            </p>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-50 border-2 border-gray-100 flex items-center justify-center gap-3 shadow-sm"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></span>
            ) : (
              <Chrome className="w-5 h-5 text-red-500" />
            )}
            {loading ? 'Authenticating...' : 'Sign In with Google'}
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase font-black text-gray-300 tracking-widest bg-white px-4">
               Secure Access
            </div>
          </div>
          
          <p className="text-center text-[10px] uppercase font-black text-gray-400 tracking-widest">
            Offly Ecosystem Moderation Toolkit
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
