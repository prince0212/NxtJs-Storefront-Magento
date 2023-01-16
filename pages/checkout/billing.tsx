import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import CartDetails from "../Components/CartDetails";
import TextField from "../Components/TextField";
function Billing() {
  const [regionData, setRegionData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const initialState = [];
  const [savedAddress, setSavedAddress] = useState(initialState);
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("address"));
    if (cartData) {
      setSavedAddress(cartData);
    }
  }, []);

  let firstname,
    lastname,
    street,
    street1,
    city,
    postcode,
    region,
    telephone = "";
  const router = useRouter();
  function getRegions() {
    axios({
      method: "get",
      url: `/api/getRegions`,
      data: "",
    })
      .then(function (response) {
        if (response.status == 200) {
          setRegionData(response.data.data.available_regions);
          setLoaded(true);
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  }
  function setBillingShippingAddress(e: event) {
    e.preventDefault();
    const statevar = e.target.state.value.split("_");
    const address = {
      address: {
        region: statevar[2],
        region_id: statevar[0],
        region_code: statevar[1],
        country_id: e.target.country.value,
        street: [e.target.address.value, e.target.address1.value],
        postcode: e.target.postcode.value,
        city: e.target.city.value,
        firstname: e.target.firstname.value,
        lastname: e.target.lastname.value,
        customer_id: localStorage.getItem("customer_id"),
        email: localStorage.getItem("customer_email"),
        telephone: e.target.telephone.value,
        same_as_billing: 1,
      },
    };
    localStorage.setItem("address", JSON.stringify(address.address));
    router.push({
      pathname: "/checkout/shippingmethod",
    });
  }
  if (savedAddress) {
    savedAddress.firstname
      ? (firstname = savedAddress.firstname)
      : (firstname = "");
      savedAddress.lastname
      ? (lastname = savedAddress.lastname)
      : (lastname = "");
      savedAddress.street ? (street = savedAddress.street[0]) : (street = "");
      savedAddress.street ? (street1 = savedAddress.street[1]) : (street1 = "");
      savedAddress.city ? (city = savedAddress.city) : (city = "");
      savedAddress.postcode
      ? (postcode = savedAddress.postcode)
      : (postcode = "");
      savedAddress.region
      ? (region =
        savedAddress.region_id +
          "_" +
          savedAddress.region_code +
          "_" +
          savedAddress.region)
      : (region = "");
      savedAddress.telephone
      ? (telephone = savedAddress.telephone)
      : (telephone = "");
  }
  useEffect(() => {
    getRegions();
  }, []);

  if (!loaded && !regionData) {
    return (
      <div className="container px-5 py-24 mx-auto">
        <div className="spinner-container flex mx-auto mt-16 text-white border-0 py-2 px-8 focus:outline-none rounded text-lg">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }
  if (regionData) {
    return (
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-6 mx-auto">
          <div className="grid grid-cols-3">
            <div className="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12 py-12">
              <div className="rounded-md">
                <form id="payment-form" onSubmit={setBillingShippingAddress}>
                  <section>
                    <h2 className="font-semibold text-2xl mb-3">
                      Shipping & Billing Information
                    </h2>
                    <fieldset className=" bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                      <div className="relative mb-4 ml-5 mr-5">
                        <TextField
                          label="First Name"
                          name="firstname"
                          isRequired="yes"
                          valueFor={firstname}
                        />
                      </div>
                      <div className="relative mb-4 ml-5 mr-5">
                        <TextField
                          label="Last Name"
                          name="lastname"
                          isRequired="yes"
                          valueFor={lastname}
                        />
                      </div>
                      <div className="relative mb-4 ml-5 mr-5">
                        <label
                          htmlFor="country"
                          className="leading-7 text-sm text-gray-600"
                        >
                          Country
                        </label>
                        <select
                          name="country"
                          id="country"
                          required
                          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        >
                          <option value="US" selected="selected">
                            United States
                          </option>
                        </select>
                      </div>
                      <div className="relative mb-4 ml-5 mr-5">
                        <TextField
                          label="Street Address"
                          name="address"
                          valueFor={street}
                          isRequired="yes"
                        />
                      </div>
                      <div className="relative mb-4 ml-5 mr-5">
                        <TextField
                          label="Street Address 2"
                          name="address1"
                          valueFor={street1}
                          isRequired="no"
                        />
                      </div>
                      <div className="relative mb-4 ml-5 mr-5">
                        <TextField
                          label="City"
                          name="city"
                          isRequired="yes"
                          valueFor={city}
                        />
                      </div>
                      <div className="relative mb-4 ml-5 mr-5">
                        <label
                          htmlFor="state"
                          className="leading-7 text-sm text-gray-600"
                        >
                          State
                        </label>
                        <select
                          name="state"
                          id="state"
                          required
                          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          defaultValue={region}
                        >
                          {regionData.map((item: any) => {
                            const finalRegion =
                              item.id + "_" + item.code + "_" + item.name;
                            return (
                              <>
                                <option data-title="Alaska" value={finalRegion}>
                                  {item.name}
                                </option>
                              </>
                            );
                          })}
                        </select>
                      </div>
                      <div className="relative mb-4 ml-5 mr-5">
                        <TextField
                          label="Zip Code"
                          name="postcode"
                          valueFor={postcode}
                          isRequired="yes"
                        />
                      </div>
                      <div className="relative mb-4 ml-5 mr-5">
                        <TextField
                          label="Phone Number"
                          name="telephone"
                          valueFor={telephone}
                          isRequired="yes"
                        />
                      </div>
                      <div className="p-2 w-full">
                        <button
                          type="submit"
                          className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                        >
                          Continue to Shipping Method
                        </button>
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
export default Billing;
