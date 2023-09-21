import Api from "./Api";

export const getUsersController = async () => {
  return Api.get("/users");
};
