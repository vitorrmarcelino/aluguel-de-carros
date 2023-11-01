import api from "./Api";

export const uploadImage = async (id, file) => {
  try {
    const response = await api.put(`/upload/${id}`, file);

    return response;
  } catch (error) {
    throw error;
  }
};

export const removeImage = async (id) => {
  try {
    const response = await api.put(`/upload/delete/${id}`);

    return response;
  } catch (error) {
    throw error;
  }
};
