import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userId, accessToken, sessionId, xToken } = req.query;
  const { oldPassword, newPassword, repeatNewPassword } = req.body;

  if (!userId || !accessToken || !sessionId || !xToken) {
    return res
      .status(400)
      .json({ message: "Bad Request! Missing query parameters." });
  }

  if (!oldPassword || !newPassword || !repeatNewPassword) {
    return res
      .status(400)
      .json({ message: "Bad Request! Missing body parameters." });
  }

  try {
    const config = {
      headers: {
        Cookie: `_gid=GA1.2.1242602566.1719426058; _ga_P21KD3ESV2=GS1.1.1719466232.7.0.1719466232.0.0.0; _ga=GA1.2.257840654.1716482344`,
        Authorization: `Bearer ${accessToken}`,
        "X-Wb": "1",
        Sessionid: sessionId,
        "X-Contextid": "194",
        "X-Userid": userId,
        X_token: xToken,
        "X-Rx": "1",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };

    const data = {
      oldPassword,
      newPassword,
      repeatNewPassword,
      userId,
    };

    const response = await axios.post(
      `${process.env.URL}/api/ChangePassword/changepassword`,
      data,
      config
    );

    if (response.status === 201) {
      return res
        .status(201)
        .json({ message: "Password changed successfully." });
    }
  } catch (error: any) {
    console.error("Error during API call:", error);

    if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
      return res.status(503).json({ message: "No internet connection." });
    }

    return res
      .status(400)
      .json({ message: "Incorrect Password" });
  }
}
