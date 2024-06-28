import React from 'react'
import {Line, Bar, Pie } from 'react-chartjs-2';

function Squadreview() {
    const acquisitionChart1Data = {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [{
          data: [4,2.5,5,3,5],
          borderWidth: 1,
          fill: false,
          backgroundColor: '#fff',
          borderColor: '#fff'
        }]
      };
    
      const acquisitionChart1Options = {
        scales: {
          yAxes: [{
            display: false,
            ticks: {
              display: false,
            },
            gridLines: {
              drawBorder: false,
              display: false
            }
          }],
          xAxes: [{
            display: false,
            barThickness: 5.5,
            ticks: {
              display: false,
            },
            gridLines: {
              drawBorder: false,
              display: false
            }
          }]
    
        },
        legend: {
          display: false
        },
        elements: {
          point: {
            radius: 0
          }
        }
      };
    
      const acquisitionChart2Data = {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [{
          data: [5,2,3,5,1.5],
          borderWidth: 1,
          fill: false,
          backgroundColor: '#fff',
          borderColor: '#fff'
        }]
      };
    
      const acquisitionChart2Options = {
        scales: {
          yAxes: [{
            display: false,
            ticks: {
              display: false,
            },
            gridLines: {
              drawBorder: false,
              display: false
            }
          }],
          xAxes: [{
            display: false,
            barThickness: 5.5,
            ticks: {
              display: false,
            },
            gridLines: {
              drawBorder: false,
              display: false
            }
          }]
    
        },
        legend: {
          display: false
        },
        elements: {
          point: {
            radius: 0
          }
        }
      };
    
      const sessionsChart1Data = {
        labels: ['Search', 'Email'],
        datasets: [{
          data: [40,60],
          backgroundColor: ['#007bff', '#cad0e8'],
          borderColor: ['#007bff', '#cad0e8'],
        }]
      };
    
      const sessionsChart1Options = {
        cutoutPercentage: 78,
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: false,
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      };
    
      const sessionsChart2Data = {
        labels: ['Search', 'Email'],
        datasets: [{
          data: [25,75],
          backgroundColor: ['#00cccc', '#cad0e8'],
          borderColor: ['#00cccc', '#cad0e8']
        }]
      };
    
      const sessionsChart2Options = {
        cutoutPercentage: 78,
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: false,
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      };
    
  return (
    <div>
        <div className="row row-sm mg-b-20 mg-lg-b-0">
              <div className="col-lg-5 col-xl-4">
                <div className="row row-sm">
                  <div className="col-md-6 col-lg-12 mg-b-20 mg-md-b-0 mg-lg-b-20">
                    <div className="card card-dashboard-five">
                      <div className="card-header">
                        <h6 className="card-title">Acquisition</h6>
                        <span className="card-text">Tells you where your visitors originated from, such as search engines, social networks or website referrals.</span>
                      </div>{/* card-header */}
                      <div className="card-body row row-sm">
                        <div className="col-6 d-sm-flex align-items-center">
                          <div className="card-chart bg-primary acquisition-chart">
                            <Bar className="w-50" data={this.acquisitionChart1Data} options={this.acquisitionChart1Options} />
                          </div>
                          <div>
                            <label>Bounce Rate</label>
                            <h4>33.50%</h4>
                          </div>
                        </div>{/* col */}
                        <div className="col-6 d-sm-flex align-items-center">
                          <div className="card-chart bg-purple acquisition-chart">
                            <Bar data={this.acquisitionChart2Data} options={this.acquisitionChart2Options} />
                          </div>
                          <div>
                            <label>Sessions</label>
                            <h4>9,065</h4>
                          </div>
                        </div>{/* col */}
                      </div>{/* card-body */}
                    </div>{/* card-dashboard-five */}
                  </div>{/* col */}
                </div>{/* row */}
              </div>{/* col-lg-3 */}
    </div>
    </div>
  )
}

export default Squadreview;