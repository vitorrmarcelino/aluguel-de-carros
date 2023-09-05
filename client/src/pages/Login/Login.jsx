import React, { useEffect, useState } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container">
      <form action="" method="POST">
        <div>
          <label htmlFor="iemail">E-mail:</label>
          <input type="email" id="iemail" name="email" />
        </div>
        <div>
          <label htmlFor="ipassword">Senha:</label>
          <input type="password" id="ipassword" name="password" />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
