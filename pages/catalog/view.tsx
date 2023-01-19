/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
const View = (newdata: any) => {
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

  function addToCart(e: any) {
    e.preventDefault();

    axios({
      method: "post",
      url: `/api/getCustomerCart`,
      data: "",
    })
      .then(function (response) {
        if (response.status == 200) {
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
                document.getElementById("succmessage").innerHTML =
                  "Product added to cart successfully.";
              }
            })
            .catch(function () {
              document.getElementById("succmessage").innerHTML =
                addToCartresponse;
            });
        }
      })
      .catch(function (response) {
        document.getElementById("succmessage").innerHTML = response;
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
    let productImageArray: { original: string; thumbnail: string; }[] = [];
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
                <div className="flex mt-6 items-center pb-1 border-b-2 border-gray-200 mb-5">
                  <div className="flex"></div>
                </div>
                <Accordion preExpanded={"description"}>
                  <AccordionItem uuid="description">
                    <AccordionItemHeading>
                      <AccordionItemButton>Description</AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <p>
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
                      </p>
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
                </Accordion>

                <div className="flex mt-6 items-center pb-1 border-b-2 border-gray-200 mb-5">
                  <div className="flex"></div>
                </div>
                <div className="flex">
                  <span className="title-font font-bold text-3xl text-gray-900">
                    ${product.price}
                  </span>
                  <button
                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                    onClick={addToCart}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
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
