import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import App1 from './App1';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Index() {
    return (
      <div className="hourlytitle">
        <App />
      </div>
    );
   }
   
   function Hourly() {
    return (
      <div className="hourlytitle">
        <h2>
          <App1 />
        </h2>
      </div>
    );
   }
  
   function AppRouter() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link className="list" to="/">Hourly Forecast</Link>
              </li>
              <li>
                <Link className="list" to="/Daily/">Daily Forecast</Link>
              </li>
            </ul>
          </nav>
   
          <Route path="/" exact component={Index} />
          <Route path="/Daily/" component={Hourly} />
        </div>
      </Router>
    );
   }

ReactDOM.render(<AppRouter />, document.getElementById('root'));

