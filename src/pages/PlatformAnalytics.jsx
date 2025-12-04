import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Instagram, Twitter, Youtube } from 'lucide-react'
import './PlatformAnalytics.css'

const PlatformAnalytics = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('instagram')

  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#E4405F' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: '#1DA1F2' },
    { id: 'tiktok', name: 'TikTok', icon: Youtube, color: '#000000' }
  ]

  const postPerformance = [
    { type: 'Reels', engagement: 8500, reach: 45000 },
    { type: 'Stories', engagement: 3200, reach: 18000 },
    { type: 'Feed Posts', engagement: 5600, reach: 28000 },
    { type: 'Carousels', engagement: 6800, reach: 32000 }
  ]

  const audienceData = [
    { name: '18-24', value: 35 },
    { name: '25-34', value: 40 },
    { name: '35-44', value: 15 },
    { name: '45+', value: 10 }
  ]

  const COLORS = ['#2563eb', '#60a5fa', '#3b82f6', '#93c5fd']

  return (
    <div className="platform-analytics">
      <h1>Platform Analytics</h1>
      
      <div className="platform-tabs">
        {platforms.map(platform => (
          <button
            key={platform.id}
            className={`platform-tab ${selectedPlatform === platform.id ? 'active' : ''}`}
            onClick={() => setSelectedPlatform(platform.id)}
            style={{ borderBottomColor: selectedPlatform === platform.id ? platform.color : 'transparent' }}
          >
            <platform.icon size={20} />
            <span>{platform.name}</span>
          </button>
        ))}
      </div>

      <div className="analytics-grid">
        <div className="chart-card">
          <h2>Content Performance by Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={postPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
              <XAxis dataKey="type" stroke="#8b98a5" />
              <YAxis stroke="#8b98a5" />
              <Tooltip contentStyle={{ background: '#0a0a0a', border: '1px solid #2a2a2a', borderRadius: '8px' }} />
              <Bar dataKey="engagement" fill="#2563eb" />
              <Bar dataKey="reach" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Audience Demographics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={audienceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {audienceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="insights-card">
        <h2>Key Insights</h2>
        <ul className="insights-list">
          <li>Reels generate 52% more engagement than regular posts</li>
          <li>Best posting time: 7-9 PM on weekdays</li>
          <li>Hashtag #lifestyle drives 23% of your reach</li>
          <li>Video content has 3.2x higher completion rate</li>
        </ul>
      </div>
    </div>
  )
}

export default PlatformAnalytics
