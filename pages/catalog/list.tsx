import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
let totalCategoriesCount = 0;
let totalPageCount = 0;

const List = (newdata: any) => {
  const [product, setProductData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  let pageNumber = router.query.pageNumber;
  const productList = [];
  const dynamicRoute = useRouter().asPath;
  function getProducts() {
    axios({
      method: "get",
      url:
        `/api/getProductsList?pageNumber=` +
        pageNumber +
        `&categoryId=` +
        newdata.categoryId,
      data: "",
    })
      .then(function (response) {
        if (response.status == 200) {
          setProductData(response.data.data);
          totalCategoriesCount = response.data.total_count;
          totalPageCount = Math.ceil(totalCategoriesCount / 20);
          setLoaded(true);
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  }
  function changeNextPageNumber() {
    pageNumber = Number(pageNumber) + 1;

    router.push(
      {
        pathname: "/catalog/list",
        query: {
          id: newdata.categoryId,
          pageNumber: pageNumber,
        },
      },
      undefined,
      { shallow: true }
    );
  }
  function changePreviousPageNumber() {
    pageNumber = Number(pageNumber) - 1;
    router.push(
      {
        pathname: "/catalog/list",
        query: {
          id: newdata.categoryId,
          pageNumber: pageNumber,
        },
      },
      undefined,
      { shallow: true }
    );
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setLoaded(false);
    getProducts();
  }, [newdata.categoryId, newdata.categoryName, pageNumber]);

  if (!loaded) {
    return (
      <div className="container px-5 py-24 mx-auto">
        <div className="spinner-container flex mx-auto mt-16 text-white border-0 py-2 px-8 focus:outline-none rounded text-lg">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (product && product.length > 0) {
    return (
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-6 mx-auto">
          <div className="flex flex-wrap w-full mb-5 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              {newdata.categoryName}
            </h1>
          </div>
          <div className="bg-white">
            <div className="mx-auto py-12 px-4 sm:py-12 sm:px-6 lg:px-8">
              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {product.map((singleproduct: any) => (
                  // eslint-disable-next-line react/jsx-key
                  <Link
                    legacyBehavior
                    href={`/catalog/view?sku=${singleproduct.sku}`}
                    as={`/catalog/view?sku=${singleproduct.sku}`}
                    passHref
                  >
                    <a>
                      <div key={singleproduct.id} className="group relative">
                        <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none">
                          {singleproduct.custom_attributes.map(
                            (attr, index) => (
                              <>
                                {attr.attribute_code == "thumbnail" &&
                                attr.value != "" ? (
                                  <Image
                                    src={
                                      process.env.domain +
                                      "media/catalog/product/" +
                                      `${attr.value}`
                                    }
                                    alt={singleproduct.name}
                                    width={384}
                                    height={512}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                  />
                                ) : (
                                  ""
                                )}
                              </>
                            )
                          )}
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h2 className="text-gray-900 title-font text-lg font-medium">
                              {singleproduct.name}
                            </h2>
                            <p className="mt-1 text-sm text-gray-900">
                              {singleproduct.sku}
                            </p>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            ${singleproduct.price}
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {totalCategoriesCount > 20 && (
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>&nbsp;</div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    {pageNumber == 1 && (
                      <button className="inline-flex items-center text-white bg-gray-500 border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0">
                        Previous
                      </button>
                    )}
                    {pageNumber > 1 && (
                      <button
                        className="inline-flex items-center text-white bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0"
                        onClick={changePreviousPageNumber}
                      >
                        Previous
                      </button>
                    )}
                    &nbsp;{" "}
                    {totalPageCount == pageNumber && (
                      <button className="inline-flex items-center text-white bg-gray-500 border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0">
                      Next
                      </button>
                    )}
                    {totalPageCount != pageNumber && (
                      <button
                        className="inline-flex items-center text-white bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0"
                        onClick={changeNextPageNumber}
                      >
                        Next
                      </button>
                    )}
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  } else {
    return (
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-5 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              {newdata.categoryName}
            </h1>
          </div>

          <div className="bg-white">
            <div className="mx-auto py-12 px-4 sm:py-12 sm:px-6 lg:px-8">
              <div className="flex flex-col text-center w-full text-red-800">
                We can't find products matching the selection.
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};
export default List;

export async function getServerSideProps(context: {
  query: { id: any; name: any };
}) {
  const { id } = context.query;
  const result = await axios.get(
    process.env.NEXT_JS_URL + `api/getCategory?categoryId=` + id
  );
  return {
    props: {
      categoryId: context.query.id,
      categoryName: result.data.data.name,
    },
  };
}
