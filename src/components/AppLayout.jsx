import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay lg:hidden ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className={`
        fixed lg:relative z-50 h-full
        transform transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar 
          onClose={() => setSidebarOpen(false)} 
          isCollapsed={sidebarCollapsed} 
          onCollapseToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header
          searchPlaceholder="Search..."
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10 no-scrollbar smooth-scroll bg-[#f8f9fa] relative">
          {/* Institutional Grade Ambient Decor */}
          <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[120px] pointer-events-none opacity-80 z-0"></div>
          <div className="fixed bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-blue-400/5 blur-[100px] pointer-events-none opacity-60 z-0"></div>
          
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
