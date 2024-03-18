import { useEffect } from "react";
import { useSelector } from "react-redux";

const useData = () => {
    const { category } = useSelector((state) => state.category);
    const { subCategories } = useSelector((state) => state.category);
    const { allPublishedProducts } = useSelector((state) => state.products);


    useEffect(() => {
        console.log(allPublishedProducts, category, "hu")
    }, [allPublishedProducts, category])


    const getCategory = ({ data, name }) => {
        const found = category?.find((item) => item?.[name] === data);
        return found
    }

    const getSubCategory = ({ data, name }) => {
        console.log(data, name, "sub")
        const found = subCategories?.find((item) => item?.[name] === data);
        return found
    }

    const getFilteredProducts = ({ data, name }) => {
        console.log(allPublishedProducts, "in filter")
        const found = allPublishedProducts?.filter((item) => item?.[name] === data);
        return found
    }

    return { getCategory, getFilteredProducts, getSubCategory }
}

export default useData