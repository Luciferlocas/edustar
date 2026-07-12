import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

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
      return NextResponse.json(response.data);
    } else {
      return NextResponse.json({ message: "Invalid response from server" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Error during API call:", error);
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || error.response?.data?.error_description || "Please check your credentials and try again.";
    return NextResponse.json({ message }, { status });
  }
}
