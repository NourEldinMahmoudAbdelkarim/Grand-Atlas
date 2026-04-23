import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Building2, HardHat, Home, Map, LogOut, Menu, X } from 'lucide-react';


export function AdminLayout() {
  const { isAuthenticated, logout } = useAuthStore();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Projects', path: '/dashboard/projects', icon: Building2 },
    { name: 'Developers', path: '/dashboard/developers', icon: HardHat },
    { name: 'Units', path: '/dashboard/units', icon: Home },
    { name: 'Zones', path: '/dashboard/zones', icon: Map },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar - Desktop & Mobile overlay */}
      <aside className={`
         fixed inset-y-0 left-0 z-50 w-64 bg-stone-950 text-stone-300 transform transition-transform duration-300 ease-in-out
         lg:translate-x-0 lg:static lg:flex-shrink-0
         ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
         <div className="h-20 flex items-center justify-between px-6 bg-stone-900/50">
            <span className="text-xl font-bold text-white tracking-tight">Admin Portal</span>
            <button className="lg:hidden text-stone-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
               <X className="w-6 h-6" />
            </button>
         </div>

         <div className="py-6 flex flex-col h-[calc(100vh-5rem)]">
            <nav className="flex-1 px-4 space-y-1">
               {navItems.map((item) => {
                 const isActive =
                   location.pathname === item.path ||
                   (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
                 const Icon = item.icon;
                 
                 return (
                   <Link
                     key={item.name}
                     to={item.path}
                     className={`
                        flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                        ${isActive 
                           ? 'bg-stone-800 text-white' 
                           : 'hover:bg-stone-900 hover:text-white'
                        }
                     `}
                   >
                     <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-stone-300' : 'text-stone-500'}`} />
                     {item.name}
                   </Link>
                 );
               })}
            </nav>

            <div className="px-4 mt-auto">
               <button 
                  onClick={() => logout()}
                  className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-stone-400 hover:bg-stone-900 hover:text-white transition-colors"
               >
                  <LogOut className="w-5 h-5 mr-3 text-stone-500" />
                  Sign Out
               </button>
            </div>
         </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
         {/* Top Header */}
         <header className="h-20 bg-white border-b border-stone-200 flex items-center px-6 shrink-0 shadow-sm z-10 sticky top-0">
            <button 
               className="lg:hidden text-stone-500 hover:text-stone-900 mr-4"
               onClick={() => setIsSidebarOpen(true)}
            >
               <Menu className="w-6 h-6" />
            </button>
            <div className="flex-1"></div>
            <div className="flex items-center">
               <div className="w-8 h-8 bg-stone-900 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  AD
               </div>
            </div>
         </header>

         {/* Page Content */}
         <div className="flex-1 overflow-y-auto p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
               <Outlet />
            </div>
         </div>
      </main>

      {/* Mobile overlay background */}
      {isSidebarOpen && (
         <div 
            className="fixed inset-0 bg-stone-900/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
         />
      )}
    </div>
  );
}
