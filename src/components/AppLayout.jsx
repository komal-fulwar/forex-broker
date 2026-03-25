import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header searchPlaceholder="Search security settings..." />
        <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
