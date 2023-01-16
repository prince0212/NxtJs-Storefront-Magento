import { useQuery, gql } from "@apollo/client";
import React from "react";

const CmsPage = (newdata: any) => {
  const CMS_QUERY = gql`
    {
      cmsPage(identifier: "${newdata.title}") {
        identifier
        url_key
        title
        content
        content_heading
        page_layout
        meta_title
        meta_description
        meta_keywords
      }
    }
  `;

  const { data, loading, error } = useQuery(CMS_QUERY);
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  if (data) {
    return (
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-6 mx-auto">
          <div className="flex flex-wrap -m-12">
            <div className="p-12 flex flex-col items-start">
              <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
                {data.cmsPage.title}
              </h2>
              <p
                className="leading-relaxed mb-8"
                dangerouslySetInnerHTML={{ __html: data.cmsPage.content }}
              ></p>
            </div>
          </div>
        </div>
      </section>
    );
  }
};
export async function getServerSideProps(context) {
  return { props: { title: context.query.slug } };
}

export default CmsPage;
