import React from 'react'
import { CheckCircle, Clock, AlertCircle, Plus } from 'lucide-react'
import './SharedPages.css'

const ProjectManagement = () => {
  const tasks = [
    { id: 1, title: 'Create Instagram Reel for product launch', status: 'in-progress', dueDate: '2024-12-10', assignee: 'Sarah' },
    { id: 2, title: 'Analyze underperforming Twitter posts', status: 'todo', dueDate: '2024-12-08', assignee: 'Mike' },
    { id: 3, title: 'Schedule TikTok content for next week', status: 'completed', dueDate: '2024-12-05', assignee: 'Emma' },
    { id: 4, title: 'Respond to negative sentiment spike', status: 'urgent', dueDate: '2024-12-06', assignee: 'John' }
  ]

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle size={18} style={{ color: '#00ba7c' }} />
      case 'in-progress': return <Clock size={18} style={{ color: '#667eea' }} />
      case 'urgent': return <AlertCircle size={18} style={{ color: '#f91880' }} />
      default: return <Clock size={18} style={{ color: '#8b98a5' }} />
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Project Management</h1>
        <button className="primary-btn">
          <Plus size={18} />
          <span>New Task</span>
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Active Tasks</h3>
          <p className="stat-value">12</p>
        </div>
        <div className="stat-card">
          <h3>Completed This Week</h3>
          <p className="stat-value">8</p>
        </div>
        <div className="stat-card">
          <h3>Overdue</h3>
          <p className="stat-value">2</p>
        </div>
      </div>

      <div className="info-card">
        <h2>Tasks</h2>
        <div className="task-list">
          {tasks.map(task => (
            <div key={task.id} className={`task-item status-${task.status}`}>
              <div className="task-status">
                {getStatusIcon(task.status)}
              </div>
              <div className="task-content">
                <h4>{task.title}</h4>
                <div className="task-meta">
                  <span>Due: {task.dueDate}</span>
                  <span>•</span>
                  <span>Assigned to: {task.assignee}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-card">
        <h2>Connected Tools</h2>
        <div className="tools-grid">
          <div className="tool-card">
            <h4>Asana</h4>
            <span className="status-badge connected">Connected</span>
          </div>
          <div className="tool-card">
            <h4>Trello</h4>
            <span className="status-badge connected">Connected</span>
          </div>
          <div className="tool-card">
            <h4>Jira</h4>
            <span className="status-badge">Not Connected</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectManagement
