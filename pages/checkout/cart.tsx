import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import ProductImage from "../Components/ProductImage";
const Cart = () => {
  const [cartData, setCartData] = useState(null);
  const [cartTotalData, setCartTotalData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  function getCartItems() {
    axios({
      method: "get",
      url: `/api/getCartDetails`,
      data: "",
    })
      .then(function (response) {
        setError(false);
        if (response.status == 200) {
          setCartData(response.data.data);
          setLoaded(true);
        }
      })
      .catch(function (response) {
        setError(true);
      });
  }
  function getCartTotals() {
    axios({
      method: "get",
      url: `/api/getCartTotals`,
      data: "",
    })
      .then(function (response) {
        setError(false);
        if (response.status == 200) {
          setCartTotalData(response.data.data);
        }
      })
      .catch(function (response) {
        setError(true);
        console.log(response);
      });
  }

  useEffect(() => {
    getCartItems();
    getCartTotals();
  }, []);
  if (!error && !loaded && !cartData && !cartTotalData) {
    return (
      <div className="container px-5 py-24 mx-auto">
        <div className="spinner-container flex mx-auto mt-16 text-white border-0 py-2 px-8 focus:outline-none rounded text-lg">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container mx-auto mt-5 grid px-5">
          <div className="flex my-10">
            <div className="w-3/4 bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              </div>
              <div className="flex mt-5 mb-5">
                You have no items in your shopping cart.
              </div>
              Click{" "}
              <Link legacyBehavior href="/">
                <a className=" font-semibold text-indigo-600 mt-10">here</a>
              </Link>{" "}
              to continue shopping.
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (cartData) {
    return (
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container mx-auto mt-5 grid px-5">
          <div className="flex my-10">
            <div className="w-3/4 bg-white px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                  Shopping Cart
                </h1>
                <h2 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                  {cartData.length} Items
                </h2>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="leading-7 text-lg text-gray-600 text-left w-2/5">
                  Item
                </h3>
                <h3 className="leading-7 text-lg text-gray-600 text-center w-1/5">
                  Price
                </h3>
                <h3 className="leading-7 text-lg text-gray-600 text-center w-1/5">
                  Quantity
                </h3>
                <h3 className="leading-7 text-lg text-gray-600 text-center w-1/5">
                  Sub Total
                </h3>
              </div>
              {cartData.map((item: any) => {
                return (
                  <>
                    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                      <div className="flex w-2/5">
                        <div className="w-20">
                          <ProductImage sku={item.sku} />
                        </div>
                        <div className="flex flex-col ml-4 flex-grow">
                          <span className="text-base font-medium text-gray-900 title-font mb-2">
                            {item.name}
                          </span>
                          <span className="text-indigo-500 text-s mt-2">
                            {item.sku}
                          </span>
                        </div>
                      </div>
                      <span className="text-center w-1/5 font-l text-sm">
                        $<span className="font-l text-sm">{item.price}</span>
                      </span>
                      <div className="flex justify-center w-1/5">
                        <span className="font-l text-sm">{item.qty}</span>
                      </div>
                      <span className="text-center w-1/5 font-l text-sm">
                        $
                        <span className="font-l text-sm">
                          {item.price * item.qty}
                        </span>
                      </span>
                    </div>
                  </>
                );
              })}

              <Link legacyBehavior href="/">
                <a className="flex font-semibold text-indigo-600 text-lg mt-10">
                  Continue Shopping
                </a>
              </Link>
            </div>

            <div id="summary" className="w-1/4 px-8 py-10">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900 border-b pb-10">
                Order Summary
              </h1>

              {cartTotalData && (
                <div className="mt-8">
                  <div className="flex justify-between py-2 sm:text-l ">
                    <span>Sub Total</span>
                    <span>${cartTotalData.subtotal}</span>
                  </div>
                  {cartTotalData.discount_amount > 0 && (
                    <div className="flex justify-between py-2 sm:text-l">
                      <span>Discount</span>
                      <span>{cartTotalData.discount_amount}</span>
                    </div>
                  )}
                  <div className="flex border-t sm:text-2xl title-font font-medium justify-between py-5">
                    <span>Grand Total</span>
                    <span>${cartTotalData.grand_total}</span>
                  </div>
                  <Link href="/checkout/billing" legacyBehavior>
                    <button className="flex w-full text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-center text-lg place-content-center">
                      Proceed To Checkout
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Cart;
