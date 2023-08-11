import React, { useState } from 'react';
import './Home.css'; // Import the CSS file for the navbar component
import 'bootstrap/dist/css/bootstrap.min.css'
const Home = () => {
  const link1 = "./clientSe";
  const link2 = "./clientO";


  return (
    <div>
      <nav>
      <div class="navbar">
      <img src="logo.png" class="logo"/>
      <ul>
          <li><a href="./home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#aboutus">About Us</a></li>
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
      </ul>
    </div>  
    </nav>  
    <banner>
    <section id="banner">
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <p class="promo-title">Easy Lab</p>
        <p>"Easy Lab" is a system design especially aimed for civil engineering labs.Even in these modern days,the system of testing,analysis and report generation of tests related to civil engineering materials have not been changed. We have been practicing traditional system with paper files and observation tables. To replace the inconveninet and time-consuming traditional procedures we developed our smart lab test setup "Easy Lab"</p>
      </div>
      <div class="col-md-6 text-center">
        <img src="soillab1.jpg" class="img-fluid"/>
      </div>
    </div>
  </div>
  <img src="wave1.png" class="bottom-img"/>
</section>
    </banner>

    <services>
    <section id="services">
  <div class="container text-center">
    <h2 class="title">SERVICES WE OFFER</h2>
    <div class="row text-center">
      <div class="col-md-6 ">
         <h3>OMC & MDD Test</h3>
         {/*<img src="Standard-Proctor-Test.jpg.jpg" class="omc"/>*/}
         <a href={link2} target="_blank" rel="noopener noreferrer">
      <img src="Standard-Proctor-Test.jpg.jpg" alt="Image" className="omc" />
    </a>
        <p>We perform Optimum Moisture Content(OMC) and Maximum Dry Density(MDD) test of sample and then generate graph and report of the MDD and OMC test.</p>
      </div>
      <div class="col-md-6 ">
        <h3>Seive Analysis</h3>
        {/*<img src="seive.jpg" class="omc"/>*/}
        <a href={link1} target="_blank" rel="noopener noreferrer">
      <img src="seive.jpg" alt="Image" className="omc" />
    </a>
        <p>We perform Seive Analysis of sample and then generate Seive Size vs Passing Percentage graph from grading of coarse aggregate.</p>
      </div>
    </div>
  </div>

</section>
    </services>

    <aboutus>
    <section id="aboutus">
  <div class="container">
    <h2 class="title text-center">ABOUT US</h2> 
    <div class="row">
      <div class="col-md-6 aboutus">
        <p class="about-title">What is Easy Lab:</p>
        <ul>
          <li>Easy Lab is system design especially aimed for civil engineering labs.</li>
          <li>Easy Lab is a setup of web-based portal with a database.</li>
          <li>Easy Lab aallows for secure and convenient calculations with accurate 
            analytical graphs for different tests.</li>
          <li>Easy Lab is a web-based system with proper data backup and graphical representation.</li>
          <li>Easy Lab optimize the way of discussion and learning through the concept of digital report generation
            system.</li>
        </ul>
      </div>
      <div class="col-md-6">
        <img src="chart1.jpg" class="img-fluid"/>   
      </div> 
    </div>
  </div>

</section>

    </aboutus>
    <social>
    <section id="social-media">
  <div class="container text-center">
    <p>FIND US ON SOCIAL MEDIA</p>
    <div class="social-icons">
      <a href="#"><img src="facebook-icon.png"/></a>
      <a href="#"><img src="instagram-icon.png"/></a>
      <a href="#"><img src="twitter-icon.png"/></a>
      <a href="#"><img src="whatsapp-icon.png"/></a>
    </div>
  </div>
</section>
    </social>
    <footer>
    <section id="footer">
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
    </footer>
   </div>
  );
};

export default Home;
