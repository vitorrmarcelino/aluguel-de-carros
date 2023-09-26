import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCarById } from "../../api/getCarById";
import formatDisplacement from "../../utils/formatDisplacement";
import "./Car.css";

const Car = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  const getMovie = async (id) => {
    try {
      const response = await getCarById(`carros/${id}`);
      const data = response.data;
      setCar(data);
    } catch (error) {
      navigate("/nao-encontrada");
    }
  };

  useEffect(() => {
    getMovie(id);
  }, []);

  if (!car) {
    return null;
  }

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
    pricePerDay,
  } = car;

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
    <div className="container center-block">
      <div className="car-container">
        <div className="car-infos-and-img">
          <h2>
            {carBrand} {carName}
          </h2>
          <h3>
            {formatDisplacement(engineDisplacementInMl)} {engineType} {gear}
          </h3>
          <img src={ImgLink} alt="Imagem do carro" />
        </div>
        <div className="car-actions-and-dates">
          <form className="date-form">
            <label htmlFor="first-day">Data Inicial:</label>
            <input type="date" name="first-day" id="last-day" />
            <label htmlFor="last-day">Data Final:</label>
            <input type="date" id="last-day" name="last-day" />
            <p>{pricePerDay}</p>
            <button type="submit" className="rent-button">
              Alugar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Car;
