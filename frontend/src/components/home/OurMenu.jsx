/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons"; // Import Ant Design icons
import { Link } from "react-router-dom";
import useAPI from "../../customHooks/API/useAPI";

const { TabPane } = Tabs;

const OurMenu = () => {

  const [subCategories, setSubCategories] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const { getApi } = useAPI();

  console.log("subCategories our menu", subCategories)
  console.log("products our menu", products)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subCategoriesResponse = await getApi({ endpoint: '/api/v2/category/get-all-sub-categories' });
        setSubCategories(subCategoriesResponse.data.categories);

        const productsResponse = await getApi({ endpoint: '/api/v2/product/get-published-products' });
        setAllProducts(productsResponse.data.products);
        setDisplayedProducts(productsResponse.data.products.slice(0, 6));  // Set initial displayed products
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (key) => {
    if (key === "all") {
      setDisplayedProducts(products); // Display all products in the "All" tab
    } else {
      const filteredProducts = products.filter((product) => product.subCategory === key);
      setDisplayedProducts(filteredProducts); // Update displayed products based on the selected subcategory
    }
  };


  return (
    <div className="our-menu">
      <div
        className="our-menu-sub"
        style={{ backgroundImage: `url(images/home/tabs.jpg)` }}
      >
        <div className="container">
        
          <Tabs
            defaultActiveKey="all"
            centered
            style={{
              height: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onChange={handleTabChange}
          >
             <TabPane tab="All" key="all">
              <div className="our-menu-tab-cards">
                <div className="row">
                  {displayedProducts.map((product) => (
                    <div key={product._id} className="col-md-4">
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
                {displayedProducts.map((product) => (
                  <div key={product._id} className="col-md-4">
                    <div className="our-menu-cards">
                      <div className="our-menu-tab-cards-image">
                        <img src={product?.mainImage?.url} alt={product?.name} />
                      </div>
                      <div className="our-menu-tab-cards-text">
                        <h3>{product?.name}</h3>
                        <p>
                        {product?.description}
                        </p>
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
