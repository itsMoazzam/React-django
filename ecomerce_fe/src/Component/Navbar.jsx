import { NavLink } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import Navoptions from "./categories/Navoptions";
import Cart from "./categories/Cart";
import { Card } from "react-bootstrap";

const Navbar = () => {
  const [ispopup, setpopup] = useState(false);

  const onpopup = () => {
    setpopup(true);
  };
  const offpopup = () => {
    setpopup(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-expand-md navbar-white bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            AMStore
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="bar nav-link active"
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li
                className="nav-item "
                onMouseEnter={onpopup}
                onMouseLeave={offpopup}
                onClick={offpopup}
              >
                <NavLink className="bar nav-link" to="/Category">
                  Categories
                </NavLink>

                <Card className="categorycard">
                  {ispopup ? <Navoptions /> : ``}
                </Card>
              </li>
            </ul>
          </div>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <form className=" navform">
              <input
                className="navinput"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />

              <button className="searchbtn">
                <SearchIcon />
              </button>
            </form>
          </div>
          <div
            className="collapse navbar-collapse d-flex flex-row-reverse "
            id="navbarTogglerDemo03"
          >
            <ul className="navbar-nav  mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/cart"
                >
                  <Tooltip title={<Cart />}>
                    <Button>
                      <ShoppingCartIcon />
                    </Button>
                  </Tooltip>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  <Button className="bg-primary text-white">Signin </Button>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
