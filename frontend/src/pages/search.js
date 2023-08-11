//console ma aayeko data lai field ma halera chart banauna ra pdfma convert garna baki xa

import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './MDD.css';
function Search () {

    const navigate = useNavigate();
    const[c_id , setCid] = useState(0);
    const[s_id , setSid] = useState(0);

    const searchData = (e) => {
        e.preventDefault();
    
        // Create an object with the form data
        const dataform = {
          s_id,
          c_id,
        };
    
        // Send the data to the server
        fetch('http://localhost:3001/report', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataform)
        })
          .then((response) => response.json())
          .then((data) => {
            const dataF = data;
           

            navigate('/reportO',{state: {dataF : dataF}});
          })
          .catch(error => {
            // Handle any errors
            console.error(error);
          });
      };


      return (
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

            <div class="idss">
              <form id="labForm" class="labformx">
                <label class="sid"for="Sample Id">Sample ID:</label>
                <input type="number" value={s_id} onChange={e=> setSid(Number(e.target.value))} class="input-field-q" required/>
              </form>
            </div>   
              
          <div class="hello" >
            <button class="button" onClick={searchData}> Find </button>
          </div>
        </div>
    );
};
export default Search;
