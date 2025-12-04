import { useState } from 'react'
import { Save, X, Instagram, Twitter, Youtube, TrendingUp } from 'lucide-react'
import { useData } from '../context/DataContext'
import './DataInput.css'

const DataInput = ({ isOpen, onClose }) => {
  const { userData, updateMetrics } = useData()
  
  const [formData, setFormData] = useState({
    instagram: {
      followers: userData.platforms.instagram.followers || '',
      engagement_rate: userData.platforms.instagram.engagement_rate || '',
      reach: userData.platforms.instagram.reach || '',
      posts: userData.platforms.instagram.posts || ''
    },
    twitter: {
      followers: userData.platforms.twitter.followers || '',
      engagement_rate: userData.platforms.twitter.engagement_rate || '',
      reach: userData.platforms.twitter.reach || '',
      posts: userData.platforms.twitter.posts || ''
    },
    tiktok: {
      followers: userData.platforms.tiktok.followers || '',
      engagement_rate: userData.platforms.tiktok.engagement_rate || '',
      reach: userData.platforms.tiktok.reach || '',
      posts: userData.platforms.tiktok.posts || ''
    }
  })

  const [saving, setSaving] = useState(false)

  const handleInputChange = (platform, field, value) => {
    setFormData(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value
      }
    }))
  }

  const parseNumber = (value) => {
    if (!value) return 0
    const str = value.toString().toLowerCase().trim()
    
    // Handle K (thousands)
    if (str.includes('k')) {
      return parseFloat(str.replace('k', '')) * 1000
    }
    // Handle M (millions)
    if (str.includes('m')) {
      return parseFloat(str.replace('m', '')) * 1000000
    }
    // Handle regular numbers
    return parseFloat(str.replace(/,/g, '')) || 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaving(true)

    // Convert all values to numbers
    const processedData = {
      platforms: {
        instagram: {
          followers: parseNumber(formData.instagram.followers),
          engagement_rate: parseFloat(formData.instagram.engagement_rate) || 0,
          reach: parseNumber(formData.instagram.reach),
          posts: parseInt(formData.instagram.posts) || 0
        },
        twitter: {
          followers: parseNumber(formData.twitter.followers),
          engagement_rate: parseFloat(formData.twitter.engagement_rate) || 0,
          reach: parseNumber(formData.twitter.reach),
          posts: parseInt(formData.twitter.posts) || 0
        },
        tiktok: {
          followers: parseNumber(formData.tiktok.followers),
          engagement_rate: parseFloat(formData.tiktok.engagement_rate) || 0,
          reach: parseNumber(formData.tiktok.reach),
          posts: parseInt(formData.tiktok.posts) || 0
        }
      }
    }

    updateMetrics(processedData)
    
    setTimeout(() => {
      setSaving(false)
      onClose()
    }, 500)
  }

  if (!isOpen) return null

  const platforms = [
    { 
      key: 'instagram', 
      name: 'Instagram', 
      icon: Instagram, 
      color: '#E4405F',
      placeholder: 'e.g., 50K or 50000'
    },
    { 
      key: 'twitter', 
      name: 'Twitter', 
      icon: Twitter, 
      color: '#1DA1F2',
      placeholder: 'e.g., 30K or 30000'
    },
    { 
      key: 'tiktok', 
      name: 'TikTok', 
      icon: Youtube, 
      color: '#00f2ea',
      placeholder: 'e.g., 100K or 100000'
    }
  ]

  return (
    <div className="data-input-overlay">
      <div className="data-input-modal">
        <div className="data-input-header">
          <div className="header-content">
            <TrendingUp size={24} style={{ color: '#2563eb' }} />
            <div>
              <h2>Update Your Metrics</h2>
              <p>Enter your social media data to see it visualized on your dashboard</p>
            </div>
          </div>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="data-input-form">
          {platforms.map(platform => (
            <div key={platform.key} className="platform-section">
              <div className="platform-header">
                <platform.icon size={20} style={{ color: platform.color }} />
                <h3>{platform.name}</h3>
              </div>
              
              <div className="input-grid">
                <div className="input-group">
                  <label>Followers</label>
                  <input
                    type="text"
                    placeholder={platform.placeholder}
                    value={formData[platform.key].followers}
                    onChange={(e) => handleInputChange(platform.key, 'followers', e.target.value)}
                  />
                  <span className="input-hint">Supports: 50K, 2.5M, or 50000</span>
                </div>

                <div className="input-group">
                  <label>Engagement Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g., 5.2"
                    value={formData[platform.key].engagement_rate}
                    onChange={(e) => handleInputChange(platform.key, 'engagement_rate', e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label>Total Reach</label>
                  <input
                    type="text"
                    placeholder="e.g., 850K"
                    value={formData[platform.key].reach}
                    onChange={(e) => handleInputChange(platform.key, 'reach', e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label>Total Posts</label>
                  <input
                    type="number"
                    placeholder="e.g., 120"
                    value={formData[platform.key].posts}
                    onChange={(e) => handleInputChange(platform.key, 'posts', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn" disabled={saving}>
              <Save size={18} />
              {saving ? 'Saving...' : 'Save & Update Dashboard'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DataInput
