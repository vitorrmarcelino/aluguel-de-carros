import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import "./styledesktop.css";
import UberLogo from "../../assets/uber-logo.png";
import { Menu } from "lucide-react";
import { X } from "lucide-react";

const NavBar = () => {
  useEffect(() => {
    const MenuIcon = document.querySelector("#menu-icon");
    const XIcon = document.querySelector("#x-icon");
    const MenuDisplay = document.querySelector("#active-menu");

    const OpenMenu = () => {
      MenuDisplay.style.display = "block";
      MenuIcon.style.display = "none";
      XIcon.style.display = "block";
    };

    const CloseMenu = () => {
      MenuDisplay.style.display = "none";
      MenuIcon.style.display = "block";
      XIcon.style.display = "none";
    };

    const Change = () => {
      if (window.innerWidth >= 768) {
        MenuDisplay.style.display = "none";
        MenuIcon.style.display = "none";
        XIcon.style.display = "none";
      } else {
        MenuDisplay.style.display = "none";
        MenuIcon.style.display = "block";
        XIcon.style.display = "none";
      }
    };

    window.addEventListener("resize", Change);
    MenuIcon.addEventListener("click", OpenMenu);
    XIcon.addEventListener("click", CloseMenu);
  }, []);
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
          <X id="x-icon" />
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

export default NavBar;
