import { useMutation } from "@apollo/client";
import { useState } from "react";
import { gql } from "@apollo/client/core";
import { ThreeDots } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SUBSCRIPTION_QRY = gql`
  mutation ($email: String!) {
    subscribeEmailToNewsletter(email: $email) {
      status
    }
  }
`;
function Subscription() {
  const [loading, setloading] = useState(false);

  const [subscriptionQry] = useMutation(SUBSCRIPTION_QRY);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    setloading(true);

    e.preventDefault();
    const { email } = formData;

    subscriptionQry({
      variables: {
        email,
      },
    })
      .then((res) => {
        setTimeout(() => {
          setloading(false);
        });
        
        document.getElementById("subscription-form").reset();
        document.getElementById("subscription-success-message").innerHTML =
          "The email address is subscribed.";
      })
      .catch((err) => {
        setTimeout(() => {
          setloading(false);
        });
        document.getElementById("subscription-form").reset();
        document.getElementById("subscription-success-message").innerHTML = err;
      });
  };
  return (
    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
      <form onSubmit={handleSubmit} id="subscription-form">
        <h2 className="sm:font-semibold text-gray-900 tracking-widest mb-3">
          SUBSCRIBE
        </h2>
        <div
          className="flex flex-col text-center w-full text-green-700"
          id="subscription-success-message"
        ></div>
        <div className="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
          <div className="relative w-40 sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="abc@xyz.com"
              required
              onChange={handleChange}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          {loading ? (
            <ThreeDots
              color={"#062DF6"}
              loading={loading}
              size={50}
              height={50}
            />
          ) : (
            <button className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded">
              Subscribe
            </button>
          )}
        </div>
      </form>
      <p className="text-gray-500 text-sm mt-2 md:text-left text-center">
        Recieve the latest news, update and special offers right to your inbox.
      </p>
    </div>
  );
}
export default Subscription;
