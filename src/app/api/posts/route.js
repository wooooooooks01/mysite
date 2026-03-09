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

    console.log("[DELETE] 삭제 요청 id:", id);

    const { data, error, count } = await supabase
      .from("posts")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("[DELETE] Supabase error:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      return NextResponse.json(
        { error: error.message || "삭제 실패" },
        { status: 500 }
      );
    }

    console.log("[DELETE] 삭제 완료 — 영향받은 행:", data?.length ?? 0);

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "삭제 대상 없음 — RLS 정책에 의해 차단되었을 수 있습니다." },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true, deleted: data.length });
  } catch (e) {
    console.error("[DELETE] 예외 발생:", e);
    return NextResponse.json({ error: e.message || "서버 오류" }, { status: 500 });
  }
}
