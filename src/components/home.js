import React, { Component } from 'react';
import '../assets/css/home.css';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <button className="tribar" onClick={this.toggleMenu}>
          <svg height="20" width="20">
            <line id="top" x1="0" y1="6" x2="20" y2="6" stroke="#0754ac" strokeWidth="2" />
            <line id="middle" x1="0" y1="11" x2="20" y2="11" stroke="#0754ac" strokeWidth="2" />
            <line id="bottom" x1="0" y1="16" x2="20" y2="16" stroke="#0754ac" strokeWidth="2" />
          </svg>
        </button>
        <aside id="aside-menu">
          <ul>
            <li>this is a</li>
            <li>this is b</li>
          </ul>
        </aside>
      </div>
    )
  }
  toggleMenu = (e) => {
    e.currentTarget.classList.toggle('active');
  }
}

export default Home;
