import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <ul>
    <li>
      <NavLink to="/">Home</NavLink>
    </li>
    <li>
      <NavLink to="/about">About</NavLink>
    </li>
  </ul>
);

export default Navigation;
