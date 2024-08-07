import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { photoId } = req.query;

  if (!photoId) {
    return res.status(400).json({ message: "Missing required parameters" });
  }

  try {
    const response = await axios.get(
      `${process.env.URL}/api/fileblob/${photoId}`,
      {
        headers: {
          Cookie: `_ga_P21KD3ESV2=GS1.1.1717220027.3.0.1717220027.0.0.0; _ga=GA1.2.257840654.1716482344; _gid=GA1.2.287587932.1716482344`,
        },
        responseType: "arraybuffer",
      }
    );
    res.send(response.data);
  } catch (error: any) {
    console.error("Error during API call:", error);

    if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
      return res.status(503).json({ message: "No internet connection." });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
}
