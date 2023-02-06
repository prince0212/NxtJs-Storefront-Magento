import axios from "axios";
import { useEffect, useState } from "react";
import SubCategory from "./SubCategory";
function Categories() {
  const [categoriesdata, setCategoriesData] = useState(null);
  const categoryData: { id: any; name: any; level: any; childs: any }[] = [];
  function fetchCategories() {
    axios
      .get(`/api/getCategories`)
      .then((res) => {
        if (res.status == 200) {
          setCategoriesData(res.data.data);
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  }
  if (categoriesdata) {
    categoriesdata.map((singlecat) => {
      if (singlecat.is_active === true && singlecat.level === 2) {
        categoryData.push({
          id: singlecat.id,
          name: singlecat.name,
          level: singlecat.level,
          childs: singlecat.children_data,
        });
      }
    });
  }
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center headerMenu relative  lg:flex md:ms-6 xl:ms-10">
      <ul className="menu flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:font-medium md:border-0">
        {categoryData.map((category) => (
          <SubCategory
            key={category.id}
            id={category.id}
            name={category.name}
            level={category.level}
            childs={category.childs}
          />
        ))}
      </ul>
    </nav>
  );
}

export default Categories;
