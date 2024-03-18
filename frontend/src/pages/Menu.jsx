// eslint-disable-next-line no-unused-vars
import React from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import Banner from '../components/menu/Banner'
import MenuMiddleware from '../components/menu/MenuMiddleware'
import useUrlHandler from '../customHooks/URLs/useUrlHandler'
import ProductDetails from './products/ProductDetails'

const Menu = () => {
  const { useQueryParam } = useUrlHandler();
  let paramsProduct = useQueryParam("product");
  console.log(paramsProduct)

  return (
    <>
      <Navbar />

      {paramsProduct ? <ProductDetails /> : <><Banner /><MenuMiddleware /></>}

      <Footer />
    </>
  )
}

export default Menu