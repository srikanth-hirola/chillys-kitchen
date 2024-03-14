const axios = require('axios');
const order = require('../model/order');
const express = require('express');
const { isSeller, isAuthenticated, isAdmin } = require('../middleware/auth');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const router = express.Router();
const ErrorHandler = require('../utils/ErrorHandler');
const Shop = require('../model/shop');

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const psi = require('psi');

//page speed
router.get('/page-speed',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const apiUrl = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://hirolainfotech.com';

      console.log(apiUrl)

      axios.get(apiUrl)
        .then(response => {
          const data = response.data;

          // Check if the request was successful
          if (response.status === 200) {
            // Extract relevant information
            const lighthouseData = data.lighthouse || {};
            const auditsData = lighthouseData.audits || {};

            // Log the entire auditsData object
            console.log('Audits Data:', auditsData);

            // Get specific metrics you're interested in
            const firstContentfulPaint = auditsData['first-contentful-paint'] ? auditsData['first-contentful-paint'].displayValue : 'N/A';
            const speedIndex = auditsData['speed-index'] ? auditsData['speed-index'].displayValue : 'N/A';

            // Print the results
            console.log(`First Contentful Paint: ${firstContentfulPaint}`);
            console.log(`Speed Index: ${speedIndex}`);
          } else {
            console.log(`Error: ${response.status}`);
            console.log(data);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }))

//page insights
router.get('/page-insights',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const apiUrl = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://hirolainfotech.com';

      getSEOInfo('https://hirolainfotech.com');
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }))

async function getSEOInfo(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const seoInfo = await page.evaluate(() => {
    const metaTags = document.querySelectorAll('meta');
    const keywords = Array.from(metaTags)
      .filter(tag => tag.name === 'keywords')
      .map(tag => tag.content);

    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
      .map(heading => heading.textContent);

    const internalLinks = Array.from(document.querySelectorAll('a'))
      .filter(link => link.href.startsWith(window.location.origin))
      .map(link => link.href);

    const externalLinks = Array.from(document.querySelectorAll('a'))
      .filter(link => !link.href.startsWith(window.location.origin))
      .map(link => link.href);

    return {
      pageTitle: document.title,
      keywords,
      metaTags: Array.from(metaTags).map(tag => ({ name: tag.name, content: tag.content })),
      headings,
      internalLinks,
      externalLinks,
    };
  });


  console.log('Page Title:', seoInfo.pageTitle);
  console.log('SEO Keywords:', seoInfo.keywords);
  console.log('Meta Tags:', seoInfo.metaTags);
  console.log('Headings:', seoInfo.headings);
  console.log('Internal Links:', seoInfo.internalLinks);
  console.log('External Links:', seoInfo.externalLinks);

  // Get PageSpeed Insights data
  const psiData = await psi(url);
  console.log('Page Speed Insights Data (page speed):', psiData?.data?.lighthouseResult?.categories);

  // Close the browser
  await browser.close();
}

// create shipment order
router.post(
  '/creat-shipment-order',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { data, packageDimension, shippingDataSeller } = req.body;

      const sellerId = shippingDataSeller.sellerID;

      const shop = await Shop.findOne({ _id: sellerId });

      if (!shop) {
        return next(new ErrorHandler('User not found', 400));
      }

      const token = shop?.shipment?.token;

      const orderID = data?._id?.slice(0, 8);
      const orderDate = data?.createdAt;
      const billing_Name = data?.user?.name;
      const billing_address1 = data?.BillingAddress?.billingaddress1;
      const billing_address2 = data?.BillingAddress?.billingaddress2;
      const billing_email = data?.user?.email;
      const payment_method =
        data?.paymentInfo?.type === 'Cash On Delivery' ? 'COD' : 'Prepaid';
      const sub_Total = Number(shippingDataSeller?.subTotalPrice);
      const shipping = Number(shippingDataSeller?.response?.orders?.rate);
      const length = Number(packageDimension.length);
      const breadth = Number(packageDimension.breadth);
      const height = Number(packageDimension.height);
      const weight = Number(packageDimension.weight);

      const order_items = [];

      await shippingDataSeller?.products.map((item) => {
        const ProductData = {
          name: item.name,
          sku: item.selectedColor.SKU,
          units: item.qty,
          selling_price: Number(item.finalPrice),
          discount: 0,
          tax: 0,
          hsn: Number(item.hsnCode),
        };
        order_items.push(ProductData);
      });


      const orderData = JSON.stringify({
        order_id: orderID,
        order_date: orderDate,
        pickup_location: 'Primary',
        channel_id: '4294654',
        comment: 'Reseller: M/s Goku',
        billing_customer_name: data?.BillingAddress?.billinguserName,
        billing_last_name: '',
        billing_address: billing_address1,
        billing_address_2: billing_address2,
        billing_city: data?.BillingAddress?.newCity,
        billing_pincode: data?.BillingAddress?.billingzipCode,
        billing_state: data?.BillingAddress?.newState,
        billing_country: data?.BillingAddress?.newCountry,
        billing_email: data?.BillingAddress?.billinguserEmail,
        billing_phone: data?.BillingAddress?.billinguserphonenumber,
        shipping_is_billing: data?.shipping_is_billing,
        shipping_customer_name: data?.shippingAddress?.shippinguserName,
        shipping_last_name: '',
        shipping_address: data?.shippingAddress?.shippingaddress1,
        shipping_address_2: data?.shippingAddress?.shippingaddress2,
        shipping_city: data?.shippingAddress?.newCityshipping,
        shipping_pincode: data?.shippingAddress?.shippingzipCode,
        shipping_country: data?.shippingAddress?.newCountryshipping,
        shipping_state: data?.shippingAddress?.newStateshipping,
        shipping_email: data?.shippingAddress?.shippinguserEmail,
        shipping_phone: data?.shippingAddress?.shippinguserphonenumber,
        order_items: order_items,
        payment_method: payment_method,
        shipping_charges: shipping,
        giftwrap_charges: 0,
        transaction_charges: 0,
        total_discount: 0,
        sub_total: sub_Total,
        length: length,
        breadth: breadth,
        height: height,
        weight: weight,
      });

      var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: orderData,
      };

      axios(config)
        .then(function (response) {
          const shippingData = response.data;
          // console.log(shippingData)
          order
            .findOneAndUpdate(
              { _id: data._id, 'sellerCart.sellerID': sellerId },
              {
                $set: {
                  'sellerCart.$.shippingOrderDetails': shippingData,
                },
              }
            )
            .then((result) => {
              res.status(200).json({
                Status: 'Success',
              });
            })
            .catch((e) => {
              return next(new ErrorHandler(error.message, 500));
            });

          // order
          //   .findOneAndUpdate(
          //     { _id: data._id },
          //     {
          //       $set: {
          //         shippingOrderDetails: shippingData,
          //         packageDimension: {
          //           length,
          //           breadth,
          //           height,
          //           weight,
          //         },
          //       },
          //     }
          //   )
          //   .then((result) => {
          //     res.status(200).json({
          //       Status: 'Success',
          //     });
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //     return next(new ErrorHandler(error.message, 500));
          //   });
        })
        .catch(function (error) {
          // console.log(error)
          if (error.response.data.status_code === 422) {
            res.status(422).json({
              success: false,
              message: 'Invalid Data',
            });
          } else if (error.response.data.status_code === 400) {
            res.status(400).json({
              success: false,
              message: 'Bad Request! Try after some time',
            });
          } else if (error.response.data.status_code === 401) {
            res.status(401).json({
              success: false,
              message: 'Token is Invalid! Generate a new one',
            });
          } else if (error.response.data.status_code === 404) {
            res.status(404).json({
              success: false,
              message: 'Invaid Request',
            });
          } else if (error.response.data.status_code === 405) {
            res.status(405).json({
              success: false,
              message: 'Invaid Request',
            });
          } else if (error.response.data.status_code === 429) {
            res.status(429).json({
              success: false,
              message: 'Too many Requests! Try after some time',
            });
          } else {
            res.status(500).json({
              success: false,
              message: 'Server Side Error! Try after some time',
            });
          }
        });

    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// create return shipment order
router.post(
  '/returnOrder',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { sellerID, orderDetails, selectedProducts, orderID } = req.body;

      console.log(orderDetails.id)

      const shop = await Shop.findOne({ _id: sellerID });

      if (!shop) {
        return next(new ErrorHandler('User not found', 400));
      }

      if (shop?.shipment?.token) {
        const token = shop?.shipment?.token;

        let totalweight = 0;
        let totalLength = 0;
        let totalHeight = 0;
        let totalBreadth = 0;
        let totalSubTotal = 0;
        let productsArray = [];

        selectedProducts.forEach((item) => {
          productsArray.push({
            sku: item.orderItem.channel_sku,
            name: item.orderItem.name,
            units: item.orderItem.quantity,
            selling_price: item.orderItem.product_cost,
            discount: item.orderItem.discount,
            hsn: item.orderItem.hsn,
            qc_enable: true
          });
          totalSubTotal += Number(item.orderItem.product_cost);
          totalweight += Number(item.dimension.weight);
          totalLength += Number(item.dimension.length);
          totalHeight += Number(item.dimension.height);
          totalBreadth += Number(item.dimension.width);
        });


        // const orderID = orderDetails?.id;
        var data = JSON.stringify({
          "order_id": orderDetails?.id,
          "order_date": orderDetails?.created_at,
          "channel_id": orderDetails?.channel_id,
          "pickup_customer_name": orderDetails?.customer_name,
          "pickup_address": orderDetails?.customer_address,
          "pickup_address_2": orderDetails?.customer_address_2,
          "pickup_city": orderDetails?.customer_city,
          "pickup_state": orderDetails?.customer_state,
          "pickup_country": orderDetails?.customer_country,
          "pickup_pincode": orderDetails?.customer_pincode,
          "pickup_email": orderDetails?.customer_email,
          "pickup_phone": orderDetails?.customer_phone,
          "shipping_customer_name": orderDetails?.pickup_address_detail?.name,
          "shipping_address": orderDetails?.pickup_address_detail?.address,
          "shipping_address_2": orderDetails?.pickup_address_detail?.address_2,
          "shipping_city": orderDetails?.pickup_address_detail?.city,
          "shipping_country": orderDetails?.pickup_address_detail?.country,
          "shipping_pincode": orderDetails?.pickup_address_detail?.pin_code,
          "shipping_state": orderDetails?.pickup_address_detail?.state,
          "shipping_email": orderDetails?.pickup_address_detail?.email,
          "shipping_phone": orderDetails?.pickup_address_detail?.phone,
          "order_items": productsArray,
          "payment_method": orderDetails?.payment_method,
          "sub_total": totalSubTotal,
          "length": totalLength,
          "breadth": totalBreadth,
          "height": totalHeight,
          "weight": totalweight,
        });

        // console.log(data);

        var config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://apiv2.shiprocket.in/v1/external/orders/create/return',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          data: data,
        };

        axios(config)
          .then(function (response) {
            const shippingData = response.data;
            console.log(shippingData)
            order
              .findOneAndUpdate(
                { _id: orderID, 'sellerCart.sellerID': sellerID },
                {
                  $set: {
                    'sellerCart.$.shippingOrderReturnDetails': shippingData,
                  },
                }
              )
              .then((result) => {
                res.status(200).json({
                  Status: 'Success',
                });
              })
              .catch((e) => {
                return next(new ErrorHandler(error.message, 500));
              });
          })
          .catch(function (error) {
            if (error.response.data.status_code === 422) {
              res.status(422).json({
                success: false,
                message: 'Invalid Data',
              });
            } else if (error.response.data.status_code === 400) {
              res.status(400).json({
                success: false,
                message: 'Bad Request! Try after some time',
              });
            } else if (error.response.data.status_code === 401) {
              res.status(401).json({
                success: false,
                message: 'Token is Invalid! Generate a new one',
              });
            } else if (error.response.data.status_code === 404) {
              res.status(404).json({
                success: false,
                message: 'Invaid Request',
              });
            } else if (error.response.data.status_code === 405) {
              res.status(405).json({
                success: false,
                message: 'Invaid Request',
              });
            } else if (error.response.data.status_code === 429) {
              res.status(429).json({
                success: false,
                message: 'Too many Requests! Try after some time',
              });
            } else {
              res.status(500).json({
                success: false,
                message: 'Server Side Error! Try after some time',
              });
            }
          });
      } else {
        res.status(422).json({
          success: false,
          message: 'Login to ShipRocket API',
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get shipment order
router.get(
  '/seller-shipment-orders/:shopId',
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { shopId } = req.params;

      const shop = await Shop.findOne({ _id: shopId });

      if (!shop) {
        return next(new ErrorHandler('User not found', 400));
      }

      const token = shop.shipment.token;

      var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://apiv2.shiprocket.in/v1/external/orders',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      axios(config)
        .then(function (response) {
          res.status(200).json({ orders: response.data });
        })
        .catch(function (error) {
          if (error.data.status_code === 422) {
            res.status(422).json({
              success: false,
              message: 'Invalid Data',
            });
          } else if (error.data.status_code === 400) {
            res.status(400).json({
              success: false,
              message: 'Bad Request! Try after some time',
            });
          } else if (error.data.status_code === 401) {
            res.status(401).json({
              success: false,
              message: 'Token is Invalid! Generate a new one',
            });
          } else if (error.data.status_code === 404) {
            res.status(404).json({
              success: false,
              message: 'Invaid Request',
            });
          } else if (error.data.status_code === 405) {
            res.status(405).json({
              success: false,
              message: 'Invaid Request',
            });
          } else if (error.data.status_code === 429) {
            res.status(429).json({
              success: false,
              message: 'Too many Requests! Try after some time',
            });
          } else {
            res.status(500).json({
              success: false,
              message: 'Server Side Error! Try after some time',
            });
          }
        });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get return shipment order
router.get(
  '/seller-return-shipment-orders/:shopId',
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { shopId } = req.params;

      const shop = await Shop.findOne({ _id: shopId });

      if (!shop) {
        return next(new ErrorHandler('User not found', 400));
      }

      const token = shop.shipment.token;

      var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://apiv2.shiprocket.in/v1/external/orders/processing/return',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      axios(config)
        .then(function (response) {
          res.status(200).json({ orders: response.data });
        })
        .catch(function (error) {
          if (error.data.status_code === 422) {
            res.status(422).json({
              success: false,
              message: 'Invalid Data',
            });
          } else if (error.data.status_code === 400) {
            res.status(400).json({
              success: false,
              message: 'Bad Request! Try after some time',
            });
          } else if (error.data.status_code === 401) {
            res.status(401).json({
              success: false,
              message: 'Token is Invalid! Generate a new one',
            });
          } else if (error.data.status_code === 404) {
            res.status(404).json({
              success: false,
              message: 'Invaid Request',
            });
          } else if (error.data.status_code === 405) {
            res.status(405).json({
              success: false,
              message: 'Invaid Request',
            });
          } else if (error.data.status_code === 429) {
            res.status(429).json({
              success: false,
              message: 'Too many Requests! Try after some time',
            });
          } else {
            res.status(500).json({
              success: false,
              message: 'Server Side Error! Try after some time',
            });
          }
        });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// available couriers
router.post(
  '/get-available-courier',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cod, weight, delivery_postcode, sellerId } =
        req.body;

      const shop = await Shop.findOne({ _id: sellerId });

      if (!shop) {
        return next(new ErrorHandler('User not found', 400));
      }

      if (shop?.shipment?.token) {
        const token = shop?.shipment?.token;

        const pickup_postcode = shop?.pickupLocation?.pin_code;

        var config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `https://apiv2.shiprocket.in/v1/external/courier/serviceability?delivery_postcode=${delivery_postcode}&&pickup_postcode=${pickup_postcode}&&weight=${weight}&&cod=${cod}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        axios(config)
          .then(function (response) {
            if (response.data.status === 200) {
              const couriers = response.data?.data?.available_courier_companies;
              if (shop?.couriers?.length > 0) {
                const shopCouriers = shop?.couriers;
                const newCouriers = couriers.filter((val) => shopCouriers.includes(val.courier_company_id));
                if (newCouriers.length > 0) {
                  let earliestEtd = null;
                  let earliestObject = null;

                  couriers.forEach((deliveryObject) => {
                    const etd = deliveryObject.etd;
                    if (etd) {
                      const etdDate = new Date(etd);

                      if (earliestEtd === null || etdDate < earliestEtd) {
                        earliestEtd = etdDate;
                        earliestObject = deliveryObject;
                      }
                    }
                  });
                  res
                    .status(200)
                    .json({ orders: earliestObject, status: response.data.status });
                } else {
                  res
                    .status(400)
                    .json({
                      success: false,
                      message: 'Delivery is not available for that Post Code',
                    });
                }
              } else {
                let earliestEtd = null;
                let earliestObject = null;

                couriers.forEach((deliveryObject) => {
                  const etd = deliveryObject.etd;
                  if (etd) {
                    const etdDate = new Date(etd);

                    if (earliestEtd === null || etdDate < earliestEtd) {
                      earliestEtd = etdDate;
                      earliestObject = deliveryObject;
                    }
                  }
                });
                res
                  .status(200)
                  .json({ orders: earliestObject, status: response.data.status });
              }
            } else {
              res.status(200).json({
                message: response.data.message,
                status: response.data.status,
              });
            }
          })
          .catch(function (error) {
            if (error.response.data.status_code === 422) {
              res.status(422).json({
                success: false,
                message: 'Invalid Pin Code',
              });
            } else if (error.response.data.status_code === 400) {
              res.status(400).json({
                success: false,
                message: 'Bad Request! Try after some time',
              });
            } else if (error.response.data.status_code === 401) {
              res.status(401).json({
                success: false,
                message: 'Token is Invalid! Generate a new one',
              });
            } else if (error.response.data.status_code === 404) {
              res.status(404).json({
                success: false,
                message: 'Invalid Request',
              });
            } else if (error.response.data.status_code === 405) {
              res.status(405).json({
                success: false,
                message: 'Invalid Request',
              });
            } else if (error.response.data.status_code === 429) {
              res.status(429).json({
                success: false,
                message: 'Too many Requests! Try after some time',
              });
            } else {
              res.status(500).json({
                success: false,
                message: 'Server Side Error! Try after some time',
              });
            }
            // return next(new ErrorHandler(error.message, 500));
          });
      } else {
        res.status(422).json({
          success: false,
          message: 'Currently Delivery is Not available in your pin code',
        });
      }


    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// awb generate
router.post(
  '/generateAWB',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { orderID, shippmentID, courierID, sellerID } = req.body;

      const shop = await Shop.findOne({ _id: sellerID });

      if (!shop) {
        return next(new ErrorHandler('User not found', 400));
      }

      const token = shop.shipment.token;

      var data = JSON.stringify({
        shipment_id: shippmentID,
        courier_id: courierID,
      });

      var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://apiv2.shiprocket.in/v1/external/courier/assign/awb',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          const awbData = response.data;
          order
            .findOneAndUpdate(
              { _id: orderID, 'sellerCart.sellerID': sellerID },
              {
                $set: {
                  'sellerCart.$.awbDetails': awbData,
                },
              }
            )
            .then((result) => {
              res.status(200).json({
                Status: 'Success',
              });
            })
            .catch((e) => {
              return next(new ErrorHandler(error.message, 500));
            });
        })
        .catch(function (error) {
          res.status(500).json({
            success: false,
            message: error.response.data.message,
          });
        });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// awb return generate
router.post(
  '/generateReturnAWB',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { orderID, shippmentID, courierID, sellerID } = req.body;

      const shop = await Shop.findOne({ _id: sellerID });

      if (!shop) {
        return next(new ErrorHandler('User not found', 400));
      }

      const token = shop?.shipment?.token;

      var data = JSON.stringify({
        shipment_id: shippmentID,
        courier_id: courierID,
        is_return: true
      });

      var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://apiv2.shiprocket.in/v1/external/courier/assign/awb',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          const awbData = response.data;
          order
            .findOneAndUpdate(
              { _id: orderID, 'sellerCart.sellerID': sellerID },
              {
                $set: {
                  'sellerCart.$.awbDetails': awbData,
                },
              }
            )
            .then((result) => {
              res.status(200).json({
                Status: 'Success',
              });
            })
            .catch((e) => {
              return next(new ErrorHandler(error.message, 500));
            });
        })
        .catch(function (error) {
          res.status(500).json({
            success: false,
            message: error.response.data.message,
          });
        });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// updating order address
router.post(
  '/update-delivery-address',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { sellerID, formData, addressType } = req.body;

      const shop = await Shop.findOne({ _id: sellerID });

      if (!shop) {
        return next(new ErrorHandler('User not found', 400));
      }

      const token = shop?.shipment?.token;

      var data = JSON.stringify(formData);

      var config = {
        method: addressType ? 'post' : 'patch',
        maxBodyLength: Infinity,
        url: addressType ? 'https://apiv2.shiprocket.in/v1/external/orders/address/update' : 'https://apiv2.shiprocket.in/v1/external/orders/address/pickup',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          res.status(200).json({
            Status: 'Success',
          });
        })
        .catch(function (error) {
          res.status(500).json({
            success: false,
            message: error.response.data.message,
          });
        });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//get tracking through awb
router.post('/awb-tracking',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { sellerID, awbCode } = req.body;

      const shop = await Shop.findOne({ _id: sellerID });

      if (!shop) {
        return next(new ErrorHandler('User not found', 400));
      }

      const token = shop?.shipment?.token;

      var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://apiv2.shiprocket.in/v1/external/courier/track/awb/${awbCode}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      axios(config)
        .then(function (response) {
          const awbData = response.data;
          res.status(200).json({
            success: true,
            awbDetails: awbData
          });
        })
        .catch(function (error) {
          console.log(error)
          res.status(500).json({
            success: false,
            message: error.response.data.message,
          });
        });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }))

// request for pickup
router.post(
  '/request-pickup',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { sellerID, orderID, shipmentID } = req.body;

      const shop = await Shop.findOne({ _id: sellerID });

      if (!shop) {
        return next(new ErrorHandler('User not found', 400));
      }

      const token = shop.shipment.token;

      var data = JSON.stringify({
        shipment_id: [shipmentID],
      });

      var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://apiv2.shiprocket.in/v1/external/courier/generate/pickup',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          const awbData = response.data;
          order
            .findOneAndUpdate(
              { _id: orderID, 'sellerCart.sellerID': sellerID },
              {
                $set: {
                  'sellerCart.$.confirmedPickUp': awbData,
                },
              }
            )
            .then((result) => {
              res.status(200).json({
                Status: 'Success',
              });
            })
            .catch((e) => {
              return next(new ErrorHandler(error.message, 500));
            });
        })
        .catch(function (error) {
          res.status(500).json({
            success: false,
            message: error.response.data.message,
          });
        });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// generate invoice
router.post(
  '/generateInvoice',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { sellerID, orderID } = req.body;

      const shop = await Shop.findOne({ _id: sellerID });

      if (!shop) {
        return next(new ErrorHandler('User not found', 400));
      }

      const token = shop.shipment.token;

      var data = JSON.stringify({
        ids: [orderID],
      });

      var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://apiv2.shiprocket.in/v1/external/orders/print/invoice',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          const awbData = response.data.invoice_url;
          res.status(200).json({
            Status: 'Success',
            invoiceURL: awbData,
          });
        })
        .catch(function (error) {
          res.status(500).json({
            success: false,
            message: error.response.data.message,
          });
        });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// generate label
router.post(
  '/generateLabel',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { sellerID, shipmentID } = req.body;

      const shop = await Shop.findOne({ _id: sellerID });

      if (!shop) {
        return next(new ErrorHandler('User not found', 400));
      }

      const token = shop?.shipment?.token;

      var data = JSON.stringify({
        shipment_id: [
          shipmentID
        ],
      });

      var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://apiv2.shiprocket.in/v1/external/courier/generate/label',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(response)
          if (response?.data?.label_url) {
            const label_url = response.data.label_url;
            res.status(200).json({
              Status: 'Success',
              label_url: label_url,
            });
          } else {
            res.status(500).json({
              success: false,
              message: "Shipment awb not found",
            });
          }
        })
        .catch(function (error) {
          res.status(500).json({
            success: false,
            message: error.response.data.message,
          });
        });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// cancel Shipment Order
router.post(
  '/cancelShipmentOrder',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { sellerID, orderID, id } = req.body;

      const shop = await Shop.findOne({ _id: sellerID });

      if (!shop) {
        return next(new ErrorHandler('User not found', 400));
      }

      const token = shop.shipment.token;

      var data = JSON.stringify({
        ids: [orderID],
      });

      var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://apiv2.shiprocket.in/v1/external/orders/cancel',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          order
            .findOneAndUpdate(
              { _id: id, 'sellerCart.sellerID': sellerID },
              {
                $set: {
                  'sellerCart.$.status': 'Canceled',
                },
              }
            )
            .then((result) => {
              res.status(200).json({
                Status: 'Success',
              });
            })
            .catch((e) => {
              return next(new ErrorHandler(error.message, 500));
            });
        })
        .catch(function (error) {
          res.status(500).json({
            success: false,
            message: error.response.data.message,
          });
        });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get shipment charge
router.post(
  '/get-shippingCharge',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        cod,
        sellerCart,
        shipping_is_billing,
        shippingAddress,
        BillingAddress,
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        user,
      } = req.body;

      let finalData = sellerCart;

      const delivery_postcode = shipping_is_billing
        ? BillingAddress.billingzipCode
        : shippingAddress.shippingzipCode;

      let shippingRate = 0;
      let subTotalPriceRate = 0;

      await Promise.all(
        sellerCart.map(async (seller, index) => {
          const sellerId = seller.sellerID;
          const weight = seller.weight;

          const shop = await Shop.findOne({ _id: sellerId });

          if (!shop) {
            return next(new ErrorHandler('User not found', 400));
          }

          if (shop?.shipment?.token) {
            const token = shop?.shipment?.token;
            const pickup_postcode = shop?.pickupLocation?.pin_code;

            var config = {
              method: 'get',
              maxBodyLength: Infinity,
              url: `https://apiv2.shiprocket.in/v1/external/courier/serviceability?delivery_postcode=${delivery_postcode}&&pickup_postcode=${pickup_postcode}&&weight=${weight}&&cod=${cod}`,
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            };

            try {
              const response = await axios(config);
              if (response.data.status === 200) {
                const couriers = response.data?.data?.available_courier_companies;

                if (shop?.couriers?.length > 0) {
                  const shopCouriers = shop?.couriers;
                  const newCouriers = couriers.filter((val) => shopCouriers.includes(val.courier_company_id));
                  if (newCouriers.length > 0) {
                    let earliestEtd = null;
                    let earliestObject = null;

                    newCouriers.forEach((deliveryObject) => {
                      const etd = deliveryObject.etd;
                      if (etd) {
                        const etdDate = new Date(etd);

                        if (earliestEtd === null || etdDate < earliestEtd) {
                          earliestEtd = etdDate;
                          earliestObject = deliveryObject;
                        } else if (etdDate.getTime() === earliestEtd.getTime()) {
                          if (earliestObject === null || deliveryObject.rate < earliestObject.rate) {
                            earliestObject = deliveryObject;
                          }
                        }
                      }
                    });

                    finalData[index].response = {
                      orders: earliestObject,
                      status: response.data.status,
                    };
                    shippingRate += earliestObject.rate;

                    await seller.products.forEach((product) => {
                      subTotalPriceRate =
                        subTotalPriceRate + Number(product.finalPrice);
                    });
                  } else {
                    finalData[index].error = {
                      message: "Delivery is not available for that Pin Code",
                      status: response.data.status,
                    };
                  }

                } else {
                  let earliestEtd = null;
                  let earliestObject = null;

                  couriers.forEach((deliveryObject) => {
                    const etd = deliveryObject.etd;
                    if (etd) {
                      const etdDate = new Date(etd);

                      if (earliestEtd === null || etdDate < earliestEtd) {
                        earliestEtd = etdDate;
                        earliestObject = deliveryObject;
                      } else if (etdDate.getTime() === earliestEtd.getTime()) {
                        if (earliestObject === null || deliveryObject.rate < earliestObject.rate) {
                          earliestObject = deliveryObject;
                        }
                      }
                    }
                  });

                  finalData[index].response = {
                    orders: earliestObject,
                    status: response.data.status,
                  };
                  shippingRate += earliestObject.rate;

                  await seller.products.forEach((product) => {
                    subTotalPriceRate =
                      subTotalPriceRate + Number(product.finalPrice);
                  });
                }
              } else {
                finalData[index].error = {
                  message: response.data.message,
                  status: response.data.status,
                };
              }
            } catch (error) {
              if (error.response && error.response.data.status_code) {
                finalData[index].error = {
                  success: false,
                  message: error.response.data.message,
                  status: error.response.data.status_code,
                };
              } else {
                console.log(error, 'Hello');
              }
            }
          } else {
            finalData[index].error = {
              message: "Delivery is not available for that Pin Code",
              status: 500,
            };
          }
        })
      );

      const TotalPriceGot = (subTotalPriceRate + shippingRate) - Number(discountPrice);

      const responseData = {
        cod,
        sellerCart: finalData,
        shipping_is_billing,
        shippingAddress,
        BillingAddress,
        cart,
        totalPrice: TotalPriceGot.toFixed(2),
        subTotalPrice: subTotalPriceRate,
        shipping: shippingRate,
        discountPrice,
        user,
      };

      res.status(200).json({ responseData: responseData });

      // console.log(finalData, 'FinalData');
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get return order shipment charge
router.post(
  '/get-return-order-shippingCharge',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const {
        returnOrderID,
        orderID,
        sellerID
      } = req.body;

      // let finalData = sellerCart;

      let shippingRate = 0;
      let subTotalPriceRate = 0;

      const shop = await Shop.findOne({ _id: sellerID });

      if (!shop) {
        return next(new ErrorHandler('User not found', 400));
      }

      if (shop?.shipment?.token) {

        const token = shop?.shipment?.token;
        const pickup_postcode = shop?.pickupLocation?.pin_code;
        // const codBool = cod === "prepaid" ? 0 : 1;

        var config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `https://apiv2.shiprocket.in/v1/external/courier/serviceability?order_id=${returnOrderID}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };


        try {
          const response = await axios(config);
          const couriers = response.data?.data?.available_courier_companies;

          if (shop?.couriers?.length > 0) {

            const shopCouriers = shop?.couriers;
            const newCouriers = couriers.filter((val) => shopCouriers.includes(val.courier_company_id));
            if (newCouriers.length > 0) {
              let earliestEtd = null;
              let earliestObject = null;

              await newCouriers.forEach((deliveryObject) => {
                const etd = deliveryObject.etd;
                if (etd) {
                  const etdDate = new Date(etd);

                  if (earliestEtd === null || etdDate < earliestEtd) {
                    earliestEtd = etdDate;
                    earliestObject = deliveryObject;
                  } else if (etdDate.getTime() === earliestEtd.getTime()) {
                    if (earliestObject === null || deliveryObject.rate < earliestObject.rate) {
                      earliestObject = deliveryObject;
                    }
                  }
                }
              });

              order
                .findOneAndUpdate(
                  { _id: orderID, 'sellerCart.sellerID': sellerID },
                  {
                    $set: {
                      'sellerCart.$.returnOrderResponse': earliestObject,
                    },
                  }
                )
                .then((result) => {
                  res.status(200).json({
                    Status: 'Success',
                  });
                })
                .catch((e) => {
                  return next(new ErrorHandler(error.message, 500));
                });

            } else {
              res.status(500).json({
                success: false,
                message: "Delivery is not available for that Pin Code",
              });
            }

          } else {
            let earliestEtd = null;
            let earliestObject = null;

            couriers.forEach((deliveryObject) => {
              const etd = deliveryObject.etd;
              if (etd) {
                const etdDate = new Date(etd);

                if (earliestEtd === null || etdDate < earliestEtd) {
                  earliestEtd = etdDate;
                  earliestObject = deliveryObject;
                } else if (etdDate.getTime() === earliestEtd.getTime()) {
                  if (earliestObject === null || deliveryObject.rate < earliestObject.rate) {
                    earliestObject = deliveryObject;
                  }
                }
              }
            });

            order
              .findOneAndUpdate(
                { _id: orderID, 'sellerCart.sellerID': sellerID },
                {
                  $set: {
                    'sellerCart.$.returnOrderResponse': earliestObject,
                  },
                }
              )
              .then((result) => {
                res.status(200).json({
                  Status: 'Success',
                });
              })
              .catch((e) => {
                return next(new ErrorHandler(error.message, 500));
              });
          }

        } catch (error) {
          res.status(error.response.data.status_code).json({
            success: false,
            message: error.response.data.message,
            status: error.response.data.status_code
          });
        }
      } else {
        res.status(500).json({
          success: false,
          message: "Login to ShipRocket API",
        });
      }

    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get Couriers
router.get(
  '/getCouriers/:sellerID',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { sellerID } = req.params;

      const shop = await Shop.findOne({ _id: sellerID });

      if (!shop) {
        return next(new ErrorHandler('User not found', 400));
      }

      const token = shop.shipment.token;

      var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://apiv2.shiprocket.in/v1/external/courier/courierListWithCounts',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      axios(config)
        .then(function (response) {
          const couriers = response.data.courier_data;
          res.status(200).json({
            Status: 'Success',
            couriers: couriers,
          });
        })
        .catch(function (error) {
          res.status(500).json({
            success: false,
            message: error.response.data.message,
          });
        });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get PickUp Locations
router.get(
  '/getPickupLocations/:sellerID',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { sellerID } = req.params;

      const shop = await Shop.findOne({ _id: sellerID });

      if (!shop) {
        return next(new ErrorHandler('User not found', 400));
      }

      if (shop?.shipment?.token) {
        const token = shop?.shipment?.token;

        var config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://apiv2.shiprocket.in/v1/external/settings/company/pickup',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        axios(config)
          .then(async function (response) {
            const locations = response?.data?.data?.shipping_address;
            res.status(200).json({
              Status: 'Success',
              locations: locations,
            });
          })
          .catch(function (error) {
            res.status(500).json({
              success: false,
              message: error.response.data.message,
            });
          });
      } else {
        res.status(500).json({
          success: false,
          message: "Login to ShipRocket",
        });
      }

    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// set default pickup address
router.post(
  '/set-default-pickup',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { sellerID, selectedLocation } = req.body;

      const shop = await Shop.findOne({ _id: sellerID });

      if (!shop) {
        return next(new ErrorHandler('User not found', 400));
      }

      if (shop?.shipment?.token) {
        await Shop.findOneAndUpdate({ _id: sellerID }, {
          $set: {
            pickupLocation: selectedLocation
          }
        })
        res.status(200).json({
          success: false,
          message: "Added Default Pickup Address",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Login to ShipRocket",
        });
      }


    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// add PickUp Locations
router.post(
  '/add-pickup-address',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { sellerId, formData } = req.body;

      const shop = await Shop.findOne({ _id: sellerId });

      if (!shop) {
        return next(new ErrorHandler('User not found', 400));
      }

      const token = shop.shipment.token;

      const data = JSON.stringify(formData);

      var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://apiv2.shiprocket.in/v1/external/settings/company/addpickup',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: data
      };

      axios(config)
        .then(function (response) {
          res.status(200).json({
            Status: 'Success',
            message: "Added PickUp Loction Successfully",
          });
        })
        .catch(function (error) {
          res.status(500).json({
            success: false,
            message: error.response.data.message,
          });
        });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// selected couriers add
router.post(
  '/selected-couriers',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { sellerID, couriers } = req.body;

      const shop = await Shop.findOneAndUpdate({ _id: sellerID }, {
        $set: {
          couriers: couriers
        }
      });

      if (!shop) {
        return next(new ErrorHandler('User not found', 400));
      }

      res.status(200).json({ message: 'Couriers updated successfully' });

    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


module.exports = router;
