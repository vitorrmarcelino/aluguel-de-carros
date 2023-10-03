import React from "react";
import propTypes from "prop-types";
import "./RentalCard.css";

const RentalCard = ({ data }) => {
  const { firstDay, lastDay, Days, Cost, UserId, CarId } = data;
  return (
    <div>
      <p>{firstDay}</p>
      <p>{lastDay}</p>
      <p>{Days}</p>
      <p>{Cost}</p>
      <p>{UserId}</p>
      <p>{CarId}</p>
    </div>
  );
};

export default RentalCard;

RentalCard.propTypes = {
  data: propTypes.shape({}),
}.isRequired;
