import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const photoId = searchParams.get("photoId");

  if (!photoId) {
    return NextResponse.json({ message: "Missing required parameters" }, { status: 400 });
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

    const rawContentType = response.headers["content-type"];
    const contentType = typeof rawContentType === "string" ? rawContentType : "image/jpeg";
    return new NextResponse(response.data, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    console.error("Error during API call:", error);
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || "Internal Server Error";
    return NextResponse.json({ message }, { status });
  }
}
