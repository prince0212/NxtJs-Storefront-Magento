import Link from "next/link";
import { useQuery, gql } from "@apollo/client";
import Copyright from "./Copyright";
import Subscription from "./Subscription";
import FooterBlock from "./FooterBlock";

const BLOCK_QUERY = gql`
  {
    cmsBlocks(identifiers: "footer-block-one") {
      items {
        identifier
        title
        content
      }
    }
  }
`;
export default function Footer() {
  const { data, loading, error } = useQuery(BLOCK_QUERY);
  let FirstFooterData: never[] = [];
  let FirstFooterTitle = "";
  let SecondFooterData: never[] = [];
  let SecondFooterTitle = "";
  let ThirdFooterData: never[] = [];
  let ThirdFooterTitle = "";
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  if (data) {
    {
      data.cmsBlocks.items.map((item: any, _index: any) => {
        let replacePTags = item.content.replace("<p>", "");
        let replacePTagsNew = replacePTags.replace("</p>", "");
        const component = JSON.parse(replacePTagsNew);
        component.footer1.map((item: any, _index: any) => {
          FirstFooterTitle = item.header;
          FirstFooterData.push({
            title: item.title,
            link: item.link,
          });
        });
        component.footer2.map((item: any, _index: any) => {
          SecondFooterTitle = item.header;
          SecondFooterData.push({
            title: item.title,
            link: item.link,
          });
        });
        component.footer3.map((item: any, _index: any) => {
          ThirdFooterTitle = item.header;
          ThirdFooterData.push({
            title: item.title,
            link: item.link,
          });
        });
      });
    }
  }

  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-12 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link legacyBehavior href="/">
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-3 text-xl">Deloitte B2C</span>
            </a>
          </Link>
          <p className="mt-2 text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipsicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <FooterBlock
            blockTitle={FirstFooterTitle}
            blockData={FirstFooterData}
          />
          <FooterBlock
            blockTitle={SecondFooterTitle}
            blockData={SecondFooterData}
          />
          <FooterBlock
            blockTitle={ThirdFooterTitle}
            blockData={ThirdFooterData}
          />
          <Subscription />
        </div>
      </div>
      <Copyright />
    </footer>
  );
}
