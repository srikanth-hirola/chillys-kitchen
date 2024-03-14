import axios from "axios"

const useAPI = () => {

    const postApi = async ({ endpoint, postData }) => {
        try {
            let { data } = await axios.post(`http://localhost:8000${endpoint}`, postData);
            return data
        } catch (error) {
            return error
        }
    }

    const getApi = async ({ endpoint }) => {
        try {
            let { data } = await axios.get(`http://localhost:8000${endpoint}`);
            return data
        } catch (error) {
            return error
        }
    }

    return { getApi, postApi }
}

export default useAPI