import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

import "./MainNavigation.css";

const MainNavigation = () => {
  const { token, logout } = useContext(AuthContext);
  return (
    <header className='main-navigation'>
      <div className='main-navigation__logo'>
        <NavLink to='/events'>
          <h1>Book-It</h1>
        </NavLink>
      </div>
      <nav className='main-navigation__items'>
        <ul>
          <li>
            <NavLink to='/events'>Events</NavLink>
          </li>
          {token && (
            <>
              <li>
                <NavLink to='/bookings'>Bookings</NavLink>
              </li>
              <li>
                <a onClick={() => logout()}>Log Out</a>
              </li>
            </>
          )}
          {!token && (
            <>
              <li>
                <NavLink to='/login'>Log In</NavLink>
              </li>
              <li className='main-navigation__button bttn'>
                <NavLink to='/signup'>Sign Up</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
