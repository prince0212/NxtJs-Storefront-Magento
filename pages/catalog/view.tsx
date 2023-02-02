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
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  PinterestShareButton,
  PinterestIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

import { TabPanel, useTabs } from "react-headless-tabs";
import { TabSelector } from "../TabSelector";

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

  const [selectedTab, setSelectedTab] = useTabs([
    "description",
    "additional",
    "video",
  ]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
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
          }, 2000);
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
    let pinterestImage = [];
    product.media_gallery_entries.map((attr: any, index: any) => {
      productImageArray.push({
        original:
          process.env.domain + "media/catalog/product/" + `${attr.file}`,
        thumbnail:
          process.env.domain + "media/catalog/product/" + `${attr.file}`,
      });
      pinterestImage.push(
        process.env.domain + "media/catalog/product/" + `${attr.file}`
      );
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
              <div className="lg:w-1/2 mt-6 lg:mt-0">
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
              <div className="lg:w-1/2 lg:pl-6 mt-6 lg:mt-0">
                <div className="text-left mb-5">
                  <h1 className="text-gray-900 text-3xl mb-2">
                    {product.name}
                  </h1>
                  <span className="title-font font-bold text-3xl text-gray-900">
                    ${product.price}
                  </span>
                </div>
                <div className="flex">
                  {product.custom_attributes.map((attr, index) => {
                    return (
                      <>
                        {attr.attribute_code == "short_description" &&
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
                </div>
                <div className="">
                  {loading ? (
                    <ThreeDots color={"#062DF6"} loading={loading} size={50} />
                  ) : (
                    <button
                      className=" text-xl ml-auto text-white bg-indigo-500 border-0 py-4 px-20 focus:outline-none hover:bg-indigo-800 rounded-full"
                      onClick={addToCart}
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
                <div className="border-t-2 mt-4">&nbsp;</div>
                <div className="text-left mb-5">
                  SKU#:{" "}
                  <span className="font-semibold text-gray-900">
                    {product.sku}
                  </span>
                  {/* <p className="text-sm title-font text-gray-500 tracking-widest">
                    {product.extension_attributes.stock_item.is_in_stock
                      ? "IN STOCK"
                      : "OUT OF STOCK"}
                  </p> */}
                  <p className="text-justify text-gray-900 font-semibold">
                    IN STOCK
                  </p>
                </div>

                <div className="border-t-2 mt-4">&nbsp;</div>
                <div className="flex">
                  <p className="text-justify text-gray-900 font-semibold">
                    <span>Share:</span>
                  </p>
                  <div className="text-center ml-2">
                    <FacebookShareButton
                      url={
                        "https://oauth.devvelocity.com/b2c_english/radiant-tee.html"
                      }
                      quote={product.name}
                      hashtag="#productURL"
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    &nbsp;
                    <TwitterShareButton
                      url="http://localhost:3000/catalog/view?sku=7001535705"
                      quote={product.name}
                      hashtag="#productURL"
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    &nbsp;
                    <WhatsappShareButton
                      url={
                        "https://oauth.devvelocity.com/b2c_english/radiant-tee.html"
                      }
                      quote={product.name}
                      hashtag="#productURL"
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                    &nbsp;
                    <PinterestShareButton
                      url="http://localhost:3000/catalog/view?sku=7001535705"
                      description={product.name}
                      media={pinterestImage[0]}
                      quote={product.name}
                      hashtag="#productURL"
                    >
                      <PinterestIcon size={32} round />
                    </PinterestShareButton>
                    {/* &nbsp;
                    <LinkedinShareButton
                      url={"https://github.com/"}
                      quote={product.name}
                      hashtag="#productURL"
                    >
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton> */}
                  </div>
                </div>
                {/* <div className="mt-2">
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
                        <p>Activity: Sports</p>
                        <p>Material: Linen</p>
                        <p>Sleeve: Full Sleeve</p>
                      </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton>Video</AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <ReactPlayer
                          url="https://www.youtube.com/watch?v=9tF7pBSsEi0"
                          width="600px"
                        />
                      </AccordionItemPanel>
                    </AccordionItem>
                  </Accordion>
                </div> */}
              </div>
            </div>
          </div>
          <div className="py-2  items-center lg:w-11/12 mx-auto border-gray-200 sm:flex-row flex-col">
            <nav className="flex border-b border-gray-300">
              <TabSelector
                isActive={selectedTab === "description"}
                onClick={() => setSelectedTab("description")}
              >
                Description
              </TabSelector>
              <TabSelector
                isActive={selectedTab === "additional"}
                onClick={() => setSelectedTab("additional")}
              >
                Additional Information
              </TabSelector>
              <TabSelector
                isActive={selectedTab === "video"}
                onClick={() => setSelectedTab("video")}
              >
                Video
              </TabSelector>
            </nav>
            <div className="p-4">
              <TabPanel hidden={selectedTab !== "description"}>
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
              </TabPanel>
              <TabPanel hidden={selectedTab !== "additional"}>
                <div className="product-description-tab__additional-info">
                  <table className="table table-bordered text-black">
                    <tbody>
                      <tr>
                        <td>Capacity</td>
                        <td>5 Kg</td>
                      </tr>
                      <tr>
                        <td>Color</td>
                        <td>Black, Brown, Red,</td>
                      </tr>
                      <tr>
                        <td>Water Resistant</td>
                        <td>Yes</td>
                      </tr>
                      <tr>
                        <td>Material</td>
                        <td>Artificial Leather</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel hidden={selectedTab !== "video"}>
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=9tF7pBSsEi0"
                  width="600px"
                />
              </TabPanel>
            </div>
          </div>
          <div className="container px-5 py-6 flex items-center lg:w-11/12 mx-auto mb-5 border-gray-200 sm:flex-row flex-col">
            <div className="flex flex-wrap w-full">
              <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                <h1 className="sm:text-2xl mb-2 text-gray-900">
                  You May Also Like
                </h1>
                <div className="h-1 w-20 bg-indigo-500 rounded"></div>
              </div>
            </div>
          </div>
          <div className="mb-10">
            <Carousel
              swipeable={true}
              draggable={true}
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
            >
              <div>
                <div className="lg:w-full">
                  <div className="h-full px-8 rounded-lg  text-center overflow-hidden relative">
                    <p className="leading-relaxed mb-3">
                      <Image
                        src="http://b2c-community.local:8800/media/catalog/product//7/0/7003234313_6_1.jpg"
                        alt=""
                        width={300}
                        height={300}
                      />
                    </p>
                    <div className="mt-4">
                      <div>
                        <h2 className="text-gray-900 text-xl mb-2">
                          Longline Cable Knit Turtle Neck Oversized Sweater
                        </h2>
                        <p className="mt-1 font-bold text-gray-600">$100</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="lg:w-full">
                  <div className="h-full px-8 rounded-lg overflow-hidden text-center relative">
                    <p className="leading-relaxed items-center mb-3">
                      <Image
                        src="http://b2c-community.local:8800/media/catalog/product//5/9/59083714_5_1.jpg"
                        alt=""
                        width={300}
                        height={300}
                      />
                    </p>
                    <div className="mt-4">
                      <div>
                        <h2 className="text-gray-900 text-xl mb-2">
                          Longline Regular Fit Hoodie
                        </h2>
                        <p className="mt-1 font-bold text-gray-600">$100</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="lg:w-full">
                  <div className="h-full px-8 rounded-lg overflow-hidden text-center relative">
                    <p className="leading-relaxed items-center mb-3">
                      <Image
                        src="http://b2c-community.local:8800/media/catalog/product//7/0/7003234313_6_1.jpg"
                        alt=""
                        width={300}
                        height={300}
                      />
                    </p>
                    <div className="mt-4">
                      <div>
                        <h2 className="text-gray-900 text-xl mb-2">
                          Solid Cotton Regular Fit Longline Sweatshirt
                        </h2>
                        <p className="mt-1 font-bold text-gray-600">$100</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="lg:w-full">
                  <div className="h-full px-8 rounded-lg overflow-hidden text-center relative">
                    <p className="leading-relaxed items-center mb-3">
                      <Image
                        src="http://b2c-community.local:8800/media/catalog/product//5/9/59082101_5.jpg"
                        alt=""
                        width={300}
                        height={300}
                      />
                    </p>
                    <div className="mt-4">
                      <div>
                        <h2 className="text-gray-900 text-xl mb-2">
                          Solid Cotton Regular Fit Longline Sweatshirt
                        </h2>
                        <p className="mt-1 font-bold text-gray-600">$100</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="lg:w-full">
                  <div className="h-full px-8 rounded-lg overflow-hidden text-center relative">
                    <p className="leading-relaxed items-center mb-3">
                      <Image
                        src="http://b2c-community.local:8800/media/catalog/product//5/9/59083714_5_1.jpg"
                        alt=""
                        width={300}
                        height={300}
                      />
                    </p>
                    <div className="mt-4">
                      <div>
                        <h2 className="text-gray-900 text-xl mb-2">
                          Solid Cotton Regular Fit Longline Sweatshirt
                        </h2>
                        <p className="mt-1 font-bold text-gray-600">$100</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel>
          </div>
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
