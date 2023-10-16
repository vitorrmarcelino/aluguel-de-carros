import api from "./Api";

export const getCars = async () => {
  try {
    const response = api.get("carros");

    return response;
  } catch (error) {
    return;
  }
};
