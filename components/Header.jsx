import React, { useState } from 'react'
import { createRipple, playSound } from '../utils/animations'

function Header({ cartCount, onToggleCart }) {
  const [isCartClicked, setIsCartClicked] = useState(false)

  const handleCartClick = (e) => {
    createRipple(e)
    playSound('click')
    setIsCartClicked(true)
    setTimeout(() => setIsCartClicked(false), 500)
    onToggleCart()
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🍫</span>
            <span className="logo-text">Cocoa Rave</span>
          </div>
          <nav className="nav-links">
            <a href="/reports.html" className="nav-link jelly-btn">📊 Police Reports</a>
            <button 
              className={`cart-btn btn jelly-btn ${isCartClicked ? 'clicked' : ''}`}
              onClick={handleCartClick}
            >
              <span>🛒</span>
              <span className="cart-count badge bg-dark">{cartCount}</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
