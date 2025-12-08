import React from 'react'

function Footer({ isReportsPage = false }) {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2024 Cocoa Rave. {isReportsPage ? 'Police report data analysis.' : 'All rights reserved.'}</p>
        <p>{isReportsPage ? 'Interactive visualizations powered by Plotly.js' : 'Made with ❤️ and premium cocoa'}</p>
      </div>
    </footer>
  )
}

export default Footer

