// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import useUrlHandler from '../../customHooks/URLs/useUrlHandler'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import Products from './Products';
import useData from '../../customHooks/getName/useData';
import { getAllCategories, getAllSubCategories } from '../../redux/actions/category';
import { getPublishedProducts } from '../../redux/actions/product';

const MenuMiddleware = () => {
    const { isLoading } = useSelector((state) => state.products);

    const { getCategory, getFilteredProducts } = useData();
    const { useQueryParam } = useUrlHandler();
    let params = useQueryParam("category");
    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSubCategories());
        dispatch(getPublishedProducts());
        dispatch(getAllCategories())
    }, [dispatch])

    const found = getCategory({ data: params, name: 'category' });

    useEffect(() => {
        if (found) {
            const relatedProducts = getFilteredProducts({ data: found?._id, name: 'category' });
            setProducts(relatedProducts)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, found])

    return (
        <>
            {isLoading ?
                <Loader />
                : <>
                    {products?.length === 0 ?
                        <p>No Products found!</p>
                        :
                        <>
                            <Products productData={products} />
                        </>
                    }
                </>}
        </>
    )
}

export default MenuMiddleware