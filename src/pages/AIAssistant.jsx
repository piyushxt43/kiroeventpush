import React, { useState } from 'react'
import { Bot, Sparkles, Code, BarChart3 } from 'lucide-react'
import './SharedPages.css'

const AIAssistant = () => {
  const [prompt, setPrompt] = useState('')

  const examples = [
    { icon: BarChart3, text: 'Show me my best performing posts this week', category: 'Analytics' },
    { icon: Code, text: 'Create a pie chart of audience by age group', category: 'Vibe Coding' },
    { icon: Sparkles, text: 'What time should I post for maximum engagement?', category: 'Insights' },
    { icon: Bot, text: 'Set up an alert when engagement drops 20%', category: 'Automation' }
  ]

  return (
    <div className="page-container">
      <div className="ai-header">
        <Bot size={48} style={{ color: '#667eea' }} />
        <h1>AI Assistant</h1>
        <p>Use natural language to analyze data, create visualizations, and automate workflows</p>
      </div>

      <div className="ai-input-section">
        <div className="ai-input-wrapper">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask anything or use vibe coding to create custom visualizations..."
            className="ai-input"
            rows="4"
          />
          <button className="primary-btn">
            <Sparkles size={18} />
            <span>Generate</span>
          </button>
        </div>
      </div>

      <div className="info-card">
        <h2>Example Prompts</h2>
        <div className="examples-grid">
          {examples.map((example, idx) => (
            <div key={idx} className="example-card" onClick={() => setPrompt(example.text)}>
              <example.icon size={24} style={{ color: '#667eea' }} />
              <div>
                <span className="example-category">{example.category}</span>
                <p>{example.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-card">
        <h2>Recent Queries</h2>
        <div className="query-list">
          <div className="query-item">
            <p>"What was my engagement rate last month?"</p>
            <span className="query-time">2 hours ago</span>
          </div>
          <div className="query-item">
            <p>"Create a report for the holiday campaign"</p>
            <span className="query-time">Yesterday</span>
          </div>
          <div className="query-item">
            <p>"Show competitor performance comparison"</p>
            <span className="query-time">2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant
