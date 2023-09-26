import api from "./Api";

export const checkToken = async () => {
  return api.get("/checktoken");
};
