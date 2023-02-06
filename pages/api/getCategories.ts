// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const endpoint = process.env.API_URL + `rest/V1/categories`;

  const accessToken = "mn1yctu14ej49t0g29e6bdhl2qkj3tvu";
  try {
    const response = await axios.get(endpoint, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.status(200).json({
      data: response.data.children_data,
    });
  } catch (e) {
    return res.status(500).json({ data: e });
  }
}
