import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCarById } from "../../api/getCarById";
import formatDisplacement from "../../utils/formatDisplacement";
import "./Car.css";
import { postRental } from "../../api/postRental";
import { AuthContext } from "../../context/auth";

const Car = () => {
  const { user, authenticated } = useContext(AuthContext);
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [firstDay, setFirstDay] = useState("");
  const [lastDay, setLastDay] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getCar = async (id) => {
    try {
      const response = await getCarById(`carros/${id}`);
      const data = response.data;
      setCar(data);
    } catch (error) {
      navigate("/nao-encontrada");
    }
  };

  useEffect(() => {
    getCar(id);
  }, []);

  if (!car) {
    return null;
  }

  const {
    ImgLink,
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

  const handleSubmitRent = async (e) => {
    e.preventDefault();

    if (authenticated) {
      const startDate = new Date(firstDay);
      const endDate = new Date(lastDay);
      const timeDifference = endDate.getTime() - startDate.getTime();
      const Days = Math.ceil(timeDifference / (1000 * 3600 * 24));
      const Cost = pricePerDay * Days;
      const UserId = user._id;
      const CarId = id;

      try {
        const response = await postRental(
          startDate,
          endDate,
          Days,
          Cost,
          UserId,
          CarId
        );

        console.log(response.data);

        setError("Alugado com sucesso!");
        setFirstDay("");
        setLastDay("");
      } catch (error) {
        if (!error?.response) {
          setError("Erro ao acessar o servidor");
        } else if (error.response.status === 422) {
          setError(error.response.data.msg);
        }
      }
    } else {
      navigate("/login");
    }
  };

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
          <form className="date-form" onSubmit={handleSubmitRent}>
            <label htmlFor="first-day">Data Inicial:</label>
            <input
              type="date"
              name="first-day"
              id="first-day"
              value={firstDay}
              onChange={(e) => [setFirstDay(e.target.value), setError("")]}
            />
            <label htmlFor="last-day">Data Final:</label>
            <input
              type="date"
              id="last-day"
              name="last-day"
              value={lastDay}
              onChange={(e) => [setLastDay(e.target.value), setError("")]}
            />
            <p>{pricePerDay}</p>
            <button type="submit" className="rent-button">
              Alugar
            </button>
            <p>{error}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Car;
