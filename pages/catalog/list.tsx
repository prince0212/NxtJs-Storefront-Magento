import { useQuery, gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const List = (newdata: any) => {
  let totalAttributesCount = 0;
  let totalPageCount = 0;
  // const [pageNumber, setPageNumber] = useState(1);

  //currentPage: ${pageNumber}
  const CATEGORY_QUERY = gql`
  {
    products(
      filter: { category_id: { eq: "${newdata.categoryId}" } }
      sort: {name: ASC},
      currentPage: 1
    ) {
      total_count
          items {
              name
              sku
              url_key
              price_range {
              maximum_price {
                final_price {
                  value
                  currency
                }
              }
            }
        
        image {
          url
          label
          position
          disabled
        }
        media_gallery {
        url
          label
          position
          disabled
        }
      }
    }
  }
  `;
  const productData: {
    sku: any;
    name: any;
    price: any;
    image: any;
    url: any;
  }[] = [];
  const { data, loading, error } = useQuery(CATEGORY_QUERY);
  if (data) {
    totalAttributesCount = data.products.total_count;
    totalPageCount = Math.ceil(totalAttributesCount / 20);
    console.log(data.products.total_count);
    data.products.items.map((item: any, _index: any) => {
      productData.push({
        sku: item.sku,
        name: item.name,
        price: item.price_range.maximum_price.final_price.value,
        image: item.image.url,
        url: item.url_key,
      });
    });
  }
  if (loading) {
    return (
      <div className="container px-5 py-24 mx-auto">
        <div className="spinner-container flex mx-auto mt-16 text-white border-0 py-2 px-8 focus:outline-none rounded text-lg">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) return <pre>{error.message}</pre>;
  if (productData) {
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
              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {productData.map((item: any) => (
                  // eslint-disable-next-line react/jsx-key
                  <Link
                    legacyBehavior
                    href={`/catalog/view?sku=${item.sku}&slug=${item.url}`}
                    as={`/catalog/view?sku=${item.sku}&slug=${item.url}`}
                    passHref
                  >
                    <a>
                      <div key={item.id} className="group relative">
                        <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                          <Image
                            src={item.image}
                            width={384}
                            height={512}
                            alt={""}
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                          />
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h2 className="text-gray-900 title-font text-lg font-medium">
                              {item.name}
                            </h2>
                            <p className="mt-1 text-sm text-gray-900">
                              {item.sku}
                            </p>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            ${item.price}
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* {data.products.total_count > 20 && (
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>&nbsp;</div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    {pageNumber == 1 && (
                      <button className="inline-flex items-center text-white bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0">
                        Previous
                      </button>
                    )}
                    {pageNumber > 1 && (
                      <button
                        className="inline-flex items-center text-white bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0"
                        onClick={() => {
                          setPageNumber(pageNumber - 1);
                        }}
                      >
                        Previous
                      </button>
                    )}
                    &nbsp;{" "}
                    {totalPageCount == pageNumber && (
                      <button className="inline-flex items-center text-white bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0">
                        Next
                      </button>
                    )}
                    {totalPageCount != pageNumber && (
                      <button
                        className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                        onClick={() => {
                          setPageNumber(pageNumber + 1);
                        }}
                      >
                        Next
                      </button>
                    )}
                  </nav>
                </div>
              </div>
            </div>
          )} */}
        </div>
        {/* {data.products.total_count > 20 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{pageNumber}</span> to{" "}
                  <span className="font-medium">20</span> of{" "}
                  <span className="font-medium">
                    {data.products.total_count}
                  </span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  {pageNumber == 1 && (
                    <button className="inline-flex items-center text-white bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0">
                      Previous
                    </button>
                  )}
                  {pageNumber > 1 && (
                    <button
                      className="inline-flex items-center text-white bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0"
                      onClick={() => {
                        setPageNumber(pageNumber - 1);
                      }}
                    >
                      Previous
                    </button>
                  )}
                  &nbsp;{" "}
                  {totalPageCount == pageNumber && (
                    <button className="inline-flex items-center text-white bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0">
                      Next
                    </button>
                  )}
                  {totalPageCount != pageNumber && (
                    <button
                      className="ininline-flex items-center text-white bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0"
                      onClick={() => {
                        setPageNumber(pageNumber + 1);
                      }}
                    >
                      Next
                    </button>
                  )}
                </nav>
              </div>
            </div>
          </div>
        )} */}
      </section>
    );
  }
};
export default List;

export async function getServerSideProps(context: {
  query: { id: any; name: any };
}) {
  return {
    props: { categoryId: context.query.id, categoryName: context.query.name },
  };
}
