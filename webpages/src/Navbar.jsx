import "./App.jsx"
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import "./index.js";
import twitter from './imgs/twitter-logo.png'
import github from "./imgs/github-logo.png"

// The navbar
class Navbar extends Component {

  render() {
    return (
      <div>
        <nav className="navbar">
        <div className="navbar-header">            
          <h1>SuperChat</h1>
          </div>
          <a
            className="navbar-twitter-logo"
            href="http://www.twitter.com/0xkato"
          >
            <img src={twitter} className="twitter-logo" alt="twitter logo" height="43px"/>
          </a> 
          <a
            href="https://github.com/0xkato"
          >
            <img src={github} className="github-logo" alt="github logo" height="43px"/>
          </a>
          
        <li id="link-to-chat">
          <Link to="/Chat">Chat</Link>
        </li>
        <li id="link-to-app">
          <Link to="/Mint">Mint ChatPass</Link>
        </li>
        </nav>
      </div>
    );
  }
}

export default Navbar;