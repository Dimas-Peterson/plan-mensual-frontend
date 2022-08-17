import "../css/main.css";
import Image from "../img/logo.png";
import React, { Fragment } from "react";

const Navbar = () => {
    
  return (
    <Fragment>
      {/* ===== Header Start ===== */}
      <header>
        {/* ===== Navbar Start ===== */}
        <nav className="navbar navbar-expand-lg navbar-light bg-dark-main justify-content-between fixed-top">
          <div className="container">
            {/* ===== Brand Start ===== */}
            <a href="#" className="navbar-brand img-w-50">
              <img src={Image} alt="Control Fit Logo" className="img-fluid" />
            </a>
            {/* ===== Brand End ===== */}
            {/* ===== Collapse Btn Start ===== */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            {/* ===== Collapse Btn End ===== */}
            {/* ===== Navbar Content Start ===== */}
            <div
              className="collapse navbar-collapse text-light flex-grow-0"
              id="navbarContent"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a href="" className="nav-link active text-reset">
                    Inicio
                  </a>
                </li>
              </ul>
            </div>
            {/* ===== Navbar Content End ===== */}
          </div>
        </nav>
        {/* ===== Navbar End ===== */}
      </header>
      {/* ===== Header End ===== */}
    </Fragment>  
  );
};

export default Navbar;