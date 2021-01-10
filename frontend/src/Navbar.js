import React from "react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const Navbar = observer((props) => {
  const { store } = props;

  const cartCount = store.cartCount();
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        Mobx/React-Router
      </NavLink>
      <ul>
        <li className="nav-item">
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink exact activeClassName="active" to="/about">
            About us
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink activeClassName="active" to="/products">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className="nav-item nav-cart btn btn-accent">
            Cart ({cartCount})
          </NavLink>
        </li>
      </ul>
    </nav>
  );
});

export default Navbar;
