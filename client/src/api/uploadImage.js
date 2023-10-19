import api from "./Api";

export const uploadImage = async (id, file) => {
  try {
    const response = await api.put(`/upload/${id}`,
    file);

    return response;
  } catch (error) {
    throw error;
  }
};
