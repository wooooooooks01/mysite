import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET: 포스트 목록 조회
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (e) {
    console.error("GET posts error:", e);
    return NextResponse.json([], { status: 200 });
  }
}

// POST: 새 포스트 작성
export async function POST(request) {
  try {
    const { title, blocks } = await request.json();
    if (!title || !blocks || blocks.length === 0) {
      return NextResponse.json({ error: "제목과 내용은 필수입니다." }, { status: 400 });
    }

    const newPost = {
      title,
      blocks,
      date: new Date().toISOString().split("T")[0].replace(/-/g, "."),
    };

    const { data, error } = await supabase
      .from("posts")
      .insert(newPost)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    console.error("POST error:", e);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}

// DELETE: 포스트 삭제
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID 필요" }, { status: 400 });

    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("DELETE error:", e);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
