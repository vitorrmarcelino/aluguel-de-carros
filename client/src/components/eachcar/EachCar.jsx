import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import "./EachCar.css";
import formatDisplacement from "../../utils/formatDisplacement";

const EachCar = ({ data }) => {
  const {
    ImgLink,
    _id,
    carName,
    carBrand,
    engineDisplacementInMl,
    Automatic,
    isHatch,
    isSedan,
    isSUV,
    isTurbo,
  } = data;

  let gear;

  if (Automatic === true) {
    gear = "Câmbio Automático";
  } else {
    gear = "Câmbio Manual";
  }

  let carType;

  if (isHatch === true) {
    carType = "Hatch";
  } else if (isSedan === true) {
    carType = "Sedan";
  } else if (isSUV === true) {
    carType = "SUV";
  }

  let engineType;

  if (!isTurbo) {
    engineType = "Aspirado";
  } else {
    engineType = "Turbo";
  }

  return (
    <div className="each-car">
      <img src={ImgLink} className="carImg" alt="car" />
      <div className="infos">
        <h3 className="each-car-title">
          <span>{carBrand}</span>
          <span> {carName}</span>
        </h3>
        <p className="engine infos-text">
          <span>Motor {formatDisplacement(engineDisplacementInMl)}</span>
          <span> {engineType}</span>
        </p>
        <p className="gear infos-text">{gear}</p>
        <p className="category infos-text">{carType}</p>
        <Link to={`/alugar/${_id}`} className="rent-button">
          Alugar
        </Link>
      </div>
    </div>
  );
};

export default EachCar;

EachCar.propTypes = {
  data: propTypes.shape({}),
}.isRequired;
