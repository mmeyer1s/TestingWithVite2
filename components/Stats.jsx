import React from 'react'

function Stats({ filteredData }) {
  const totalIncidents = filteredData.length
  const openCases = filteredData.filter(d => d.Disposition === 'OPEN').length
  const closedCases = filteredData.filter(d => d.Disposition === 'CLOSED').length
  const uniqueDistricts = new Set(filteredData.map(d => d.District).filter(Boolean)).size

  return (
    <div className="container">
      <div className="stats-grid row g-4">
        <div className="col-md-6 col-lg-3">
          <div className="stat-card">
            <div className="stat-value">{totalIncidents.toLocaleString()}</div>
            <div className="stat-label">Total Incidents</div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="stat-card">
            <div className="stat-value">{openCases.toLocaleString()}</div>
            <div className="stat-label">Open Cases</div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="stat-card">
            <div className="stat-value">{closedCases.toLocaleString()}</div>
            <div className="stat-label">Closed Cases</div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="stat-card">
            <div className="stat-value">{uniqueDistricts}</div>
            <div className="stat-label">Districts</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats

