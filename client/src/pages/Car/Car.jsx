import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCarById } from "../../api/getCarById";
import formatDisplacement from "../../utils/formatDisplacement";
import formatPriceBRL from "../../utils/formatPriceBRL";
import "./Car.css";
import { postRental } from "../../api/postRental";
import { AuthContext } from "../../context/auth";

const Car = () => {
  const { user, authenticated } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [firstDay, setFirstDay] = useState("");
  const [lastDay, setLastDay] = useState("");
  const [error, setError] = useState("");
  const [totalCost, setTotalCost] = useState(null);

  useEffect(() => {
    const getCar = async () => {
      try {
        const response = await getCarById(id);
        const data = response.data;
        setCar(data);
      } catch (error) {
        navigate("/nao-encontrada");
      }
    };

    getCar();
  }, [id, navigate]);

  const handleDateChange = (e) => {
    setError("");
    const { name, value } = e.target;
    if (name === "first-day") {
      setFirstDay(value);
    } else if (name === "last-day") {
      setLastDay(value);
    }
  };

  useEffect(() => {
    if (firstDay && lastDay) {
      const startDate = new Date(firstDay);
      const endDate = new Date(lastDay);
      const timeDifference = endDate.getTime() - startDate.getTime();
      const Days = Math.ceil(timeDifference / (1000 * 3600 * 24));
      setTotalCost(car.pricePerDay * Days);
    } else {
      setTotalCost(null);
    }
  }, [firstDay, lastDay, car]);

  const handleRentSubmit = async (e) => {
    e.preventDefault();

    if (authenticated) {
      const UserId = user._id;
      const CarId = id;
      const startDate = new Date(firstDay);
      const endDate = new Date(lastDay);
      const timeDifference = endDate.getTime() - startDate.getTime();
      const Days = Math.ceil(timeDifference / (1000 * 3600 * 24));
      const Cost = car.pricePerDay * Days;

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
        setTotalCost(Cost);
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

  if (!car) {
    return null;
  }

  return (
    <div className="container center-block">
      <div className="car-container">
        <div className="car-infos-and-img">
          <h2>
            {car.carBrand} {car.carName}
          </h2>
          <h3>
            {formatDisplacement(car.engineDisplacementInMl)}{" "}
            {car.isTurbo ? "Turbo" : "Aspirado"}{" "}
            {car.Automatic ? "Câmbio Automático" : "Câmbio Manual"}
          </h3>
          <img src={car.ImgLink} alt="Imagem do carro" />
        </div>
        <div className="car-actions-and-dates">
          <form className="date-form" onSubmit={handleRentSubmit}>
            <label htmlFor="first-day">Data Inicial:</label>
            <input
              type="date"
              name="first-day"
              id="first-day"
              value={firstDay}
              onChange={handleDateChange}
            />
            <label htmlFor="last-day">Data Final:</label>
            <input
              type="date"
              id="last-day"
              name="last-day"
              value={lastDay}
              onChange={handleDateChange}
            />
            <p>
              {totalCost !== null
                ? `Preço total: ${formatPriceBRL(totalCost)}`
                : `Preço da diária é de ${formatPriceBRL(car.pricePerDay)}`}
            </p>
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
