import Categories from "./Categories";
import axios from "axios";
import Link from "next/link";
import Logo from "./Logo";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

function Header() {
  const { data: session } = useSession();

  const handleSignout = (e) => {
    localStorage.removeItem("customer_id");
    localStorage.removeItem("customer_email");
    localStorage.removeItem("current_order_id");
    signOut({ callbackUrl: "/" });
  };
  return (
    <header className="text-gray-600 body-font border-b-2">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Logo />
        <Categories />
        {session && (
          <>
            <div className="group inline-block">
              <button class="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-32">
                <span className="pr-1 font-semibold flex-1">Welcome</span>
                <span>
                  <svg
                    className="fill-current h-4 w-4 transform group-hover:-rotate-180
        transition duration-150 ease-in-out"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </span>
              </button>
              <ul
                className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
  transition duration-150 ease-in-out origin-top min-w-32"
              >
                <li className="rounded-sm px-3 py-1 hover:bg-gray-100">
                  <Link
                    legacyBehavior
                    href="/customer/my-account"
                    className="cursor"
                  >
                    <a>My Account</a>
                  </Link>
                </li>
                <li className="rounded-sm px-3 py-1 hover:bg-gray-100">
                  <Link legacyBehavior href="/checkout/cart" className="cursor">
                    <a>Cart</a>
                  </Link>
                </li>
                <li className="rounded-sm px-3 py-1 hover:bg-gray-100">
                  <a onClick={handleSignout} href="#">
                    Sign Out
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
        {!session && (
          <Link legacyBehavior href="/customer/login" className="cursor">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 1024 1024"
                height="1.5em"
                width="1.5em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>
              </svg>
            </a>
          </Link>
        )}
      </div>
    </header>
  );
}
export default Header;
