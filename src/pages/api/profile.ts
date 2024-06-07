import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userId, accessToken, sessionId, xToken } = req.query;

  if (!userId || !accessToken || !sessionId || !xToken) {
    return res.status(400).json({ message: "Missing required parameters" });
  }

  try {
    const response = await axios.get(
      `${process.env.URL}/api/User/GetByUserId/1`,
      {
        params: {
          y: 0,
        },
        headers: {
          Cookie: `_ga_P21KD3ESV2=GS1.1.1717220027.3.0.1717220027.0.0.0; _ga=GA1.2.257840654.1716482344; _gid=GA1.2.287587932.1716482344`,
          Authorization: `Bearer ${accessToken}`,
          "X-Wb": 1,
          Sessionid: sessionId,
          "X-Contextid": 194,
          "X-Userid": userId,
          X_token: xToken,
          "X-Rx": 1,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Error during API call:", error);

    if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
      return res.status(503).json({ message: "No internet connection." });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
}
