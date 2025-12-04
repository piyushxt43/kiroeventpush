import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Users, Heart, Eye, TrendingUp, Instagram, Twitter, Youtube, Bot } from 'lucide-react'
import { useData } from '../context/DataContext'
import MetricCard from '../components/MetricCard'
import './Dashboard.css'

const Dashboard = () => {
  const { userData, getTotalFollowers, getAverageEngagement, getTotalReach, getGrowthRate } = useData()
  const [timeRange, setTimeRange] = useState('7d')
  
  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const metrics = userData.hasData ? [
    { title: 'Total Followers', value: formatNumber(getTotalFollowers()), change: parseFloat(getGrowthRate()), icon: Users, color: '#2563eb' },
    { title: 'Engagement Rate', value: `${getAverageEngagement()}%`, change: 8.3, icon: Heart, color: '#f093fb' },
    { title: 'Total Reach', value: formatNumber(getTotalReach()), change: -3.2, icon: Eye, color: '#60a5fa' },
    { title: 'Growth Rate', value: `${getGrowthRate()}%`, change: 5.7, icon: TrendingUp, color: '#43e97b' }
  ] : [
    { title: 'Total Followers', value: '0', change: 0, icon: Users, color: '#2563eb' },
    { title: 'Engagement Rate', value: '0%', change: 0, icon: Heart, color: '#f093fb' },
    { title: 'Total Reach', value: '0', change: 0, icon: Eye, color: '#60a5fa' },
    { title: 'Growth Rate', value: '0%', change: 0, icon: TrendingUp, color: '#43e97b' }
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

  const platformStats = userData.hasData ? [
    { 
      platform: 'Instagram', 
      followers: formatNumber(userData.platforms.instagram.followers), 
      engagement: `${userData.platforms.instagram.engagement_rate}%`, 
      icon: Instagram, 
      color: '#E4405F' 
    },
    { 
      platform: 'Twitter', 
      followers: formatNumber(userData.platforms.twitter.followers), 
      engagement: `${userData.platforms.twitter.engagement_rate}%`, 
      icon: Twitter, 
      color: '#1DA1F2' 
    },
    { 
      platform: 'TikTok', 
      followers: formatNumber(userData.platforms.tiktok.followers), 
      engagement: `${userData.platforms.tiktok.engagement_rate}%`, 
      icon: Youtube, 
      color: '#000000' 
    }
  ] : [
    { platform: 'Instagram', followers: '0', engagement: '0%', icon: Instagram, color: '#E4405F' },
    { platform: 'Twitter', followers: '0', engagement: '0%', icon: Twitter, color: '#1DA1F2' },
    { platform: 'TikTok', followers: '0', engagement: '0%', icon: Youtube, color: '#000000' }
  ]

  if (!userData.hasData) {
    return (
      <div className="dashboard">
        <div className="page-header">
          <h1>Dashboard</h1>
        </div>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '60vh',
          textAlign: 'center',
          padding: '32px'
        }}>
          <Bot size={64} style={{ color: '#2563eb', marginBottom: '24px' }} />
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>No Data Yet</h2>
          <p style={{ color: '#8b98a5', marginBottom: '24px', maxWidth: '500px' }}>
            Get started by sharing your social media metrics with our AI assistant. 
            Click the chat button in the bottom right corner to begin!
          </p>
          <div style={{ 
            background: '#0a0a0a', 
            border: '1px solid #2a2a2a', 
            borderRadius: '12px', 
            padding: '24px',
            maxWidth: '600px'
          }}>
            <h3 style={{ marginBottom: '16px' }}>Quick Start:</h3>
            <ol style={{ textAlign: 'left', color: '#8b98a5', lineHeight: '1.8' }}>
              <li>Click the AI chat button (bottom-right)</li>
              <li>Share your metrics like: "My Instagram has 50K followers, 5% engagement"</li>
              <li>Watch your dashboard come to life!</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

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
