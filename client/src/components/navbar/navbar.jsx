import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import "./styledesktop.css";
import UberLogo from "../../assets/uber-logo.png";
import { Menu } from "lucide-react";

const navbar = () => {
  return (
    <div>
      <div id="div-header">
        <header className="container">
          <Link to="/">
            <img src={UberLogo} alt="logonav" id="uber-logo" />
          </Link>
          <nav>
            <Link to="/" className="header-links">
              Alugue um carro
            </Link>
            <Link to="/" className="header-links">
              Minhas Reservas
            </Link>
            <span style={{ color: "white" }}>|</span>
            <Link to="/" className="user-actions header-links">
              Entrar
            </Link>
            <Link to="/" className="user-actions header-links">
              Inscrever-se
            </Link>
          </nav>
          <Menu id="menu-icon" />
        </header>
      </div>
      <ul id="active-menu">
        <Link to="/" className="header-links">
          <li>Alugue um carro</li>
        </Link>
        <Link to="/" className="header-links">
          <li>Minhas Reservas</li>
        </Link>
        <Link to="/" className="user-actions header-links">
          <li>Entrar</li>
        </Link>
        <Link to="/" className="user-actions header-links">
          <li>Inscrever-se</li>
        </Link>
      </ul>
    </div>
  );
};

export default navbar;
