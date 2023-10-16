import React from "react";
import PropTypes from "prop-types";
import "./RentalCard.css";
import CarImg from "./CarImg/CarImg";
import formatPriceBRL from "../../utils/formatPriceBRL";

const RentalCard = ({ data }) => {
  const { firstDay, lastDay, Days, Cost, CarId } = data;
  const formattedFirstDay = firstDay.slice(0, 10);
  const formattedLastDay = lastDay.slice(0, 10);

  return (
    <div className="center-block">
      <div className="container-rent">
        <CarImg id={CarId} />
        <div className="rental-texts">
          <p className="date rent-infos">Primeiro dia: {formattedFirstDay}</p>
          <p className="date rent-infos">Último dia: {formattedLastDay}</p>
          <p className="days rent-infos">{Days} dias no total</p>
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
