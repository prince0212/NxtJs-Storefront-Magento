import { useQuery, gql } from "@apollo/client";

const FILMS_QUERY = gql`
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
  const { data, loading, error } = useQuery(FILMS_QUERY);
  let FooterTestData: never[] = [];
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  if (data) {
    {
      data.cmsBlocks.items.map((item: any, _index: any) => {
        const component = JSON.parse(item.content);
        let insertAt = 0;
        // FooterTestData[insertAt]["cat"] = {
        //   cat: component["footer"][0]["Header"],
        // };
        console.log(component);
        FooterTestData = [];
        // component["footer"].map((item1: any) => {
        //   //console.log(item1);
        //   FooterTestData[]["links"] = [
        //     {
        //       title: item1["title"],
        //       href: item1["Link"],
        //     },
        //   ];
        //   // FooterTestData[insertAt] = {
        //   //   links: { title: item1["title"], href: item1["Link"] },
        //   // };
        //   insertAt++;
        // });
      });
    }
    console.log(FooterTestData);
    //   data.cmsBlocks.items.map((item: any, _index: any) => {
    //     {
    //       const component = JSON.parse(data.cmsBlocks.items[0].content);
    //       {
    //         let insertAt = 0;
    //         component["footer"].map((item1: any) => {
    //           // if (item1["Header"]) {
    //           //   FooterTestData[insertAt] = [{ cat: item1["Header"] }];
    //           //   //FooterData[insertAt] = [{ Header: item1["Header"] }];
    //           // }
    //           if (item1["title"] != undefined) {
    //             FooterTestData[insertAt] = {
    //               cat: item1["Header"],
    //               links: { title: item1["title"], href: item1["Link"] },
    //             };
    //           }
    //           // FooterTestData[insertAt] = {
    //           //   EachTitle: item1["title"],
    //           //   EachLink: item1["Link"],
    //           // };
    //           // if (item1["title"] != undefined) {
    //           //   FooterData[insertAt] = [
    //           //     { Header: item1["Header"] },
    //           //     {
    //           //       EachTitle: item1["title"],
    //           //       EachLink: item1["Link"],
    //           //     },
    //           //   ];
    //           // }
    //           insertAt++;
    //         });
    //         // component["footer1"].map((item1: any) => {
    //         //   if (item1["Header"]) {
    //         //     FooterData[insertAt] = [{ Header: item1["Header"] }];
    //         //   }
    //         //   if (item1["title"] != undefined) {
    //         //     FooterData[insertAt] = {
    //         //       EachTitle: item1["title"],
    //         //       EachLink: item1["Link"],
    //         //     };
    //         //   }
    //         //   insertAt++;
    //         // });
    //       }
    //     }
    //   });
    // }
    // console.log(FooterTestData);
  }
  return (
    <></>
    // <footer className="text-gray-600 body-font">
    //   <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
    //     <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
    //       <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           stroke="currentColor"
    //           stroke-linecap="round"
    //           stroke-linejoin="round"
    //           stroke-width="2"
    //           className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
    //           viewBox="0 0 24 24"
    //         >
    //           <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
    //         </svg>
    //         <span className="ml-3 text-xl">Tailblocks</span>
    //       </a>
    //       <p className="mt-2 text-sm text-gray-500">
    //         Air plant banjo lyft occupy retro adaptogen indego
    //       </p>
    //     </div>
    //     <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
    //       {/* {data.cmsBlocks.items.map((item: any, index: any) => (
    //         <div className="lg:w-1/4 md:w-1/2 w-full px-4">
    //           <>
    //             {JSON.parse(item.content).map((item1: any, index: any) => (
    //               <>{console.log(item1)}</>
    //             ))}
    //             ;
    //           </>
    //         </div>
    //       ))}
    //       {data.cmsBlocks.items.map((item: any, index: any) => {
    //         {
    //           const component = JSON.parse(item.content);
    //           console.log(component);
    //           // console.log(component["category1"]);
    //           {
    //             component["category1"].map((item1: any, index: any) => {
    //               console.log(item1["title"]);
    //             });
    //           }
    //         }
    //       })} */}
    //     </div>
    //   </div>
    //   <div className="bg-gray-100">
    //     <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
    //       <p className="text-gray-500 text-sm text-center sm:text-left">
    //         © 2020 Tailblocks —
    //         <a
    //           href="https://twitter.com/knyttneve"
    //           rel="noopener noreferrer"
    //           className="text-gray-600 ml-1"
    //           target="_blank"
    //         >
    //           @knyttneve
    //         </a>
    //       </p>
    //       <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
    //         <a className="text-gray-500">
    //           <svg
    //             fill="currentColor"
    //             stroke-linecap="round"
    //             stroke-linejoin="round"
    //             stroke-width="2"
    //             className="w-5 h-5"
    //             viewBox="0 0 24 24"
    //           >
    //             <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
    //           </svg>
    //         </a>
    //         <a className="ml-3 text-gray-500">
    //           <svg
    //             fill="currentColor"
    //             stroke-linecap="round"
    //             stroke-linejoin="round"
    //             stroke-width="2"
    //             className="w-5 h-5"
    //             viewBox="0 0 24 24"
    //           >
    //             <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
    //           </svg>
    //         </a>
    //         <a className="ml-3 text-gray-500">
    //           <svg
    //             fill="none"
    //             stroke="currentColor"
    //             stroke-linecap="round"
    //             stroke-linejoin="round"
    //             stroke-width="2"
    //             className="w-5 h-5"
    //             viewBox="0 0 24 24"
    //           >
    //             <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    //             <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
    //           </svg>
    //         </a>
    //         <a className="ml-3 text-gray-500">
    //           <svg
    //             fill="currentColor"
    //             stroke="currentColor"
    //             stroke-linecap="round"
    //             stroke-linejoin="round"
    //             stroke-width="0"
    //             className="w-5 h-5"
    //             viewBox="0 0 24 24"
    //           >
    //             <path
    //               stroke="none"
    //               d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
    //             ></path>
    //             <circle cx="4" cy="4" r="2" stroke="none"></circle>
    //           </svg>
    //         </a>
    //       </span>
    //     </div>
    //   </div>
    // </footer>
  );
}
