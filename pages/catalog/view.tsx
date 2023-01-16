/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery, gql } from "@apollo/client";
import ImageGallery from "react-image-gallery";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
const View = (newdata: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const PRODUCT_QUERY = gql`
    {
      products(filter: { sku: { eq: "${newdata.sku}" } }) {
        items {
          id
          name
          sku
          url_key
          stock_status
          new_from_date
          new_to_date
          special_price
          special_from_date
          special_to_date
          __typename
          short_description {
            html
          }
          description {
            html
          }
          sale
          new
          gender
          attribute_set_id
          meta_title
          meta_keyword
          meta_description
          manufacturer
          size
          color
          country_of_manufacture
          gift_message_available
          image {
            url
            label
          }
          small_image {
            url
            label
          }
          thumbnail {
            url
            label
          }
          swatch_image
          media_gallery {
            url
            label
          }
          price_range {
            maximum_price {
              final_price {
                value
                currency
              }
            }
          }
        }
      }
    }
  `;
  const { data, loading, error } = useQuery(PRODUCT_QUERY);
  const productData = [];
  if (data) {
    data.products.items.map((item: any) => {
      productData.push({
        name: item.name,
        sku: item.sku,
        stock_status: item.stock_status,
        price: item.price_range.maximum_price.final_price.value,
        image: item.image.url,
        media_gallery: item.media_gallery,
        description: item.description.html,
      });
    });
  }
  if (loading) {
    return (
      <div className="container px-5 py-24 mx-auto">
        <div className="spinner-container flex mx-auto mt-16 text-white border-0 py-2 px-8 focus:outline-none rounded text-lg">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }
  if (error) return <pre>{error.message}</pre>;
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
  const images = [
    {
      original:
        "http://b2c-community.local:8800/media/catalog/product/cache/c93cce11af99c07ac82f6577df79e3ff/5/9/59083714_5_1.jpg",
      thumbnail:
        "http://b2c-community.local:8800/media/catalog/product/cache/c93cce11af99c07ac82f6577df79e3ff/5/9/59083714_5_1.jpg",
    },
    {
      original:
        "http://b2c-community.local:8800/media/catalog/product/cache/c93cce11af99c07ac82f6577df79e3ff/5/9/59083714_5_1.jpg",
      thumbnail:
        "http://b2c-community.local:8800/media/catalog/product/cache/c93cce11af99c07ac82f6577df79e3ff/5/9/59083714_5_1.jpg",
    },
    {
      original:
        "http://b2c-community.local:8800/media/catalog/product/cache/c93cce11af99c07ac82f6577df79e3ff/5/9/59083714_5_1.jpg",
      thumbnail:
        "http://b2c-community.local:8800/media/catalog/product/cache/c93cce11af99c07ac82f6577df79e3ff/5/9/59083714_5_1.jpg",
    },
  ];
  let productImage = [];
  if (productData) {
    {
      productData.map((item: any) => {
        if (item.media_gallery.length > 1) {
          item.media_gallery.map((newitem: any) => {
            productImage.push({
              original: newitem.url,
              thumbnail: newitem.url,
            });
            console.log(newitem.url);
            // if (item.media_gallery) {
            //   productImage.push({ original: item.url, thumbnail: item.url });
            // }
          });
        }
      });
    }
    console.log(productImage);
    return (
      <section className="text-gray-600 body-font overflow-hidden">
        <>
          {productData.map((item: any) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <div className="container px-5 py-24 mx-auto">
                <div
                  className="flex flex-col text-center w-full text-green-700 mb-5"
                  id="succmessage"
                ></div>

                <input type="hidden" id="sku" name="sku" value={item.sku} />
                <div className="lg:w-11/12 mx-auto flex flex-wrap">
                  <div className="lg:w-1/2 w-full lg:pl-10 mt-6 lg:mt-0">
                    {productImage.length > 0 && (
                      <ImageGallery
                        items={productImage}
                        autoPlay={false}
                        showPlayButton={false}
                        lazyLoad={true}
                        showNav={true}
                        thumbnailPosition="left"
                      />
                    )}
                    {productImage.length <= 0 && (
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
                        {item.name}
                      </h1>
                      <p className="text-sm title-font text-gray-500 tracking-widest">
                        SKU#: {item.sku}
                      </p>
                      <p className="text-sm title-font text-gray-500 tracking-widest">
                        {
                          (item.stock_status = "IN_STOCK"
                            ? "IN STOCK"
                            : "OUT OF STOCK")
                        }
                      </p>
                    </div>
                    <div className="flex mt-6 items-center pb-1 border-b-2 border-gray-200 mb-5">
                      <div className="flex"></div>
                    </div>
                    <p
                      className="leading-relaxed mb-8 text-black"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></p>
                    <div className="flex mt-6 items-center pb-1 border-b-2 border-gray-200 mb-5">
                      <div className="flex"></div>
                    </div>
                    <div className="flex">
                      <span className="title-font font-bold text-3xl text-gray-900">
                        ${item.price}
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
            );
          })}
        </>
      </section>
    );
  }
};
export default View;

export async function getServerSideProps(context) {
  console.log(context);
  return {
    props: { sku: context.query.sku },
  };
}
