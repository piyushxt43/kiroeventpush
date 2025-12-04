import React from 'react'
import { User, Bell, Lock, Zap, Link as LinkIcon } from 'lucide-react'
import './SharedPages.css'

const Settings = () => {
  return (
    <div className="page-container">
      <h1>Settings</h1>

      <div className="settings-section">
        <div className="section-header">
          <User size={20} />
          <h2>Account Settings</h2>
        </div>
        <div className="setting-item">
          <div>
            <h4>Profile Information</h4>
            <p>Update your name, email, and profile picture</p>
          </div>
          <button className="secondary-btn">Edit</button>
        </div>
      </div>

      <div className="settings-section">
        <div className="section-header">
          <LinkIcon size={20} />
          <h2>Connected Accounts</h2>
        </div>
        <div className="connected-accounts">
          <div className="account-item">
            <div>
              <h4>Instagram</h4>
              <span className="status-badge connected">Connected</span>
            </div>
            <button className="secondary-btn">Manage</button>
          </div>
          <div className="account-item">
            <div>
              <h4>Twitter</h4>
              <span className="status-badge connected">Connected</span>
            </div>
            <button className="secondary-btn">Manage</button>
          </div>
          <div className="account-item">
            <div>
              <h4>TikTok</h4>
              <span className="status-badge">Not Connected</span>
            </div>
            <button className="primary-btn">Connect</button>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <div className="section-header">
          <Bell size={20} />
          <h2>Notifications</h2>
        </div>
        <div className="setting-item">
          <div>
            <h4>Email Notifications</h4>
            <p>Receive alerts and reports via email</p>
          </div>
          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="setting-item">
          <div>
            <h4>Push Notifications</h4>
            <p>Get real-time alerts on your device</p>
          </div>
          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <div className="section-header">
          <Zap size={20} />
          <h2>Agent Hooks</h2>
        </div>
        <div className="setting-item">
          <div>
            <h4>Active Hooks</h4>
            <p>5 automation rules currently running</p>
          </div>
          <button className="secondary-btn">Manage Hooks</button>
        </div>
      </div>

      <div className="settings-section">
        <div className="section-header">
          <Lock size={20} />
          <h2>Privacy & Security</h2>
        </div>
        <div className="setting-item">
          <div>
            <h4>Data Export</h4>
            <p>Download all your analytics data</p>
          </div>
          <button className="secondary-btn">Export</button>
        </div>
      </div>
    </div>
  )
}

export default Settings
