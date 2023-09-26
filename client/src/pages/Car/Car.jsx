import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getCarById } from "../../api/getCarById";
import "./Car.css";

const Car = () => {
  const { id } = useParams()
  const [car, setCar] = useState(null)

  const getMovie = async (id) => {
    const response = await getCarById(`carros/${id}`)
    const data = response.data
    setCar(data)
  }

  useEffect(() => {
    getMovie(id)
  }, []) 

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
    <>
   {carBrand}
   {carName}
    </>
  );
};

export default Car;

