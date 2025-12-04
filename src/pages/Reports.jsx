import React from 'react'
import { FileText, Download, Calendar, Send } from 'lucide-react'
import './SharedPages.css'

const Reports = () => {
  const reports = [
    { name: 'Weekly Performance Summary', date: '2024-12-01', type: 'Automated' },
    { name: 'November Campaign Analysis', date: '2024-11-30', type: 'Manual' },
    { name: 'Competitor Benchmarking Q4', date: '2024-11-28', type: 'Manual' }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Reports & Export</h1>
        <button className="primary-btn">
          <FileText size={18} />
          <span>Create Report</span>
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <Calendar size={24} style={{ color: '#667eea' }} />
          <h3>Scheduled Reports</h3>
          <p className="stat-value">5</p>
        </div>
        <div className="stat-card">
          <FileText size={24} style={{ color: '#f093fb' }} />
          <h3>Generated This Month</h3>
          <p className="stat-value">12</p>
        </div>
        <div className="stat-card">
          <Send size={24} style={{ color: '#4facfe' }} />
          <h3>Auto-Sent</h3>
          <p className="stat-value">8</p>
        </div>
      </div>

      <div className="info-card">
        <h2>Recent Reports</h2>
        <div className="report-list">
          {reports.map((report, idx) => (
            <div key={idx} className="report-item">
              <div className="report-info">
                <FileText size={20} style={{ color: '#667eea' }} />
                <div>
                  <h4>{report.name}</h4>
                  <span className="report-meta">{report.date} • {report.type}</span>
                </div>
              </div>
              <button className="icon-btn">
                <Download size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="info-card">
        <h2>Report Templates</h2>
        <div className="template-grid">
          <div className="template-card">
            <h4>Executive Summary</h4>
            <p>High-level KPIs and insights</p>
          </div>
          <div className="template-card">
            <h4>Campaign Performance</h4>
            <p>Detailed campaign metrics</p>
          </div>
          <div className="template-card">
            <h4>Platform Deep Dive</h4>
            <p>Single platform analysis</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
