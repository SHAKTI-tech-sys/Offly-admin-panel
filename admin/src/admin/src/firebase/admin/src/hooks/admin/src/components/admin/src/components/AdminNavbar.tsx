import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { Users, Bell, Shield, LayoutDashboard, LogOut, Trash2 } from 'lucide-react';

const AdminNavbar: React.FC = () => {
  const { logout, adminProfile } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/users', icon: Users, label: 'Users' },
    { to: '/notifications', icon: Bell, label: 'Broadcast' },
    { to: '/cleanup', icon: Trash2, label: 'Maintenance' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Shield className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">Offly Admin</span>
        </div>

        <div className="flex items-center gap-1 sm:gap-4">
          <div className="flex items-center gap-1 border-r border-gray-100 pr-4 mr-2 hidden md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => 
                  `px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                    isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900">{adminProfile?.displayName || 'Admin'}</p>
              <p className="text-[10px] font-black uppercase text-blue-500 tracking-widest">Master Admin</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-3 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around py-3 px-2 z-50">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 
              `flex flex-col items-center gap-1 flex-1 py-1 rounded-xl transition-all ${
                isActive ? 'text-blue-600' : 'text-gray-400'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default AdminNavbar;
