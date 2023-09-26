import React, { useState, useEffect } from "react";
import "./Cars.css";
import EachCar from "../../components/eachcar/EachCar";
import api from "../../api/Api";

const Cars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    api.get("carros").then((res) => {
      setCars(res.data);
    });
  }, []);

  return (
    <div className="center">
      <div className="cars container">
        {cars.map((car) => (
          <EachCar key={car._id} data={car} />
        ))}
      </div>
    </div>
  );
};

export default Cars;
