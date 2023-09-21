import React, { useState } from "react";
import "./Register.css";
import { postRegisterUser } from "../../api/postRegisterUser";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmitRegisterUser = async (e) => {
    e.preventDefault();

    try {
      const response = await postRegisterUser(
        name,
        email,
        password,
        confirmpassword
      );

      console.log(response.data);

      setError("");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/login");
    } catch (error) {
      if (!error?.response) {
        setError("Erro ao acessar o servidor");
      } else if (error.response.status === 422) {
        setError(error.response.data.msg);
      }
    }
  };

  return (
    <div className="container form-container">
      <form onSubmit={handleSubmitRegisterUser}>
        <div>
          <label htmlFor="iname">Nome:</label>
          <input
            type="text"
            id="iname"
            name="name"
            onChange={(e) => [setName(e.target.value), setError("")]}
            value={name}
          />
        </div>
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
        <div>
          <label htmlFor="iconfirmpassword">Confirmar Senha:</label>
          <input
            type="password"
            id="iconfirmpassword"
            name="confirmpassword"
            onChange={(e) => [setConfirmPassword(e.target.value), setError("")]}
            value={confirmpassword}
          />
        </div>
        <button type="submit" className="form-button">
          Cadastrar
        </button>
      </form>
      <p className="error-p form-p">{error}</p>
      <p className="form-p">
        Já tem uma conta? <Link to={"/login"}>Entrar</Link>
      </p>
    </div>
  );
};

export default Register;
