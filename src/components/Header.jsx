import React, { useState } from 'react'
import { signInWithGoogle, signOutUser } from '../config/firebase'
import { LogIn, LogOut, User } from 'lucide-react'
import './Header.css'

const Header = ({ user }) => {
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    setLoading(true)
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error('Sign in error:', error)
      alert('Failed to sign in. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOutUser()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          {/* Can add breadcrumbs or page title here */}
        </div>
        <div className="header-right">
          {user ? (
            <div className="user-menu">
              <div className="user-info-header">
                <img src={user.photoURL} alt={user.displayName} className="user-avatar-small" />
                <div className="user-details-header">
                  <span className="user-name-header">{user.displayName}</span>
                  <span className="user-email-header">{user.email}</span>
                </div>
              </div>
              <button onClick={handleSignOut} className="signout-btn-header">
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <button onClick={handleSignIn} disabled={loading} className="signin-btn-header">
              <LogIn size={18} />
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
