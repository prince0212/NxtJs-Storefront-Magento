import { useQuery, gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const List = (newdata: any) => {
  let totalAttributesCount = 0;
  let totalPageCount = 0;
  const [pageNumber, setPageNumber] = useState(1);

  const CATEGORY_QUERY = gql`
  {
    products(
      filter: { category_id: { eq: "${newdata.categoryId}" } }
      sort: {name: ASC},
      currentPage: ${pageNumber}
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
          {data.products.total_count > 20 && (
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
                        className="inline-flex items-center text-white bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0"
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
          )}
          <div className="flex flex-wrap -m-4">
            {productData.map((item: any) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                  <Link
                    legacyBehavior
                    href={`/catalog/view?sku=${item.sku}&slug=${item.url}`}
                    as={`/catalog/view?sku=${item.sku}&slug=${item.url}`}
                    passHref
                  >
                    <a className="relative h-48 rounded">
                      <Image
                        src={item.image}
                        width={384}
                        height={512}
                        alt={""}
                        className="w-full object-cover object-center group-hover:opacity-75 rounded-2xl"
                      />
                      <div className="mt-4">
                        <h2 className="text-gray-900 title-font text-lg font-medium">
                          {item.name}
                        </h2>
                        <p className="mt-1">${item.price}</p>
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        {data.products.total_count > 20 && (
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
        )}
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
