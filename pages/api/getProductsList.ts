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
  const categoryId = req.query.categoryId;
  const pageNumber = req.query.pageNumber;

  const endpoint =
    process.env.API_URL +
    `rest/default/V1/products?searchCriteria[currentPage]=` +
    pageNumber +
    `&searchCriteria[pageSize]=` +
    process.env.pageSize +
    `&searchCriteria[filter_groups][0][filters][0][field]=visibility&searchCriteria[filter_groups][0][filters][0][condition_type]=eq&searchCriteria[filter_groups][0][filters][0][value]=4&searchCriteria[filter_groups][1][filters][1][value]=1&searchCriteria[filter_groups][1][filters][1][condition_type]=eq&searchCriteria[filter_groups][1][filters][1][field]=status&searchCriteria[filter_groups][2][filters][1][value]=` +
    categoryId +
    `&searchCriteria[filter_groups][2][filters][1][condition_type]=eq&searchCriteria[filter_groups][2][filters][1][field]=category_id`;

  console.log(endpoint);
  const accessToken = "mn1yctu14ej49t0g29e6bdhl2qkj3tvu";
  try {
    const response = await axios.get(endpoint, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.status(200).json({
      data: response.data.items,
      total_count: response.data.total_count,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ data: e });
  }
}
