import React, { useState, useEffect } from "react";
import { getCarById } from "../../../api/getCarById";
import "./CarImg.css"

const CarImg = ({id}) => {
  const [carImgLink, setCarImgLink] = useState();

  useEffect(() => {
    const getCarImg = async () => {
      try {
        const response = await getCarById(id);
        const data = response.data;
        setCarImgLink(data.ImgLink);
      } catch (error) {
        return;
      }
    };
    getCarImg();
  }, [id]);
  return (
    <>
      <img className="car-img" src={carImgLink} alt="Imagem do carro" />
    </>
  );
};

export default CarImg;
