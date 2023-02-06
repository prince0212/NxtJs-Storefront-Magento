import Link from "next/link";
import Image from "next/image";

function HomePageTopBanner(props: any) {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-5 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            {props.homePageBanner.title}
          </h1>
          <p className="mb-8 leading-relaxed">{props.homePageBanner.content}</p>
          <div className="flex justify-center">
            <Link href={`${props.homePageBanner.link1}`} legacyBehavior>
              {/* <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-800 rounded-full text-lg">
                {props.homePageBanner.button1}
              </button> */}
              <a
                href="#_"
                className=" px-5 py-2.5 overflow-hidden group bg-indigo-500 relative hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-indigo-400 transition-all ease-out duration-300 rounded-full"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">{props.homePageBanner.button1}</span>
              </a>
            </Link>
            &nbsp;
            <Link href={`${props.homePageBanner.link2}`} legacyBehavior>
              <a
                href="#_"
                className=" px-5 py-2.5 overflow-hidden group bg-indigo-500 relative hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-indigo-400 transition-all ease-out duration-300 rounded-full"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">{props.homePageBanner.button2}</span>
              </a>
              {/* <button className="ml-4 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-800  rounded-full text-lg">
                {props.homePageBanner.button2}
              </button> */}
            </Link>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Image
            src={
              process.env.domain + "media/" + `${props.homePageBanner.image}`
            }
            alt={props.homePageBanner.title}
            width={650}
            height={434}
          />
        </div>
      </div>
    </section>
  );
}
export default HomePageTopBanner;
