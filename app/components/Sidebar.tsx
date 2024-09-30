import React from 'react'
import { Home, User, LayoutDashboard, FileText, PenTool, LogOut, CheckCheck, LoaderIcon, EllipsisIcon } from 'lucide-react'

interface SidebarProps {
  isMobileMenuOpen: boolean
}

export default function Sidebar({ isMobileMenuOpen }: SidebarProps) {
  const menuItems = [
    { icon: <Home className="mr-2 h-4 w-4" />, label: 'HOME' , href:'/' },
    { icon: <User className="mr-2 h-4 w-4" />, label: 'PROFILE', href:'/user/id/profile' },
    { icon: <LayoutDashboard className="mr-2 h-4 w-4" />, label: 'DASHBOARD',href:'/user/id/dashboard' },
    { icon: <FileText className="mr-2 h-4 w-4" />, label: 'YOUR REPORTS', href:'/user/id/user-report' },
    { icon: <PenTool className="mr-2 h-4 w-4" />, label: 'REPORT ISSUE' , href:'/issue/id/createissue'},
    { icon: <CheckCheck className="mr-2 h-4 w-4" />, label: 'COMPLETED ISSUE' , href:'/issue/id/completed'},
    { icon: <LoaderIcon className="mr-2 h-4 w-4" />, label: 'IN PROGRESS ISSUE' , href:'/issue/id/in-progress'},
    { icon: <EllipsisIcon className="mr-2 h-4 w-4" />, label: 'PENDING ISSUE' , href:'/issue/id/pending'},
    { icon: <LogOut className="mr-2 h-4 w-4" />, label: 'LOGOUT' , href:'/'},
  ]

  return (
    <nav className={`w-64 bg-white shadow-lg p-4 flex flex-col justify-between ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <li key={index}>
            <a href={item.href} className="flex items-center p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded transition duration-150 ease-in-out">
              {item.icon}
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}