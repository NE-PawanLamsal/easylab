

import React, { useState } from 'react';
import { Container } from "react-bootstrap";
import sampledata from "../IS383.json"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function Seive()
{
  const location = useLocation();
  const navigate = useNavigate();
var i =1;

const[s_id , setSid] = useState(location.state.data);
const[test_id , setTestId] = useState(i);
const[typeid, setTypeid]=useState('');
const[sizes, setSize]=useState([]);
const[size, setSampleSize]=useState('');
const[sizeid, setSizeid]= useState('');
const[sesizes, setSeSize]=useState([]);
const[sesize, setSeive]=useState('');
const[sesizeid, setSeSizeid]= useState('');
const[is, setIS]=useState([]);
const[isid, setISid]= useState('');
const[max, setMax]= useState('');
const[ranid, setRanid]= useState('');
const[rans, setRan]= useState('');
const[Ran, setRandom]= useState('');
const[min, setMin]= useState('');
const[wr, setWR]= useState('');
const[tw, setTW]= useState(location.state.TW);


const handletype=(e)=>{
  const gettypeId= e.target.value;
  const getSizedata= sampledata.find(sample=>sample.type===gettypeId).size;
  setSize(getSizedata);
  setTypeid(gettypeId);
  //console.log(gettypeId);
}

const handlesize = (e)=>{
 const sizeid= e.target.value;
    //console.log(sizeid);
  setSizeid(sizeid);
  const size = sizes.find(sizes=>sizes.size_id==sizeid).s;
  setSampleSize(size);
  const getSeSizedata= sizes.find(sizes=>sizes.size_id===sizeid).s_size;
  setSeSize(getSeSizedata);
  }
  const handlesesize = (e)=>{
  const sesizeid= e.target.value;
  //console.log(sesizeid);
  setSeSizeid(sesizeid);
  const sesize = sesizes.find(sesizes=>sesizes.seive_id==sesizeid).ss;
  setSeive(sesize);
  const getISdata= sesizes.find(sesizes=>sesizes.seive_id==sesizeid).IS;
  setIS(getISdata);
  }

  const handlemax = (e)=>{
  const isid= e.target.value;
  //console.log(isid);
  setISid(isid);
  const max = is.find(is=>is.is_id==isid).max;
  setMax(max);
  }

  const handlemin = (e)=>{
    const isid= e.target.value;
    //console.log(isid);
    setISid(isid);
    const min = is.find(is=>is.is_id==isid).min;
    setMin(min);

    }

  const handleSubmit=(e)=>{
  e.preventDefault();
  }
  const calculateSeive = (e) => {
  e.preventDefault();
  var formData = {
    s_id,
    test_id,
    sesize,
    wr,
    tw,
    min,
    max
  };

console.log(formData);

  // Send the data to server.js
  fetch('http://localhost:3001/seive', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then((response) => response.json())
    .then((data) => {
      // receive response from server.js
      var {send} = data;

      console.log(data);

 const message= send + "Now insert new data for next seive";
toast(message);
// Replace 2000 with the desired delay in milliseconds
})
      

    .catch(error => {
      // Handle any errors
      console.error(error);
    });
};




return(<React.Fragment>
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
         <Container className="content">
        <div className="row">
          <div className="col-sm-12">
         <h3 className='mt-3'>Seive Analysis</h3>
         <form id="labForm">
            <label for="Sample Id" class="sid">Sample Id:</label>
            <input type="number" value={s_id}  class="input-field-q" required/> &emsp;
            <label for="Test Id">Test Id:</label>
            <input type="number" step="0.1"value={test_id} onChange={e => setTestId(Number(e.target.value))}class="input-field-q" required/>
          </form>
         <form className="row g-3" onSubmit={handleSubmit}>

              <div className="col-md-3">
                <label  className="form-label"> Type</label>            
                    <div className="text-dark"> 
                       <select name='sample' className='form-control' onChange={(e)=>handletype(e)}>
                        <option value="">--Select Type--</option>
                        {
                        sampledata.map( (getsample,index)=>(
                          <option value={getsample.type} key={index}>{getsample.name}</option> 
                        ))

                        }
                  
                    
                        </select>           
                    </div>
                    </div>
                    <div className="col-md-3">
                <label  className="form-label"> Size</label>            
                    <div className="text-dark"> 
                    <select name='sizes' className='form-control' onChange={(e)=>handlesize(e)}>
                        <option value="">--Select Size (in mm)--</option>
                        {
                          sizes.map((getsizes, index)=>(
                            <option value={getsizes.size_id} key={index}>{ getsizes.s }</option>
                          ))
                        }
                       
                       
                        </select>          
                    </div>
                    </div>

                    <div className="col-md-3">
                <label  className="form-label"> Seive Size</label>            
                    <div className="text-dark"> 
                    <select name='sesizes' className='form-control' onChange={(e)=>handlesesize(e)}>
                        <option value="">--Select Seive Size (in mm)--</option>
                        {
                          sesizes.map((getsesizes, index)=>(
                            <option value={getsesizes.seive_id} key={index}>{ getsesizes.ss }</option>
                          ))
                        }
                       
                       
                        </select>          
                    </div>
                    </div>

                    <div className="col-md-3">
                <label  className="form-label"> MAX </label>            
                    <div className="text-dark"> 
                    <select name='isvalues' className='form-control' onChange={(e)=>handlemax(e)}>
                        <option value="">--Select MAX (in mm)--</option>
                        {
                          is.map((getis, index)=>(
                            <option value={getis.is_id} key={index}>{ getis.max }</option>
                          ))
                        }
                       
                       
                        </select>          
                    </div>
                    </div>

                    <div className="col-md-3">
                <label  className="form-label"> MIN </label>            
                    <div className="text-dark"> 
                    <select name='isvalues' className='form-control' onChange={(e)=>handlemin(e)}>
                        <option value="">--Select MIN (in mm)--</option>
                        {
                          is.map((getis, index)=>(
                            <option value={getis.is_id} key={index}>{ getis.min }</option>
                          ))
                        }
                       
                       
                        </select>          
                    </div>
                    </div>
                    <div className="col-md-3">
                    <label className="form-label">Weight Retained:</label><br/>
                    <input type="number"className='form-control' step="0.01"value={wr} onChange={e => setWR(Number(e.target.value))}/><br/>
                    </div>
                 
            
                    <div className="col-md-2" style={{padding:'9px'}}>
                      <label  className="form-label"> </label>            
                    <div className="text-dark"> 
                      <button className='btn btn-success' onClick={calculateSeive}>Proceed</button>
                     </div>
                    </div>
                    

        </form>
        </div>
        </div>
        </Container>
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
    </React.Fragment>);
}

export default Seive;