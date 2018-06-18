import React, { Component } from 'react';
import logo from './logo.svg'; /* delete this */
import './App.css';
import TaskPage from "./TaskPage";

//move this to new file
const HeaderTitle = () => {
  return (<div className="header-title"><h1>MIRA</h1></div>);
}

const Footer = () => {
  return(<div className="footer">Look! The footer!</div>);
}

//main App constructor
class App extends Component {
  render() {
    return (
       <React.Fragment>
        <header className="header">
          <label for="sidebar-toggle" class="sidebar-toggle-label"><span>&#9776;</span></label>
          <HeaderTitle />
        </header>
        <div className="main">
          <div id="sidebar" className="sidebar">
            <ul>
              <li>Projects</li>
              <li className="active">Tasks</li>
              <li>Orders</li>
              <li>Maintenance</li>
            </ul>
          </div>
          <TaskPage />
        </div>
        <Footer />
       </React.Fragment>
    );
  }
}

export default App;
