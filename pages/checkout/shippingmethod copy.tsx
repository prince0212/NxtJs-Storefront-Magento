import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import CartDetails from "../Components/CartDetails";
function ShippingMethod() {
  const [shippingMethods, setShippingMethods] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [loadedaddress, setLoadedaddress] = useState(false);

  const [savedAddress, setSavedAddress] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("address")) {
      setSavedAddress(JSON.parse(localStorage.getItem("address")));
      setLoadedaddress(true);
    } else {
      setSavedAddress(null);
    }
    getShippingMethods();
  }, []);
  const router = useRouter();
  console.log("Here");
  function getShippingMethods() {
    let newAddress = "";
    console.log("Here22");
    console.log(savedAddress);
    if (savedAddress && loadedaddress) {
      newAddress = {
        address: {
          region: savedAddress.region,
          region_id: savedAddress.region_id,
          region_code: savedAddress.region_code,
          country_id: savedAddress.country_id,
          street: [savedAddress.street[0], savedAddress.street[1]],
          postcode: savedAddress.postcode,
          city: savedAddress.city,
          firstname: savedAddress.firstname,
          lastname: savedAddress.lastname,
          customer_id: localStorage.getItem("customer_id"),
          email: localStorage.getItem("customer_email"),
          telephone: savedAddress.telephone,
          same_as_billing: 1,
        },
      };
      console.log("Here22333");

      console.log("DDDD" + newAddress);
      axios({
        method: "post",
        url: `/api/getShippingMethods`,
        data: newAddress,
      })
        .then(function (response) {
          console.log("DDDD" + newAddress);
          if (response.status == 200) {
            setLoaded(true);
            setShippingMethods(response.data.data);
          }
        })
        .catch(function (response) {
          console.log(response);
        });
    }
  }
  function setShippingMethodsForOrder(e: event) {
    e.preventDefault();
    const newval = e.target.shipping_method.value.split("_");
    sessionStorage.setItem("shipping_carrier_code", newval[0]);
    sessionStorage.setItem("shipping_method_code", newval[1]);
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
        <div className="container px-5 py-24 mx-auto">
          <div className="grid grid-cols-3">
            <div className="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12 py-12">
              <div className="rounded-md">
                <form
                  id="shipping-methods"
                  onSubmit={setShippingMethodsForOrder}
                >
                  <section>
                    <h2 className="font-semibold text-2xl mb-3">
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
                        <div className="flex text-right">
                          <Link legacyBehavior href="/checkout/billing">
                            <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                              Back
                            </button>
                          </Link>
                          &nbsp;&nbsp;
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
            </div>
            <CartDetails />
          </div>
        </div>
      </section>
    );
  }
}
export default ShippingMethod;
