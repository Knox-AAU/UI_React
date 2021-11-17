import React  from 'react';
import Header from './Shared_components/Header.js';
import VA from './Shared_components/VirtualAssistant.js';
import Home from './Main_components/Home.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import FactChecker from './Main_components/FactChecker.js';
import Status from './Main_components/Status.js';


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
        <VA/>
      </Router>
    </div>
  );
}

export default App;
