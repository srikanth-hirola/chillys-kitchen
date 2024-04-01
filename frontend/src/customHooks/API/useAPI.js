import axios from "axios"

const useAPI = () => {

    const postApi = async ({ endpoint, postData }) => {
        try {
            let { data } = await axios.post(`http://13.233.179.100:8001${endpoint}`, postData);
            return { data: data }
        } catch (error) {
            return { error: error }
        }
    }

    const putApi = async ({ endpoint, postData }) => {
        try {
            let { data } = await axios.put(`http://13.233.179.100:8001${endpoint}`, postData);
            return { data: data }
        } catch (error) {
            return { error: error }
        }
    }

    const deleteApi = async ({ endpoint, postData }) => {
        try {
            let { data } = await axios.delete(`http://13.233.179.100:8001${endpoint}`, postData);
            return { data: data }
        } catch (error) {
            return { error: error }
        }
    }

    const getApi = async ({ endpoint }) => {
        try {
            let { data } = await axios.get(`http://13.233.179.100:8001${endpoint}`);
            return { data: data }
        } catch (error) {
            return { error: error }
        }
    }

    return { getApi, postApi, putApi, deleteApi }
}

export default useAPI