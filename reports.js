import './style.css'

const app = document.querySelector('#reports-app')

let csvData = []
let filteredData = []

function renderHeader() {
  return `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <span class="logo-icon">📊</span>
            <span class="logo-text">Police Reports Analysis</span>
          </div>
          <nav class="nav-links">
            <a href="/" class="nav-link btn btn-outline-light btn-sm">← Back to Store</a>
          </nav>
        </div>
      </div>
    </header>
  `
}

function renderHero() {
  return `
    <section class="hero" style="padding: 3rem 0;">
      <div class="container">
        <h1 class="hero-title" style="font-size: 2.5rem;">Electronic Police Reports 2025</h1>
        <p class="hero-subtitle">Interactive analysis and visualization</p>
      </div>
    </section>
  `
}

function renderFilters() {
  const districts = [...new Set(csvData.map(d => d.District).filter(Boolean))].sort()
  const dispositions = [...new Set(csvData.map(d => d.Disposition).filter(Boolean))]
  const signalTypes = [...new Set(csvData.map(d => d.Signal_Type).filter(Boolean))].sort()
  
  return `
    <section class="reports-section">
      <div class="container">
        <div class="widget-card card">
          <div class="card-body">
            <h2 class="widget-title card-title">Filter Data</h2>
            <div class="filter-controls row g-3">
              <div class="filter-control col-md-6 col-lg">
                <label class="form-label">District</label>
                <select id="filter-district" class="form-select" onchange="applyFilters()">
                  <option value="">All Districts</option>
                  ${districts.map(d => `<option value="${d}">District ${d}</option>`).join('')}
                </select>
              </div>
              <div class="filter-control col-md-6 col-lg">
                <label class="form-label">Disposition</label>
                <select id="filter-disposition" class="form-select" onchange="applyFilters()">
                  <option value="">All Statuses</option>
                  ${dispositions.map(d => `<option value="${d}">${d}</option>`).join('')}
                </select>
              </div>
              <div class="filter-control col-md-6 col-lg">
                <label class="form-label">Signal Type</label>
                <select id="filter-signal" class="form-select" onchange="applyFilters()">
                  <option value="">All Types</option>
                  ${signalTypes.map(s => `<option value="${s}">${s}</option>`).join('')}
                </select>
              </div>
              <div class="filter-control col-md-6 col-lg">
                <label class="form-label">Date From</label>
                <input type="date" id="filter-date-from" class="form-control" onchange="applyFilters()" />
              </div>
              <div class="filter-control col-md-6 col-lg">
                <label class="form-label">Date To</label>
                <input type="date" id="filter-date-to" class="form-control" onchange="applyFilters()" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
}

function renderStats() {
  const totalIncidents = filteredData.length
  const openCases = filteredData.filter(d => d.Disposition === 'OPEN').length
  const closedCases = filteredData.filter(d => d.Disposition === 'CLOSED').length
  const uniqueDistricts = new Set(filteredData.map(d => d.District).filter(Boolean)).size
  
  return `
    <div class="container">
      <div class="stats-grid row g-4">
        <div class="col-md-6 col-lg-3">
          <div class="stat-card">
            <div class="stat-value">${totalIncidents.toLocaleString()}</div>
            <div class="stat-label">Total Incidents</div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="stat-card">
            <div class="stat-value">${openCases.toLocaleString()}</div>
            <div class="stat-label">Open Cases</div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="stat-card">
            <div class="stat-value">${closedCases.toLocaleString()}</div>
            <div class="stat-label">Closed Cases</div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="stat-card">
            <div class="stat-value">${uniqueDistricts}</div>
            <div class="stat-label">Districts</div>
          </div>
        </div>
      </div>
    </div>
  `
}

function renderWidgets() {
  return `
    <section class="reports-section">
      <div class="container">
        <div class="loading-message" id="loading">
          <div class="spinner"></div>
          <p>Loading and analyzing data...</p>
        </div>
        
        <div id="widgets-container" style="display: none;">
          ${renderStats()}
          
          <div class="widget-card card">
            <div class="card-body">
              <h2 class="widget-title card-title">Incidents by District</h2>
              <div id="widget1" class="widget-content"></div>
            </div>
          </div>
          
          <div class="widget-card card">
            <div class="card-body">
              <h2 class="widget-title card-title">Disposition Status</h2>
              <div id="widget2" class="widget-content"></div>
            </div>
          </div>
          
          <div class="widget-card card">
            <div class="card-body">
              <h2 class="widget-title card-title">Top 15 Signal Types</h2>
              <div id="widget3" class="widget-content"></div>
            </div>
          </div>
          
          <div class="widget-card card">
            <div class="card-body">
              <h2 class="widget-title card-title">Incidents Over Time</h2>
              <div id="widget4" class="widget-content"></div>
            </div>
          </div>
          
          <div class="widget-card card">
            <div class="card-body">
              <h2 class="widget-title card-title">Offender Demographics - Gender</h2>
              <div id="widget5" class="widget-content"></div>
            </div>
          </div>
          
          <div class="widget-card card">
            <div class="card-body">
              <h2 class="widget-title card-title">Offender Demographics - Race</h2>
              <div id="widget6" class="widget-content"></div>
            </div>
          </div>
          
          <div class="widget-card card">
            <div class="card-body">
              <h2 class="widget-title card-title">Victim Demographics - Gender</h2>
              <div id="widget7" class="widget-content"></div>
            </div>
          </div>
          
          <div class="widget-card card">
            <div class="card-body">
              <h2 class="widget-title card-title">Victim Demographics - Race</h2>
              <div id="widget8" class="widget-content"></div>
            </div>
          </div>
          
          <div class="widget-card card">
            <div class="card-body">
              <h2 class="widget-title card-title">Offender Age Distribution</h2>
              <div id="widget9" class="widget-content"></div>
            </div>
          </div>
          
          <div class="widget-card card">
            <div class="card-body">
              <h2 class="widget-title card-title">Victim Age Distribution</h2>
              <div id="widget10" class="widget-content"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
}

function renderFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 Cocoa Rave. Police report data analysis.</p>
        <p>Interactive visualizations powered by Plotly.js</p>
      </div>
    </footer>
  `
}

function render() {
  app.innerHTML = `
    ${renderHeader()}
    ${renderHero()}
    ${renderFilters()}
    ${renderWidgets()}
    ${renderFooter()}
  `
}

// Chart creation functions
function createDistrictChart(data) {
  const districtCounts = {}
  data.forEach(d => {
    const district = d.District || 'Unknown'
    districtCounts[district] = (districtCounts[district] || 0) + 1
  })
  
  const districts = Object.keys(districtCounts).sort((a, b) => {
    const numA = parseInt(a) || 0
    const numB = parseInt(b) || 0
    return numA - numB
  })
  const counts = districts.map(d => districtCounts[d])
  
  const trace = {
    x: districts,
    y: counts,
    type: 'bar',
    marker: {
      color: '#4A2C2A',
      line: { color: '#2D1B1A', width: 1 }
    }
  }
  
  const layout = {
    title: '',
    xaxis: { title: 'District' },
    yaxis: { title: 'Number of Incidents' },
    margin: { t: 20, b: 60, l: 60, r: 20 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)'
  }
  
  Plotly.newPlot('widget1', [trace], layout, { responsive: true })
}

function createDispositionChart(data) {
  const dispositionCounts = {}
  data.forEach(d => {
    const disp = d.Disposition || 'Unknown'
    dispositionCounts[disp] = (dispositionCounts[disp] || 0) + 1
  })
  
  const labels = Object.keys(dispositionCounts)
  const values = Object.values(dispositionCounts)
  
  const trace = {
    labels: labels,
    values: values,
    type: 'pie',
    marker: {
      colors: ['#4A2C2A', '#8B4A3C', '#D4A574']
    }
  }
  
  const layout = {
    title: '',
    margin: { t: 20, b: 20, l: 20, r: 20 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)'
  }
  
  Plotly.newPlot('widget2', [trace], layout, { responsive: true })
}

function createSignalTypeChart(data) {
  const signalCounts = {}
  data.forEach(d => {
    const signal = d.Signal_Description || d.Signal_Type || 'Unknown'
    signalCounts[signal] = (signalCounts[signal] || 0) + 1
  })
  
  const sorted = Object.entries(signalCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
  
  const signals = sorted.map(s => s[0])
  const counts = sorted.map(s => s[1])
  
  const trace = {
    x: counts,
    y: signals,
    type: 'bar',
    orientation: 'h',
    marker: {
      color: '#8B4A3C',
      line: { color: '#4A2C2A', width: 1 }
    }
  }
  
  const layout = {
    title: '',
    xaxis: { title: 'Number of Incidents' },
    yaxis: { title: '' },
    margin: { t: 20, b: 60, l: 200, r: 20 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)'
  }
  
  Plotly.newPlot('widget3', [trace], layout, { responsive: true })
}

function createTimeSeriesChart(data) {
  const dateCounts = {}
  data.forEach(d => {
    if (d.Occurred_Date_Time) {
      try {
        const date = new Date(d.Occurred_Date_Time)
        const dateStr = date.toISOString().split('T')[0]
        dateCounts[dateStr] = (dateCounts[dateStr] || 0) + 1
      } catch (e) {
        // Skip invalid dates
      }
    }
  })
  
  const dates = Object.keys(dateCounts).sort()
  const counts = dates.map(d => dateCounts[d])
  
  const trace = {
    x: dates,
    y: counts,
    type: 'scatter',
    mode: 'lines+markers',
    marker: { color: '#4A2C2A', size: 4 },
    line: { color: '#8B4A3C', width: 2 }
  }
  
  const layout = {
    title: '',
    xaxis: { title: 'Date' },
    yaxis: { title: 'Number of Incidents' },
    margin: { t: 20, b: 60, l: 60, r: 20 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)'
  }
  
  Plotly.newPlot('widget4', [trace], layout, { responsive: true })
}

function createOffenderGenderChart(data) {
  const genderCounts = {}
  data.forEach(d => {
    const gender = d.Offender_Gender || 'Unknown'
    if (gender && gender !== '') {
      genderCounts[gender] = (genderCounts[gender] || 0) + 1
    }
  })
  
  const labels = Object.keys(genderCounts)
  const values = Object.values(genderCounts)
  
  const trace = {
    labels: labels,
    values: values,
    type: 'bar',
    marker: {
      color: '#4A2C2A',
      line: { color: '#2D1B1A', width: 1 }
    }
  }
  
  const layout = {
    title: '',
    xaxis: { title: 'Gender' },
    yaxis: { title: 'Count' },
    margin: { t: 20, b: 60, l: 60, r: 20 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)'
  }
  
  Plotly.newPlot('widget5', [trace], layout, { responsive: true })
}

function createOffenderRaceChart(data) {
  const raceCounts = {}
  data.forEach(d => {
    const race = d.Offender_Race || 'Unknown'
    if (race && race !== '') {
      raceCounts[race] = (raceCounts[race] || 0) + 1
    }
  })
  
  const sorted = Object.entries(raceCounts)
    .sort((a, b) => b[1] - a[1])
  
  const races = sorted.map(r => r[0])
  const counts = sorted.map(r => r[1])
  
  const trace = {
    x: races,
    y: counts,
    type: 'bar',
    marker: {
      color: '#8B4A3C',
      line: { color: '#4A2C2A', width: 1 }
    }
  }
  
  const layout = {
    title: '',
    xaxis: { title: 'Race' },
    yaxis: { title: 'Count' },
    margin: { t: 20, b: 60, l: 60, r: 20 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)'
  }
  
  Plotly.newPlot('widget6', [trace], layout, { responsive: true })
}

function createVictimGenderChart(data) {
  const genderCounts = {}
  data.forEach(d => {
    const gender = d.Victim_Gender || 'Unknown'
    if (gender && gender !== '' && gender !== 'UNKNOWN') {
      genderCounts[gender] = (genderCounts[gender] || 0) + 1
    }
  })
  
  const labels = Object.keys(genderCounts)
  const values = Object.values(genderCounts)
  
  const trace = {
    labels: labels,
    values: values,
    type: 'bar',
    marker: {
      color: '#D4A574',
      line: { color: '#8B4A3C', width: 1 }
    }
  }
  
  const layout = {
    title: '',
    xaxis: { title: 'Gender' },
    yaxis: { title: 'Count' },
    margin: { t: 20, b: 60, l: 60, r: 20 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)'
  }
  
  Plotly.newPlot('widget7', [trace], layout, { responsive: true })
}

function createVictimRaceChart(data) {
  const raceCounts = {}
  data.forEach(d => {
    const race = d.Victim_Race || 'Unknown'
    if (race && race !== '' && race !== 'UNKNOWN') {
      raceCounts[race] = (raceCounts[race] || 0) + 1
    }
  })
  
  const sorted = Object.entries(raceCounts)
    .sort((a, b) => b[1] - a[1])
  
  const races = sorted.map(r => r[0])
  const counts = sorted.map(r => r[1])
  
  const trace = {
    x: races,
    y: counts,
    type: 'bar',
    marker: {
      color: '#D4A574',
      line: { color: '#8B4A3C', width: 1 }
    }
  }
  
  const layout = {
    title: '',
    xaxis: { title: 'Race' },
    yaxis: { title: 'Count' },
    margin: { t: 20, b: 60, l: 60, r: 20 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)'
  }
  
  Plotly.newPlot('widget8', [trace], layout, { responsive: true })
}

function createOffenderAgeChart(data) {
  const ages = data
    .map(d => {
      const age = parseInt(d.Offender_Age)
      return isNaN(age) ? null : age
    })
    .filter(age => age !== null && age > 0 && age < 120)
  
  const trace = {
    x: ages,
    type: 'histogram',
    marker: {
      color: '#4A2C2A',
      line: { color: '#2D1B1A', width: 1 }
    },
    nbinsx: 20
  }
  
  const layout = {
    title: '',
    xaxis: { title: 'Age' },
    yaxis: { title: 'Frequency' },
    margin: { t: 20, b: 60, l: 60, r: 20 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)'
  }
  
  Plotly.newPlot('widget9', [trace], layout, { responsive: true })
}

function createVictimAgeChart(data) {
  const ages = data
    .map(d => {
      const age = parseInt(d.Victim_Age)
      return isNaN(age) ? null : age
    })
    .filter(age => age !== null && age > 0 && age < 120)
  
  const trace = {
    x: ages,
    type: 'histogram',
    marker: {
      color: '#D4A574',
      line: { color: '#8B4A3C', width: 1 }
    },
    nbinsx: 20
  }
  
  const layout = {
    title: '',
    xaxis: { title: 'Age' },
    yaxis: { title: 'Frequency' },
    margin: { t: 20, b: 60, l: 60, r: 20 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)'
  }
  
  Plotly.newPlot('widget10', [trace], layout, { responsive: true })
}

function createAllCharts() {
  createDistrictChart(filteredData)
  createDispositionChart(filteredData)
  createSignalTypeChart(filteredData)
  createTimeSeriesChart(filteredData)
  createOffenderGenderChart(filteredData)
  createOffenderRaceChart(filteredData)
  createVictimGenderChart(filteredData)
  createVictimRaceChart(filteredData)
  createOffenderAgeChart(filteredData)
  createVictimAgeChart(filteredData)
}

window.applyFilters = function() {
  const districtFilter = document.getElementById('filter-district')?.value || ''
  const dispositionFilter = document.getElementById('filter-disposition')?.value || ''
  const signalFilter = document.getElementById('filter-signal')?.value || ''
  const dateFrom = document.getElementById('filter-date-from')?.value || ''
  const dateTo = document.getElementById('filter-date-to')?.value || ''
  
  filteredData = csvData.filter(d => {
    if (districtFilter && d.District !== districtFilter) return false
    if (dispositionFilter && d.Disposition !== dispositionFilter) return false
    if (signalFilter && d.Signal_Type !== signalFilter) return false
    
    if (dateFrom || dateTo) {
      try {
        const incidentDate = d.Occurred_Date_Time ? new Date(d.Occurred_Date_Time) : null
        if (incidentDate) {
          if (dateFrom && incidentDate < new Date(dateFrom)) return false
          if (dateTo && incidentDate > new Date(dateTo + 'T23:59:59')) return false
        }
      } catch (e) {
        // Skip if date parsing fails
      }
    }
    
    return true
  })
  
  // Update stats
  const statsContainer = document.querySelector('.stats-grid')?.parentElement
  if (statsContainer) {
    statsContainer.innerHTML = renderStats()
  }
  
  // Update charts
  createAllCharts()
}

// Load CSV data
function loadData() {
  Papa.parse('/police-reports.csv', {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
      csvData = results.data
      filteredData = csvData
      
      document.getElementById('loading').style.display = 'none'
      document.getElementById('widgets-container').style.display = 'block'
      
      createAllCharts()
    },
    error: function(error) {
      console.error('Error loading CSV:', error)
      document.getElementById('loading').innerHTML = `
        <p style="color: red;">Error loading data. Please check the console.</p>
      `
    }
  })
}

render()
loadData()

