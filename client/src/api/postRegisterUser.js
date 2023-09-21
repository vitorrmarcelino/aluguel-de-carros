import api from "./Api";

export const postRegisterUser = async (
  name,
  email,
  password,
  confirmpassword
) => {
  try {
    const response = await api.post(
      "/auth/register",
      JSON.stringify({ name, email, password, confirmpassword }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};
