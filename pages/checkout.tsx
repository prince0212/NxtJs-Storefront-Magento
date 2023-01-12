import axios from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import BillingShipping from "./Components/BillingShipping";
import CartDetails from "./Components/CartDetails";

const Cart = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [showMeAddress, setShowMeAddress] = useState(true);
  const [showMeShippingMethods, setShowMeShippingMethods] = useState(false);
  const [showMePaymentMethods, setShowMePaymentMethods] = useState(false);
  const [showPlaceOrderButton, setShowPlaceOrderButton] = useState(false);
  const [error, setError] = useState(false);

  const [cartTotalData, setCartTotalData] = useState(null);
  const [regionData, setRegionData] = useState(null);
  const [payMentMethods, setPayMentMethods] = useState(null);

  const [actualRegionData, setActualRegionData] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [shippingMethods, setShippingMethods] = useState(null);
  function setShippingMethodsForOrder(e: event) {
    e.preventDefault();
    const newval = e.target.shipping_method.value.split("_");
    // const getCurrentAddress = localStorage.getItem("address");
    // console.log(getCurrentAddress);
    const addressInformation = {
      addressInformation: {
        shipping_address: {
          region: document.getElementById("state").value,
          region_id: document.getElementById("state").value,
          region_code: regionData[document.getElementById("state").value],
          country_id: document.getElementById("country").value,
          street: [
            document.getElementById("address").value,
            document.getElementById("address1").value,
          ],
          postcode: document.getElementById("postcode").value,
          city: document.getElementById("city").value,
          firstname: document.getElementById("firstname").value,
          lastname: document.getElementById("lastname").value,
          email: customerDetails.email,
          telephone: document.getElementById("telephone").value,
        },
        billing_address: {
          region: document.getElementById("state").value,
          region_id: document.getElementById("state").value,
          region_code: regionData[document.getElementById("state").value],
          country_id: document.getElementById("country").value,
          street: [
            document.getElementById("address").value,
            document.getElementById("address1").value,
          ],
          postcode: document.getElementById("postcode").value,
          city: document.getElementById("city").value,
          firstname: document.getElementById("firstname").value,
          lastname: document.getElementById("lastname").value,
          email: customerDetails.email,
          telephone: document.getElementById("telephone").value,
        },
        shipping_carrier_code: newval[0],
        shipping_method_code: newval[1],
      },
    };

    console.log(addressInformation);
    axios({
      method: "post",
      url: `/api/setShippingMethodOnOrder`,
      data: addressInformation,
    })
      .then(function (response) {
        if (response.status == 200) {
          setPayMentMethods(response.data.data.payment_methods);
        }
      })
      .catch(function (response) {
        console.log(response);
      });
    setShowMePaymentMethods(true);
    setShowPlaceOrderButton(true);
  }
  function placeAnOrder(e: event) {
    e.preventDefault();
    const placeAnOrderJson = {
      billing_address: {
        email: customerDetails.email,
        region: document.getElementById("state").value,
        region_id: document.getElementById("state").value,
        region_code: regionData[document.getElementById("state").value],
        country_id: document.getElementById("country").value,
        street: [
          document.getElementById("address").value,
          document.getElementById("address1").value,
        ],
        postcode: document.getElementById("postcode").value,
        city: document.getElementById("city").value,
        telephone: document.getElementById("telephone").value,
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
      },
      paymentMethod: {
        method: e.target.payment_method.value,
      },
    };
    axios({
      method: "post",
      url: `/api/placeAnOrder`,
      data: placeAnOrderJson,
    })
      .then(function (response) {
        if (response.status == 200) {
          if (response.data.data) {
            router.push({
              pathname: "/success",
              query: { data: response.data.data },
            });
          }
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  }
  function getRegions() {
    const regions = [];
    const regionNames = [];
    axios({
      method: "get",
      url: `/api/getRegions`,
      data: "",
    })
      .then(function (response) {
        if (response.status == 200) {
          setActualRegionData(response.data.data.available_regions);
          response.data.data.available_regions.map((item: any) => {
            regions[item.id] = item.code;
            regionNames[item.id] = item.name;
          });
          setRegionData(regions);
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  }
  function getShippingMethods(address) {
    axios({
      method: "post",
      url: `/api/getShippingMethods`,
      data: address,
    })
      .then(function (response) {
        if (response.status == 200) {
          setShippingMethods(response.data.data);
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  }
  function getCartTotals() {
    axios({
      method: "get",
      url: `/api/getCartTotals`,
      data: "",
    })
      .then(function (response) {
        if (response.status == 200) {
          setCartTotalData(response.data.data);
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  }

  function getCustomerDetails() {
    axios({
      method: "get",
      url: `/api/getCustomerDetails`,
      data: "",
    })
      .then(function (response) {
        if (response.status == 200) {
          setCustomerDetails(response.data.data);
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  }

  useEffect(() => {
    getCustomerDetails();
    getRegions();
    getCartTotals();
  }, []);
  if (error) {
    router.push({
      pathname: "/cart",
    });
  }
  if (!cartTotalData && !customerDetails) {
    return "Fetching Data...";
  }
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="grid grid-cols-3">
          <div className="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12 py-12">
            <BillingShipping
              showHide={showMeAddress}
              customerDetails={customerDetails}
              regionData={regionData}
            />
            <div className="rounded-md">
              <form
                id="shipping-methods"
                onSubmit={setShippingMethodsForOrder}
                style={{
                  display: showMeShippingMethods ? "block" : "none",
                }}
              >
                <section>
                  <h2 className="font-semibold text-2xl mb-3">
                    Shipping Methods
                  </h2>
                  <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                    <div className="flex flex-wrap -m-4 text-center mt-5 mb-5">
                      {shippingMethods &&
                        shippingMethods.map((item: any) => {
                          const newval =
                            item.carrier_code + "_" + item.method_code;
                          return (
                            <>
                              <div className="p-4 w-full text-left ml-10">
                                <div className="inline-flex items-center">
                                  <input
                                    type="radio"
                                    id="shipping_method"
                                    name="shipping_method"
                                    className=" bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    value={newval}
                                  />
                                  <span className="flex-grow flex flex-col pl-3">
                                    <span className="title-font font-medium text-gray-900 mr-10">
                                      ${item.amount}
                                    </span>
                                  </span>
                                </div>
                                <div className="inline-flex items-center">
                                  <span className="flex-grow flex flex-col">
                                    <span className="title-font font-medium text-gray-900">
                                      {item.method_title}
                                    </span>
                                  </span>
                                </div>
                                <div className="inline-flex items-center">
                                  <span className="flex-grow flex flex-col pl-3">
                                    <span className="title-font font-medium text-gray-900">
                                      {item.carrier_title}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      <div className="p-2 w-full">
                        <button
                          type="submit"
                          className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                        >
                          Continue to Payment Method
                        </button>
                      </div>
                    </div>
                  </fieldset>
                </section>
              </form>
            </div>
            <div className="rounded-md">
              <form
                id="payment-methods"
                onSubmit={placeAnOrder}
                style={{
                  display: showMePaymentMethods ? "block" : "none",
                }}
              >
                <section>
                  <h2 className="font-semibold text-2xl mb-3">
                    Payment Information
                  </h2>
                  <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                    {payMentMethods &&
                      payMentMethods.map((item: any) => {
                        return (
                          <>
                            <div className="p-4 w-full text-left ml-5">
                              <div className="inline-flex items-center">
                                <input
                                  type="radio"
                                  id="payment_method"
                                  name="payment_method"
                                  className=" bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                  value={item.code}
                                />
                              </div>
                              <div className="inline-flex items-left ml-5">
                                <span className="flex-grow flex flex-col pl-3">
                                  <span className="title-font font-medium text-gray-900">
                                    {item.title}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </fieldset>
                  <button
                    className="submit-button px-4 py-3 rounded-full bg-indigo-500 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors"
                    style={{
                      display: showPlaceOrderButton ? "block" : "none",
                    }}
                  >
                    Place an Order
                  </button>
                </section>
              </form>
            </div>
          </div>
          <CartDetails />
        </div>
      </div>
    </section>
  );
};

export default Cart;
