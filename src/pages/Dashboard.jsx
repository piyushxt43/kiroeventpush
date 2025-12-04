import React, { useState, useEffect } from 'react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Users, Heart, Eye, TrendingUp, Instagram, Twitter, Youtube } from 'lucide-react'
import MetricCard from '../components/MetricCard'
import './Dashboard.css'

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d')
  
  const metrics = [
    { title: 'Total Followers', value: '124.5K', change: 12.5, icon: Users, color: '#2563eb' },
    { title: 'Engagement Rate', value: '4.8%', change: 8.3, icon: Heart, color: '#f093fb' },
    { title: 'Total Reach', value: '2.1M', change: -3.2, icon: Eye, color: '#60a5fa' },
    { title: 'Growth Rate', value: '15.2%', change: 5.7, icon: TrendingUp, color: '#43e97b' }
  ]

  const engagementData = [
    { date: 'Mon', instagram: 4200, twitter: 2400, tiktok: 5600 },
    { date: 'Tue', instagram: 3800, twitter: 2800, tiktok: 6200 },
    { date: 'Wed', instagram: 5100, twitter: 3200, tiktok: 7100 },
    { date: 'Thu', instagram: 4600, twitter: 2900, tiktok: 6800 },
    { date: 'Fri', instagram: 6200, twitter: 3800, tiktok: 8400 },
    { date: 'Sat', instagram: 7100, twitter: 4200, tiktok: 9200 },
    { date: 'Sun', instagram: 6800, twitter: 3900, tiktok: 8800 }
  ]

  const alerts = [
    { id: 1, type: 'success', message: 'Your latest Instagram post reached 10K views!', time: '2 hours ago' },
    { id: 2, type: 'warning', message: 'Engagement rate dropped 15% on Twitter', time: '5 hours ago' },
    { id: 3, type: 'info', message: 'Peak engagement time detected: 7-9 PM', time: '1 day ago' }
  ]

  const platformStats = [
    { platform: 'Instagram', followers: '52.3K', engagement: '5.2%', icon: Instagram, color: '#E4405F' },
    { platform: 'Twitter', followers: '38.1K', engagement: '3.8%', icon: Twitter, color: '#1DA1F2' },
    { platform: 'TikTok', followers: '34.1K', engagement: '6.1%', icon: Youtube, color: '#000000' }
  ]

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
        <div className="time-range-selector">
          {['24h', '7d', '30d', '90d'].map(range => (
            <button
              key={range}
              className={`range-btn ${timeRange === range ? 'active' : ''}`}
              onClick={() => setTimeRange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric, idx) => (
          <MetricCard key={idx} {...metric} />
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="chart-card">
          <h2>Engagement Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={engagementData}>
              <defs>
                <linearGradient id="instagram" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E4405F" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#E4405F" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="twitter" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1DA1F2" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#1DA1F2" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="tiktok" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00f2ea" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00f2ea" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
              <XAxis dataKey="date" stroke="#8b98a5" />
              <YAxis stroke="#8b98a5" />
              <Tooltip contentStyle={{ background: '#0a0a0a', border: '1px solid #2a2a2a', borderRadius: '8px' }} />
              <Legend />
              <Area type="monotone" dataKey="instagram" stroke="#E4405F" fillOpacity={1} fill="url(#instagram)" />
              <Area type="monotone" dataKey="twitter" stroke="#1DA1F2" fillOpacity={1} fill="url(#twitter)" />
              <Area type="monotone" dataKey="tiktok" stroke="#00f2ea" fillOpacity={1} fill="url(#tiktok)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="alerts-card">
          <h2>Alert Center</h2>
          <div className="alerts-list">
            {alerts.map(alert => (
              <div key={alert.id} className={`alert-item ${alert.type}`}>
                <div className="alert-content">
                  <p>{alert.message}</p>
                  <span className="alert-time">{alert.time}</span>
                </div>
                <button className="alert-dismiss">×</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="platform-stats">
        <h2>Platform Overview</h2>
        <div className="platform-grid">
          {platformStats.map((stat, idx) => (
            <div key={idx} className="platform-card">
              <div className="platform-header">
                <stat.icon size={24} style={{ color: stat.color }} />
                <h3>{stat.platform}</h3>
              </div>
              <div className="platform-metrics">
                <div className="platform-metric">
                  <span className="metric-label">Followers</span>
                  <span className="metric-value">{stat.followers}</span>
                </div>
                <div className="platform-metric">
                  <span className="metric-label">Engagement</span>
                  <span className="metric-value">{stat.engagement}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
