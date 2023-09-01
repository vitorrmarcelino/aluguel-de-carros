import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import api from "../../api/Api";

const EachCar = () => {
    
  api.get("carros").then((res) => {
    console.log(res.data);
  });

  const ImgLink ="https://file.kelleybluebookimages.com/kbb/base/evox/CP/12674/2019-Volkswagen-Golf%20GTI-front_12674_032_2400x1800_K8K8.png";
  const id = "64f206a69db63087e8cc05ac";

  return (
    <div className="container">
      <img src={ImgLink} className="carImg" alt="car" />
      <h3>
        <span>Marca do Carro</span>
        <span> Nome do Carro</span>
      </h3>
      <p>
        <span>Motor do Carro</span>
        <span> Automatico/manual</span>
      </p>
      <p>Categoria do Carro</p>
      <Link to={`/alugar/${id}`}>Alugar</Link>
    </div>
  );
};

export default EachCar;
