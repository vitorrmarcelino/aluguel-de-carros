import React, { useEffect, useState } from "react";
import "./Car.css";
import propTypes from "prop-types";
import api from "../../api/Api";

const Car = ({ data }) => {

  return <div>Car</div>;
};

export default Car;

Car.propTypes = {
  data: propTypes.shape({}),
}.isRequired;
