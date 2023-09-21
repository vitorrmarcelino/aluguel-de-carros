import Api from "./Api";

export const checkToken = async () => {
  return Api.get("/checktoken");
};
