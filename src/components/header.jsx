import React, { Component } from 'react';
import {
  Nav,
  NavLink,
  NavMenu,
} from './navbarElements';

class Header extends Component {
  render() {
    return (

      <div className="continer">
      <Nav>
        <NavLink to='/'>
          <img src={require('../img/logo2.svg')} alt='logo' style={{height:'20vh',width:'20wh',padding:'10px'}} />
        </NavLink>
        <NavMenu>
          <NavLink to='/' activeStyle>
            Home
          </NavLink>
          <NavLink to='/services' activeStyle>
            Services
          </NavLink>
          <NavLink to='/contact-us' activeStyle>
            Contact Us
          </NavLink>
          <NavLink to='/sign-up' activeStyle>
            Sign Up
          </NavLink>
        </NavMenu>
      </Nav>
    </div>
      // <header>
      //   <div className="Navbar">
      //   <image src='/src/img/login.svg'>hi</image>
      //     <Link to="/">Home</Link>
      //     <Link to="/photo">Photo Input</Link>
      //     <Link to="/camera">Video Camera</Link>
      //   </div>
      // </header>
    );
  }
}

export default Header;
