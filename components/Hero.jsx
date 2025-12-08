import React, { useState } from 'react'
import { createRipple, playSound } from '../utils/animations'

function Hero() {
  const [isClicked, setIsClicked] = useState(false)

  const scrollToProducts = (e) => {
    createRipple(e)
    playSound('click')
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 500)
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
      <div className="container">
        <h1 className="hero-title">Welcome to Cocoa Rave</h1>
        <p className="hero-subtitle">Premium handcrafted chocolate bars that make you dance</p>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <button 
            className={`hero-btn btn btn-light btn-lg jelly-btn ${isClicked ? 'clicked' : ''}`}
            onClick={scrollToProducts}
          >
            Shop Now
          </button>
          <a 
            href="/snake.html" 
            className="hero-btn btn btn-lg jelly-btn"
            style={{ backgroundColor: 'var(--accent)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
          >
            🐍 Play Snake
          </a>
          <a 
            href="/reports.html" 
            className="hero-btn btn btn-lg jelly-btn"
            style={{ backgroundColor: 'var(--secondary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
          >
            📊 View Police Reports
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
