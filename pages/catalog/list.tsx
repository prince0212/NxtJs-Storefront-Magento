/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
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
                      <Fade delay={500} triggerOnce>
                        <div key={singleproduct.id} className="group relative">
                          <div className="min-h-80 aspect-w-1 aspect-h-1 w-full  lg:aspect-none">
                            {singleproduct.custom_attributes.map(
                              (attr, index) => (
                                <>
                                  {attr.attribute_code == "thumbnail" &&
                                  attr.value != "" ? (
                                    <center>
                                      <div className="group box-border overflow-hidden flex cursor-pointer pe-0 pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 hover:shadow-product  bg-white">
                                        <div className="flex mb-3 md:mb-3.5">
                                          <span>
                                            <span>
                                              <Image
                                                src={
                                                  process.env.domain +
                                                  "media/catalog/product/" +
                                                  `${attr.value}`
                                                }
                                                alt={singleproduct.name}
                                                width={350}
                                                height={50}
                                                className="object-cover object-center text-center"
                                              />
                                            </span>
                                          </span>
                                        </div>
                                        <div className="w-full overflow-hidden p-2 md:px-2.5 xl:px-4">
                                          <h2 className="mb-1 text-sm md:text-base font-semibold text-heading">
                                            {singleproduct.name}
                                          </h2>
                                          <div className="font-semibold text-sm sm:text-base mt-1.5 space-s-2 lg:text-lg lg:mt-2.5 text-heading">
                                            <span className="inline-block false">
                                              ${singleproduct.price}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      {/* <Image
                                        src={
                                          process.env.domain +
                                          "media/catalog/product/" +
                                          `${attr.value}`
                                        }
                                        alt={singleproduct.name}
                                        width={300}
                                        height={50}
                                        className="object-cover object-center text-center"
                                      /> */}
                                    </center>
                                  ) : (
                                    ""
                                  )}
                                </>
                              )
                            )}
                          </div>
                        </div>
                      </Fade>
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
        <div className="container px-5 py-6 mx-auto">
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
