import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";

function Login() {
  const router = useRouter();

  function getCustomerDetails() {
    axios({
      method: "get",
      url: `/api/getCustomerDetails`,
      data: "",
    })
      .then(function (response) {
        if (response.status == 200) {
          localStorage.setItem("customer_id", response.data.data.id);
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email: e.target.email.value,
      password: e.target.password.value,
      tenantKey: e.target.password.value,
      callbackUrl: `${window.location.origin}`,
    });
    if (res) {
      if (res.status == 200) {
        getCustomerDetails();
        localStorage.setItem("customer_email", e.target.email.value);
        router.push("/");
      } else {
        document.getElementById("succmessage").innerHTML =
          "The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.";
      }
    }
  };
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-6 mx-auto flex flex-wrap items-center">
        <div className="lg:w-2/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">
            Registered Customers
          </h1>
          <p className="leading-relaxed mt-4">
            If you have an account, sign in with your email address.
          </p>
        </div>
        <div className="lg:w-3/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <div
            className="flex flex-col text-center w-full text-green-700"
            id="succmessage"
          ></div>

          <form onSubmit={handleSubmit} id="sign-in-form">
            <h2 className="sm:text-3xl mb-5 text-gray-900">
              Login
            </h2>
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
                placeholder="Email"
                name="email"
                required
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
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
export default Login;
