import React from 'react'
import{BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home'
import MDD from './pages/MDD'
import Report from './pages/Report';
import Search from './pages/search';
import Client from './pages/Client';
import Seive from './pages/Seive';
import SearchSe from './pages/searchSe';
import ClientSe from './pages/ClientSe';
import SeiveReport from './pages/SeiveReport';
import LoginPage from './pages/LoginPage';
import {AppProvider} from "./context/AppContext"

function App() {
  return (
    <AppProvider>    
      <Router>
      <Routes>
        <Route exact path='/home' Component={Home}/>
        <Route exact path='/' Component={LoginPage}/>
        <Route exact path='/mdd' Component={MDD}/>
        <Route exact path='/searchO' Component={Search}/>
        <Route exact path='/searchSe' Component={SearchSe}/>
        <Route exact path='/reportO' Component={Report}/>
        <Route exact path='/clientO' Component={Client}/>
        <Route exact path='/clientSe' Component={ClientSe}/>
        <Route exact path='/seive' Component={Seive}/>
        <Route exact path='/reportSe' Component={SeiveReport}/>
      </Routes>
    </Router>
    </AppProvider>

  )
}

export default App;
