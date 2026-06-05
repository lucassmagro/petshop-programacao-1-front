import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          PetShop
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/" ? "active fw-bold" : ""}`}
                to="/"
              >
                Serviços
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname.includes("atendimento") ? "active fw-bold" : ""}`}
                to="/atendimentos"
              >
                Atendimentos
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
