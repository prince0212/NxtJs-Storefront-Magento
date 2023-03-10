import { useMutation } from "@apollo/client";
import { useState } from "react";
import { gql } from "@apollo/client/core";
import { ThreeDots } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const CREATE_ACCOUNT_QRY = gql`
  mutation (
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    createCustomer(
      input: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        password: $password
      }
    ) {
      customer {
        firstname
        lastname
        email
      }
    }
  }
`;

function CreateAcccount() {
  const [loading, setloading] = useState(false);
  // const [isSubscribed, setIsSubscribed] = useState(false);
  const [createContactUsQry] = useMutation(CREATE_ACCOUNT_QRY);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    is_subscribed: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    //setIsSubscribed(e.target.checked ? 1 : 0)
    // if (e.target.checked) {
    //   setIsSubscribed(true);
    // } else {
    //   setIsSubscribed(false);
    // }
  };

  const handleSubmit = (e: any) => {
    setloading(true);
    e.preventDefault();

    const { firstname, lastname, email, password, is_subscribed } = formData;
    createContactUsQry({
      variables: {
        firstname,
        lastname,
        email,
        password,
        is_subscribed,
      },
    })
      .then((res) => {
        setTimeout(() => {
          setloading(false);
        });
        document.getElementById("create-account-form").reset();
        toast.success("Thanks for registering with us.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((err) => {
        setTimeout(() => {
          setloading(false);
        }, 500);
        toast.error(err.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };
  return (
    <section className="text-gray-600 body-font">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container px-5 py-6 mx-auto flex flex-wrap items-center">
        <div className="lg:w-2/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">
            New Customers
          </h1>
          <p className="leading-relaxed mt-4">
            Creating an account has many benefits: check out faster, keep more
            than one address, track orders and more.
          </p>
        </div>
        <div className="lg:w-3/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <form onSubmit={handleSubmit} id="create-account-form">
            <h2 className="sm:text-3xl mb-5 text-gray-900">Sign Up</h2>
            <div className="relative mb-4">
              <label
                htmlFor="firstname"
                className="leading-7 text-sm text-gray-600"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                required
                placeholder="First Name"
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="lastname"
                className="leading-7 text-sm text-gray-600"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                placeholder="Last Name"
                name="lastname"
                required
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            {/* <div className="relative mb-4">
              <input
                type="checkbox"
                onChange={handleChange}
                id="is_subscribed"
                name="is_subscribed"
              />
              &nbsp;Subscribe to news and updates
            </div> */}
            {loading ? (
              <ThreeDots color={"#062DF6"} loading={loading} size={50} />
            ) : (
              <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-800 rounded-full text-lg">
                Create an Account
              </button>
            )}
            <div className="mt-5">
              <div className="text-sm sm:text-base text-body text-left mt-5 mb-1">
                Already have an account?{" "}
                <Link legacyBehavior href="/customer/login">
                  <button
                    type="button"
                    className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none text-indigo-600"
                  >
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default CreateAcccount;
