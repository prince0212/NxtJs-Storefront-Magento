import axios from "axios";
import { useState, useEffect } from "react";
import TextField from "./TextField";

function BillingShipping(props) {
  const [shippingMethods, setShippingMethods] = useState(null);
  const [regionData, setRegionData] = useState(null);
  const [showMeShippingMethods, setShowMeShippingMethods] = useState(false);
  function getRegions() {
    axios({
      method: "get",
      url: `/api/getRegions`,
      data: "",
    })
      .then(function (response) {
        if (response.status == 200) {
          setRegionData(response.data.data.available_regions);
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
        customer_id: props.customerDetails.id,
        email: props.customerDetails.email,
        telephone: e.target.telephone.value,
        same_as_billing: 1,
      },
    };
    getShippingMethods(address);
    setShowMeShippingMethods(true);
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
  useEffect(() => getRegions(), []);
  if (regionData) {
    return (
      <div className="rounded-md">
        <form
          id="payment-form"
          onSubmit={setBillingShippingAddress}
          style={{
            display: props.showHide ? "block" : "none",
          }}
        >
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
                />
              </div>
              <div className="relative mb-4 ml-5 mr-5">
                <TextField label="Last Name" name="lastname" isRequired="yes" />
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
                  isRequired="yes"
                />
              </div>
              <div className="relative mb-4 ml-5 mr-5">
                <TextField
                  label="Street Address 2"
                  name="address1"
                  isRequired="no"
                />
              </div>
              <div className="relative mb-4 ml-5 mr-5">
                <TextField label="City" name="city" isRequired="yes" />
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
                <TextField label="Zip Code" name="postcode" isRequired="yes" />
              </div>
              <div className="relative mb-4 ml-5 mr-5">
                <TextField
                  label="Phone Number"
                  name="telephone"
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
    );
  }
}
export default BillingShipping;
