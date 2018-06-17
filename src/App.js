import React, { Component } from 'react';
import logo from './logo.svg';
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
          <HeaderTitle />
        </header>
        <div className="main">
          <div className="sidebar"></div>
        <TaskPage />
        </div>
        <Footer />
       </React.Fragment>
    );
  }
}

export default App;
