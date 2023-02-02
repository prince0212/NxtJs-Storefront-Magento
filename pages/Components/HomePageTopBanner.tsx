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
            <Link href={`${props.homePageBanner.link1}`}>
              <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-800 rounded-full text-lg">
                {props.homePageBanner.button1}
              </button>
            </Link>
            <Link href={`${props.homePageBanner.link2}`}>
              <button className="ml-4 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-800  rounded-full text-lg">
                {props.homePageBanner.button2}
              </button>
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
