import axios from "axios"

const useAPI = () => {

    const postApi = async ({ endpoint, postData }) => {
        try {
            let { data } = await axios.post(`http://localhost:8000${endpoint}`, postData);
            return { data: data }
        } catch (error) {
            return { error: error }
        }
    }

    const putApi = async ({ endpoint, postData }) => {
        try {
            let { data } = await axios.put(`http://localhost:8000${endpoint}`, postData);
            return { data: data }
        } catch (error) {
            return { error: error }
        }
    }

    const deleteApi = async ({ endpoint, postData }) => {
        try {
            console.log(endpoint, postData)
            let { data } = await axios.delete(`http://localhost:8000${endpoint}`, postData);
            return { data: data }
        } catch (error) {
            return { error: error }
        }
    }

    const getApi = async ({ endpoint }) => {
        try {
            let data = await axios.get(`http://localhost:8000${endpoint}`);
            return data
        } catch (error) {
            return error
        }
    }

    return { getApi, postApi, putApi, deleteApi }
}

export default useAPI