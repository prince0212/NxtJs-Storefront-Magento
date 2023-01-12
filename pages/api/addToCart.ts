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
  const endpoint = process.env.API_URL + "/rest/V1/carts/mine/items";
  const accessToken = session.user.accessToken;
  try {
    const response = await axios.post(endpoint, req.body, {
      headers: { Authorization: `bearer ${accessToken}` },
    });
    return res.status(200).json({ data: response.data });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ data: e });
  }
}
