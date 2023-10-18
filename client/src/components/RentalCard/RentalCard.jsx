import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./RentalCard.css";
import CarImg from "./CarImg/CarImg";
import formatPriceBRL from "../../utils/formatPriceBRL";
import api from "../../api/Api";

const RentalCard = ({ data }) => {
  const { firstDay, lastDay, Days, Cost, CarId } = data;
  const formattedFirstDay = firstDay.slice(0, 10);
  const formattedLastDay = lastDay.slice(0, 10);
  const [carName, setCarName] = useState("");
  useEffect(() => {
    const getCarName = async() => {
      try {
        const response = await api.get(`carros/${CarId}`);
        const name = response.data.carName;
        const brand = response.data.carBrand;
        setCarName(brand+" "+name);
      } catch (error) {
        setCarName("Carro não identificado")
      }
    }
    getCarName();
  }, [CarId]);

  return (
    <div className="center-block">
      <div className="container-rent">
        <CarImg id={CarId} />
        <div className="rental-texts">
          <p className="car-name-info rent-infos">{carName}</p>
          <p className="date rent-infos">Primeiro dia: {formattedFirstDay}</p>
          <p className="date rent-infos">Último dia: {formattedLastDay}</p>
          {Days > 1 ? (
            <p className="days rent-infos">{Days} dias no total</p>
          ) : (
            <p className="days rent-infos">1 dia no total</p>
          )}
          <p className="cost rent-infos">{formatPriceBRL(Cost)} </p>
        </div>
      </div>
      <br />
    </div>
  );
};

RentalCard.propTypes = {
  data: PropTypes.shape({}),
};

export default RentalCard;
