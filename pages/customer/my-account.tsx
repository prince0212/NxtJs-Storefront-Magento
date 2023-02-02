import LeftNavigation from "./leftnavigation";
const myAccount = () => {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-6 mx-auto flex flex-col md:flex-row w-full">
        <div className="flex my-10 w-full">
          <LeftNavigation />
          <div className="pl-12 md:w-10/12 flex-col">
            <h2 className="sm:text-3xl mb-5 text-gray-900">Dashboard</h2>
            <p className=" text-sm leading-7 md:text-base md:leading-loose lowercase">
              From your account dashboard you can view your{" "}
              <a
                className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none text-indigo-600"
                href="/customer/orders"
              >
                recent orders
              </a>
              , manage your{" "}
              <a
                className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none text-indigo-600"
                href="/customer/account-details"
              >
                Account Details
              </a>{" "}
              and{" "}
              <a
                className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none text-indigo-600"
                href="/customer/change-password"
              >
                change your password
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default myAccount;
