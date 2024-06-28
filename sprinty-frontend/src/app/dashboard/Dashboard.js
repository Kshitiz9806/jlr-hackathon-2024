import React, { Component } from 'react'
import {Line, Bar, Pie } from 'react-chartjs-2';

export class Dashboard extends Component { 
  sprintMatchingEfficiencyData = {
    labels: ['PI1.S1', 'PI1.S2', 'PI1.S3', 'PI1.S4', 'PI1.S5', 'PI1.S6', 'PI2.S1', 'PI2.S2', 'PI2.S3', 'PI2.S4', 'PI2.S5', 'PI2.S6'],
    datasets: [{
        label: 'This week',
        data: [73, 77, 81, 80, 75, 71, 79, 82, 78, 77, 85, 83],
        borderWidth: 2,
      fill: true,
      backgroundColor: ['rgba(255, 255, 255, 1)'],
      borderColor: ['rgb(0, 123, 255)']
    }]
  };

  sprintMatchingEfficiencyChartOptions = {
    scales: {
      yAxes: [{
        display: true,
        gridLines: {
          drawBorder: false,
          display: true,
          drawTicks: true,
          color: '#eef0fa',
          zeroLineColor: 'rgba(90, 113, 208, 0)',
        },
        ticks: {
          display: true,
          beginAtZero: true,
          min: 0,
          max: 100,
          stepSize: 10,
          padding: 10,
        }
      }],
      xAxes: [{
        display: true,
        position: 'bottom',
        gridLines: {
          drawBorder: false,
          display: true,
          drawTicks: false,
        },
        ticks: {
          beginAtZero: true,
          stepSize: 10,
          fontColor: "#a7afb7",
          padding: 10,
        }
      }],
    },
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0
      },
      line: {
        tension: 0
      }
    },
    tooltips: {
      backgroundColor: 'rgba(2, 171, 254, 1)',
    },
  };

  bounceRateChartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51'],
    datasets: [{
      data: [27.2, 29.9, 29.6, 25.7, 25.9, 29.3, 31.1, 27.9, 28.4, 25.4, 23.2, 18.2, 14, 12.7, 11, 13.7, 9.7, 12.6, 10.9, 12.7, 13.8, 12.9, 13.8, 10.2, 5.8, 7.6, 8.8, 5.6, 5.6, 6.3, 4.2, 3.6, 5.4, 6.5, 8.1, 10.9, 7.6, 9.7, 10.9, 9.5, 5.4, 4.9, .7, 2.3, 5.5, 10, 10.6, 8.3, 8.4, 8.5, 5.8 ],
      borderWidth: 2,
      fill: true,
      backgroundColor: ['rgba(0, 204, 212, .2)'],
      borderColor: ['rgb(0, 204, 212)']
    }]
  };

  bounceRateChartOptions = {
    scales: {
      yAxes: [{
        display: false,
        gridLines: {
          drawBorder: false,
          display: true,
          drawTicks: false,
        },
        ticks: {
          display: false,
          beginAtZero: true,
          min: 0,
          max: 40,
          stepSize: 10,
        }
      }],
      xAxes: [{
        display: false,
        position: 'bottom',
        gridLines: {
          drawBorder: false,
          display: false,
          drawTicks: false,
        },
        ticks: {
          beginAtZero: true,
          stepSize: 10,
          fontColor: "#a7afb7",
          padding: 10,
        }
      }],
    },
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0
      },
      line: {
        tension: 0
      }
    },
    tooltips: {
      backgroundColor: 'rgba(2, 171, 254, 1)',
    },
  };

  totalUsersChartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
    datasets: [{
      data: [27.2, 29.9, 29.6, 25.7, 25.9, 29.3, 31.1, 27.9, 28.4, 25.4, 23.2, 18.2, 14, 12.7, 11, 13.7, 9.7, 12.6, 10.9, 12.7, 13.8],
      borderWidth: 1,
      fill: false,
      backgroundColor: '#007bff',
      borderColor: '#007bff'
    }]
  };

  totalUsersChartOptions = {
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

  allSessionsChartData = {
    labels: [0,1,2,3,4,5,6,7],
    datasets: [{
      label: '# of Votes',
      data: [2, 4, 10, 20, 45, 40, 35, 18],
      borderWidth: 1,
      fill: false,
      backgroundColor: '#560bd0'
    },
    {
      label: '# of Rate',
      data: [3, 6, 15, 35, 50, 45, 35, 25],
      borderWidth: 1,
      fill: false,
      backgroundColor: '#cad0e8'
    }]
  };

  allSessionsChartOptions = {
    scales: {
      yAxes: [{
        display: false,
        ticks: {
          beginAtZero:true,
          fontSize: 11,
          max: 80
        },
        gridLines: {
          drawBorder: false,
        }
      }],
      xAxes: [{
        barPercentage: 0.6,
        gridLines: {
          color: 'rgba(0,0,0,0.08)',
          drawBorder: false
        },
        ticks: {
          beginAtZero:true,
          fontSize: 11,
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

  sessionsChannelChartData = {
    labels: ['Search', 'Email', 'Referral', 'Social', 'Other'],
    datasets: [{
      data: [25,20,30,15,10],
      backgroundColor: ['#6f42c1', '#007bff','#17a2b8','#00cccc','#adb2bd'],
    }]
  };

  sessionsChannelChartOptions = {
    cutoutPercentage: 50,
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

  acquisitionChart1Data = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [{
      data: [4,2.5,5,3,5],
      borderWidth: 1,
      fill: false,
      backgroundColor: '#fff',
      borderColor: '#fff'
    }]
  };

  acquisitionChart1Options = {
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

  acquisitionChart2Data = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [{
      data: [5,2,3,5,1.5],
      borderWidth: 1,
      fill: false,
      backgroundColor: '#fff',
      borderColor: '#fff'
    }]
  };

  acquisitionChart2Options = {
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

  sessionsChart1Data = {
    labels: ['Search', 'Email'],
    datasets: [{
      data: [40,60],
      backgroundColor: ['#007bff', '#cad0e8'],
      borderColor: ['#007bff', '#cad0e8'],
    }]
  };

  sessionsChart1Options = {
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

  sessionsChart2Data = {
    labels: ['Search', 'Email'],
    datasets: [{
      data: [25,75],
      backgroundColor: ['#00cccc', '#cad0e8'],
      borderColor: ['#00cccc', '#cad0e8']
    }]
  };

  sessionsChart2Options = {
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

  toggleProBanner() {
    document.querySelector('.proBanner').classList.toggle("hide");
  }

  render() {
    return (
      <div>
        <div className="proBanner">
          <div>
          </div>
        </div>
        <div className="container p-md-0">
          <div className="az-content-body">
            <div className="az-dashboard-one-title">
              <div>
                <h2 className="az-dashboard-title">Hi, welcome back!</h2>
                <p className="az-dashboard-text">Skills matching and more at JLR</p>
              </div>
            </div>{/* az-dashboard-one-title */}

            <div className="az-dashboard-nav">

              <nav className="nav">
                <a className="nav-link" href="#/"><i className="far fa-save"></i> Save Report</a>
                <a className="nav-link" href="#/"><i className="far fa-file-pdf"></i> Export to PDF</a>
                <a className="nav-link" href="#/"><i className="far fa-envelope"></i>Send to Email</a>
                <a className="nav-link" href="#/"><i className="fas fa-ellipsis-h"></i></a>
              </nav>
            </div>

            <div className="row row-sm mg-b-20">
              <div className="col-lg-7 ht-lg-100p">
                <div className="card card-dashboard-one">
                  <div className="card-header">
                    <div>
                      <h6 className="card-title">Skill Matching Efficiency</h6>
                      <p className="card-text">Metric to assess skils matching efficiency for the current project</p>
                    </div>
                    <div className="btn-group">
                      <button className="btn">Sprint</button>
                      <button className="btn">PI</button>
                    </div>
                  </div>{/* card-header */}
                  <div className="card-body">
                    <div className="card-body-top">
                      <div>
                        <label className="mg-b-0">Story Points</label>
                        <h2>13,956</h2>
                      </div>
                      <div>
                        <label className="mg-b-0">Delivery </label>
                        <h2>33.50%</h2>
                      </div>
                      <div>
                        <label className="mg-b-0">Architect</label>
                        <h2>Rajesh Nagaiya</h2>
                      </div>
                      <div>
                        <label className="mg-b-0">Product Owner</label>
                        <h2>Anand Shastry</h2>
                      </div>
                    </div>{/* card-body-top */}
                    <div className="page-view-chart-wrapper" style={{ marginTop: '60px' }}>
                      <Line data={this.sprintMatchingEfficiencyData} options={this.sprintMatchingEfficiencyChartOptions} />
                    </div>{/* flot-chart-wrapper */}
                  </div>{/* card-body */}
                </div>{/* card */}
              </div>{/* col */}
              <div className="col-lg-5 mg-t-20 mg-lg-t-0">
                <div className="row row-sm">
                  <div className="col-sm-6">
                    <div className="card card-dashboard-two">
                      <div className="card-header">
                        <h6>120<i className="icon ion-md-trending-up tx-success"></i> <small>18.02%</small></h6>
                        <p>Sprint Points Per Sprint</p>
                      </div>{/* card-header */}
                      <div className="card-body">
                        <div className="chart-wrapper">
                          <Line data={this.bounceRateChartData} options={this.bounceRateChartOptions} />
                        </div>{/* chart-wrapper */}
                      </div>{/* card-body */}
                    </div>{/* card */}
                  </div>{/* col */}
                  <div className="col-sm-6 mg-t-20 mg-sm-t-0">
                    <div className="card card-dashboard-two">
                      <div className="card-header">
                        <h6>12/49 <i className="icon ion-md-trending-down tx-danger"></i> <small>0.86%</small></h6>
                        <p>Project Ranking</p>
                      </div>{/* card-header */}
                      <div className="card-body">
                        <div className="chart-wrapper">
                          <Bar data={this.totalUsersChartData} options={this.totalUsersChartOptions} />
                        </div>{/* chart-wrapper */}
                      </div>{/* card-body */}
                    </div>{/* card */}
                  </div>{/* col */}
                  <div className="col-sm-12 mg-t-20">
                    <div className="card card-dashboard-three">
                      <div className="card-header">
                        <p>Skills Improvement as a squad</p>
                        <h6>16 pts <small className="tx-success"><i className="icon ion-md-arrow-up"></i> 2.87%</small></h6>
                        <small>Skills acquired by the engineers contributing to the squad objectives over sprints.</small>
                      </div>{/* card-header */}
                      <div className="card-body">
                        <div className="chart d-flex align-items-end">
                          <Bar data={this.allSessionsChartData} options={this.allSessionsChartOptions} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{/* row */}
              </div>{/*col */}
            </div>{/* row */}

            <div className="row row-sm mg-b-20">
              <div className="col-lg-4 mg-t-20 mg-lg-t-0">
                <div className="card card-dashboard-four">
                  <div className="card-header">
                    <h6 className="card-title">Skill Matrix of the Squad</h6>
                  </div>{/* card-header */}
                  <div className="card-body row">
                    {/* <div className="col-md-6 d-flex align-items-center">
                      <div className="chart">
                        <Pie data={this.sessionsChannelChartData} options={this.sessionsChannelChartOptions} />
                      </div>
                    </div>col */}
                    <div className="col-md-12 col-lg-12 mg-lg-l-auto mg-t-20 mg-md-t-0">
                      <div className="az-traffic-detail-item">
                        <div>
                          <span>Adaptive Autosar</span>
                          <span> <span>(85%)</span></span>
                        </div>
                        <div className="progress">
                          <div className="progress-bar bg-purple wd-25p" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>{/* progress */}
                      </div>
                      <div className="az-traffic-detail-item">
                        <div>
                          <span>C++</span>
                          <span> <span>(80%)</span></span>
                        </div>
                        <div className="progress">
                          <div className="progress-bar bg-primary wd-20p" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>{/* progress */}
                      </div>
                      <div className="az-traffic-detail-item">
                        <div>
                          <span>Python</span>
                          <span> <span>(60%)</span></span>
                        </div>
                        <div className="progress">
                          <div className="progress-bar bg-info wd-30p" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>{/* progress */}
                      </div>
                      <div className="az-traffic-detail-item">
                        <div>
                          <span>Gitlab CI/CD</span>
                          <span> <span>(55%)</span></span>
                        </div>
                        <div className="progress">
                          <div className="progress-bar bg-teal wd-15p" role="progressbar" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>{/* progress */}
                      </div>
                      <div className="az-traffic-detail-item">
                        <div>
                          <span>Classic Autosar</span>
                          <span> <span>(40%)</span></span>
                        </div>
                        <div className="progress">
                          <div className="progress-bar bg-gray-500 wd-10p" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>{/* progress */}
                      </div>
                    </div>{/* col */}
                  </div>{/* card-body */}
                </div>{/* card-dashboard-four */}
              </div>{/* col */}
              <div className="col-lg-7 col-xl-8 mg-t-20 mg-lg-t-0">
                <div className="card card-table-one">
                  <h6 className="card-title">Squad Member Leaderboard</h6>
                  <p className="az-content-text mg-b-20">Engineers with best metrics in terms of skills required for the project delivery for the current sprint/PI</p>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="wd-5p">&nbsp;</th>
                          <th className="wd-45p">CDSID</th>
                          <th>Skill Points</th>
                          <th>Delivery Rate</th>
                          <th>Improvement Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><i className="flag-icon flag-icon-squared"></i></td>
                          <td><strong>United States</strong></td>
                          <td><strong>134</strong> (1.51%)</td>
                          <td>33.58%</td>
                          <td>15.47%</td>
                        </tr>
                        <tr>
                          <td><i className="flag-icon flag-icon-squared"></i></td>
                          <td><strong>United Kingdom</strong></td>
                          <td><strong>290</strong> (3.30%)</td>
                          <td>9.22%</td>
                          <td>7.99%</td>
                        </tr>
                        <tr>
                          <td><i className="flag-icon flag-icon-squared"></i></td>
                          <td><strong>India</strong></td>
                          <td><strong>250</strong> (3.00%)</td>
                          <td>20.75%</td>
                          <td>2.40%</td>
                        </tr>
                        <tr>
                          <td><i className="flag-icon flag-icon-squared"></i></td>
                          <td><strong>Canada</strong></td>
                          <td><strong>216</strong> (2.79%)</td>
                          <td>32.07%</td>
                          <td>15.09%</td>
                        </tr>
                        <tr>
                          <td><i className="flag-icon flag-icon-squared"></i></td>
                          <td><strong>France</strong></td>
                          <td><strong>216</strong> (2.79%)</td>
                          <td>32.07%</td>
                          <td>15.09%</td>
                        </tr>
                        <tr>
                          <td><i className="flag-icon flag-icon-squared"></i></td>
                          <td><strong>Philippines</strong></td>
                          <td><strong>197</strong> (2.12%)</td>
                          <td>32.07%</td>
                          <td>15.09%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>{/* table-responsive */}
                </div>{/* card */}
              </div>{/* col-lg */}
            </div>{/* row */}
          </div>{/* az-content-body */}
        </div>
      </div>
    )
  }
}

export default Dashboard
