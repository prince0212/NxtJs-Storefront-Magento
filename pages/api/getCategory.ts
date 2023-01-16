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
  const categoryId = req.query.categoryId;
  const endpoint = process.env.API_URL + `rest/V1/categories/${categoryId}`;
  const accessToken = "mn1yctu14ej49t0g29e6bdhl2qkj3tvu";
  let response = [];
  console.log("API end point ", endpoint);
  try {
    response = await axios.get(endpoint, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    });
    return res.status(200).json({ data: response.data });
  } catch (e) {
    return res.status(500).json({ data: "Error" });
  }
}
