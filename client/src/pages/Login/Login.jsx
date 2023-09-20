import React, { useState } from "react";
import "./Login.css";
import api from "../../api/Api";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/auth/login",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      
      console.log(response.data);
      
      setError("");
      setEmail("");
      setPassword("");
      
      const data = response.data;
      return data;
    } catch (error) {
      if (!error?.response) {
        setError("Erro ao acessar o servidor");
      } else if (
        error.response.status === 404 ||
        error.response.status === 422
      ) {
        setError(error.response.data.msg);
      }
    }
  };

  return (
    <div className="container form-container">
      <form onSubmit={handleLoginUser}>
        <div>
          <label htmlFor="iemail">E-mail:</label>
          <input
            type="email"
            id="iemail"
            name="email"
            onChange={(e) => [setEmail(e.target.value), setError("")]}
            value={email}
          />
        </div>
        <div>
          <label htmlFor="ipassword">Senha:</label>
          <input
            type="password"
            id="ipassword"
            name="password"
            onChange={(e) => [setPassword(e.target.value), setError("")]}
            value={password}
          />
        </div>
        <button type="submit" className="form-button">
          Entrar
        </button>
      </form>
      <p className="error-p form-p">{error}</p>
      <p className="form-p">
        Não tem uma conta? <Link to={"/cadastro"}>Cadastrar</Link>
      </p>
    </div>
  );
};

export default Login;
