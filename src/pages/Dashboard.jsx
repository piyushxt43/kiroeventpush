import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Users, Heart, Eye, TrendingUp, Instagram, Twitter, Youtube, Bot, Plus, FileDown, FileText } from 'lucide-react'
import { useData } from '../context/DataContext'
import MetricCard from '../components/MetricCard'
import DataInput from '../components/DataInput'
import './Dashboard.css'

const Dashboard = () => {
  const { userData, getTotalFollowers, getAverageEngagement, getTotalReach, getGrowthRate } = useData()
  const [timeRange, setTimeRange] = useState('7d')
  const [showDataInput, setShowDataInput] = useState(false)

  const exportToCSV = () => {
    if (!userData.hasData) {
      alert('No data to export. Please add your metrics first.')
      return
    }

    const csvData = [
      ['Platform', 'Followers', 'Engagement Rate (%)', 'Reach', 'Posts'],
      ['Instagram', userData.platforms.instagram.followers, userData.platforms.instagram.engagement_rate, userData.platforms.instagram.reach, userData.platforms.instagram.posts],
      ['Twitter', userData.platforms.twitter.followers, userData.platforms.twitter.engagement_rate, userData.platforms.twitter.reach, userData.platforms.twitter.posts],
      ['TikTok', userData.platforms.tiktok.followers, userData.platforms.tiktok.engagement_rate, userData.platforms.tiktok.reach, userData.platforms.tiktok.posts],
      [],
      ['Summary'],
      ['Total Followers', getTotalFollowers()],
      ['Average Engagement', `${getAverageEngagement()}%`],
      ['Total Reach', getTotalReach()],
      ['Growth Rate', `${getGrowthRate()}%`]
    ]

    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `agentOS-metrics-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const exportToPDF = () => {
    if (!userData.hasData) {
      alert('No data to export. Please add your metrics first.')
      return
    }

    // Simple PDF export using print
    const printWindow = window.open('', '', 'width=800,height=600')
    printWindow.document.write(`
      <html>
        <head>
          <title>AgentOS Analytics Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            h1 { color: #2563eb; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #2563eb; color: white; }
            .summary { background-color: #f5f5f5; padding: 20px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <h1>AgentOS Analytics Report</h1>
          <p>Generated: ${new Date().toLocaleString()}</p>
          
          <h2>Platform Metrics</h2>
          <table>
            <tr>
              <th>Platform</th>
              <th>Followers</th>
              <th>Engagement Rate</th>
              <th>Reach</th>
              <th>Posts</th>
            </tr>
            <tr>
              <td>Instagram</td>
              <td>${userData.platforms.instagram.followers.toLocaleString()}</td>
              <td>${userData.platforms.instagram.engagement_rate}%</td>
              <td>${userData.platforms.instagram.reach.toLocaleString()}</td>
              <td>${userData.platforms.instagram.posts}</td>
            </tr>
            <tr>
              <td>Twitter</td>
              <td>${userData.platforms.twitter.followers.toLocaleString()}</td>
              <td>${userData.platforms.twitter.engagement_rate}%</td>
              <td>${userData.platforms.twitter.reach.toLocaleString()}</td>
              <td>${userData.platforms.twitter.posts}</td>
            </tr>
            <tr>
              <td>TikTok</td>
              <td>${userData.platforms.tiktok.followers.toLocaleString()}</td>
              <td>${userData.platforms.tiktok.engagement_rate}%</td>
              <td>${userData.platforms.tiktok.reach.toLocaleString()}</td>
              <td>${userData.platforms.tiktok.posts}</td>
            </tr>
          </table>
          
          <div class="summary">
            <h2>Summary</h2>
            <p><strong>Total Followers:</strong> ${getTotalFollowers().toLocaleString()}</p>
            <p><strong>Average Engagement:</strong> ${getAverageEngagement()}%</p>
            <p><strong>Total Reach:</strong> ${getTotalReach().toLocaleString()}</p>
            <p><strong>Growth Rate:</strong> ${getGrowthRate()}%</p>
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }
  
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

  // Generate engagement data based on user's actual metrics
  const generateEngagementData = () => {
    if (!userData.hasData) {
      return [
        { date: 'Mon', instagram: 0, twitter: 0, tiktok: 0 },
        { date: 'Tue', instagram: 0, twitter: 0, tiktok: 0 },
        { date: 'Wed', instagram: 0, twitter: 0, tiktok: 0 },
        { date: 'Thu', instagram: 0, twitter: 0, tiktok: 0 },
        { date: 'Fri', instagram: 0, twitter: 0, tiktok: 0 },
        { date: 'Sat', instagram: 0, twitter: 0, tiktok: 0 },
        { date: 'Sun', instagram: 0, twitter: 0, tiktok: 0 }
      ]
    }

    const { instagram, twitter, tiktok } = userData.platforms
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    
    return days.map((date, index) => {
      // Calculate engagement based on followers and engagement rate
      const instagramEngagement = Math.round((instagram.followers * instagram.engagement_rate / 100) * (0.8 + Math.random() * 0.4))
      const twitterEngagement = Math.round((twitter.followers * twitter.engagement_rate / 100) * (0.8 + Math.random() * 0.4))
      const tiktokEngagement = Math.round((tiktok.followers * tiktok.engagement_rate / 100) * (0.8 + Math.random() * 0.4))
      
      return {
        date,
        instagram: instagramEngagement,
        twitter: twitterEngagement,
        tiktok: tiktokEngagement
      }
    })
  }

  const engagementData = generateEngagementData()

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
          <TrendingUp size={64} style={{ color: '#2563eb', marginBottom: '24px' }} />
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Welcome to Your Dashboard</h2>
          <p style={{ color: '#8b98a5', marginBottom: '24px', maxWidth: '500px' }}>
            Start by entering your social media metrics to see beautiful visualizations and insights.
          </p>
          <button 
            onClick={() => setShowDataInput(true)}
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              color: 'white',
              border: 'none',
              padding: '14px 28px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '32px'
            }}
          >
            <Plus size={20} />
            Enter Your Metrics
          </button>
          <div style={{ 
            background: '#0a0a0a', 
            border: '1px solid #2a2a2a', 
            borderRadius: '12px', 
            padding: '24px',
            maxWidth: '600px'
          }}>
            <h3 style={{ marginBottom: '16px' }}>What You'll Get:</h3>
            <ul style={{ textAlign: 'left', color: '#8b98a5', lineHeight: '1.8', listStyle: 'none', padding: 0 }}>
              <li>📊 Real-time analytics dashboard</li>
              <li>📈 Engagement trend graphs</li>
              <li>🎯 Platform performance comparison</li>
              <li>💡 AI-powered insights (chat assistant)</li>
              <li>📄 Export reports as PDF/CSV</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <DataInput isOpen={showDataInput} onClose={() => setShowDataInput(false)} />
      
      <div className="page-header">
        <h1>Dashboard</h1>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={exportToCSV}
              style={{
                background: '#0a0a0a',
                color: '#e7e9ea',
                border: '1px solid #2a2a2a',
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <FileDown size={16} />
              Export CSV
            </button>
            <button
              onClick={exportToPDF}
              style={{
                background: '#0a0a0a',
                color: '#e7e9ea',
                border: '1px solid #2a2a2a',
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <FileText size={16} />
              Export PDF
            </button>
            <button
              onClick={() => setShowDataInput(true)}
              style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                color: 'white',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Plus size={16} />
              Update Metrics
            </button>
          </div>
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
