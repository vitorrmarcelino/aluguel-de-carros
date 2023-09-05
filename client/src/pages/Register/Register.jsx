import React, { useState } from "react";
import "./Register.css";
import api from "../../api/Api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("")

  const handleSubmitRegisterUser = async (e) => {
    e.preventDefault();

    console.log(name, email, password, confirmpassword);

    try{

      const response = await api.post(
        "/auth/register",
        JSON.stringify({ name, email, password, confirmpassword }),
        {
          headers: { "Content-Type": "application/json" },
        }
        );

        console.log(response.data);
        setError('')
        setName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
      }catch(error){
        if(!error?.response){
          setError("Erro ao acessar o servidor");
        }else if(error.response.status === 422){
          setError(error.response.data.msg)
        }
      }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmitRegisterUser}>
        <div>
          <label htmlFor="iname">Nome:</label>
          <input
            type="text"
            id="iname"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="iemail">E-mail:</label>
          <input
            type="email"
            id="iemail"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label htmlFor="ipassword">Senha:</label>
          <input
            type="password"
            id="ipassword"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <label htmlFor="iconfirmpassword">Confirmar Senha:</label>
          <input
            type="password"
            id="iconfirmpassword"
            name="confirmpassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmpassword}
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <p>{error}</p>
    </div>
  );
};

export default Register;
