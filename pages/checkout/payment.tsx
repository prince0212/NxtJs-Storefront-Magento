import CartDetails from "../Components/CartDetails";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ThreeDots } from "react-loader-spinner";

function Payment() {
  const [loading, setloading] = useState(false);

  const [payMentMethods, setPayMentMethods] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const initialState = [];
  const [cart, setCart] = useState(initialState);

  const router = useRouter();
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("address"));
    if (cartData) {
      setCart(cartData);
    }
  }, []);

  useEffect(() => {
    let addressDetails = "";
    if (cart && cart.firstname) {
      addressDetails = {
        addressInformation: {
          shipping_address: {
            region: cart.region,
            region_id: cart.region_id,
            region_code: cart.region_code,
            country_id: cart.country_id,
            street: [cart.street[0], cart.street[1]],
            postcode: cart.postcode,
            city: cart.city,
            firstname: cart.firstname,
            lastname: cart.lastname,
            customer_id: localStorage.getItem("customer_id"),
            email: localStorage.getItem("customer_email"),
            telephone: cart.telephone,
          },
          billing_address: {
            region: cart.region,
            region_id: cart.region_id,
            region_code: cart.region_code,
            country_id: cart.country_id,
            street: [cart.street[0], cart.street[1]],
            postcode: cart.postcode,
            city: cart.city,
            firstname: cart.firstname,
            lastname: cart.lastname,
            customer_id: localStorage.getItem("customer_id"),
            email: localStorage.getItem("customer_email"),
            telephone: cart.telephone,
          },
          shipping_carrier_code: localStorage.getItem("shipping_carrier_code"),
          shipping_method_code: localStorage.getItem("shipping_method_code"),
        },
      };
      axios({
        method: "post",
        url: `/api/setShippingMethodOnOrder`,
        data: addressDetails,
      })
        .then(function (response) {
          if (response.status == 200) {
            setLoaded(true);
            setPayMentMethods(response.data.data.payment_methods);
          }
        })
        .catch(function (response) {
          console.log(response);
        });
    }
  }, [cart]);

  // let savedAddress,
  //   addressDetails = "";
  // const router = useRouter();
  // if (sessionStorage.getItem("address")) {
  //   savedAddress = JSON.parse(sessionStorage.getItem("address"));
  // }
  // function setShippingMethodsForOrder() {
  //   addressDetails = {
  //     addressInformation: {
  //       shipping_address: {
  //         region: savedAddress.region,
  //         region_id: savedAddress.region_id,
  //         region_code: savedAddress.region_code,
  //         country_id: savedAddress.country_id,
  //         street: [savedAddress.street[0], savedAddress.street[1]],
  //         postcode: savedAddress.postcode,
  //         city: savedAddress.city,
  //         firstname: savedAddress.firstname,
  //         lastname: savedAddress.lastname,
  //         customer_id: sessionStorage.getItem("customer_id"),
  //         email: sessionStorage.getItem("customer_email"),
  //         telephone: savedAddress.telephone,
  //       },
  //       billing_address: {
  //         region: savedAddress.region,
  //         region_id: savedAddress.region_id,
  //         region_code: savedAddress.region_code,
  //         country_id: savedAddress.country_id,
  //         street: [savedAddress.street[0], savedAddress.street[1]],
  //         postcode: savedAddress.postcode,
  //         city: savedAddress.city,
  //         firstname: savedAddress.firstname,
  //         lastname: savedAddress.lastname,
  //         customer_id: sessionStorage.getItem("customer_id"),
  //         email: sessionStorage.getItem("customer_email"),
  //         telephone: savedAddress.telephone,
  //       },
  //       shipping_carrier_code: sessionStorage.getItem("shipping_carrier_code"),
  //       shipping_method_code: sessionStorage.getItem("shipping_method_code"),
  //     },
  //   };
  //   axios({
  //     method: "post",
  //     url: `/api/setShippingMethodOnOrder`,
  //     data: addressDetails,
  //   })
  //     .then(function (response) {
  //       if (response.status == 200) {
  //         setLoaded(true);
  //         setPayMentMethods(response.data.data.payment_methods);
  //       }
  //     })
  //     .catch(function (response) {
  //       console.log(response);
  //     });
  // }
  function placeAnOrder(e: event) {
    setloading(true);
    e.preventDefault();
    const placeAnOrderJson = {
      billing_address: {
        email: localStorage.getItem("customer_email"),
        region: cart.region,
        region_id: cart.region_id,
        region_code: cart.region_code,
        country_id: cart.country_id,
        street: [cart.street[0], cart.street[1]],
        postcode: cart.postcode,
        city: cart.city,
        telephone: cart.telephone,
        firstname: cart.firstname,
        lastname: cart.lastname,
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
          setTimeout(() => {
            setloading(false);
          }, 3000);
          if (response.data.data) {
            router.push({
              pathname: "/checkout/success",
            });
            localStorage.setItem("current_order_id", response.data.data);
          }
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  }
  // useEffect(() => {
  //   setShippingMethodsForOrder();
  // }, []);
  if (!loaded && !payMentMethods) {
    return (
      <div className="container px-5 py-24 mx-auto">
        <div className="spinner-container flex mx-auto mt-16 text-white border-0 py-2 px-8 focus:outline-none rounded text-lg">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }
  if (payMentMethods) {
    return (
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-6 mx-auto">
          <div className="grid grid-cols-3">
            <div className="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12 py-12">
              <div className="rounded-md">
                <form id="payment-methods" onSubmit={placeAnOrder}>
                  <section>
                    <h2 className="sm:text-3xl mb-5 text-gray-900">
                      Payment Information
                    </h2>
                    <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                      <div className="text-center mt-5 mb-5">
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
                                      required
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
                        <div className="flex justify-end">
                          {loading ? (
                            <ThreeDots
                              color={"#062DF6"}
                              loading={loading}
                              size={50}
                              wrapperClass="mr-5"
                            />
                          ) : (
                            <>
                              <Link
                                legacyBehavior
                                href="/checkout/shippingmethod"
                              >
                                <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-800 rounded-full text-lg">
                                  Back
                                </button>
                              </Link>
                              <button
                                type="submit"
                                className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-800 rounded-full text-lg ml-4 mr-5"
                              >
                                Place an Order
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </fieldset>
                  </section>
                </form>
              </div>
            </div>
            <CartDetails />
          </div>
        </div>
      </section>
    );
  }
}
export default Payment;
