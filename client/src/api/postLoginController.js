import api from "./Api"

export const postLoginController = async (email, password) =>{
    try {
        const response = await api.post(
          "/auth/login",
          JSON.stringify({ email, password }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        return response
      } catch (error) {
        throw error
      }
}