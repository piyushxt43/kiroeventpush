import React, { createContext, useState, useContext, useEffect } from 'react'

const DataContext = createContext()

const DEFAULT_DATA = {
  platforms: {
    instagram: { followers: 0, engagement_rate: 0, reach: 0, posts: 0 },
    twitter: { followers: 0, engagement_rate: 0, reach: 0, posts: 0 },
    tiktok: { followers: 0, engagement_rate: 0, reach: 0, posts: 0 }
  },
  history: [],
  lastUpdated: null,
  hasData: false
}

export const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('agentosUserData')
    return saved ? JSON.parse(saved) : DEFAULT_DATA
  })

  useEffect(() => {
    localStorage.setItem('agentosUserData', JSON.stringify(userData))
  }, [userData])

  const updateMetrics = (newData) => {
    setUserData(prev => {
      const updated = {
        ...prev,
        platforms: {
          ...prev.platforms,
          ...newData.platforms
        },
        history: [
          ...prev.history,
          {
            date: new Date().toISOString(),
            metrics: newData.platforms
          }
        ].slice(-30), // Keep last 30 entries
        lastUpdated: new Date().toISOString(),
        hasData: true
      }
      return updated
    })
  }

  const clearData = () => {
    setUserData(DEFAULT_DATA)
    localStorage.removeItem('agentosUserData')
  }

  const getTotalFollowers = () => {
    const { instagram, twitter, tiktok } = userData.platforms
    return instagram.followers + twitter.followers + tiktok.followers
  }

  const getAverageEngagement = () => {
    const { instagram, twitter, tiktok } = userData.platforms
    const total = instagram.engagement_rate + twitter.engagement_rate + tiktok.engagement_rate
    return (total / 3).toFixed(1)
  }

  const getTotalReach = () => {
    const { instagram, twitter, tiktok } = userData.platforms
    return instagram.reach + twitter.reach + tiktok.reach
  }

  const getGrowthRate = () => {
    if (userData.history.length < 2) return 0
    const current = userData.history[userData.history.length - 1]
    const previous = userData.history[userData.history.length - 2]
    
    const currentTotal = Object.values(current.metrics).reduce((sum, p) => sum + p.followers, 0)
    const previousTotal = Object.values(previous.metrics).reduce((sum, p) => sum + p.followers, 0)
    
    return (((currentTotal - previousTotal) / previousTotal) * 100).toFixed(1)
  }

  return (
    <DataContext.Provider value={{ 
      userData, 
      updateMetrics, 
      clearData,
      getTotalFollowers,
      getAverageEngagement,
      getTotalReach,
      getGrowthRate
    }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within DataProvider')
  }
  return context
}
