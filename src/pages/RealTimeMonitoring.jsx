import React from 'react'
import { Radio, AlertTriangle, TrendingUp, MessageCircle } from 'lucide-react'
import './SharedPages.css'

const RealTimeMonitoring = () => {
  const activities = [
    { type: 'like', user: '@sarah_m', content: 'liked your Instagram post', time: '2 min ago', platform: 'Instagram' },
    { type: 'comment', user: '@john_doe', content: 'commented on your TikTok video', time: '5 min ago', platform: 'TikTok' },
    { type: 'share', user: '@mike_tech', content: 'shared your Twitter post', time: '12 min ago', platform: 'Twitter' },
    { type: 'mention', user: '@brand_x', content: 'mentioned you in a post', time: '18 min ago', platform: 'Instagram' }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Real-Time Monitoring</h1>
          <p>Live feed of all social media activity</p>
        </div>
        <div className="live-indicator">
          <Radio size={16} />
          <span>Live</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <TrendingUp size={24} style={{ color: '#00ba7c' }} />
          <h3>Active Now</h3>
          <p className="stat-value">1,234</p>
          <span className="stat-detail">Users engaging</span>
        </div>
        <div className="stat-card">
          <MessageCircle size={24} style={{ color: '#667eea' }} />
          <h3>New Interactions</h3>
          <p className="stat-value">89</p>
          <span className="stat-detail">Last 10 minutes</span>
        </div>
        <div className="stat-card">
          <AlertTriangle size={24} style={{ color: '#ffb800' }} />
          <h3>Alerts</h3>
          <p className="stat-value">2</p>
          <span className="stat-detail">Require attention</span>
        </div>
      </div>

      <div className="info-card">
        <h2>Live Activity Feed</h2>
        <div className="activity-feed">
          {activities.map((activity, idx) => (
            <div key={idx} className="activity-item">
              <div className="activity-icon">
                <MessageCircle size={18} />
              </div>
              <div className="activity-content">
                <p><strong>{activity.user}</strong> {activity.content}</p>
                <div className="activity-meta">
                  <span className="platform-badge">{activity.platform}</span>
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-card">
        <h2>Sentiment Monitor</h2>
        <div className="sentiment-stats">
          <div className="sentiment-item positive">
            <span>Positive</span>
            <div className="sentiment-bar">
              <div className="sentiment-fill" style={{ width: '75%' }}></div>
            </div>
            <span>75%</span>
          </div>
          <div className="sentiment-item neutral">
            <span>Neutral</span>
            <div className="sentiment-bar">
              <div className="sentiment-fill" style={{ width: '20%' }}></div>
            </div>
            <span>20%</span>
          </div>
          <div className="sentiment-item negative">
            <span>Negative</span>
            <div className="sentiment-bar">
              <div className="sentiment-fill" style={{ width: '5%' }}></div>
            </div>
            <span>5%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RealTimeMonitoring
