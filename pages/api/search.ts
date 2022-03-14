// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { searchBooks } from "services/goodreads";
import { SearchResult } from "services/goodreads/search";


export default async function handler(req: NextApiRequest, res: NextApiResponse<SearchResult>): Promise<void> {
  if (req.method != "GET") {
    res.status(405);
  }

  const query = req.query["query"] as string;
  const page = Number.parseInt(req.query["page"] as string || "0");

  res.status(200).json(await searchBooks(query, page));
}
