import React, { useState, useEffect } from "react";
import "./Cars.css";
import EachCar from "../../components/EachCar/EachCar";
import { getCars } from "../../api/getCars";

const Cars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const getCar = async () => {
      try {
        const response = await getCars();
        console.log(response)
        setCars(response.data);
      } catch (error) {
        return;
      }
    };
    getCar();
  },[]);

  return (
    <div className="center-flex">
      <div className="cars container">
        {cars.map((car) => (
          <EachCar key={car._id} data={car} />
        ))}
      </div>
    </div>
  );
};

export default Cars;
