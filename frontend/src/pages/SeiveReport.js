
import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Try.css';
import qrcode from '../qrcode.png'
import { Line } from 'react-chartjs-2';
import { LinearScale,CategoryScale, PointElement,LineElement  } from 'chart.js';
import { Chart } from 'chart.js';
import"./chart.css"
import { useLocation } from 'react-router-dom';
import DynamicChart from './DynamicChart';


function SeiveReport () {
    Chart.register(CategoryScale);
    Chart.register(LineElement);
    Chart.register(PointElement);
    Chart.register(LinearScale);
    const location = useLocation();
    const chartRef = useRef(null);

    useEffect(() => {
      // Destroy existing chart before rendering a new one
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
    }, []);

    const rows = location.state.dataF;

    const chartData = {
        labels: rows.map(r => r.ss),
        datasets: [
          {
            label: 'Cumulative Passing (%)',
            data: rows.map(r => parseFloat(r.cp)),
            fill: false,
            borderColor: 'rgb(0, 0, 250)',
            tension: 0.4,
          },{
            label: 'Max (IS:383)',
            data: rows.map(r => parseFloat(r.max)),
            fill: false,
            borderColor: 'rgb(250, 0, 0)',
            tension: 0.4,
          },{
            label: 'Min (IS:383)',
            data: rows.map(r => parseFloat(r.min)),
            fill: false,
            borderColor: 'rgb(0, 200, 0)',
            tension: 0.4,
          },
        ],
      };
      
      const chartOptions = {
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            beginAtZero: true,
          },
        },
      };

     return (
        <div>
            <div className='headin'>
                 <div className='words'>
                        <h1>Barahi Technical Solutions</h1>
                        <p>Pokhara-8</p>
                </div>
                <div>
                        <img className='qr' src={qrcode} alt='qrcode'/>
                </div>
            </div>
            <div>    
                <div>
                    <table>
                        <tr>
                            <td className='prac'>Project:</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className='prac'>Client:</td>
                            <td>{location.state.dataF[0].name}</td>
                        </tr>
                        <tr>
                            <td className='prac'>Contractor:</td>
                            <td>{location.state.dataF[0].contractor}</td>
                        </tr>
                        <tr>
                            <td className='prac'>Consultant:</td>
                            <td>{location.state.dataF[0].consultant}</td>
                        </tr>
                    </table>
                </div>
                <div>
                    <table>
                        <tr>
                            <td>RFI No:</td>
                            <td>{location.state.dataF[0].samID}</td>
                            <td>Lab Ref. No:</td>
                            <td>{location.state.dataF[0].samID}</td>
                        </tr>
                        <tr>
                            <td>Source/Location of Material:</td>
                            <td>{location.state.dataF[0].source}</td>
                            <td>Sampling Date:</td>
                            <td>{location.state.dataF[0].s_date}</td>
                        </tr>
                        <tr>
                            <td>Material Description:</td>
                            <td></td>
                            <td>Testing Date:</td>
                            <td>{location.state.dataF[0].t_date}</td>
                        </tr>
                        <tr>
                            <td>Sampled By:</td>
                            <td>{location.state.dataF[0].s_by}</td>
                            <td>Tested By:</td>
                            <td>{location.state.dataF[0].t_by}</td>
                        </tr>
                        
                    </table>
                </div>
            </div>  
        
        <div>
        <p className='words'>Grading of Seive Analysis</p>
        <table>
            <tr>
                <th>Seive size(mm)</th>
                <th>Weight Retained(gm)</th>
                <th>Cumulative Weight Retained(gm)</th>
                <th>Cumulative Weight Retained(%)</th>
                <th>Cumulative Passing(%)</th>
                <th>Min. Specified Passing(%)</th>
                <th>Max. Specified Passing(%)</th>
                <th>Remarks</th>
            </tr>
            {rows.map((row, index) => (
                <tr key={index}>
                    <td>{row.ss}</td>
                    <td>{row.wr}</td>
                    <td>{row.cwr}</td>
                    <td>{row.cwrp}</td>
                    <td>{row.cp}</td>
                    <td>{row.min}</td>
                    <td>{row.max}</td>
                    <td></td>
                </tr>
            ))}
        </table>
        {/*<DynamicChart data={chartData} options={chartOptions} />*/}
        <div className="chart-container">
      <DynamicChart data={chartData} options={chartOptions}/>
    </div>
    </div>

    <div style={{textAlign:'center', margin:'16px 0'}}>
        <button className="button" onClick={() => window.print()}>Print Report</button>
    </div>
    <div>
        <p className='rem'>Remarks: Red Curve Represents Max. Green Represents Min. </p>
            <div className='lastko'>
            </div>
            <table>
                <tr>
                    <th>Tested By</th>
                    <th>Verified By</th>
                    <th>Contractor:</th>
                    <th>Consultant</th>
                </tr>
                <tr>
                    <td>Lab Technician</td>
                    <td>Engineer</td>
                    <td>Lab Technician</td>
                    <td>Material Engineer</td>
                </tr>
                <tr>
                    <td>Name:</td>
                    <td>Name:</td>
                    <td>Name:</td>
                    <td>Name:</td>
                </tr>
                <tr>
                    <td>Sign:</td>
                    <td>Sign:</td>
                    <td>Sign:</td>
                    <td>Sign:</td>
                </tr>

            </table>
    </div>    
    </div>
      );
      };  
export default SeiveReport;      