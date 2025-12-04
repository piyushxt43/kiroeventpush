import { useState, useRef, useEffect } from 'react'
import { Bot, X, Send, Sparkles, BarChart3, TrendingUp, Users, Upload } from 'lucide-react'
import axios from 'axios'
import { useData } from '../context/DataContext'
import './AIChat.css'

const AIChat = ({ isOpen, onToggle, user }) => {
  const { userData, updateMetrics } = useData()
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: userData.hasData 
        ? `Hi! 👋 I'm your AI assistant. Ask me anything about your analytics, trends, or social media strategy!`
        : `Hi! 👋 I'm your AI assistant here to help!\n\nTo add your metrics, click the "Update Metrics" button on your dashboard.\n\nOnce you have data, I can help you analyze trends, get insights, and answer questions about your social media performance!`,
      actions: []
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const quickActions = userData.hasData ? [
    { icon: TrendingUp, text: 'Analyze trends', prompt: 'Analyze my engagement trends and give me insights' },
    { icon: Users, text: 'Best practices', prompt: 'What are best practices to improve my engagement?' },
    { icon: BarChart3, text: 'Compare platforms', prompt: 'Compare my platform performance' },
    { icon: Sparkles, text: 'Content ideas', prompt: 'Suggest content ideas based on my metrics' }
  ] : [
    { icon: Sparkles, text: 'Getting started', prompt: 'How do I get started with AgentOS?' },
    { icon: TrendingUp, text: 'Features', prompt: 'What features does AgentOS offer?' },
    { icon: Users, text: 'Tips', prompt: 'Give me social media growth tips' },
    { icon: BarChart3, text: 'Analytics', prompt: 'How can analytics help my business?' }
  ]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const extractMetrics = async (text) => {
    try {
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
      if (!API_KEY) throw new Error('API key not configured')

      const prompt = `Extract metrics from: "${text}"\n\nReturn JSON:\n{"platforms":{"instagram":{"followers":0,"engagement_rate":0,"reach":0,"posts":0},"twitter":{...},"tiktok":{...}}}\n\nConvert 52K=52000, 2.1M=2100000. Only JSON, no markdown.`

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        { contents: [{ parts: [{ text: prompt }] }] }
      )

      if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        let jsonText = response.data.candidates[0].content.parts[0].text.trim()
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
        return JSON.parse(jsonText)
      }
      return null
    } catch (error) {
      console.error('Extraction error:', error)
      return null
    }
  }

  const sendMessage = async (messageText = null) => {
    const textToSend = messageText || input
    if (!textToSend.trim() || loading) return

    setMessages(prev => [...prev, { role: 'user', content: textToSend }])
    setInput('')
    setLoading(true)

    try {
      const hasNumbers = /\d/.test(textToSend)
      const hasPlatforms = /(instagram|twitter|tiktok|followers|engagement|reach)/i.test(textToSend)
      
      if (hasNumbers && hasPlatforms) {
        const extracted = await extractMetrics(textToSend)
        
        if (extracted?.platforms) {
          updateMetrics(extracted)
          
          const updated = Object.keys(extracted.platforms).filter(
            p => extracted.platforms[p].followers > 0
          )
          
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: `✅ Updated ${updated.join(', ')}!\n\n${updated.map(p => {
              const d = extracted.platforms[p]
              return `📊 ${p.charAt(0).toUpperCase() + p.slice(1)}:\n• ${d.followers.toLocaleString()} followers\n• ${d.engagement_rate}% engagement\n• ${d.reach.toLocaleString()} reach`
            }).join('\n\n')}`,
            actions: [
              { label: 'View Dashboard', action: 'view_dashboard' },
              { label: 'Add More', action: 'update_metrics' }
            ]
          }])
          setLoading(false)
          return
        }
      }

      const systemPrompt = `You are AgentOS AI Assistant.
User: ${user?.displayName || 'User'}
Has data: ${userData.hasData}
${userData.hasData ? `Metrics: Instagram ${userData.platforms.instagram.followers}, Twitter ${userData.platforms.twitter.followers}, TikTok ${userData.platforms.tiktok.followers}` : 'No data yet'}
Be helpful and conversational.
Question: ${textToSend}`

      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
      if (!API_KEY) throw new Error('API key not configured')
      
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        { contents: [{ parts: [{ text: systemPrompt }] }] }
      )

      if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        const aiResponse = response.data.candidates[0].content.parts[0].text
        setMessages(prev => [...prev, { role: 'assistant', content: aiResponse, actions: [] }])
      }
    } catch (error) {
      console.error('AI Error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Error: ${error.message}. Please try again.`,
        actions: []
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleAction = (action) => {
    if (action === 'view_dashboard') {
      window.location.href = '/'
      onToggle()
    } else if (action === 'update_metrics') {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Share your updated metrics!',
        actions: []
      }])
    }
  }

  return (
    <>
      {!isOpen && (
        <button className="chat-toggle" onClick={onToggle} title="AI Assistant - Ask me anything!">
          <Bot size={32} />
        </button>
      )}
      
      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-header-content">
              <Bot size={24} />
              <div>
                <h3>AI Assistant</h3>
                <span style={{ fontSize: '12px', color: '#8b98a5' }}>
                  Your analytics helper
                </span>
              </div>
            </div>
            <button onClick={onToggle} className="chat-close">
              <X size={20} />
            </button>
          </div>
          
          <div className="quick-actions">
            {quickActions.map((action, idx) => (
              <button 
                key={idx} 
                className="quick-action-btn"
                onClick={() => sendMessage(action.prompt)}
              >
                <action.icon size={14} style={{ marginRight: '6px' }} />
                {action.text}
              </button>
            ))}
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <div className="message-content">
                  {msg.content}
                  {msg.actions?.length > 0 && (
                    <div className="action-buttons">
                      {msg.actions.map((action, i) => (
                        <button 
                          key={i} 
                          className="action-btn"
                          onClick={() => handleAction(action.action)}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="message assistant">
                <div className="message-content typing">
                  <Sparkles size={16} style={{ marginRight: '8px' }} />
                  Processing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chat-input-container">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
              placeholder="Ask me anything about analytics, trends, or strategy..."
              className="chat-input"
              rows="2"
            />
            <button onClick={() => sendMessage()} disabled={loading} className="chat-send">
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default AIChat
