import api from "./Api"

export const getCarById = async (url) => {
    try {
        const response = api.get(url)

        return response
    } catch (error) {
        return
    }
}