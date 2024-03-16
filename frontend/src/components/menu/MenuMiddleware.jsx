// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import useUrlHandler from '../../customHooks/URLs/useUrlHandler'
import { useSelector } from 'react-redux';

const MenuMiddleware = () => {
    const { category } = useSelector((state) => state.category);
    const { allPublishedProducts } = useSelector((state) => state.products);
    const { useQueryParam } = useUrlHandler();
    let params = useQueryParam("category")


    useEffect(() => {
        const found = category?.find((item) => item?.category === params);
        if (found) {
            const relatedProducts = allPublishedProducts?.find((product) => product?.category === found?._id);
            console.log(relatedProducts)
        }
    }, [params, category, allPublishedProducts])

    return (
        <>
            {params === ""}
        </>
    )
}

export default MenuMiddleware