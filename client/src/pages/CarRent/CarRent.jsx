import React, { useEffect } from "react";
import "./style.css";
import axios from "axios";
import api from "../../api/Api";

const CarRent = () => {

  useEffect(() => {
    api.get('carros').then(res =>{
      console.log(res.data)
    })
  }, [])
  


  return (
    <div className="container">
      <h1>Carros Disponiveis</h1>
    </div>
  );
};

export default CarRent;
