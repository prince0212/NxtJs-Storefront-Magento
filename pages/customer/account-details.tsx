import LeftNavigation from "./leftnavigation";
const AccountDetails = () => {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-6 mx-auto flex flex-col md:flex-row w-full">
        <div className="flex my-10 w-full">
          <LeftNavigation />
          <div className="pl-12 md:w-10/12 flex-col">
            <h2 className="sm:text-3xl mb-5 text-gray-900">Account Details</h2>
            {/* <form className="w-full mx-auto flex flex-col justify-center "> */}
            <div className="flex flex-col space-y-4 sm:space-y-5">
              <div className="flex flex-col space-y-3">
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="firstName"
                    className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer"
                  >
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder=""
                    className="py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md"
                    aria-invalid="false"
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="lastName"
                    className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer"
                  >
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder=""
                    className="py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md"
                    aria-invalid="false"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer"
                  >
                    Phone/Mobile *
                  </label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder=""
                    className="py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md"
                    aria-invalid="false"
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="email"
                    className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer"
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder=""
                    className="py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md"
                    aria-invalid="false"
                  />
                </div>
              </div>

              <div className="flex">
                <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-800  rounded-full text-lg">
                  Save
                </button>
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </section>
  );
};
export default AccountDetails;
