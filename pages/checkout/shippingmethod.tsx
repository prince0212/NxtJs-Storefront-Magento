import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import CartDetails from "../Components/CartDetails";
function ShippingMethod() {
  const [shippingMethods, setShippingMethods] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const initialState = [];
  const [cart, setCart] = useState(initialState);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("address"));
    if (cartData) {
      setCart(cartData);
    }
  }, []);

  useEffect(() => {
    let newAddress = "";
    if (cart && cart.firstname) {
      newAddress = {
        address: {
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
          same_as_billing: 1,
        },
      };
      axios({
        method: "post",
        url: `/api/getShippingMethods`,
        data: newAddress,
      })
        .then(function (response) {
          if (response.status == 200) {
            setLoaded(true);
            setShippingMethods(response.data.data);
          }
        })
        .catch(function (response) {
          console.log(response);
        });
    }
  }, [cart]);

  const router = useRouter();
  function setShippingMethodsForOrder(e: event) {
    e.preventDefault();
    const newval = e.target.shipping_method.value.split("_");
    localStorage.setItem("shipping_carrier_code", newval[0]);
    localStorage.setItem("shipping_method_code", newval[1]);
    router.push({
      pathname: "/checkout/payment",
    });
  }
  if (!loaded && !shippingMethods) {
    return (
      <div className="container px-5 py-24 mx-auto">
        <div className="spinner-container flex mx-auto mt-16 text-white border-0 py-2 px-8 focus:outline-none rounded text-lg">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }
  if (shippingMethods) {
    return (
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-6 mx-auto">
          <div className="grid grid-cols-3">
            <div className="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12 py-12">
              <div className="rounded-md">
                <form
                  id="shipping-methods"
                  onSubmit={setShippingMethodsForOrder}
                >
                  <section>
                    <h2 className="sm:text-3xl mb-5 text-gray-900">
                      Shipping Methods
                    </h2>
                    <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                      <div className="text-center mt-5 mb-5">
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
                                      required
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
                        <div className="flex justify-end">
                          <Link legacyBehavior href="/checkout/billing">
                            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg ml-4">
                              Back
                            </button>
                          </Link>
                          <button
                            type="submit"
                            className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg ml-4 mr-5"
                          >
                            Continue to Payment Method
                          </button>
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
export default ShippingMethod;
