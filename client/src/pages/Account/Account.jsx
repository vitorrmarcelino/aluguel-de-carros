import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";
import { uploadImage, removeImage } from "../../api/uploadImage";
import userPictureDefault from "../../assets/cachiorro.webp";

const Account = () => {
  const { logout, user, updateImageUrl } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  // const [loading, setLoading] = useState(true);
  const imagePath = user ? user.imageUrl : null;

  const handleLogout = () => {
    logout();
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("file", e.target.querySelector("input[type=file]").files[0]);
      const response = await uploadImage(user._id, data);
      updateImageUrl(response.data.file.path);
      setMessage("Imagem atualizada com sucesso!");
      console.log(user);
    } catch (error) {
      if (!error?.response) {
        setMessage("Erro ao acessar o servidor");
      } else if (error.response.status === 400) {
        setMessage(error.response.data.msg);
      }
    }
  };

  // if (loading) {
  //   return <div className="loading">Loading...</div>;
  // }

  const name = user ? user.name : "";
  const email = user ? user.email : "";
  return (
    <div>
      <h1>Rota Privada</h1>
      {imagePath ? (

        <img
          src={`http://localhost:5000/${imagePath}`}
          alt="User"
          className="user-picture"
        />
      ) : (
        <img
          src={userPictureDefault}
          alt="User"
          className="user-picture"
        />
      )}
      <p>Nome de usuário: {name}</p>
      <p>Email: {email}</p>
      <button onClick={handleLogout}>Sair</button>
      <form onSubmit={handleUpload}>
        <input type="file" name="file" />
        <button type="submit">Enviar</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Account;
