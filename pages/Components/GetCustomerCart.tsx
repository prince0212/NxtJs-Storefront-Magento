import axios from "axios";
import { getSession, useSession } from "next-auth/react";

const GetCustomerCart = async () => {
  const { data: session } = useSession();

  const endpoint = "http://b2c-community.local:8800/rest/V1/carts/mine";
  //console.log("API this end point ", endpoint);
  const res = await axios.post(endpoint, "", {
    headers: { Authorization: `bearer ${session.user.accessToken}` },
  });
  console.log(res);
  return "";
};
export default GetCustomerCart;
