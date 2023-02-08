import Link from "next/link";
const SubCategory = (props) => {
  const { id, name, level, url, childs } = props;

  return (
    <>
      <li className="level0 pos-relt">
        <Link
          href={`/catalog/list?id=${id}&pageNumber=1`}
          as={`/catalog/list?id=${id}&pageNumber=1`}
          passHref
          legacyBehavior
          className={`${childs.length > 0 ? "haschilds" : "nochilds"}`}
        >
          <a
            href=""
            className="relative text-black hover:text-indigo-500 inline-flex items-center px-3 py-2 text-sm font-semibold xl:text-base text-heading xl:px-4 group-hover:text-black"
          >
            <span>{name}</span>
          </a>
        </Link>
        {childs.length > 0 && (
          <div className="submenu pos-abs">
            <ul className="level1 txt-overflow-ellipsis">
              {childs.map((child_2) => (
                <li
                  key={child_2.id}
                  className={`level1-cat ${
                    child_2.children_data.length > 0 ? "level1-haschild" : ""
                  }`}
                >
                  {child_2.children_data.length === 0 && (
                    <Link
                      legacyBehavior
                      href={`/catalog/list?id=${child_2.id}&pageNumber=1`}
                      as={`/catalog/list?id=${child_2.id}&pageNumber=1`}
                      passHref
                    >
                      <a className="hover:text-indigo-500  text-black text-base">
                        <span>{child_2.name}</span>
                      </a>
                    </Link>
                  )}
                  {child_2.children_data.length > 0 && (
                    <>
                      <Link
                        legacyBehavior
                        href={`/catalog/list?id=${child_2.id}&pageNumber=1`}
                        as={`/catalog/list?id=${child_2.id}&pageNumber=1`}
                        passHref
                      >
                        <a className="hover:text-indigo-500 hover:underline text-black text-base font-semibold">
                          <span>{child_2.name}</span>
                        </a>
                      </Link>
                      <ul className="level2">
                        {child_2.children_data.map((child_3) => (
                          <li key={child_3.id} className="level2-cat px-1 py-1">
                            <Link
                              legacyBehavior
                              href={`/catalog/list?id=${child_3.id}&pageNumber=1`}
                              as={`/catalog/list?id=${child_3.id}&pageNumber=1`}
                              passHref
                            >
                              <a className="hover:text-indigo-500 ml-1 text-black text-base">
                                <span>{child_3.name}</span>
                              </a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </li>
    </>
  );
};
export default SubCategory;
