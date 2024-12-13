import { NavLink } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";



const Navbar = () => {
          const [ispopup,setpopup]= useState(false);

          const onpopup=()=>{
            setpopup(true)
          }
          const offpopup =()=>{
            setpopup(false)
          }

  return (
    <div>
    
      <nav className="navbar navbar-expand-lg  navbar-white bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Navbar
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item " 
              onMouseEnter={onpopup}
              onMouseLeave={offpopup}
              >
                <NavLink className="nav-link" to="/Category" >
                  Categories
                </NavLink>
              </li>
            </ul>

            <form className=" navform">
              <input
                className="navinput"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />

              <Button>
                <SearchIcon />
              </Button>
            </form>
            <ul className="navbar-nav  mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  <Tooltip title="Cart">
                    <Button>
                      <ShoppingCartIcon />
                    </Button>
                  </Tooltip>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="#">
                  <Button className="bg-primary text-white">Signin </Button>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {
      ispopup?`this is popup`:``
    }
    </div>
  );
};

export default Navbar;
