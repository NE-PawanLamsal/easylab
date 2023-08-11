// upload vayesi successfully add to database vanne msg dekhauna parxa

import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './MDD.css'; // Import the CSS file for the navbar component
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MDD() {
  const location = useLocation();
  var i = 1;
  const samID = location.state.data;
  const navigate = useNavigate();
  const[s_id , setSid] = useState(location.state.data);
  const[test_id , setTestId] = useState('');//yo loop vayena
  const[wsm , setWSM] = useState('');
  const[wm , setWM] = useState('');
  const[vm , setVM] = useState('');
  const[wwc , setWWC] = useState('');
  const[wdc , setWDC] = useState('');
  const[wc , setWC] = useState('');
  const[dd , setDD] = useState('');
  const[mc , setMC] = useState('');

  const calulateMDD = (e) => {
    e.preventDefault();

    // Create an object with the form data
    const formData = {
      s_id,
      test_id,
      wsm,
      wm,
      vm,
      wwc,
      wdc,
      wc,
      samID
    };

    // Send the data to server.js
    fetch('http://localhost:3001/mdd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        // receive response from server.js
        var {finalDD,finalMC} = data;
        setDD(finalDD);
        setMC(finalMC);
        console.log(dd,mc);
/*
        if(i > 5){
          navigate('/home');
        }else {
          i = i+1;
          window.location.reload();
        }
        //reload page after submit
  */ const message= "MC = "+mc+"DD = "+dd;
  toast(message);
 // Replace 2000 with the desired delay in milliseconds
})
        

      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  };
  return(

    <div>
      <nav>
      <div class="navbar">
      <img src="logo.png" class="logo"/>
      <ul>
          <li><a href="./home">Home</a></li>
          <li><a href="#">Calculate</a>
              <ul className="dropdown">
                  <li className='abcd'><a href="./clientO">OMC & MDD</a></li>
                  <li className='abcd'><a href="./clientSe">Seive Analysis</a></li>
              </ul>
          </li>
          <li><a href="#">Report</a>
              <ul className="dropdown1">
                  <li className='abcd'><a href="./searchO">OMC & MDD</a></li>
                  <li className='abcd'><a href="./searchSe">Seive Analysis</a></li>
              </ul>
            </li>
                <li><a href="#footer">Contact</a></li>
          <li><a href="#">Logout</a></li>
      </ul>
    </div> 
    <div class="yemale">
    <img src="wave1.png" class="bottom-img"/>
    </div> 
    </nav>  
    <id>
    <div class="ids">
  <form id="labForm">
    <label for="Sample Id" class="sid">Sample Id:</label>
    <input type="number" value={s_id}  class="input-field-q" required/> &emsp;
    <label for="Test Id">Test Id:</label>
    <input type="number" step="0.1"value={test_id} onChange={e => setTestId(Number(e.target.value))}class="input-field-q" required/>
  </form>
</div>   
    </id>
    <banner2>
    <section id="banner2">
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <div class="dd">
          <h2 style={{fontWeight:600}}>Dry Density Observation</h2>
          
          <label>Weight of soil + mould(gms):</label><br/>
          <input type="number"class="input-field"step="0.01" value={wsm} onChange={e => setWSM(Number(e.target.value))}/><br/>
          <label>Weight of mould(gms):</label><br/>
          <input type="number"class="input-field"step="0.01" value={wm} onChange={e=> setWM(Number(e.target.value))}/><br/>
          <label>Volume of mould(cc):</label><br/>
          <input type="number"class="input-field"step="0.01" value={vm} onChange={e=> setVM(Number(e.target.value))}/><br/>
        </div>
      </div>
      <div class="col-md-6">
        <div class="dd">
        <h2 style={{fontWeight:600}}>Moisture Content Observation</h2>
          <label>Weight of wet soil + container(gms):</label><br/>
          <input type="number"class="input-field"step="0.01" value={wwc} onChange={e=> setWWC(Number(e.target.value))}/><br/>
          <label>Weight of dry soil + container(gms):</label><br/>
          <input type="number"class="input-field"step="0.01" value={wdc} onChange={e => setWDC(Number(e.target.value))}/><br/>
          <label>Weight of container(gms):</label><br/>
          <input type="number" step="0.01"class="input-field" value={wc} onChange={e=> setWC(Number(e.target.value))}/><br/>
        </div>
      </div>
    </div>
    <div class="row">
    </div>
    <div class="hello" >
    <button class="button" onClick={calulateMDD}> Calculate </button>
    </div>
    {/* yo part hatayera successful vanne popup garaune*/}

  </div>
</section>
    </banner2>

    <footer2>
    <section id="footer2">
  <img src="wave2.png" class="footer-img"/>
  <div class="container">
    <div class="row">
      <div class="col-md-4 footer-box">
        <img src="logo.png"/>
          <p>Enquire if you wanna know more about us.</p> 
      </div>
      <div class="col-md-4 footer-box">
        <p><b>CONTACT US</b></p>
        <p>Location : Pokhara, Nepal</p>
        <p>Contact Number : 9819166303</p>
        <p>Mail : social.pawan@gmail.com</p>
      </div>
      <div class="col-md-4 footer-box">
        <p><b>CREATED BY</b></p>
        <p>Ashish Sapkota, Pawan Lamsal, Safal Shrestha & Sulav Baniya</p>
      </div>
    </div>
  </div>
</section>
    </footer2>
    <ToastContainer/>
    </div>
  );
};

export default MDD;