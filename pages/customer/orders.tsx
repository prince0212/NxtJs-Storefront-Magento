import LeftNavigation from "./leftnavigation";
import Link from "next/link";
const Orders = () => {
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-6 mx-auto flex flex-col md:flex-row w-full">
        <div className="flex my-10 w-full">
          <LeftNavigation />
          <div className="pl-12 md:w-10/12 flex-col">
            <h2 className="sm:text-3xl mb-5 text-gray-900">Orders</h2>
            <div className="w-full flex flex-col" data-projection-id="2">
              <table>
                <thead className="text-sm lg:text-base">
                  <tr>
                    <th className="bg-gray-100 p-4 text-heading font-semibold text-start first:rounded-ts-md">
                      Order
                    </th>
                    <th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
                      Date
                    </th>
                    <th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
                      Status
                    </th>
                    <th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
                      Total
                    </th>
                    <th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-end last:rounded-te-md">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm lg:text-base">
                  <tr className="border-b border-gray-300 last:border-b-0">
                    <td className="px-4 py-5 text-start">
                      <a
                        className="underline hover:no-underline text-body"
                        href="/my-account/orders/3203"
                      >
                        #3203
                      </a>
                    </td>
                    <td className="text-start lg:text-center px-4 py-5 text-heading">
                      March 18, 2021
                    </td>
                    <td className="text-start lg:text-center px-4 py-5 text-heading">
                      Completed
                    </td>
                    <td className="text-start lg:text-center px-4 py-5 text-heading">
                      $16,950.00 for 93 items
                    </td>
                    <td className="text-end px-4 py-5 text-heading">
                      <Link legacyBehavior href="#">
                        <a className="font-semibold text-indigo-600  hover:text-indigo-800 hover:underline text-lg mt-10 pr-2">
                          View
                        </a>
                      </Link>{" "}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300 last:border-b-0">
                    <td className="px-4 py-5 text-start">
                      <a
                        className="underline hover:no-underline text-body"
                        href="/my-account/orders/3204"
                      >
                        #3204
                      </a>
                    </td>
                    <td className="text-start lg:text-center px-4 py-5 text-heading">
                      March 18, 2021
                    </td>
                    <td className="text-start lg:text-center px-4 py-5 text-heading">
                      Completed
                    </td>
                    <td className="text-start lg:text-center px-4 py-5 text-heading">
                      $16,950.00 for 93 items
                    </td>
                    <td className="text-end px-4 py-5 text-heading">
                      <Link legacyBehavior href="#">
                        <a className="font-semibold text-indigo-600  hover:text-indigo-800 hover:underline text-lg mt-10 pr-2">
                          View
                        </a>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Orders;
