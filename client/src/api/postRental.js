import api from "./Api";

export const postRental = async (
  firstDay,
  lastDay,
  Days,
  Cost,
  UserId,
  CarId
) => {
  try {
    const response = await api.post(
      "/rentals",
      JSON.stringify({ firstDay, lastDay, Days, Cost, UserId, CarId }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};
