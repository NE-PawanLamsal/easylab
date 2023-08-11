// toast ko kam baki xa

import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './MDD.css'; // Import the CSS file for the navbar component
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Client() {
  const navigate = useNavigate();
  const[Cname , setName] = useState('');
  const[contractor , setContractor] = useState('');
  const[consultant , setConsultant] = useState('');
  const[source , setSource] = useState('');
  const[type , setType] = useState('');
  const[sby , setSBy] = useState('');
  const[sfrom , setSfrom] = useState('');
  const[area , setArea] = useState('');
  const[Sdate , setSdate] = useState('');
  const[Tdate , setTdate] = useState('');
  const[tby , setTBy] = useState('');
  const[Sid , setSID] = useState('');

  const saveData = (e) => {
    e.preventDefault();
    // Create an object with the form data
    const formData = {
      Cname,
      contractor,
      consultant,
      source,
      type,
      sby,
      sfrom,
      area,
      Sdate,
      tby,
      Tdate
    };

    // Send the data to server.js
    fetch('http://localhost:3001/client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        // receive response from server.js
        var Sid = data[0].s_id;
        setSID(Sid);
        console.log(Sid);

      
          const message= "Data is saved with Sample Id  " +Sid;
          toast(message);
          setTimeout(() => {
            const data = Sid; 
            navigate('/mdd',{state: {data : data}}); // Replace '/destination' with your desired path
          }, 5000); // Replace 2000 with the desired delay in milliseconds
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
    <banner2>
    <section id="banner2">
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <div class="dd">
          <h2 style={{fontWeight:600}}>Client Data </h2>
          
          <label>Name:</label><br/>
          <input class="input-field" type='text' value={Cname} onChange={e => setName((e.target.value))}/><br/>
          <label>Contractor:</label><br/>
          <input class="input-field" type='text' value={contractor} onChange={e=> setContractor((e.target.value))}/><br/>
          <label>Consultant: </label><br/>
          <input class="input-field" type='text' value={consultant} onChange={e=> setConsultant((e.target.value))}/><br/>
        </div>
      </div>
      <div class="col-md-6">
        <div class="dd">
        <h2 style={{fontWeight:600}}>Sample Data</h2>
          <label>Source:</label><br/>
          <input class="input-field" type='text' value={source} onChange={e=> setSource((e.target.value))}/><br/>
          <label>Type:</label><br/>
          <input class="input-field" type='text' value={type} onChange={e=> setType((e.target.value))}/><br/>
          <label>Sampled By:</label><br/>
          <input class="input-field" type='text' value={sby} onChange={e=> setSBy((e.target.value))}/><br/>
          <label>Sampled From:</label><br/>
          <input class="input-field" type='text' value={sfrom} onChange={e=> setSfrom((e.target.value))}/><br/>
          <label>Area:</label><br/>
          <input class="input-field" type='text' value={area} onChange={e=> setArea((e.target.value))}/><br/>
          <label>Date of Sampled:</label><br/>
          <input class="input-field" type='date' value={Sdate} onChange={e=> setSdate((e.target.value))}/><br/>
          <label>Tested By:</label><br/>
          <input class="input-field" type='text' value={tby} onChange={e=> setTBy((e.target.value))}/><br/>
          <label>Date of Test:</label><br/>
          <input class="input-field" type='date' value={Tdate} onChange={e=> setTdate((e.target.value))}/><br/>
        </div>
      </div>
    </div>
    <div class="row">
    </div>
    <div class="hello" >
    <button class="button" onClick={saveData}> Save </button>
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

export default Client;