// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import axios from "axios";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req });
  console.log("Hi");
  const endpoint =
    process.env.API_URL + `rest/V1/carts/mine/estimate-shipping-methods`;
  const accessToken = session.user.accessToken;
  try {
    console.log(endpoint);
    const response = await axios.post(endpoint, req.body, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.status(200).json({ data: response.data });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ data: e });
  }
}
