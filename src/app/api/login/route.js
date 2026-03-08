import { NextResponse } from "next/server";

// 비밀번호는 .env.local 파일의 ADMIN_PASSWORD에서 가져옴
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "wook1234";

export async function POST(request) {
  try {
    const { password } = await request.json();

    if (password === ADMIN_PASSWORD) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "비밀번호가 틀렸습니다." }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
