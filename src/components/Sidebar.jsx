import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, TrendingUp, FileText, Users, Target, Briefcase, FileBarChart, Settings, Bot, Radio } from 'lucide-react'
import './Sidebar.css'

const Sidebar = ({ user }) => {
  const location = useLocation()
  
  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/platform', icon: TrendingUp, label: 'Platform Analytics' },
    { path: '/content', icon: FileText, label: 'Content Performance' },
    { path: '/audience', icon: Users, label: 'Audience Insights' },
    { path: '/competitors', icon: Target, label: 'Competitor Analysis' },
    { path: '/projects', icon: Briefcase, label: 'Project Management' },
    { path: '/reports', icon: FileBarChart, label: 'Reports & Export' },
    { path: '/live', icon: Radio, label: 'Real-Time Monitor' },
    { path: '/ai', icon: Bot, label: 'AI Assistant' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>AgentOS</h1>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
