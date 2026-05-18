import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, getDocs, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Users, Bell, Trash2, ShieldCheck, UserCheck, UserX, Activity, Database } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const StatCard = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
    <div className="flex items-center gap-4">
      <div className={`p-4 rounded-2xl ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className="text-2xl font-black text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

const QuickAction = ({ to, icon: Icon, label, description, color }: any) => (
  <NavLink
    to={to}
    className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-blue-500/30 transition-all group active:scale-[0.98]"
  >
    <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
      <Icon className="text-white w-6 h-6" />
    </div>
    <h3 className="font-bold text-gray-900 mb-1">{label}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
  </NavLink>
);

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    onlineUsers: 0,
    bannedUsers: 0,
    broadcasts: 0,
  });

  useEffect(() => {
    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      const allUsers = snapshot.docs.map(doc => doc.data());
      const onlineCount = allUsers.filter(u => u.status === 'online').length;
      const bannedCount = allUsers.filter(u => u.isBanned).length;
      
      setStats(prev => ({
        ...prev,
        totalUsers: snapshot.size,
        onlineUsers: onlineCount,
        bannedUsers: bannedCount,
      }));
    });

    const unsubscribeNotifications = onSnapshot(collection(db, 'system_notifications'), (snapshot) => {
      setStats(prev => ({ ...prev, broadcasts: snapshot.size }));
    });

    return () => {
      unsubscribeUsers();
      unsubscribeNotifications();
    };
  }, []);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Control Panel</h1>
        <p className="text-gray-500 mt-1">Global ecosystem overview & moderation</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard icon={Users} label="Total Users" value={stats.totalUsers} color="bg-blue-500" />
        <StatCard icon={Activity} label="Active Now" value={stats.onlineUsers} color="bg-green-500" />
        <StatCard icon={UserX} label="Banned" value={stats.bannedUsers} color="bg-red-500" />
        <StatCard icon={Bell} label="Broadcasts" value={stats.broadcasts} color="bg-orange-500" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickAction to="/users" icon={Users} label="User Moderation" description="Manage profiles, review reports, and toggle user access (Ban/Unban)." color="bg-blue-600" />
          <QuickAction to="/notifications" icon={Bell} label="Broadcast Alerts" description="Send real-time system notifications to all active Offly users instantly." color="bg-orange-500" />
          <QuickAction to="/cleanup" icon={Trash2} label="Storage Cleanup" description="Hard delete messages marked as cleared to optimize Firestore usage." color="bg-gray-800" />
        </div>
      </div>
      
      <div className="bg-blue-600 rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-black mb-4">Security First.</h2>
          <p className="text-blue-100 text-lg leading-relaxed mb-8">
            Your actions here affect the entire Offly network in real-time. Use moderation tools responsibly to maintain a safe and stable environment for all users.
          </p>
          <div className="flex flex-wrap gap-4">
             <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/10 uppercase font-black text-[10px] tracking-widest">
               <ShieldCheck className="w-4 h-4" />
               Validated Admin
             </div>
             <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/10 uppercase font-black text-[10px] tracking-widest">
               <Database className="w-4 h-4" />
               Cloud Sync Active
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
