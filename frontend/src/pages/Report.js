//client ra sample ko table value haru halna baki xa

import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Try.css';
import { Line } from 'react-chartjs-2';
import { LinearScale,CategoryScale, PointElement,LineElement  } from 'chart.js';
import { Chart } from 'chart.js';
import { useLocation } from 'react-router-dom';
import qrcode from '../qrcode.png'
import DynamicChart from './DynamicChart';


function Report () {
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

    const use = location.state.dataF.slice();
    console.log(use);
    const data2 = use.slice();
    console.log("unsorted = " + data2);
    data2.sort((a, b) => a.dd - b.dd);
    const MDD = data2[4].dd; 
    const OMC = data2[4].mc;

    const chartData = {
        labels: [use[4].mc,use[3].mc,use[2].mc,use[1].mc,use[0].mc],
        datasets: [
          {
            label: 'Data',
            data: [use[0].dd,use[1].dd,use[2].dd,use[3].dd,use[4].dd],
            fill: false,
            borderColor: 'rgb(0, 0, 250)',
            tension: 0.4,
          },
        ],
      };
      
      const chartOptions = {
        scales: {
          y: {
            beginAtZero: false,
          },
          x: {
            beginAtZero: true,
          }
        },
      };


return (
    <div>
    <whole>
    <section>
  <div class="containerreport">
    <div>
        <div>
             <div className='headin'>
             <div className='Headwords'>
                    <h1>Barahi Technical Solutions</h1>
                    <p>Pokhara-8</p>
                    </div>
            <img className='qr'src={qrcode} alt='qrcode'/>
            </div>
            <div>
                <table>
                    <tr>
                        <td className='prac'>Project:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className='prac'>Client:</td>
                        <td>{use[0].name}</td>
                    </tr>
                    <tr>
                        <td className='prac'>Contractor:</td>
                        <td>{use[0].contractor}</td>
                    </tr>
                    <tr>
                        <td className='prac'>Consultant:</td>
                        <td>{use[0].consultant}</td>
                    </tr>
                </table>
            </div>
            <div>
                <table>
                    <tr>
                        <td>RFI No:</td>
                        <td>{use[0].s_id}</td>
                        <td>Date of Sampled:</td>
                        <td>{use[0].s_date}</td>
                    </tr>
                    <tr>
                        <td>Lab Ref. No:</td>
                        <td>{use[0].s_id}</td>
                        <td>Date of Tested:</td>
                        <td>{use[0].t_date}</td>
                    </tr>
                    <tr>
                        <td>Source:</td>
                        <td>{use[0].source}</td>
                        <td>Report No:</td>
                        <td>{use[0].s_id}</td>
                    </tr>
                    <tr>
                        <td>Type of Materials:</td>
                        <td>{use[0].type}</td>
                        <td>Mould No:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Sampled From:</td>
                        <td>{use[0].s_from}</td>
                        <td>Wt. of Mould in gm(W):</td>
                        <td>{use[0].wm}</td>
                    </tr>
                    <tr>
                        <td>Representative Area:</td>
                        <td>{use[0].area}</td>
                        <td>Volume of Mould in cc(V):</td>
                        <td>{use[0].vm}</td>
                    </tr>
                    <tr>
                        <td>Sampled By:</td>
                        <td>{use[0].s_by}</td>
                        <td>Tested By:</td>
                        <td>{use[0].t_by}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div>
            <p className='words'>DRY DENSITY OBSERVATION</p>
            <table>
                <tr>
                    <th>Test No.</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                </tr>
                <tr>
                    <td>Weight of Soil+ Mould (gms)</td>
                    <td>{use[4].wsm}</td>
                    <td>{use[3].wsm}</td>
                    <td>{use[2].wsm}</td>
                    <td>{use[1].wsm}</td>
                    <td>{use[0].wsm}</td>
                </tr>
                <tr>
                    <td>Weight of Mould (gms)</td>
                    <td>{use[4].wm}</td>
                    <td>{use[3].wm}</td>
                    <td>{use[2].wm}</td>
                    <td>{use[1].wm}</td>
                    <td>{use[0].wm}</td>
                </tr>
                <tr>
                    <td>Weight of Wet Soil (gms)</td>
                    <td>{use[4].wws}</td>
                    <td>{use[3].wws}</td>
                    <td>{use[2].wws}</td>
                    <td>{use[1].wws}</td>
                    <td>{use[0].wws}</td>
                </tr>
                <tr>
                    <td>Weight Density (gms/cc)</td>
                    <td>{use[4].wd}</td>
                    <td>{use[3].wd}</td>
                    <td>{use[2].wd}</td>
                    <td>{use[1].wd}</td>
                    <td>{use[0].wd}</td>
                </tr>
                <tr>
                    <td>Dry Density (gms/cc)</td>
                    <td>{use[4].dd}</td>
                    <td>{use[3].dd}</td>
                    <td>{use[2].dd}</td>
                    <td>{use[1].dd}</td>
                    <td>{use[0].dd}</td>
                </tr>
            </table>
        </div>
        <br/>
        <br/>
        <br/>
        <div>
            <p className='words'>MOISTURE CONTENT</p>
            <table>
                <tr>
                    <th>Container #</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                </tr>
                <tr>
                    <td>Weight of Wet Soil+ Container (gms)</td>
                    <td>{use[4].wwc}</td>
                    <td>{use[3].wwc}</td>
                    <td>{use[2].wwc}</td>
                    <td>{use[1].wwc}</td>
                    <td>{use[0].wwc}</td>
                </tr>
                <tr>
                    <td>Weight of Dry Soil+ Container (gms)</td>
                    <td>{use[4].wdc}</td>
                    <td>{use[3].wdc}</td>
                    <td>{use[2].wdc}</td>
                    <td>{use[1].wdc}</td>
                    <td>{use[0].wdc}</td>
                </tr>
                <tr>
                    <td>Weight of Water (gms)</td>
                    <td>{use[4].ww}</td>
                    <td>{use[3].ww}</td>
                    <td>{use[2].ww}</td>
                    <td>{use[1].ww}</td>
                    <td>{use[0].ww}</td>
                </tr>
                <tr>
                    <td>Weight of Container (gms)</td>
                    <td>{use[4].wc}</td>
                    <td>{use[3].wc}</td>
                    <td>{use[2].wc}</td>
                    <td>{use[1].wc}</td>
                    <td>{use[0].wc}</td>
                </tr>
                <tr>
                    <td>Weight of Dry Soil (gms)</td>
                    <td>{use[4].wds}</td>
                    <td>{use[3].wds}</td>
                    <td>{use[2].wds}</td>
                    <td>{use[1].wds}</td>
                    <td>{use[0].wds}</td>
                </tr>
                <tr>
                    <td>Moisture Content %</td>
                    <td>{use[4].mc}</td>
                    <td>{use[3].mc}</td>
                    <td>{use[2].mc}</td>
                    <td>{use[1].mc}</td>
                    <td>{use[0].mc}</td>
                </tr><br/>
            </table>
        </div>
        {/*<Line data={chartData} options={chartOptions}/>*/}
        <div className="chart-container">
            <Line data={chartData} options={chartOptions} />
        </div>
        <table>
            <tr>
            <th>OMC</th>
            <td></td></tr>
            <th>MDD</th>
            <td>{MDD}</td>
        </table>
       {/* <p>MDD = {MDD}</p>
        <p>OMC = {OMC}</p>*/}
        <div>
            {/*<p className='lastko'>Barahi Technical Solutions Pvt Ltd</p>
            <p className='lastko'>Witness</p>*/}
            <table>
                <tr>
                    <th>Tested By</th>
                    <th>Verified By</th>
                    <th>Contractor:</th>
                    <th>Client:</th>
                </tr>
                <tr>
                    <td>Lab Technician</td>
                    <td>Engineer</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Name:{use[0].t_by}</td>
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
    </div>
</section>
    </whole>
    </div>
);
};
export default Report;
