import React, { useState } from 'react'
import { Heart, MessageCircle, Share2, Eye, Filter } from 'lucide-react'
import './ContentPerformance.css'

const ContentPerformance = () => {
  const [filter, setFilter] = useState('all')

  const posts = [
    {
      id: 1,
      platform: 'Instagram',
      type: 'Reel',
      caption: 'Summer vibes 🌊',
      date: '2024-12-01',
      likes: 8542,
      comments: 234,
      shares: 156,
      views: 45230,
      engagement: 5.2
    },
    {
      id: 2,
      platform: 'Twitter',
      type: 'Tweet',
      caption: 'Excited to announce our new feature!',
      date: '2024-12-02',
      likes: 3421,
      comments: 89,
      shares: 234,
      views: 28100,
      engagement: 3.8
    },
    {
      id: 3,
      platform: 'TikTok',
      type: 'Video',
      caption: 'Quick tutorial on productivity hacks',
      date: '2024-12-03',
      likes: 12340,
      comments: 456,
      shares: 890,
      views: 67800,
      engagement: 6.1
    }
  ]

  return (
    <div className="content-performance">
      <div className="page-header">
        <h1>Content Performance</h1>
        <div className="filter-controls">
          <button className="filter-btn">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="content-grid">
        {posts.map(post => (
          <div key={post.id} className="content-card">
            <div className="content-header">
              <div>
                <span className="platform-badge">{post.platform}</span>
                <span className="type-badge">{post.type}</span>
              </div>
              <span className="post-date">{post.date}</span>
            </div>
            
            <p className="post-caption">{post.caption}</p>
            
            <div className="post-metrics">
              <div className="metric">
                <Heart size={16} />
                <span>{post.likes.toLocaleString()}</span>
              </div>
              <div className="metric">
                <MessageCircle size={16} />
                <span>{post.comments}</span>
              </div>
              <div className="metric">
                <Share2 size={16} />
                <span>{post.shares}</span>
              </div>
              <div className="metric">
                <Eye size={16} />
                <span>{post.views.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="engagement-bar">
              <div className="engagement-fill" style={{ width: `${post.engagement * 10}%` }}></div>
              <span className="engagement-label">{post.engagement}% engagement</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContentPerformance
