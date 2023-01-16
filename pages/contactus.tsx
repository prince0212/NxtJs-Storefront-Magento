import { useMutation } from "@apollo/client";
import { useState } from "react";
import { gql } from "@apollo/client/core";

const CONTACTUS_QRY = gql`
  mutation (
    $message: String!
    $email: String!
    $telephone: String!
    $fullname: String!
  ) {
    contactusFormSubmit(
      input: {
        message: $message
        email: $email
        telephone: $telephone
        fullname: $fullname
      }
    ) {
      success_message
    }
  }
`;
function Contactus() {
  const [createContactUsQry] = useMutation(CONTACTUS_QRY);
  const [formData, setFormData] = useState({
    message: "",
    email: "",
    telephone: "",
    fullname: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { message, email, telephone, fullname } = formData;

    createContactUsQry({
      variables: {
        message,
        email,
        telephone,
        fullname,
      },
    })
      .then((res) => {
        document.getElementById("contact-form").reset();
        document.getElementById("succmessage").innerHTML =
          "Thanks for contacting us with your comments and questions. We'll respond to you very soon.";
      })
      .catch((err) => {
        document.getElementById("succmessage").innerHTML = err;
      });
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-6 mx-auto">
        <div className="flex flex-col text-center w-full mb-10">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Contact Us
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base ">
            Jot us a note and we’ll get back to you as quickly as possible.
          </p>
        </div>
        <div
          className="flex flex-col text-center w-full text-green-700"
          id="succmessage"
        ></div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <form onSubmit={handleSubmit} id="contact-form">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/3">
                <div className="relative">
                  <label
                    htmlFor="fullname"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="p-2 w-1/3">
                <div className="relative">
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
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="abc@xyz.com"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="p-2 w-1/3">
                <div className="relative">
                  <label
                    htmlFor="telephone"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="telephone"
                    name="telephone"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="(222)-222-2222"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    placeholder="Tell us what's on your mind"
                    required
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  type="submit"
                  className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default Contactus;
