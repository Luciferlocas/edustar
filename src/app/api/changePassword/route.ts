import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get("userId");
  const accessToken = searchParams.get("accessToken");
  const sessionId = searchParams.get("sessionId");
  const xToken = searchParams.get("xToken");

  if (!userId || !accessToken || !sessionId || !xToken) {
    return NextResponse.json(
      { message: "Bad Request! Missing query parameters." },
      { status: 400 }
    );
  }

  try {
    const { oldPassword, newPassword, repeatNewPassword } = await req.json();

    if (!oldPassword || !newPassword || !repeatNewPassword) {
      return NextResponse.json(
        { message: "Bad Request! Missing body parameters." },
        { status: 400 }
      );
    }

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
      return NextResponse.json(
        { message: "Password changed successfully." },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: "Failed to change password" },
      { status: response.status }
    );
  } catch (error: any) {
    console.error("Error during API call:", error);
    const status = error.response?.status || 400;
    const message = error.response?.data?.message || "Incorrect Password";
    return NextResponse.json({ message }, { status });
  }
}
