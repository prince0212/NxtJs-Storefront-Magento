import Link from "next/link";
import Image from "next/image";

function HomePageContent(props: any) {
  return (
    <div className="xl:w-1/3 md:w-1/2 p-4">
      <div className="bg-gray-100 p-6 rounded-lg">
        <Link href={`${props.homePageContent.link}`}>
          <Image
            src={
              process.env.domain + "media/" + `${props.homePageContent.image}`
            }
            alt={props.homePageContent.title}
            width={440}
            height={320}
          />
          <h2 className="text-lg text-gray-900 font-medium title-font mb-4 mt-4">
            {props.homePageContent.title}
          </h2>
          <p className="leading-relaxed text-base">
            {props.homePageContent.description}
          </p>
        </Link>
      </div>
    </div>
  );
}
export default HomePageContent;
