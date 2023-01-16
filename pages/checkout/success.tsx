import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
function Success() {
  const [orderData, setOrderData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    localStorage.removeItem("address");
    localStorage.removeItem("shipping_carrier_code");
    localStorage.removeItem("shipping_method_code");
    const orderId = localStorage.getItem("current_order_id");
    axios({
      method: "get",
      url: `/api/getOrderDetails?orderId=` + orderId,
      data: "",
    })
      .then(function (response) {
        if (response.status == 200) {
          setOrderData(response.data.data);
          setLoaded(true);
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  }, []);

  if (!loaded && !orderData) {
    return (
      <div className="container px-5 py-24 mx-auto">
        <div className="spinner-container flex mx-auto mt-16 text-white border-0 py-2 px-8 focus:outline-none rounded text-lg">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (orderData) {
    return (
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-6 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Thank you for your purchase
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Your order number is: {orderData.increment_id}
            </p>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              We will email you order confirmation with details and tracking
              info.
            </p>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base mt-10">
              <Link legacyBehavior href="/">
                <button className="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0">
                  Continue Shopping
                </button>
              </Link>
            </p>
          </div>
        </div>
      </section>
    );
  }
}
export default Success;
