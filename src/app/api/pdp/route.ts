import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const studentId = searchParams.get("studentId");
  const userId = searchParams.get("userId");
  const accessToken = searchParams.get("accessToken");
  const sessionId = searchParams.get("sessionId");
  const xToken = searchParams.get("xToken");

  if (!studentId || !userId || !accessToken || !sessionId || !xToken) {
    return NextResponse.json({ message: "Missing required parameters" }, { status: 400 });
  }

  try {
    const response = await axios.get(
      `${process.env.URL}/api/TransportAttendanceReport`,
      {
        params: {
          admissionNumber: studentId,
          type: 7,
        },
        headers: {
          Cookie: `_ga_P21KD3ESV2=GS1.1.1717220027.3.0.1717220027.0.0.0; _ga=GA1.2.257840654.1716482344; _gid=GA1.2.287587932.1716482344`,
          Authorization: `Bearer ${accessToken}`,
          "X-Wb": "1",
          Sessionid: sessionId,
          "X-Contextid": "194",
          "X-Userid": userId,
          X_token: xToken,
          "X-Rx": "1",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error during API call:", error);
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || "Internal Server Error";
    return NextResponse.json({ message }, { status });
  }
}
