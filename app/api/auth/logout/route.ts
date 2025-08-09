import { NextRequest, NextResponse } from "next/server";

export async function POST(_request: NextRequest) {
  const res = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  res.cookies.delete("accessToken");
  res.cookies.delete("refreshToken");

  return res;
}
