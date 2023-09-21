import { createContext, useState, useEffect } from "react";
import { postLoginController } from "../api/postLoginController";
import { useNavigate } from "react-router-dom";
import Api from "../api/Api";
import { checkToken } from "../api/checkTokenController";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkTokenValidity = async () => {
    const recoveredUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (token && recoveredUser) {
      try {
        Api.defaults.headers.Authorization = `Bearer ${token}`;
        const tokenResponse = await checkToken();

        if (tokenResponse.status === 200) {
          setUser(JSON.parse(recoveredUser));
          setToken(token);
        } else {
          logout();
        }
      } catch (error) {
        logout();
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    checkTokenValidity();
  });

  const login = async (email, password) => {
    try {
      const response = await postLoginController(email, password);
      const SecurityToken = response.data.token;

      Api.defaults.headers.Authorization = `Bearer ${SecurityToken}`;
      const tokenResponse = await checkToken();

      if (tokenResponse.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", SecurityToken);
        setUser(response.data.user);
        setToken(SecurityToken);
      }

      navigate("/conta");
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    Api.defaults.headers.Authorization = null;
    setUser(null);
    setToken(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user && !!token,
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
