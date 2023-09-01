import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import "./style.css";

const EachCar = ({ data }) => {
  const { ImgLink, _id, carName, carBrand, engineDisplacementInMl, Automatic , isHatch, isSedan, isSUV} =
    data;

  let gear;

  if (Automatic === true) {
    gear = "Câmbio Automático";
  } else {
    gear = "Câmbio Manual";
  }

  let carType;

  if(isHatch===true){
    carType = "Hatch"
  }else if(isSedan === true){
    carType = "Sedan"
  }else if(isSUV ===true){
    carType = "SUV"
  }

  return (
    <div className="container">
      <img src={ImgLink} className="carImg" alt="car" />
      <h3>
        <span>{carBrand}</span>
        <span> {carName}</span>
      </h3>
      <span>Motor {engineDisplacementInMl}</span> <br />
      <span>{gear}</span>
      <p>{carType}</p>
      <Link to={`/alugar/${_id}`}>Alugar</Link>
    </div>
  );
};

export default EachCar;

EachCar.propTypes = {
  data: propTypes.shape({}),
}.isRequired;
