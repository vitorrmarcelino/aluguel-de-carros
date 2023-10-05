import api from "./Api";

export const getCarById = async (id) => {
  try {
    const response = api.get(`carros/${id}`);

    return response;
  } catch (error) {
    return;
  }
};
