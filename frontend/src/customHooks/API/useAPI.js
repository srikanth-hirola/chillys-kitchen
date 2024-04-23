import axios from "axios"

const useAPI = () => {

    const postApi = async ({ endpoint, postData }) => {
        try {
            let { data } = await axios.post(`https://chillys-kitchen-0cnw.onrender.com${endpoint}`, postData);
            return { data: data }
        } catch (error) {
            return { error: error }
        }
    }

    const putApi = async ({ endpoint, postData }) => {
        try {
            let { data } = await axios.put(`https://chillys-kitchen-0cnw.onrender.com${endpoint}`, postData);
            return { data: data }
        } catch (error) {
            return { error: error }
        }
    }

    const deleteApi = async ({ endpoint, postData }) => {
        try {
            let { data } = await axios.delete(`https://chillys-kitchen-0cnw.onrender.com${endpoint}`, postData);
            return { data: data }
        } catch (error) {
            return { error: error }
        }
    }

    const getApi = async ({ endpoint }) => {
        try {
            let { data } = await axios.get(`https://chillys-kitchen-0cnw.onrender.com${endpoint}`);
            return { data: data }
        } catch (error) {
            return { error: error }
        }
    }

    return { getApi, postApi, putApi, deleteApi }
}

export default useAPI