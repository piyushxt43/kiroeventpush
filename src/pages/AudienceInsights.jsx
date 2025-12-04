import React from 'react'
import { Users, MapPin, Clock } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import './SharedPages.css'

const AudienceInsights = () => {
  const growthData = [
    { month: 'Jul', followers: 98000 },
    { month: 'Aug', followers: 105000 },
    { month: 'Sep', followers: 112000 },
    { month: 'Oct', followers: 118000 },
    { month: 'Nov', followers: 124500 }
  ]

  return (
    <div className="page-container">
      <h1>Audience Insights</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <Users size={24} style={{ color: '#667eea' }} />
          <h3>Total Audience</h3>
          <p className="stat-value">124.5K</p>
          <span className="stat-change positive">+12.5% this month</span>
        </div>
        <div className="stat-card">
          <MapPin size={24} style={{ color: '#f093fb' }} />
          <h3>Top Location</h3>
          <p className="stat-value">United States</p>
          <span className="stat-detail">42% of audience</span>
        </div>
        <div className="stat-card">
          <Clock size={24} style={{ color: '#4facfe' }} />
          <h3>Peak Activity</h3>
          <p className="stat-value">7-9 PM</p>
          <span className="stat-detail">Weekdays</span>
        </div>
      </div>

      <div className="chart-card">
        <h2>Follower Growth</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
            <XAxis dataKey="month" stroke="#8b98a5" />
            <YAxis stroke="#8b98a5" />
            <Tooltip contentStyle={{ background: '#0a0a0a', border: '1px solid #2a2a2a', borderRadius: '8px' }} />
            <Bar dataKey="followers" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="info-card">
        <h2>Demographic Breakdown</h2>
        <div className="demo-list">
          <div className="demo-item">
            <span>18-24 years</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '35%', background: '#2563eb' }}></div>
            </div>
            <span>35%</span>
          </div>
          <div className="demo-item">
            <span>25-34 years</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '40%', background: '#3b82f6' }}></div>
            </div>
            <span>40%</span>
          </div>
          <div className="demo-item">
            <span>35-44 years</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '15%', background: '#60a5fa' }}></div>
            </div>
            <span>15%</span>
          </div>
          <div className="demo-item">
            <span>45+ years</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '10%', background: '#93c5fd' }}></div>
            </div>
            <span>10%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudienceInsights
