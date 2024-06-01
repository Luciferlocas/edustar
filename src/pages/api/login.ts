import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { setCookie } from "cookies-next";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const { username, password } = req.body;

  try {
    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("username", username);
    formData.append("password", password);

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const response = await axios.post(
      `${process.env.URL}/Token`,
      formData,
      config
    );

    if (response.data) {
      setCookie("incaseifyou", JSON.stringify(response.data), {
        req,
        res,
        secure: true,
        httpOnly: true,
        sameSite: "strict",
      });

      return res.status(200).json(response.data);
    } else {
      return res.status(400).json({ message: "Invalid response from server" });
    }
  } catch (error) {
    console.error("Error during API call:", error);
    return res.status(500).json({
      message: "Login failed. Please check your credentials and try again.",
    });
  }
}
