import React from 'react'

function ReportsHeader() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">📊</span>
            <span className="logo-text">Police Reports Analysis</span>
          </div>
          <nav className="nav-links">
            <a href="/" className="nav-link btn btn-outline-light btn-sm">← Back to Store</a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default ReportsHeader

