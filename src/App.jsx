import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { auth } from './config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { DataProvider } from './context/DataContext'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import PlatformAnalytics from './pages/PlatformAnalytics'
import ContentPerformance from './pages/ContentPerformance'
import AudienceInsights from './pages/AudienceInsights'
import CompetitorAnalysis from './pages/CompetitorAnalysis'
import ProjectManagement from './pages/ProjectManagement'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import AIAssistant from './pages/AIAssistant'
import RealTimeMonitoring from './pages/RealTimeMonitoring'
import AIChat from './components/AIChat'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        background: '#000000',
        color: '#e7e9ea'
      }}>
        Loading...
      </div>
    )
  }

  return (
    <DataProvider>
      <Router>
        <div className="app">
          <Sidebar user={user} />
          <div className="app-right">
            <Header user={user} />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard user={user} />} />
                <Route path="/platform" element={<PlatformAnalytics />} />
                <Route path="/content" element={<ContentPerformance />} />
                <Route path="/audience" element={<AudienceInsights />} />
                <Route path="/competitors" element={<CompetitorAnalysis />} />
                <Route path="/projects" element={<ProjectManagement />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings user={user} />} />
                <Route path="/ai" element={<AIAssistant />} />
                <Route path="/live" element={<RealTimeMonitoring />} />
              </Routes>
            </main>
          </div>
          <AIChat 
            isOpen={chatOpen} 
            onToggle={() => setChatOpen(!chatOpen)} 
            user={user} 
          />
        </div>
      </Router>
    </DataProvider>
  )
}

export default App
