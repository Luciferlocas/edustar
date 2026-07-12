import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get("userId");
  const accessToken = searchParams.get("accessToken");
  const sessionId = searchParams.get("sessionId");
  const xToken = searchParams.get("xToken");

  if (!userId || !accessToken || !sessionId || !xToken) {
    return NextResponse.json({ message: "Bad Request!" }, { status: 400 });
  }

  try {
    const response = await axios.get(
      `${process.env.URL}/api/SubjectAttendance/GetPresentAbsentStudent`,
      {
        params: {
          isDateWise: false,
          termId: 0,
          userId: userId,
          y: 0,
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
