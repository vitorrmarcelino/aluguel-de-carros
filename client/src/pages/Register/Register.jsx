import React, { useState, useEffect } from "react";
import "./Register.css";
import PostRegisterUser from '../../api/PostRegisterUser';

const Register = () => {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="container">
      <form action="" method="POST">
        <div>
          <label htmlFor="iname">Nome:</label>
          <input type="text" id="iname" name="name"/>
        </div>
        <div>
          <label htmlFor="iemail">E-mail:</label>
          <input type="email" id="iemail" name="email"/>
        </div>
        <div>
          <label htmlFor="ipassword">Senha:</label>
          <input type="password" id="ipassword" name="password"/>
        </div>
        <div>
          <label htmlFor="iconfirmpassword">Confirmar Senha:</label>
          <input type="password" id="iconfirmpassword" name="confirmpassword"/>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Register;
