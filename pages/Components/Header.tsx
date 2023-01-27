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
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Logo />
        <Categories categoryData={categoryData} />
        {session && (
          <Link legacyBehavior href="/checkout/cart">
            <button
              type="button"
              className="inline-flex items-center text-white bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0"
            >
              Cart
            </button>
          </Link>
        )}
        &nbsp;&nbsp;
        {session && (
          <button
            type="button"
            className="inline-flex items-center text-white bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0"
            onClick={handleSignout}
            // onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </button>
        )}
        {!session && (
          <Link legacyBehavior href="/customer/login">
            <button className="inline-flex items-center text-white bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0">
              Sign In
            </button>
          </Link>
        )}
        &nbsp;&nbsp;
        {!session && (
          <Link legacyBehavior href="/customer/createaccount">
            <button className="inline-flex items-center text-white bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0">
              Create an Account
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}
