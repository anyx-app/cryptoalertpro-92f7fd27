import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BellRing, 
  LineChart, 
  Settings, 
  Menu, 
  X, 
  Bitcoin,
  LogOut,
  ChevronRight,
  Search,
  Bell
} from 'lucide-react';

export default function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'My Alerts', path: '/alerts', icon: BellRing },
    { name: 'Market', path: '/market', icon: LineChart },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const getPageTitle = () => {
    const current = navItems.find(item => item.path === location.pathname);
    return current ? current.name : 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-[#0F1115] text-slate-300 font-sans selection:bg-[#FF9500] selection:text-white">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 w-full z-50 bg-[#151921]/90 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2 text-white font-bold text-xl">
          <div className="bg-gradient-to-tr from-[#FF9500] to-orange-500 p-1.5 rounded-lg shadow-lg shadow-orange-500/20">
            <Bitcoin className="w-5 h-5 text-white" />
          </div>
          <span className="tracking-tight">CryptoAlert<span className="text-[#FF9500]">Pro</span></span>
        </div>
        <button onClick={toggleSidebar} className="p-2 hover:bg-white/5 rounded-md transition-colors text-white">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </header>

      <div className="flex h-screen overflow-hidden pt-16 lg:pt-0">
        {/* Sidebar */}
        <aside 
          className={`
            fixed lg:static inset-y-0 left-0 z-40 w-72 
            bg-[#151921] border-r border-white/5
            transform transition-transform duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            flex flex-col
          `}
        >
          {/* Sidebar Header (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 h-20 px-6 border-b border-white/5">
            <div className="bg-gradient-to-tr from-[#FF9500] to-orange-600 p-2 rounded-xl shadow-lg shadow-orange-500/20">
              <Bitcoin className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              CryptoAlert<span className="text-[#FF9500]">Pro</span>
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto scrollbar-hide">
            <div className="px-2 mb-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Main Menu
            </div>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) => `
                  flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden
                  ${isActive 
                    ? 'bg-gradient-to-r from-[#FF9500]/20 to-[#FF9500]/5 text-[#FF9500] shadow-[0_0_20px_rgba(255,149,0,0.15)] border border-[#FF9500]/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5 hover:border hover:border-white/5 border border-transparent'
                  }
                `}
              >
                <div className="flex items-center gap-3 relative z-10">
                  <item.icon className={`w-5 h-5 transition-transform duration-300 ${({ isActive }: any) => isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="font-medium">{item.name}</span>
                </div>
                {({ isActive }) => isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF9500] shadow-[0_0_8px_#FF9500]" />
                )}
              </NavLink>
            ))}

            <div className="px-2 mt-8 mb-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Account
            </div>
             <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300 group border border-transparent hover:border-white/5">
               <LogOut className="w-5 h-5" />
               <span className="font-medium">Sign Out</span>
             </button>
          </nav>

          {/* User Profile Footer */}
          <div className="p-4 border-t border-white/5 bg-[#0F1115]/50">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF9500] to-orange-600 flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-[#0F1115]">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate group-hover:text-[#FF9500] transition-colors">John Doe</p>
                <p className="text-xs text-slate-400 truncate">Pro Plan Member</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#0F1115] relative">
          {/* Header for Desktop */}
          <header className="hidden lg:flex items-center justify-between h-20 px-8 border-b border-white/5 bg-[#0F1115]/80 backdrop-blur-xl sticky top-0 z-20">
            <h2 className="text-2xl font-bold text-white tracking-tight">{getPageTitle()}</h2>
            <div className="flex items-center gap-6">
               <div className="relative group">
                 <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-hover:text-[#FF9500] transition-colors" />
                 <input 
                   type="text" 
                   placeholder="Search markets..." 
                   className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FF9500]/50 focus:border-[#FF9500] transition-all w-64"
                 />
               </div>
               <button className="relative p-2 text-slate-400 hover:text-white transition-colors hover:bg-white/5 rounded-full">
                 <BellRing className="w-5 h-5" />
                 <span className="absolute top-1.5 right-2 w-2 h-2 bg-[#FF9500] rounded-full ring-2 ring-[#0F1115]"></span>
               </button>
            </div>
          </header>

          <div className="p-4 lg:p-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
