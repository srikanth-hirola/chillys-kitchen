/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import ProductBanner from '../../components/products/ProductBanner';
import Details from '../../components/products/Details';
import Producttabs from '../../components/products/ProductTabs';
import useUrlHandler from '../../customHooks/URLs/useUrlHandler';
import useAPI from '../../customHooks/API/useAPI';
import { message } from 'antd';
import Loader from '../../components/Loader';
import useDetailsPageHandler from '../../customHooks/ProductDetails/useDetailsPageHandler';
import SliderProduct from '../../components/products/DetailsComponents/SliderProduct';
import { getAllSubCategories } from '../../redux/actions/category';
import { useDispatch } from 'react-redux';

const ProductDetails = () => {
  const { getApi } = useAPI();
  const { useQueryParam } = useUrlHandler();
  let params = useQueryParam("product");
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSubCategories());
  }, [dispatch])

  useEffect(() => {
    if (params) {
      const fetchProduct = async () => {
        try {
          setIsLoading(true)
          const { data, error } = await getApi({ endpoint: `/api/v2/product/get-published-products/${params}` });
          if (data) {
            setProductData(data?.product[0])
            setSelectedColor(data?.product[0]?.showInputs ? data?.product[0]?.colorInputs[0] : data?.product[0])
          }
          if (error) {
            message.error(error?.response?.data?.message ?? "Error Occured")
          }
        } catch (error) {
          message.error(error?.response?.data?.message ?? "Error Occured")
        } finally {
          setIsLoading(false)
        }
      }
      fetchProduct()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  const [selectedColor, setSelectedColor] = useState();
  const [count, setCount] = useState(1);
  const [soldOut, setSoldOut] = useState(false);
  const [mainImg, setMainImg] = useState([]);
  const [click, setClick] = useState(false);
  const [limited, setLimited] = useState();

  const { incrementCount, decrementCount, addToCartHandler, getOriginalPrice, getDiscountPrice, buyNowProduct } = useDetailsPageHandler({ data: productData, click, count, selectedColor, setClick, setCount, setLimited, setMainImg, setSoldOut })

  return (
    <>
      {isLoading ? <Loader /> :
        <>
          {productData ?
            <div className="product-details-section">
              <div className="product-details" >
                <div className="container-fluid">
                  <div className="row align-items-center justify-content-between main-product-row" >
                    <div className="col-md-6">
                      <SliderProduct mainImg={mainImg} />
                      {/* <ProductBanner productData={productData} /> */}
                    </div>
                    <div className="col-md-6">
                      <Details productData={productData} getDiscountPrice={getDiscountPrice} getOriginalPrice={getOriginalPrice} selectedColor={selectedColor} setCount={setCount} setLimited={setLimited} setMainImg={setMainImg} setSelectedColor={setSelectedColor} limited={limited} soldOut={soldOut} key={1} count={count} decrementCount={decrementCount} incrementCount={incrementCount} addToCartHandler={addToCartHandler} click={click} setClick={setClick} />
                    </div>

                  </div>
                </div>
              </div>
              <Producttabs productData={productData} />
            </div> : <p>No Product Available!</p>}
        </>
      }
      {/* <Footer/> */}
    </>
  )
}

export default ProductDetails