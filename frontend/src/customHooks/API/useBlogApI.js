import { useNavigate } from "react-router";
import useAPI from "./useAPI";

const useBlogApi = () => {
    const navigate = useNavigate();
    const url = `/api/v2/blogs/`;
    const { getApi, deleteApi, postApi, putApi } = useAPI();

    const handleImageDeleteCloude = (e, id, _id) => {
        e.preventDefault();
        if (window.confirm("uploaded Image will be deleted Permanently!")) {
            handleCloudinaryImageDelete(id, _id)
        }
    }

    const handleCloudinaryImageDelete = async (public_id, _id, data, setData) => {
        try {
            const { data, error } = await deleteApi({ endpoint: `${url}admin/delete-Img/${public_id}/${_id}` })
            if (data) {
                let updatedState = { ...data };
                let images = [...updatedState.large_thumb];
                images = images?.filter((image) => image?.public_id !== public_id)
                updatedState.large_thumb = images;
                setData(updatedState);
                alert('Image delete successfully!')
            }
            if (error) {
                alert(error?.response?.data?.message)
            }
        } catch (error) {
            alert(error?.response?.data?.message)
        }
    }

    const handleAddCategory = async (e, dropData, setDropData, category, endpoint, name) => {
        e.preventDefault();
        try {
            const { data, error } = await postApi({ endpoint: `${url}${endpoint}`, postData: { [name]: category } })
            if (data) {
                let updatedState = [...dropData];
                updatedState.push({ [name]: category });
                setDropData(updatedState)
                alert("Added Category successfully")
            }
            if (error) {
                alert(error?.response?.data?.message)
            }

        } catch (e) {
            alert(e?.response?.data?.message);
        }
    }

    const fetchCategories = async (setDropDown, endpoint) => {
        try {

            const { data } = await getApi({ endpoint: `${url}${endpoint}` });
            if (data) {
                setDropDown(data?.categories)
            }
        } catch (error) {
            alert(error?.response?.data?.message);
        }
    }

    const handleSubmit = async (e, data, endpoint, navPath, message) => {
        e.preventDefault();
        try {
            const { data, error } = await postApi({ endpoint: `${url}${endpoint}`, postData: { data } })
            if (data) {
                navigate(navPath);
                alert(message);
            }
            if (error) {
                alert(error?.response?.data?.message)
            }
        } catch (e) {
            alert(e?.response?.data?.message)
        }
    };

    const fetchSingleData = async (endpoint, setLoading, setPageFound, setData) => {
        try {
            const { data } = await getApi({ endpoint: `${url}${endpoint}` });

            if (data) {
                setLoading(true);
                if (data === '') {
                    setLoading(true);
                    setPageFound('Notfound');
                } else {
                    setData({ ...data?.data });
                }
            }
        } catch (e) {
            alert(e?.response?.data?.message)
        }
    };

    const fetchBunchData = async (endpoint, setLoading, setData, setPageFound) => {
        try {
            const { data } = await getApi({ endpoint: `${url}${endpoint}` });
            if (data) {
                setLoading(true);
                if (data.length > 0) {
                    setData(data);
                } else {
                    setPageFound('Notfound');
                }
            }
        } catch (e) {
            alert(e?.response?.data?.message)
        }
    };

    const updateData = async (e, data, setLoading, endpoint, navPath, message) => {
        e.preventDefault();
        setLoading(true)
        try {
            const { data, error } = await putApi({ endpoint: `${url}${endpoint}`, postData: { data } });
            if (error) {
                alert(error?.response?.data?.message)
            }
            if (data) {
                navigate(navPath);
                alert(message)
            }

        } catch (e) {
            alert(e?.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    const deleteData = async (e, setLoading, endpoint, message) => {
        e.preventDefault();
        try {
            setLoading(false)
            const { data, error } = await deleteApi({ endpoint: `${url}${endpoint}` });
            if (data) {
                window.location.reload()
                alert(message)
            }
            if (error) {
                alert(error?.response?.data?.message)
            }
            setLoading(true)
        } catch (e) {
            alert(e?.response?.data?.message)
        }
    }

    return { deleteData, updateData, handleCloudinaryImageDelete, handleImageDeleteCloude, handleAddCategory, fetchCategories, handleSubmit, fetchSingleData, fetchBunchData }
}

export default useBlogApi