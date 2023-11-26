import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import {Badge} from 'antd';


const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  // console.log(`cart is : ${cart.length}`)

  const logoutHandler = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("token");
    toast.success("Logged out");
  };

  return (
    <>
      <section className="header">
        <header className="container">
          <nav className="navbar">
            <NavLink to="/">
              <img className="mainlogo" src="/images/mainlogo.png" alt="" />
            </NavLink>

            {/* //search bar */}
            {/* <div>
              <input className="searchbar" type="search" name="search" id="searchbar" placeholder="Search Products"/>
            </div> */}

            {/* //all product list */}
          


            <ul className="navlinks">
            <NavLink className="navchild" to="/dashboard/productlist">All Products</NavLink>
              {!auth.user ? (
                <>
                  <NavLink className="navchild" to="login"> Login </NavLink>
                  <NavLink className="navchild" to="register">Register</NavLink>
                </>
              ) : (
                <>
                  {/* <NavLink className='navchild' to="userDashboard">Dashboard</NavLink>
                <NavLink onClick={logoutHandler} className='navchild' to="login">Logout</NavLink> */}

                  {/* dropdown menu  */}

                  <div className="dropdown">
                    <NavLink className="navchild">Hi, {auth.user.name}</NavLink>
                    <div className="dropdown-content">
                      <NavLink className="navchild" to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}>Dashboard</NavLink>
                      <NavLink className="navchild" to="/login" onClick={logoutHandler}>Logout</NavLink>
                    </div>
                  </div>
                </>
              )}

              {/* <NavLink className="navchild" to="cart"> Cart {cart.length} </NavLink> */}
              <Badge count={cart?.length} showZero style={{ backgroundColor: 'red', left: '20px'}}>
               <NavLink className="navchild" to="cart"> Cart </NavLink>
               </Badge>

            </ul>
          </nav>
        </header>
      </section>
    </>
  );
};

export default Header;
