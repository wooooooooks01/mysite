import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 고유 파일명 생성
    const ext = file.name.split(".").pop();
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    // Supabase Storage에 업로드
    const { data, error } = await supabase.storage
      .from("images")
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) throw error;

    // 공개 URL 가져오기
    const { data: publicUrl } = supabase.storage
      .from("images")
      .getPublicUrl(data.path);

    return NextResponse.json({ url: publicUrl.publicUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "업로드 실패" }, { status: 500 });
  }
}
