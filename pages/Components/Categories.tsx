import Link from "next/link";
function Categories(props) {
  return (
    <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
      {props.categoryData.map((item: any) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <Link
            legacyBehavior
            href={`/catalog/list?id=${item.newCatId}&pageNumber=1`}
            as={`/catalog/list?id=${item.newCatId}&pageNumber=1`}
            passHref
          >
            <a className="mr-5 hover:text-gray-900">{item.catgoryName}</a>
          </Link>
        );
      })}
    </nav>
  );
}
export default Categories;
