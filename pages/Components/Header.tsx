import { useQuery, gql } from "@apollo/client";
import Categories from "./Categories";
import Link from "next/link";
import Logo from "./Logo";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { ThreeDots } from "react-loader-spinner";
const CATEGORY_QUERY = gql`
  {
    categoryList(filters: { parent_id: { in: ["1"] } }) {
      children {
        id
        level
        name
        path
        url_path
        url_key
      }
    }
  }
`;

export default function Header() {
  //const [userInfo, setuserInfo] = useState(false);
  const { data: session } = useSession();
  const categoryData: { catgoryName: any; newCatId: any; categoryUrl: any }[] =
    [];
  const { data, loading, error } = useQuery(CATEGORY_QUERY);
  // async function getSessionFun() {
  //   const userData = await getSession();
  //   if (!userInfo) {
  //     setuserInfo(userData);
  //   }
  //   if (userInfo) {
  //     console.log(userInfo);
  //   }
  // }
  // useEffect(() => {
  //   getSessionFun();
  // }, []);
  const handleSignout = (e) => {
    localStorage.removeItem("customer_id");
    localStorage.removeItem("customer_email");
    localStorage.removeItem("current_order_id");
    signOut({ callbackUrl: "/" });
  };
  if (data) {
    data.categoryList.map((item: any, _index: any) => {
      item.children.map((item1: any, _index: any) =>
        categoryData.push({
          catgoryName: item1.name,
          newCatId: item1.id,
          categoryUrl: item1.url_key,
        })
      );
    });
  }
  if (loading)
    return <ThreeDots color={"#062DF6"} loading={loading} size={50} />;
  if (error) return <pre>{error.message}</pre>;
  return (
    <header className="text-gray-600 body-font border-b-2">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Logo />
        <Categories categoryData={categoryData} />
        {session && (
          <>
            <div className="group inline-block relative z-50">
              <button className=" text-gray-700 font-semibold py-2 px-2 rounded inline-flex items-center">
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
              </button>
              <ul className="absolute hidden text-gray-700 group-hover:block">
                <li className="w-full">
                  <Link legacyBehavior href="/customer/my-account" className="cursor">
                    <a className="rounded-t bg-gray-200 hover:bg-gray-400  py-2 px-2 block">
                      My Account
                    </a>
                  </Link>
                </li>
                <li className="w-full">
                  <Link legacyBehavior href="/" className="cursor">
                    <a
                      onClick={handleSignout}
                      className="rounded-t bg-gray-200 hover:bg-gray-400  py-2 px-2 block"
                      href="#"
                    >
                      Sign Out
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <Link legacyBehavior href="/checkout/cart">
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
                  <path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path>
                </svg>
              </a>
            </Link>
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
