import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";

const Account = () => {
  const { logout, user } = useContext(AuthContext);
  // const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
  };

  // if (loading) {
  //   return <div className="loading">Loading...</div>;
  // }

  const name = user ? user.name : "";
  const email = user ? user.email : "";
  return (
    <div>
      <h1>Rota Privada</h1>
      <p>Nome de usuário: {name}</p>
      <p>Email: {email}</p>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
};

export default Account;
