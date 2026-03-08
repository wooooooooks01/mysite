import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "posts.json");

function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

function readPosts() {
  ensureDataDir();
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

function writePosts(posts) {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2), "utf-8");
}

// GET: 포스트 목록 조회
export async function GET() {
  return NextResponse.json(readPosts());
}

// POST: 새 포스트 작성
// blocks: [{ type: "text", content: "..." }, { type: "image", url: "/uploads/xxx.jpg" }]
export async function POST(request) {
  try {
    const { title, blocks } = await request.json();
    if (!title || !blocks || blocks.length === 0) {
      return NextResponse.json({ error: "제목과 내용은 필수입니다." }, { status: 400 });
    }

    const posts = readPosts();
    const newPost = {
      id: Date.now().toString(),
      title,
      blocks,
      date: new Date().toISOString().split("T")[0].replace(/-/g, "."),
      createdAt: new Date().toISOString(),
    };

    posts.unshift(newPost);
    writePosts(posts);
    return NextResponse.json(newPost, { status: 201 });
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}

// DELETE: 포스트 삭제
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID 필요" }, { status: 400 });

    let posts = readPosts();
    posts = posts.filter((p) => p.id !== id);
    writePosts(posts);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
