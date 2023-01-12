import { useEffect, useState } from "react";
import axios from "axios";
import ProductImage from "./ProductImage";
function CartDetails() {
  const [cartData, setCartData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  function getCartItems() {
    axios({
      method: "get",
      url: `/api/getCartDetails`,
      data: "",
    })
      .then(function (response) {
        if (response.status == 200) {
          setCartData(response.data.data);
          setLoaded(true);
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  }
  useEffect(() => getCartItems(), []);
  if (!loaded && !cartData) {
    return (
      <div className="container px-5 py-24 mx-auto">
        <div className="spinner-container flex mx-auto mt-16 text-white border-0 py-2 px-8 focus:outline-none rounded text-lg">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (cartData) {
    return (
      <div className="col-span-1 bg-white lg:block hidden">
        <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">
          Order Summary
        </h1>
        <ul className="py-6 border-b space-y-6 px-8">
          {cartData.map((item: any) => {
            return (
              <>
                <li className="grid grid-cols-6 gap-2 border-b-1">
                  <div className="col-span-1 self-center">
                    <ProductImage sku={item.sku} />
                  </div>
                  <div className="flex flex-col col-span-3 pt-2">
                    <span className="text-gray-600 text-md font-semi-bold">
                      {item.name}
                    </span>
                    <span className="text-indigo-500 text-s inline-block pt-2">
                      {item.sku}
                    </span>
                  </div>
                  <div className="col-span-2 pt-3">
                    <div className="flex items-center space-x-2 text-sm justify-between">
                      <span className="text-gray-600">{item.qty}</span>
                      <span className="text-gray-600 font-l inline-block">
                        ${item.price * item.qty}
                      </span>
                    </div>
                  </div>
                </li>
              </>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return "Fetching Cart Data..";
  }
}
export default CartDetails;
