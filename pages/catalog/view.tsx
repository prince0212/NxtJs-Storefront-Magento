/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

import ReactPlayer from "react-player";

import ImageGallery from "react-image-gallery";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from "react-loader-spinner";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";

const View = (newdata: any) => {
  const [loading, setloading] = useState(false);
  const [product, setProduct] = useState();
  const [loaded, setLoaded] = useState(false);
  function getCurrentProduct() {
    let SKU = newdata.SKU;
    axios({
      method: "get",
      url: `/api/getProduct?SKU=` + SKU,
    })
      .then(function (response) {
        if (response.status == 200) {
          setProduct(response.data.data);
          setLoaded(true);
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  }
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  function addToCart(e: any) {
    setloading(true);
    e.preventDefault();
    axios({
      method: "post",
      url: `/api/getCustomerCart`,
      data: "",
    })
      .then(function (response) {
        if (response.status == 200) {
          setTimeout(() => {
            setloading(false);
          }, 4000);
          axios({
            method: "post",
            url: `/api/addToCart`,
            data: {
              cartItem: {
                sku: document.getElementById("sku").value,
                qty: 1,
                quote_id: response.data,
              },
            },
          })
            .then(function (addToCartresponse) {
              if (addToCartresponse.status == 200) {
                toast.success("Product added to cart successfully.", {
                  position: "top-right",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
              }
            })
            .catch(function () {
              toast.error(addToCartresponse, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            });
        }
      })
      .catch(function (response) {
        toast.error(response, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  }
  useEffect(() => {
    getCurrentProduct();
  }, []);

  if (!loaded) {
    return (
      <div className="container px-5 py-24 mx-auto">
        <div className="spinner-container flex mx-auto mt-16 text-white border-0 py-2 px-8 focus:outline-none rounded text-lg">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }
  if (product) {
    let productImageArray: { original: string; thumbnail: string }[] = [];
    product.media_gallery_entries.map((attr: any, index: any) => {
      productImageArray.push({
        original:
          process.env.domain + "media/catalog/product/" + `${attr.file}`,
        thumbnail:
          process.env.domain + "media/catalog/product/" + `${attr.file}`,
      });
    });

    return (
      <section className="text-gray-600 body-font overflow-hidden">
        <>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div className="container px-5 py-6 mx-auto">
            <div
              className="flex flex-col text-center w-full text-green-700 mb-5"
              id="succmessage"
            ></div>
            <input type="hidden" id="sku" name="sku" value={product.sku} />
            <div className="lg:w-11/12 mx-auto flex flex-wrap">
              <div className="lg:w-1/2 w-full lg:pl-10 mt-6 lg:mt-0">
                {productImageArray.length > 0 && (
                  <ImageGallery
                    items={productImageArray}
                    autoPlay={false}
                    showPlayButton={false}
                    lazyLoad={true}
                    showNav={true}
                    thumbnailPosition="left"
                  />
                )}
                {productImageArray.length <= 0 && (
                  <Image
                    src={item.image}
                    width={600}
                    height={512}
                    alt={""}
                    className="object-cover object-center group-hover:opacity-75"
                  />
                )}
              </div>
              <div className="lg:w-1/2 w-full lg:pl-10 mt-6 lg:mt-0">
                <div className="text-left mb-5">
                  <h1 className="text-gray-900 text-4xl title-font font-medium mb-2">
                    {product.name}
                  </h1>
                  <p className="text-sm title-font text-gray-500 tracking-widest">
                    SKU#: {product.sku}
                  </p>
                  <p className="text-sm title-font text-gray-500 tracking-widest">
                    {product.extension_attributes.stock_item.is_in_stock
                      ? "IN STOCK"
                      : "OUT OF STOCK"}
                  </p>
                </div>
                <div className="flex">
                  <span className="title-font font-bold text-3xl text-gray-900">
                    ${product.price}
                  </span>
                  {loading ? (
                    <ThreeDots color={"#062DF6"} loading={loading} size={50} />
                  ) : (
                    <button
                      className="flex text-xl ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                      onClick={addToCart}
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
                <div className="flex mt-6 items-center pb-1 border-b-2 border-gray-200 mb-5">
                  <div className="flex"></div>
                </div>
                <Accordion preExpanded={"description"}>
                  <AccordionItem uuid="description">
                    <AccordionItemHeading>
                      <AccordionItemButton>Description</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <>
                        {product.custom_attributes.map((attr, index) => {
                          return (
                            <>
                              {attr.attribute_code == "description" &&
                              attr.value != "" ? (
                                <p
                                  className="leading-relaxed mb-8 text-black"
                                  dangerouslySetInnerHTML={{
                                    __html: attr.value,
                                  }}
                                ></p>
                              ) : (
                                ""
                              )}
                            </>
                          );
                        })}
                      </>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        More Information
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p>Activity: Gym</p>
                      <p>Material: Leather</p>
                    </AccordionItemPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionItemHeading>
                      <AccordionItemButton>Video</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <>
                        {product.custom_attributes.map((attr, index) => {
                          return (
                            <>
                              {attr.attribute_code == "video" &&
                              attr.value != "" ? (
                                <ReactPlayer url={attr.value} width="600px" />
                              ) : (
                                ""
                              )}
                            </>
                          );
                        })}
                      </>
                    </AccordionItemPanel>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
          <div className="container px-5 py-6 flex items-center lg:w-11/12 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
            <div className="flex flex-wrap w-full">
              <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                  Related Products
                </h1>
                <div className="h-1 w-20 bg-indigo-500 rounded"></div>
              </div>
            </div>
          </div>
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            <div>
              <div className="lg:w-full">
                <div className="h-full px-8 rounded-lg overflow-hidden text-center relative">
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                    Harmony Lumaflex™ Strength Band Kit1
                  </h1>
                  <p className="leading-relaxed mb-3">
                    <center>
                      <Image
                        src="http://b2c-community.local:8800/media/catalog/product/cache/c93cce11af99c07ac82f6577df79e3ff/u/g/ug03-bk-0.jpg"
                        alt=""
                        width={300}
                        height={300}
                      />
                    </center>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="lg:w-full">
                <div className="h-full px-8 rounded-lg overflow-hidden text-center relative">
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                    Harmony Lumaflex™ Strength Band Kit2
                  </h1>
                  <p className="leading-relaxed items-center mb-3">
                    <center>
                      <Image
                        src="http://b2c-community.local:8800/media/catalog/product/cache/c93cce11af99c07ac82f6577df79e3ff/u/g/ug03-bk-0.jpg"
                        alt=""
                        width={300}
                        height={300}
                      />
                    </center>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="lg:w-full">
                <div className="h-full px-8 rounded-lg overflow-hidden text-center relative">
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                    Harmony Lumaflex™ Strength Band Kit3
                  </h1>
                  <p className="leading-relaxed items-center mb-3">
                    <center>
                      <Image
                        src="http://b2c-community.local:8800/media/catalog/product/cache/c93cce11af99c07ac82f6577df79e3ff/u/g/ug03-bk-0.jpg"
                        alt=""
                        width={300}
                        height={300}
                      />
                    </center>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="lg:w-full">
                <div className="h-full px-8 rounded-lg overflow-hidden text-center relative">
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                    Harmony Lumaflex™ Strength Band Kit4
                  </h1>

                  <p className="leading-relaxed items-center mb-3">
                    <center>
                      <Image
                        src="http://b2c-community.local:8800/media/catalog/product/cache/c93cce11af99c07ac82f6577df79e3ff/u/g/ug03-bk-0.jpg"
                        alt=""
                        width={300}
                        height={300}
                      />
                    </center>
                  </p>
                </div>
              </div>
            </div>
          </Carousel>
        </>
      </section>
    );
  }
};
export default View;

export async function getServerSideProps(context) {
  return {
    props: {
      SKU: context.query.sku,
    },
  };
}
