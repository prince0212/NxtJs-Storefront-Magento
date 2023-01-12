import styles from "../styles/Home.module.css";
import { useQuery, gql } from "@apollo/client";
import HomePageSlider from "./Components/HomePageSlider";
import HomePageContent from "./Components/HomePageContent";
import HomePageTopBanner from "./Components/HomePageTopBanner";
import HomePageBottomContent from "./Components/HomePageBottomContent";

const CMS_PAGE_QUERY = gql`
  {
    cmsPage(identifier: "homepagenextjs") {
      title
      url_key
      content_heading
      content
      page_layout
      meta_title
      meta_keywords
      meta_description
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(CMS_PAGE_QUERY);
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;
  const sliderArray: any[] = [];
  const homePageBanner: any[] = [];
  const homePageContent: any[] = [];
  const homePageBottomBanner: any[] = [];
  let replacePTags = data.cmsPage.content.replace("<p>", "");
  let replacePTagsNew = replacePTags.replace("</p>", "");
  const cmsPageContent = JSON.parse(replacePTagsNew);

  cmsPageContent.slider.map((item: any, index: any) => {
    sliderArray.push(item);
  });
  cmsPageContent.homePageBanner.map((item: any, index: any) => {
    homePageBanner.push(item);
  });
  cmsPageContent.homePageContent.map((item: any, index: any) => {
    homePageContent.push(item);
  });
  cmsPageContent.homePageBottomBanner.map((item: any, index: any) => {
    homePageBottomBanner.push(item);
  });

  return (
    <div className={styles.container}>
      <HomePageSlider sliderArray={sliderArray} />
      <HomePageTopBanner homePageBanner={homePageBanner[0]} />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-wrap -m-4">
            <HomePageContent homePageContent={homePageContent[0]} />
            <HomePageContent homePageContent={homePageContent[1]} />
            <HomePageContent homePageContent={homePageContent[2]} />
          </div>
        </div>
      </section>
      <HomePageBottomContent homePageBanner={homePageBottomBanner[0]} />
    </div>
  );
}
