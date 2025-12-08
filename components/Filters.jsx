import React from 'react'

function Filters({ csvData, filters, onFilterChange }) {
  const districts = [...new Set(csvData.map(d => d.District).filter(Boolean))].sort()
  const dispositions = [...new Set(csvData.map(d => d.Disposition).filter(Boolean))]
  const signalTypes = [...new Set(csvData.map(d => d.Signal_Type).filter(Boolean))].sort()

  return (
    <section className="reports-section">
      <div className="container">
        <div className="widget-card card">
          <div className="card-body">
            <h2 className="widget-title card-title">Filter Data</h2>
            <div className="filter-controls row g-3">
              <div className="filter-control col-md-6 col-lg">
                <label className="form-label">District</label>
                <select 
                  id="filter-district" 
                  className="form-select" 
                  value={filters.district}
                  onChange={(e) => onFilterChange('district', e.target.value)}
                >
                  <option value="">All Districts</option>
                  {districts.map(d => <option key={d} value={d}>District {d}</option>)}
                </select>
              </div>
              <div className="filter-control col-md-6 col-lg">
                <label className="form-label">Disposition</label>
                <select 
                  id="filter-disposition" 
                  className="form-select"
                  value={filters.disposition}
                  onChange={(e) => onFilterChange('disposition', e.target.value)}
                >
                  <option value="">All Statuses</option>
                  {dispositions.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="filter-control col-md-6 col-lg">
                <label className="form-label">Signal Type</label>
                <select 
                  id="filter-signal" 
                  className="form-select"
                  value={filters.signal}
                  onChange={(e) => onFilterChange('signal', e.target.value)}
                >
                  <option value="">All Types</option>
                  {signalTypes.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="filter-control col-md-6 col-lg">
                <label className="form-label">Date From</label>
                <input 
                  type="date" 
                  id="filter-date-from" 
                  className="form-control"
                  value={filters.dateFrom}
                  onChange={(e) => onFilterChange('dateFrom', e.target.value)}
                />
              </div>
              <div className="filter-control col-md-6 col-lg">
                <label className="form-label">Date To</label>
                <input 
                  type="date" 
                  id="filter-date-to" 
                  className="form-control"
                  value={filters.dateTo}
                  onChange={(e) => onFilterChange('dateTo', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Filters

