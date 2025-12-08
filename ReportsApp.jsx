import React, { useState, useEffect, useRef } from 'react'
import ReportsHeader from './components/ReportsHeader'
import ReportsHero from './components/ReportsHero'
import Filters from './components/Filters'
import Stats from './components/Stats'
import Charts from './components/Charts'
import Footer from './components/Footer'

function ReportsApp() {
  const [csvData, setCsvData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    district: '',
    disposition: '',
    signal: '',
    dateFrom: '',
    dateTo: ''
  })

  useEffect(() => {
    if (window.Papa) {
      window.Papa.parse('/police-reports.csv', {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
          setCsvData(results.data)
          setFilteredData(results.data)
          setLoading(false)
        },
        error: function(error) {
          console.error('Error loading CSV:', error)
          setLoading(false)
        }
      })
    } else {
      console.error('PapaParse not loaded')
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let filtered = csvData

    if (filters.district) {
      filtered = filtered.filter(d => d.District === filters.district)
    }
    if (filters.disposition) {
      filtered = filtered.filter(d => d.Disposition === filters.disposition)
    }
    if (filters.signal) {
      filtered = filtered.filter(d => d.Signal_Type === filters.signal)
    }
    if (filters.dateFrom) {
      filtered = filtered.filter(d => {
        try {
          const incidentDate = d.Occurred_Date_Time ? new Date(d.Occurred_Date_Time) : null
          return incidentDate && incidentDate >= new Date(filters.dateFrom)
        } catch (e) {
          return false
        }
      })
    }
    if (filters.dateTo) {
      filtered = filtered.filter(d => {
        try {
          const incidentDate = d.Occurred_Date_Time ? new Date(d.Occurred_Date_Time) : null
          return incidentDate && incidentDate <= new Date(filters.dateTo + 'T23:59:59')
        } catch (e) {
          return false
        }
      })
    }

    setFilteredData(filtered)
  }, [csvData, filters])

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <ReportsHeader />
      <ReportsHero />
      {!loading && csvData.length > 0 && (
        <>
          <Filters 
            csvData={csvData} 
            filters={filters} 
            onFilterChange={handleFilterChange} 
          />
          <Stats filteredData={filteredData} />
          <Charts filteredData={filteredData} />
        </>
      )}
      {loading && (
        <div className="loading-message">
          <div className="spinner"></div>
          <p>Loading and analyzing data...</p>
        </div>
      )}
      <Footer isReportsPage={true} />
    </>
  )
}

export default ReportsApp

