import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import UberLogo from "../../assets/uber-logo.png";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import { AuthContext } from "../../context/auth";

import userPictureDefault from "../../assets/cachiorro.webp";

const Navbar = () => {
  const { authenticated, user } = useContext(AuthContext);
  const location = useLocation();
  const imagePath = user ? user.imageUrl : null;
  
  useEffect(() => {
    const MenuIcon = document.querySelector("#menu-icon");
    const XIcon = document.querySelector("#x-icon");
    const MenuDisplay = document.querySelector("#active-menu");
    
    if (window.innerWidth >= 768) {
      MenuDisplay.style.display = "none";
      MenuIcon.style.display = "none";
      XIcon.style.display = "none";
    } else {
      MenuDisplay.style.display = "none";
      MenuIcon.style.display = "block";
      XIcon.style.display = "none";
    }
  }, [location.pathname]);

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
            <Link to="/alugar" className="header-links">
              Alugue um carro
            </Link>
            <Link to="/minhas-reservas" className="header-links">
              Minhas Reservas
            </Link>

            {!authenticated ? (
              <>
                <span style={{ color: "white" }}>|</span>
                <Link to="/login" className="user-actions header-links">
                  Entrar
                </Link>
                <Link to="/cadastro" className="user-actions header-links">
                  Inscrever-se
                </Link>
              </>
            ) : (
              <>
                {imagePath ? (
                  <Link to="/conta" className="user-actions header-links">
                    <img
                      src={`http://localhost:5000/${imagePath}`}
                      alt="User"
                      className="user-picture"
                    />
                  </Link>
                ) : (
                  <Link to="/conta" className="user-actions header-links">
                    <img
                      src={userPictureDefault}
                      alt="User"
                      className="user-picture"
                    />
                  </Link>
                )}
              </>
            )}
          </nav>
          <Menu id="menu-icon" />
          <X id="x-icon" />
        </header>
      </div>
      <ul id="active-menu">
        <Link to="/alugar" className="header-links">
          <li>Alugue um carro</li>
        </Link>
        <Link to="/minhas-reservas" className="header-links">
          <li>Minhas Reservas</li>
        </Link>

        {!authenticated ? (
          <>
            <Link to="/login" className="user-actions header-links">
              <li>Entrar</li>
            </Link>
            <Link to="/cadastro" className="user-actions header-links">
              <li>Inscrever-se</li>
            </Link>
          </>
        ) : (
          <>
            <Link to="/conta" className="user-actions header-links">
              <li>Conta</li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
