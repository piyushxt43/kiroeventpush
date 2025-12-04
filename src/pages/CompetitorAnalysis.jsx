import React from 'react'
import { Target, TrendingUp, Users } from 'lucide-react'
import './SharedPages.css'

const CompetitorAnalysis = () => {
  const competitors = [
    { name: 'Competitor A', followers: '156K', engagement: '6.2%', growth: '+18%' },
    { name: 'Competitor B', followers: '98K', engagement: '4.1%', growth: '+12%' },
    { name: 'Your Account', followers: '124K', engagement: '4.8%', growth: '+15%' }
  ]

  return (
    <div className="page-container">
      <h1>Competitor Analysis</h1>
      
      <div className="info-card">
        <h2>Competitive Benchmarking</h2>
        <div className="competitor-table">
          <div className="table-header">
            <span>Account</span>
            <span>Followers</span>
            <span>Engagement</span>
            <span>Growth</span>
          </div>
          {competitors.map((comp, idx) => (
            <div key={idx} className={`table-row ${comp.name === 'Your Account' ? 'highlight' : ''}`}>
              <span>{comp.name}</span>
              <span>{comp.followers}</span>
              <span>{comp.engagement}</span>
              <span className="positive">{comp.growth}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <Target size={24} style={{ color: '#667eea' }} />
          <h3>Market Position</h3>
          <p className="stat-value">#2</p>
          <span className="stat-detail">In your niche</span>
        </div>
        <div className="stat-card">
          <TrendingUp size={24} style={{ color: '#43e97b' }} />
          <h3>Share of Voice</h3>
          <p className="stat-value">28%</p>
          <span className="stat-change positive">+5% this month</span>
        </div>
        <div className="stat-card">
          <Users size={24} style={{ color: '#f093fb' }} />
          <h3>Audience Overlap</h3>
          <p className="stat-value">23%</p>
          <span className="stat-detail">With top competitor</span>
        </div>
      </div>

      <div className="info-card">
        <h2>Key Insights</h2>
        <ul className="insights-list">
          <li>Competitor A posts 2x more frequently than you</li>
          <li>Video content drives 65% of competitor engagement</li>
          <li>Opportunity: Underserved audience in 35-44 age group</li>
          <li>Your engagement rate is above industry average</li>
        </ul>
      </div>
    </div>
  )
}

export default CompetitorAnalysis
