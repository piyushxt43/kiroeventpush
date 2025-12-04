import React, { useState, useRef, useEffect } from 'react'
import { Bot, X, Send, Sparkles, BarChart3, TrendingUp, Users } from 'lucide-react'
import axios from 'axios'
import './AIChat.css'

const AIChat = ({ isOpen, onToggle, user }) => {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: `Hi there! 👋 I'm your AgentOS AI assistant. I can help you:\n\n• Analyze your social media performance\n• Generate custom reports and visualizations\n• Answer questions about your data\n• Automate tasks and workflows\n\nWhat would you like to do today?`,
      actions: []
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const quickActions = [
    { icon: BarChart3, text: 'Show top posts', prompt: 'Show me my top performing posts this week' },
    { icon: TrendingUp, text: 'Engagement trends', prompt: 'Analyze my engagement trends over the last month' },
    { icon: Users, text: 'Audience insights', prompt: 'Give me insights about my audience demographics' },
    { icon: Sparkles, text: 'Generate report', prompt: 'Create a weekly performance report' }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const processAIResponse = (text) => {
    // Detect if AI is suggesting actions
    const actions = []
    
    if (text.toLowerCase().includes('create') || text.toLowerCase().includes('generate')) {
      actions.push({ label: 'Create Report', action: 'create_report' })
    }
    if (text.toLowerCase().includes('show') || text.toLowerCase().includes('display')) {
      actions.push({ label: 'View Dashboard', action: 'view_dashboard' })
    }
    if (text.toLowerCase().includes('export') || text.toLowerCase().includes('download')) {
      actions.push({ label: 'Export Data', action: 'export_data' })
    }
    
    return { content: text, actions }
  }

  const sendMessage = async (messageText = null) => {
    const textToSend = messageText || input
    if (!textToSend.trim() || loading) return

    const userMessage = { role: 'user', content: textToSend }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const systemPrompt = `You are AgentOS AI Assistant, a helpful AI for social media analytics. You help users analyze their Instagram, Twitter, and TikTok performance. 

Current user: ${user?.displayName || 'User'}
Context: You have access to their social media analytics dashboard with metrics like followers, engagement rate, reach, and content performance.

When users ask questions:
- Provide specific, actionable insights
- Reference actual metrics when possible (use realistic numbers)
- Suggest concrete actions they can take
- Be conversational and friendly
- If they ask you to create something, explain what you would create and offer to do it

User question: ${textToSend}`

      const API_KEY = 'AIzaSyB1DzRPPyA8n9_OCOj2WdUJIXEJ6VIvxlw'
      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${API_KEY}`

      const response = await axios.post(
        API_URL,
        {
          contents: [{
            parts: [{ text: systemPrompt }]
          }]
        }
      )

      console.log('API Response:', response.data)

      if (response.data && response.data.candidates && response.data.candidates[0]) {
        const aiResponse = response.data.candidates[0].content.parts[0].text
        const processedResponse = processAIResponse(aiResponse)
        setMessages(prev => [...prev, { role: 'assistant', ...processedResponse }])
      } else {
        throw new Error('Invalid response format from API')
      }
    } catch (error) {
      console.error('AI Error:', error)
      console.error('Error details:', error.response?.data || error.message)
      
      let errorMessage = 'Sorry, I encountered an error. Please try again.'
      
      if (error.response?.data?.error?.message) {
        errorMessage = `Error: ${error.response.data.error.message}`
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: errorMessage,
        actions: []
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleQuickAction = (prompt) => {
    setInput(prompt)
    sendMessage(prompt)
  }

  const handleAction = (action) => {
    switch(action) {
      case 'create_report':
        window.location.href = '/reports'
        break
      case 'view_dashboard':
        window.location.href = '/'
        break
      case 'export_data':
        alert('Export functionality coming soon!')
        break
      default:
        break
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {!isOpen && (
        <button className="chat-toggle" onClick={onToggle} title="Open AI Assistant">
          <Bot size={32} />
        </button>
      )}
      
      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-header-content">
              <Bot size={24} className="chat-logo" />
              <div>
                <h3>AgentOS AI</h3>
                <span style={{ fontSize: '12px', color: '#8b98a5' }}>Always here to help</span>
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
                onClick={() => handleQuickAction(action.prompt)}
              >
                <action.icon size={14} style={{ marginRight: '6px', display: 'inline' }} />
                {action.text}
              </button>
            ))}
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <div className="message-content">
                  {msg.content}
                  {msg.actions && msg.actions.length > 0 && (
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
                  <Sparkles size={16} style={{ display: 'inline', marginRight: '8px' }} />
                  Analyzing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chat-input-container">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your analytics..."
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
