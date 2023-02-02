import LeftNavigation from "./leftnavigation";
import Link from "next/link";
const ChangePassword = () => {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-6 mx-auto flex flex-col md:flex-row w-full">
        <div className="flex my-10 w-full">
          <LeftNavigation />
          <div className="pl-12 md:w-10/12 flex-col">
            <h2 className="sm:text-3xl mb-5 text-gray-900">Change Password</h2>
            <div
              className="w-full flex  h-full lg:w-8/12 flex-col"
              data-projection-id="4"
            >
              {/* <form className="w-full mx-auto flex flex-col justify-center "> */}
              <div className="flex flex-col space-y-3">
                <div className="mb-4">
                  <label
                    htmlFor="oldPassword"
                    className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer"
                  >
                    Old Password
                  </label>
                  <div className="relative">
                    <input
                      id="oldPassword"
                      name="oldPassword"
                      type="password"
                      className="py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border border-gray-500 text-input text-xs lg:text-sm font-body rounded-md placeholder-gray-600 bg-white focus:outline-none focus:border-heading h-11 md:h-12"
                    />
                    <label
                      htmlFor="oldPassword"
                      className="absolute end-4 top-5 -mt-2 text-gray-500 cursor-pointer"
                    ></label>
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="newPassword"
                    className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      className="py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border border-gray-500 text-input text-xs lg:text-sm font-body rounded-md placeholder-gray-600 bg-white focus:outline-none focus:border-heading h-11 md:h-12"
                    />
                    <label
                      htmlFor="newPassword"
                      className="absolute end-4 top-5 -mt-2 text-gray-500 cursor-pointer"
                    ></label>
                  </div>
                </div>
                <div className="flex">
                  <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-800  rounded-full text-lg">
                    Change Password
                  </button>
                </div>
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ChangePassword;
