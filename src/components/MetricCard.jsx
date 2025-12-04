import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import './MetricCard.css'

const MetricCard = ({ title, value, change, icon: Icon, color = '#667eea' }) => {
  const isPositive = change >= 0
  
  return (
    <div className="metric-card" style={{ borderTopColor: color }}>
      <div className="metric-header">
        <span className="metric-title">{title}</span>
        {Icon && <Icon size={20} style={{ color }} />}
      </div>
      <div className="metric-value">{value}</div>
      <div className={`metric-change ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        <span>{Math.abs(change)}% vs last period</span>
      </div>
    </div>
  )
}

export default MetricCard
