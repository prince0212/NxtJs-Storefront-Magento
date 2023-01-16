import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

function ProductImage(pro) {
  const [productData, setProductData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  function getProductImage(sku) {
    axios({
      method: "get",
      url: `/api/getItemDetails?sku=` + sku,
      data: "",
    })
      .then(function (response) {
        if (response.status == 200) {
          setProductData(response.data.data);
          setLoaded(true);
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  }
  useEffect(() => {
    getProductImage(pro.sku);
  }, []);
  if (!loaded && !productData) {
    return "Loading Image";
  }
  if (productData) {
    return (
      <>
        {productData.custom_attributes.map((attr, index) => (
          <>
            {attr.attribute_code == "thumbnail" && attr.value != "" ? (
              <Image
                src={
                  process.env.domain +
                  "media/catalog/product/" +
                  `${attr.value}`
                }
                alt=""
                width={80}
                height={80}
              />
            ) : (
              ""
            )}
          </>
        ))}
      </>
    );
  }
}
export default ProductImage;
