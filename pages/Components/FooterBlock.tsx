import Link from "next/link";
import React from "react";

function FooterBlock(props: { blockTitle: any; blockData: any[] }) {
  return (
    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
      <h2 className="sm:font-semibold text-gray-900 tracking-widest mb-3">
        <>{props.blockTitle}</>
      </h2>
      <nav className="list-none mb-10">
        <>
          {props.blockData.map((item: any) => {
            return (
              <>
                <li>
                  <Link href={`${item.link}`}>
                    <>{item.title}</>
                  </Link>
                </li>
              </>
            );
          })}
        </>
      </nav>
    </div>
  );
}
export default FooterBlock;
