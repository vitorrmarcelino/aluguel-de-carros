import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import { getUsersController } from "../../api/getUsersController";

const Account = () => {
  const { logout, user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getUsersController();
      setUsers(response.data);
      setLoading(false);
    })();
  }, []);
  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const name = user ? user.name : "";
  const email = user ? user.email : "";
  return (
    <div>
      <h1>Rota Privada</h1>
      <p>Nome de usuário: {name}</p>
      <p>Email: {email}</p>
      <button onClick={handleLogout}>Sair</button>
      <h2>Usuarios</h2>
      <ul>
        {users.map((user) => (
          <li key={users._id}>
            {user._id} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Account;
