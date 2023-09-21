import React, { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/auth";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Cars from "./pages/Cars/Cars";
import Car from "./pages/Car/Car";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NavBar from "./components/navbar/Navbar";
import Account from "./pages/Account/Account";

const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    if (!authenticated) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/alugar" element={<Cars />} />
          <Route exact path="/aluga/:id" element={<Car />} />
          <Route exact path="/cadastro" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/conta"
            element={
              <Private>
                <Account />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
