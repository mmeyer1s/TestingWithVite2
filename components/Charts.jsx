import React, { useEffect, useRef } from 'react'

function Charts({ filteredData }) {
  const chartRefs = {
    widget1: useRef(null),
    widget2: useRef(null),
    widget3: useRef(null),
    widget4: useRef(null),
    widget5: useRef(null),
    widget6: useRef(null),
    widget7: useRef(null),
    widget8: useRef(null),
    widget9: useRef(null),
    widget10: useRef(null)
  }

  useEffect(() => {
    if (!window.Plotly || filteredData.length === 0) return

    // Chart 1: Incidents by District
    const districtCounts = {}
    filteredData.forEach(d => {
      const district = d.District || 'Unknown'
      districtCounts[district] = (districtCounts[district] || 0) + 1
    })
    const districts = Object.keys(districtCounts).sort((a, b) => {
      const numA = parseInt(a) || 0
      const numB = parseInt(b) || 0
      return numA - numB
    })
    const counts = districts.map(d => districtCounts[d])
    if (chartRefs.widget1.current) {
      window.Plotly.newPlot(chartRefs.widget1.current, [{
        x: districts,
        y: counts,
        type: 'bar',
        marker: { color: '#4A2C2A', line: { color: '#2D1B1A', width: 1 } }
      }], {
        title: '',
        xaxis: { title: 'District' },
        yaxis: { title: 'Number of Incidents' },
        margin: { t: 20, b: 60, l: 60, r: 20 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      }, { responsive: true })
    }

    // Chart 2: Disposition Status
    const dispositionCounts = {}
    filteredData.forEach(d => {
      const disp = d.Disposition || 'Unknown'
      dispositionCounts[disp] = (dispositionCounts[disp] || 0) + 1
    })
    const dispLabels = Object.keys(dispositionCounts)
    const dispValues = Object.values(dispositionCounts)
    if (chartRefs.widget2.current) {
      window.Plotly.newPlot(chartRefs.widget2.current, [{
        labels: dispLabels,
        values: dispValues,
        type: 'pie',
        marker: { colors: ['#4A2C2A', '#8B4A3C', '#D4A574'] }
      }], {
        title: '',
        margin: { t: 20, b: 20, l: 20, r: 20 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      }, { responsive: true })
    }

    // Chart 3: Top 15 Signal Types
    const signalCounts = {}
    filteredData.forEach(d => {
      const signal = d.Signal_Description || d.Signal_Type || 'Unknown'
      signalCounts[signal] = (signalCounts[signal] || 0) + 1
    })
    const sorted = Object.entries(signalCounts).sort((a, b) => b[1] - a[1]).slice(0, 15)
    const signals = sorted.map(s => s[0])
    const signalCountsValues = sorted.map(s => s[1])
    if (chartRefs.widget3.current) {
      window.Plotly.newPlot(chartRefs.widget3.current, [{
        x: signalCountsValues,
        y: signals,
        type: 'bar',
        orientation: 'h',
        marker: { color: '#8B4A3C', line: { color: '#4A2C2A', width: 1 } }
      }], {
        title: '',
        xaxis: { title: 'Number of Incidents' },
        yaxis: { title: '' },
        margin: { t: 20, b: 60, l: 200, r: 20 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      }, { responsive: true })
    }

    // Chart 4: Time Series
    const dateCounts = {}
    filteredData.forEach(d => {
      if (d.Occurred_Date_Time) {
        try {
          const date = new Date(d.Occurred_Date_Time)
          const dateStr = date.toISOString().split('T')[0]
          dateCounts[dateStr] = (dateCounts[dateStr] || 0) + 1
        } catch (e) {}
      }
    })
    const dates = Object.keys(dateCounts).sort()
    const dateCountsValues = dates.map(d => dateCounts[d])
    if (chartRefs.widget4.current) {
      window.Plotly.newPlot(chartRefs.widget4.current, [{
        x: dates,
        y: dateCountsValues,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: '#4A2C2A', size: 4 },
        line: { color: '#8B4A3C', width: 2 }
      }], {
        title: '',
        xaxis: { title: 'Date' },
        yaxis: { title: 'Number of Incidents' },
        margin: { t: 20, b: 60, l: 60, r: 20 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      }, { responsive: true })
    }

    // Chart 5: Offender Gender
    const offenderGenderCounts = {}
    filteredData.forEach(d => {
      const gender = d.Offender_Gender || 'Unknown'
      if (gender && gender !== '') {
        offenderGenderCounts[gender] = (offenderGenderCounts[gender] || 0) + 1
      }
    })
    const offenderGenderLabels = Object.keys(offenderGenderCounts)
    const offenderGenderValues = Object.values(offenderGenderCounts)
    if (chartRefs.widget5.current) {
      window.Plotly.newPlot(chartRefs.widget5.current, [{
        x: offenderGenderLabels,
        y: offenderGenderValues,
        type: 'bar',
        marker: { color: '#4A2C2A', line: { color: '#2D1B1A', width: 1 } }
      }], {
        title: '',
        xaxis: { title: 'Gender' },
        yaxis: { title: 'Count' },
        margin: { t: 20, b: 60, l: 60, r: 20 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      }, { responsive: true })
    }

    // Chart 6: Offender Race
    const offenderRaceCounts = {}
    filteredData.forEach(d => {
      const race = d.Offender_Race || 'Unknown'
      if (race && race !== '') {
        offenderRaceCounts[race] = (offenderRaceCounts[race] || 0) + 1
      }
    })
    const offenderRaceSorted = Object.entries(offenderRaceCounts).sort((a, b) => b[1] - a[1])
    const offenderRaceLabels = offenderRaceSorted.map(r => r[0])
    const offenderRaceValues = offenderRaceSorted.map(r => r[1])
    if (chartRefs.widget6.current) {
      window.Plotly.newPlot(chartRefs.widget6.current, [{
        x: offenderRaceLabels,
        y: offenderRaceValues,
        type: 'bar',
        marker: { color: '#8B4A3C', line: { color: '#4A2C2A', width: 1 } }
      }], {
        title: '',
        xaxis: { title: 'Race' },
        yaxis: { title: 'Count' },
        margin: { t: 20, b: 60, l: 60, r: 20 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      }, { responsive: true })
    }

    // Chart 7: Victim Gender
    const victimGenderCounts = {}
    filteredData.forEach(d => {
      const gender = d.Victim_Gender || 'Unknown'
      if (gender && gender !== '' && gender !== 'UNKNOWN') {
        victimGenderCounts[gender] = (victimGenderCounts[gender] || 0) + 1
      }
    })
    const victimGenderLabels = Object.keys(victimGenderCounts)
    const victimGenderValues = Object.values(victimGenderCounts)
    if (chartRefs.widget7.current) {
      window.Plotly.newPlot(chartRefs.widget7.current, [{
        x: victimGenderLabels,
        y: victimGenderValues,
        type: 'bar',
        marker: { color: '#D4A574', line: { color: '#8B4A3C', width: 1 } }
      }], {
        title: '',
        xaxis: { title: 'Gender' },
        yaxis: { title: 'Count' },
        margin: { t: 20, b: 60, l: 60, r: 20 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      }, { responsive: true })
    }

    // Chart 8: Victim Race
    const victimRaceCounts = {}
    filteredData.forEach(d => {
      const race = d.Victim_Race || 'Unknown'
      if (race && race !== '' && race !== 'UNKNOWN') {
        victimRaceCounts[race] = (victimRaceCounts[race] || 0) + 1
      }
    })
    const victimRaceSorted = Object.entries(victimRaceCounts).sort((a, b) => b[1] - a[1])
    const victimRaceLabels = victimRaceSorted.map(r => r[0])
    const victimRaceValues = victimRaceSorted.map(r => r[1])
    if (chartRefs.widget8.current) {
      window.Plotly.newPlot(chartRefs.widget8.current, [{
        x: victimRaceLabels,
        y: victimRaceValues,
        type: 'bar',
        marker: { color: '#D4A574', line: { color: '#8B4A3C', width: 1 } }
      }], {
        title: '',
        xaxis: { title: 'Race' },
        yaxis: { title: 'Count' },
        margin: { t: 20, b: 60, l: 60, r: 20 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      }, { responsive: true })
    }

    // Chart 9: Offender Age
    const offenderAges = filteredData
      .map(d => {
        const age = parseInt(d.Offender_Age)
        return isNaN(age) ? null : age
      })
      .filter(age => age !== null && age > 0 && age < 120)
    if (chartRefs.widget9.current) {
      window.Plotly.newPlot(chartRefs.widget9.current, [{
        x: offenderAges,
        type: 'histogram',
        marker: { color: '#4A2C2A', line: { color: '#2D1B1A', width: 1 } },
        nbinsx: 20
      }], {
        title: '',
        xaxis: { title: 'Age' },
        yaxis: { title: 'Frequency' },
        margin: { t: 20, b: 60, l: 60, r: 20 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      }, { responsive: true })
    }

    // Chart 10: Victim Age
    const victimAges = filteredData
      .map(d => {
        const age = parseInt(d.Victim_Age)
        return isNaN(age) ? null : age
      })
      .filter(age => age !== null && age > 0 && age < 120)
    if (chartRefs.widget10.current) {
      window.Plotly.newPlot(chartRefs.widget10.current, [{
        x: victimAges,
        type: 'histogram',
        marker: { color: '#D4A574', line: { color: '#8B4A3C', width: 1 } },
        nbinsx: 20
      }], {
        title: '',
        xaxis: { title: 'Age' },
        yaxis: { title: 'Frequency' },
        margin: { t: 20, b: 60, l: 60, r: 20 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      }, { responsive: true })
    }
  }, [filteredData])

  return (
    <section className="reports-section">
      <div className="container">
        <div className="widget-card card">
          <div className="card-body">
            <h2 className="widget-title card-title">Incidents by District</h2>
            <div ref={chartRefs.widget1} className="widget-content"></div>
          </div>
        </div>
        
        <div className="widget-card card">
          <div className="card-body">
            <h2 className="widget-title card-title">Disposition Status</h2>
            <div ref={chartRefs.widget2} className="widget-content"></div>
          </div>
        </div>
        
        <div className="widget-card card">
          <div className="card-body">
            <h2 className="widget-title card-title">Top 15 Signal Types</h2>
            <div ref={chartRefs.widget3} className="widget-content"></div>
          </div>
        </div>
        
        <div className="widget-card card">
          <div className="card-body">
            <h2 className="widget-title card-title">Incidents Over Time</h2>
            <div ref={chartRefs.widget4} className="widget-content"></div>
          </div>
        </div>
        
        <div className="widget-card card">
          <div className="card-body">
            <h2 className="widget-title card-title">Offender Demographics - Gender</h2>
            <div ref={chartRefs.widget5} className="widget-content"></div>
          </div>
        </div>
        
        <div className="widget-card card">
          <div className="card-body">
            <h2 className="widget-title card-title">Offender Demographics - Race</h2>
            <div ref={chartRefs.widget6} className="widget-content"></div>
          </div>
        </div>
        
        <div className="widget-card card">
          <div className="card-body">
            <h2 className="widget-title card-title">Victim Demographics - Gender</h2>
            <div ref={chartRefs.widget7} className="widget-content"></div>
          </div>
        </div>
        
        <div className="widget-card card">
          <div className="card-body">
            <h2 className="widget-title card-title">Victim Demographics - Race</h2>
            <div ref={chartRefs.widget8} className="widget-content"></div>
          </div>
        </div>
        
        <div className="widget-card card">
          <div className="card-body">
            <h2 className="widget-title card-title">Offender Age Distribution</h2>
            <div ref={chartRefs.widget9} className="widget-content"></div>
          </div>
        </div>
        
        <div className="widget-card card">
          <div className="card-body">
            <h2 className="widget-title card-title">Victim Age Distribution</h2>
            <div ref={chartRefs.widget10} className="widget-content"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Charts

