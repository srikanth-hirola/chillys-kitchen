/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import useAPI from "../../customHooks/API/useAPI";

const { TabPane } = Tabs;

const OurMenu = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [initiallySlicedProducts, setInitiallySlicedProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const { getApi } = useAPI();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subCategoriesResponse = await getApi({ endpoint: '/api/v2/category/get-all-sub-categories' });
        setSubCategories(subCategoriesResponse.data.categories);

        const productsResponse = await getApi({ endpoint: '/api/v2/product/get-published-products' });
        const allProducts = productsResponse.data.products;
        setAllProducts(allProducts);
        setInitiallySlicedProducts(allProducts.slice(0, 8)); // Set initial displayed products
        setDisplayedProducts(allProducts.slice(0, 8));  // Set initially sliced products as displayed initially
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (key) => {
    if (key === "all") {
      setDisplayedProducts(initiallySlicedProducts); // Display initially sliced products in the "All" tab
    } else {
      const filteredProducts = products.filter((product) => product.subCategory === key);
      setDisplayedProducts(filteredProducts); // Update displayed products based on the selected subcategory
    }
  };

  return (
    <div className="our-menu">
      <div className="our-menu-sub" style={{ backgroundImage: `url(images/home/tabs.jpg)` }}>
        <div className="container-lg container-md container-xl container-xxl">
          <Tabs
            defaultActiveKey="all"
            centered
            style={{
              height: "",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onChange={handleTabChange}
          >
            <TabPane
                tab={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    className="tb-title"
                  >
                    <span>
                      <img
                        src='https://res.cloudinary.com/duusv7nak/image/upload/v1711365021/chilly_kitchen/subCategories/x0dy051ytvqnl9sl9o9w.webp'
                        className="tab-img"
                        alt=""
                      />
                    </span>
                    <span>All</span>
                  </div>
                }
                key={"All"}
              >
              <div className="our-menu-tab-cards">
                <div className="row">
                  {displayedProducts.map((product) => (
                    <div key={product._id} className="col-md-3">
                      <div className="our-menu-cards">
                        <div className="our-menu-tab-cards-image">
                          <img src={product?.mainImage?.url} alt={product?.name} />
                        </div>
                        <div className="our-menu-tab-cards-text">
                          <h3>{product?.name}</h3>
                          <p>{product?.description}</p>
                          <div className="cart-sec">
                            <span>Price: {product?.originalPrice}</span>
                            <Link to={`/product/${product._id}`}>
                              <ShoppingCartOutlined />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabPane>
            {subCategories.map((category) => (
              <TabPane
                tab={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    className="tb-title"
                  >
                    <span>
                      <img
                        src={category?.subCatImg?.url}
                        className="tab-img"
                        alt=""
                      />
                    </span>
                    <span>{category?.subCategory}</span>
                  </div>
                }
                key={category._id}
              >
                <div className="our-menu-tab-cards">
                  <div className="row">
                    {displayedProducts
                      .filter((product) => product.subCategory === category._id)
                      .map((product) => (
                        <div key={product._id} className="col-md-3">
                          <div className="our-menu-cards">
                            <div className="our-menu-tab-cards-image">
                              <img src={product?.mainImage?.url} alt={product?.name} />
                            </div>
                            <div className="our-menu-tab-cards-text">
                              <h3>{product?.name}</h3>
                              <p>{product?.description}</p>
                              <div className="cart-sec">
                                <span>Price: {product?.originalPrice}</span>
                                <Link>
                                  <ShoppingCartOutlined />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </TabPane>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default OurMenu;
