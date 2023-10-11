import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { getUserRentals } from "../../api/getUserRentals";
import { AuthContext } from "../../context/auth";
import RentalCard from "../../components/RentalCard/RentalCard";
// import "./Rentals.css";

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getRentals = async () => {
      const res = await getUserRentals(user._id);
      setRentals(res.data);
    };
    getRentals();
  }, [user._id]);

  return (
    <div className="center-flex">
      <div className="container">
        {rentals.length > 0 ? (
          <>
            {rentals
              .slice()
              .reverse()
              .map((rental) => (
                <RentalCard key={rental._id} data={rental} />
              ))}
          </>
        ) : (
          <>
            <p>Você não fez nenhuma reserva</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Rentals;
