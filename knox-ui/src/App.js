import React, { Component }  from 'react';
import Header from './Components/Header.js';
import Home from './Components/Home.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import FactChecker from './Components/FactChecker.js';
import Status from './Components/Status.js';
import AppCss from './Css/App.css'


function App() {
  return (
    
    <div className="App">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      />
      <Router>
        <Header/>
        <Switch>
          <Route path="/home">
            <Home/> 
          </Route>
          <Route path="/factchecker">
            <FactChecker/>    
          </Route>
          <Route path="/status">
            <Status/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
