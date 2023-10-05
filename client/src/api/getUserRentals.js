import api from "./Api";

export const getUserRentals = async (id) => {
  try {
    const response = api.get(`rentals/${id}`);

    return response;
  } catch (error) {
    return;
  }
};
